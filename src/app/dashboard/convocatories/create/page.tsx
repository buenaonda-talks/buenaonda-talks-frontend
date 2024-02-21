'use client';

import { AdminsLayout } from '@/screens/dashboard/admin/shared/layout';
import { TypographyAdminH1 } from '@/components/typography';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useForm } from 'react-hook-form';

import {
    ConvocatoryGeneralFormValues,
    ConvocatoryGeneralTabContent,
} from '@/screens/dashboard/admin/convocatory-details/GeneralTabContent';
import { useRouter } from 'next/navigation';
import routesBuilder from '@/lib/routes';

enum Tab {
    GENERAL = 'general',
    TALK = 'talk',
    FORM = 'form',
}

const ContentDisplayer = () => {
    const formMethods = useForm<ConvocatoryGeneralFormValues>();
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col p-6">
            <TypographyAdminH1 className="mb-4">
                Crea una nueva convocatoria
            </TypographyAdminH1>

            <Tabs defaultValue={Tab.GENERAL}>
                <div className="mb-4">
                    <TabsList>
                        <TabsTrigger value={Tab.GENERAL}>General</TabsTrigger>
                    </TabsList>
                </div>

                <ConvocatoryGeneralTabContent
                    value={Tab.GENERAL}
                    formMethods={formMethods}
                    convocatoryId={null}
                    onSuccessCreation={() => {
                        router.push(routesBuilder.convocatories);
                    }}
                />
            </Tabs>
        </div>
    );
};

const Page = () => {
    return (
        <AdminsLayout>
            <ContentDisplayer />
        </AdminsLayout>
    );
};

export default Page;
