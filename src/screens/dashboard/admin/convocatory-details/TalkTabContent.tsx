import { TabsContent } from '@/components/ui/tabs';
import { ConvocatoryByIdTalkDocument, ConvocatoryByIdTalkQuery } from '@/api/graphql';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { TalkBuilder, TalkBuilderFormValues } from './TalkBuilder';
import { convocatoryTalkToTalkBuilder } from './TalkBuilder/utils';
import { CREATE_TALK_FORM_TEMPLATE } from './TalkBuilder/template';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/api/fetch-client';

type ContentProps = {
    value: string;
    talk: NonNullable<ConvocatoryByIdTalkQuery['convocatoryById']>['talk'];
    convocatoryId: number;
};

export const Content: React.FC<ContentProps> = ({ value, talk, convocatoryId }) => {
    const [builderTalk, setBuilderTalk] = useState<TalkBuilderFormValues | null>(
        talk ? convocatoryTalkToTalkBuilder(talk) : null,
    );

    if (builderTalk) {
        return (
            <TabsContent value={value}>
                <TalkBuilder
                    talkId={talk ? parseInt(talk.id, 10) : null}
                    talk={builderTalk}
                    convocatoryId={convocatoryId}
                />
            </TabsContent>
        );
    }

    return (
        <TabsContent value={value}>
            <h3 className="mb-4 border-b border-gray-300 pb-2 text-xl font-bold">
                Charla
            </h3>

            <p className="mb-4">Aún no has creado una charla para esta convocatoria</p>

            <Button
                type="button"
                onClick={() => {
                    setBuilderTalk(CREATE_TALK_FORM_TEMPLATE());
                }}
            >
                Crear charla
            </Button>
        </TabsContent>
    );
};

type Props = {
    value: string;
    isActive: boolean;
    convocatoryId: number;
};

export const ConvocatoryTalkTabContent: React.FC<Props> = ({
    value,
    isActive,
    convocatoryId,
}) => {
    const { getToken } = useAuth();

    const [wasActiveAtLeastOnce, setWasActiveAtLeastOnce] = useState(false);
    useEffect(() => {
        if (isActive && !wasActiveAtLeastOnce) {
            setWasActiveAtLeastOnce(true);
        }
    }, [isActive, wasActiveAtLeastOnce]);

    const query = useQuery({
        queryKey: ['convocatory-detail', convocatoryId, 'form'],
        queryFn: () =>
            fetchClient(
                ConvocatoryByIdTalkDocument,
                {
                    id: convocatoryId,
                },
                {
                    getToken,
                },
            ),
        enabled: !!convocatoryId && wasActiveAtLeastOnce,
    });

    if (query.isPending) {
        return <TabsContent value={value}>Cargando...</TabsContent>;
    }

    if (query.isError) {
        return <TabsContent value={value}>Ocurrió un error</TabsContent>;
    }

    return (
        <Content
            convocatoryId={convocatoryId}
            value={value}
            talk={query.data?.convocatoryById?.talk || null}
        />
    );
};
