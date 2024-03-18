'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/api/fetch-client';
import { useAuth } from '@clerk/nextjs';
import { CreateStudentFieldsDocument, CreateStudentFieldsQuery } from '@/api/graphql';
import { AdminLayout } from '@/screens/dashboard/admin/shared/layout';
import { TypographyAdminH1 } from '@/components/typography';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { StudentTabGeneralBuilder } from '@/screens/dashboard/admin/student-details/GeneralTabContent';
import routesBuilder from '@/lib/routes';

type EditorProps = {
    data: NonNullable<CreateStudentFieldsQuery>;
};

enum Tab {
    GENERAL = 'general',
    TALK = 'talk',
    FORM = 'form',
}

const ContentDisplayer = ({ data }: EditorProps) => {
    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <div className="min-h-0 flex-1 overflow-scroll p-6">
                <div className="mb-4">
                    <TypographyAdminH1 className="mb-1">
                        Crear estudiante
                    </TypographyAdminH1>
                </div>

                <Tabs defaultValue={Tab.GENERAL}>
                    <div className="mb-4">
                        <TabsList>
                            <TabsTrigger value={Tab.GENERAL}>General</TabsTrigger>
                        </TabsList>
                    </div>

                    <StudentTabGeneralBuilder
                        value={Tab.GENERAL}
                        studentId={null}
                        defaultValues={{}}
                        regions={data.regions}
                    />
                </Tabs>
            </div>

            <div className="pr-container border-t border-border bg-muted py-4 pl-8 text-center text-sm text-muted-foreground">
                ¿Quieres importar estudiantes desde un CSV?{' '}
                <a className="underline" href={routesBuilder.importStudents}>
                    Haz click aquí
                </a>
                .
            </div>
        </div>
    );
};

const QUERY_KEY = ['create-student-fields'];

const Page = () => {
    const { getToken } = useAuth();

    const fieldsQuery = useQuery({
        queryKey: QUERY_KEY,
        queryFn: () => {
            return fetchClient(
                CreateStudentFieldsDocument,
                {},
                {
                    getToken,
                },
            );
        },
    });

    if (fieldsQuery.isLoading) {
        return <AdminLayout>Cargando...</AdminLayout>;
    }

    if (fieldsQuery.isError) {
        return <AdminLayout>Ocurrió un error</AdminLayout>;
    }

    if (!fieldsQuery.data?.regions) {
        return <AdminLayout>Regiones no encontrado</AdminLayout>;
    }

    return (
        <AdminLayout>
            <ContentDisplayer data={fieldsQuery.data} />
        </AdminLayout>
    );
};

export default Page;
