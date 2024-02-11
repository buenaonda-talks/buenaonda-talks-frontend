'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/api/fetch-client';
import { useAuth } from '@clerk/nextjs';
import {
    ConvocatoryByIdForUpdateDocument,
    ConvocatoryByIdForUpdateQuery,
    ScholarshipConvocatoryKind,
} from '@/api/graphql';
import { useParams } from 'next/navigation';
import { AdminsLayout } from '@/screens/dashboard-admins/shared/layout';
import { TypographyAdminH1 } from '@/components/typography';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminBadgeConvocatoryKind } from '@/screens/dashboard-admins/shared/badge';

import { useForm } from 'react-hook-form';

import { ConvocatoryFormTabContent } from '@/screens/dashboard-admins/convocatory-details/FormTabContent';
import { ConvocatoryTalkTabContent } from '@/screens/dashboard-admins/convocatory-details/TalkTabContent';
import {
    ConvocatoryGeneralFormValues,
    ConvocatoryGeneralTabContent,
} from '@/screens/dashboard-admins/convocatory-details/GeneralTabContent';
import { useState } from 'react';

type EditorProps = {
    convocatory: NonNullable<ConvocatoryByIdForUpdateQuery['convocatoryById']>;
    id: number;
};

enum Tab {
    GENERAL = 'general',
    TALK = 'talk',
    FORM = 'form',
}

const ContentDisplayer = ({ convocatory, id }: EditorProps) => {
    const formMethods = useForm<ConvocatoryGeneralFormValues>({
        defaultValues: {
            privateLabel: convocatory.privateLabel,
            kind: convocatory.kind,
            countAddingsFromDate: convocatory.countAddingsFromDate
                ? new Date(convocatory.countAddingsFromDate)
                : null,
            countAddingsTillDate: convocatory.countAddingsTillDate
                ? new Date(convocatory.countAddingsTillDate)
                : null,
            devfInformedGraduates: convocatory.devfInformedGraduates,
            devfInformedNotAssisted: convocatory.devfInformedNotAssisted,
            devfInformedPaused: convocatory.devfInformedPaused,
            devfInformedResigned: convocatory.devfInformedResigned,
            devfInformedStudying: convocatory.devfInformedStudying,
        },
    });

    const watchKind = formMethods.watch('kind');

    const [activeTab, setActiveTab] = useState<Tab>(Tab.GENERAL);

    return (
        <div className="flex min-h-screen flex-col p-6">
            <div className="mb-4">
                <TypographyAdminH1 className="mb-1">
                    {convocatory.privateLabel}
                </TypographyAdminH1>
                <AdminBadgeConvocatoryKind kind={convocatory.kind} />
            </div>

            <Tabs
                defaultValue={Tab.GENERAL}
                onValueChange={(tab) => {
                    setActiveTab(tab as Tab);
                }}
            >
                <div className="mb-4">
                    <TabsList>
                        <TabsTrigger value={Tab.GENERAL}>General</TabsTrigger>
                        <TabsTrigger value={Tab.FORM}>Formulario</TabsTrigger>

                        {watchKind === ScholarshipConvocatoryKind.Platzi && (
                            <TabsTrigger value={Tab.TALK}>Charla</TabsTrigger>
                        )}
                    </TabsList>
                </div>

                <ConvocatoryGeneralTabContent
                    value={Tab.GENERAL}
                    formMethods={formMethods}
                    convocatoryId={id}
                />

                <ConvocatoryFormTabContent
                    value={Tab.FORM}
                    convocatoryId={parseInt(convocatory.id as string, 10)}
                    isActive={activeTab === Tab.FORM}
                />

                {watchKind === ScholarshipConvocatoryKind.Platzi && (
                    <ConvocatoryTalkTabContent
                        value={Tab.TALK}
                        isActive={activeTab === Tab.TALK}
                        convocatoryId={id}
                    />
                )}
            </Tabs>
        </div>
    );
};

const CONVOCATORY_BY_ID_FOR_UPDATE_QUERY_KEY = (id: string) => ['convocatory', id];

const Page = () => {
    const { id } = useParams();
    const { getToken } = useAuth();

    const convocatoryQuery = useQuery({
        queryKey: CONVOCATORY_BY_ID_FOR_UPDATE_QUERY_KEY(id as string),
        queryFn: () => {
            return fetchClient(
                ConvocatoryByIdForUpdateDocument,
                {
                    id: parseInt(id as string, 10),
                },
                {
                    getToken,
                },
            );
        },
        enabled: !!id,
    });

    if (convocatoryQuery.isLoading) {
        return <AdminsLayout>Cargando...</AdminsLayout>;
    }

    if (convocatoryQuery.isError) {
        return <AdminsLayout>Ocurrió un error</AdminsLayout>;
    }

    if (!convocatoryQuery.data?.convocatoryById) {
        return <AdminsLayout>Convocatoria no encontrada</AdminsLayout>;
    }

    return (
        <AdminsLayout>
            <ContentDisplayer
                convocatory={convocatoryQuery.data.convocatoryById}
                id={parseInt(id as string, 10)}
            />
        </AdminsLayout>
    );
};

export default Page;
