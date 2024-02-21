'use client';

import { TabsContent } from '@/components/ui/tabs';
import { FormBuilder, FormBuilderFormValues } from './FormBuilder';
import { ConvocatoryByIdFormDocument, ConvocatoryByIdFormQuery } from '@/api/graphql';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { convocatoryFormToBuilderForm } from './FormBuilder/utils';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { DEVF_FORM_TEMPLATE } from './FormBuilder/templates/devf-form-template';
import { PLATZI_FORM_TEMPLATE } from './FormBuilder/templates/platzi-form-template';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/api/fetch-client';
import { useAuth } from '@clerk/nextjs';

type ContentProps = {
    form: NonNullable<ConvocatoryByIdFormQuery['convocatoryById']>['form'] | null;
    value: string;
    convocatoryId: number;
};

const Content = ({ form, value, convocatoryId }: ContentProps) => {
    const [builderForm, setBuilderForm] = useState<FormBuilderFormValues | null>(
        form ? convocatoryFormToBuilderForm(form) : null,
    );

    if (builderForm) {
        return (
            <TabsContent value={value}>
                <FormBuilder
                    convocatoryId={convocatoryId}
                    form={builderForm}
                    formId={form?.id ? parseInt(form.id, 10) : null}
                />
            </TabsContent>
        );
    }

    return (
        <TabsContent value={value}>
            <div className="mb-4 flex justify-between border-b border-gray-300 pb-2">
                <h3 className="text-xl font-bold">Formulario</h3>
            </div>

            <p>Aún no has creado un formulario para esta convocatoria</p>

            <p className="mb-4">
                Crea un formulario elijiendo uno de los templates de abajo.
            </p>

            <div className="grid grid-cols-2 gap-x-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Platzi</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <CardDescription>
                            Este formulario es ideal para cuando necesitas los datos
                            básicos de la persona
                        </CardDescription>
                    </CardContent>

                    <CardFooter>
                        <Button
                            onClick={() => {
                                setBuilderForm(PLATZI_FORM_TEMPLATE);
                            }}
                        >
                            Usar
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>DEV.F</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <CardDescription>
                            Este formulario es ideal cuando ya tienes los datos básicos de
                            la persona.
                        </CardDescription>
                    </CardContent>

                    <CardFooter>
                        <Button
                            onClick={() => {
                                setBuilderForm(DEVF_FORM_TEMPLATE);
                            }}
                        >
                            Usar
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </TabsContent>
    );
};

type Props = {
    value: string;
    convocatoryId: number;
    isActive: boolean;
};

export const ConvocatoryFormTabContent: React.FC<Props> = ({
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
                ConvocatoryByIdFormDocument,
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
            value={value}
            form={query.data?.convocatoryById?.form || null}
            convocatoryId={convocatoryId}
        />
    );
};
