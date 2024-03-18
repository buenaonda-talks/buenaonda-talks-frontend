'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/api/fetch-client';
import { useAuth } from '@clerk/nextjs';
import {
    StudentUserByIdForUpdateDocument,
    StudentUserByIdForUpdateQuery,
} from '@/api/graphql';
import { useParams } from 'next/navigation';
import { AdminLayout } from '@/screens/dashboard/admin/shared/layout';
import { TypographyAdminH1 } from '@/components/typography';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { StudentTabGeneralBuilder } from '@/screens/dashboard/admin/student-details/GeneralTabContent';
import { studentToStudentBuilder } from '@/screens/dashboard/admin/student-details/utils';

type EditorProps = {
    data: NonNullable<StudentUserByIdForUpdateQuery>;
    id: number;
};

enum Tab {
    GENERAL = 'general',
    TALK = 'talk',
    FORM = 'form',
}

const ContentDisplayer = ({ data, id }: EditorProps) => {
    return (
        <div className="flex min-h-screen flex-col p-6">
            <div className="mb-4">
                <TypographyAdminH1 className="mb-1">
                    {data.studentUserById.firstName} {data.studentUserById.lastName}
                </TypographyAdminH1>

                <p className="text-gray-500">
                    {data.studentUserById.email} - +{data.studentUserById.phoneCode}
                    {data.studentUserById.phoneNumber}
                </p>
            </div>

            <Tabs defaultValue={Tab.GENERAL}>
                <div className="mb-4">
                    <TabsList>
                        <TabsTrigger value={Tab.GENERAL}>General</TabsTrigger>
                    </TabsList>
                </div>

                <StudentTabGeneralBuilder
                    value={Tab.GENERAL}
                    studentId={id}
                    defaultValues={studentToStudentBuilder(
                        data.studentUserById,
                        data.regions,
                    )}
                    regions={data.regions}
                />
            </Tabs>
        </div>
    );
};

const STUDENT_BY_ID_FOR_UPDATE_QUERY_KEY = (id: string) => ['students', id];

const Page = () => {
    const { id } = useParams();
    const { getToken } = useAuth();

    const studentQuery = useQuery({
        queryKey: STUDENT_BY_ID_FOR_UPDATE_QUERY_KEY(id as string),
        queryFn: () => {
            return fetchClient(
                StudentUserByIdForUpdateDocument,
                {
                    userId: parseInt(id as string, 10),
                },
                {
                    getToken,
                },
            );
        },
        enabled: !!id,
    });

    if (studentQuery.isLoading) {
        return <AdminLayout>Cargando...</AdminLayout>;
    }

    if (studentQuery.isError) {
        return <AdminLayout>Ocurrió un error</AdminLayout>;
    }

    if (!studentQuery.data?.studentUserById) {
        return <AdminLayout>Estudiante no encontrado</AdminLayout>;
    }

    return (
        <AdminLayout>
            <ContentDisplayer data={studentQuery.data} id={parseInt(id as string, 10)} />
        </AdminLayout>
    );
};

export default Page;
