'use client';

import { fetchClient } from '@/api/fetch-client';
import {
    AdminTeacherUserByIdDocument,
    AdminTeacherUserByIdQuery,
    VerifyTeacherDocument,
    VerifyTeacherMutationVariables,
} from '@/api/graphql';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { DashboardContentSafeSpace } from '../../shared/dashboard-content-safe-space';
import { LoadingSpinner } from '@/components/loading-spinner';
import { useAuth } from '@clerk/nextjs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ButtonWithSpinner } from '@/components/button-with-spinner';
import { useToast } from '@/components/ui/use-toast';

export const AdminTeacherDetailPage = () => {
    const { getToken } = useAuth();
    const params = useParams();
    const id = params.id as string;

    const toast = useToast();

    const client = useQueryClient();
    const query = useQuery({
        queryKey: ['admin-teacher-detail', id],
        queryFn: () => {
            return fetchClient(
                AdminTeacherUserByIdDocument,
                {
                    id: parseInt(id, 10),
                },
                { getToken },
            );
        },
    });

    const mutation = useMutation({
        mutationFn: (data: VerifyTeacherMutationVariables) => {
            return fetchClient(VerifyTeacherDocument, data, { getToken });
        },
        onSuccess: (data) => {
            if (!data.verifyTeacher) {
                return;
            }

            client.setQueryData<AdminTeacherUserByIdQuery>(
                ['admin-teacher-detail', id],
                (oldData) => {
                    if (
                        !oldData ||
                        !oldData.teacherUserById ||
                        !oldData.teacherUserById.teacherProfile
                    ) {
                        return oldData;
                    }

                    const next: AdminTeacherUserByIdQuery = {
                        ...oldData,
                        teacherUserById: {
                            ...oldData.teacherUserById,
                            teacherProfile: {
                                ...oldData.teacherUserById.teacherProfile,
                                isVerified: true,
                            },
                        },
                    };

                    return next;
                },
            );
        },
    });

    const onVerifyTeacher = (data: VerifyTeacherMutationVariables) => {
        mutation.mutate(data, {
            onSuccess: () => {
                toast.toast({
                    variant: 'success',
                    title: 'Profesor verificado',
                    description: 'El profesor ha sido verificado correctamente',
                });
            },
            onError: () => {
                toast.toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Hubo un error al verificar el profesor',
                });
            },
        });
    };

    if (query.isPending) {
        return (
            <DashboardContentSafeSpace containerClassName="min-h-screen flex flex-col space-y-1 items-center justify-center">
                <LoadingSpinner />
            </DashboardContentSafeSpace>
        );
    }

    if (query.isError) {
        return (
            <DashboardContentSafeSpace containerClassName="min-h-screen flex flex-col space-y-1 items-center justify-center text-center">
                <h1 className="font-bold">Error</h1>

                <p className="text-muted-foreground">
                    Hubo un error al cargar la información del profesor
                </p>
            </DashboardContentSafeSpace>
        );
    }

    const teacher = query.data?.teacherUserById;
    if (!teacher || !teacher.teacherProfile) {
        return (
            <DashboardContentSafeSpace containerClassName="min-h-screen flex flex-col space-y-1 items-center justify-center text-center">
                <h1 className="font-bold">Error</h1>

                <p className="text-muted-foreground">El profesor no existe</p>
            </DashboardContentSafeSpace>
        );
    }

    return (
        <DashboardContentSafeSpace
            wrapperClassName="bg-muted min-h-screen"
            containerClassName="grid gap-4"
        >
            <div className="flex justify-between rounded bg-white p-4">
                <div className="flex items-center space-x-2">
                    <Avatar>
                        <AvatarFallback>{teacher.firstName[0]}</AvatarFallback>
                    </Avatar>

                    <div className="text-sm">
                        <h1 className="font-bold">
                            {teacher.firstName} {teacher.lastName}
                        </h1>
                        <p className="text-muted-foreground">{teacher.email}</p>
                    </div>
                </div>

                <div className="flex flex-col items-end space-y-1 text-sm">
                    {teacher.teacherProfile?.isVerified ? (
                        <span className="text-green-500">Verificado</span>
                    ) : (
                        <>
                            <span className="text-red-500">No verificado</span>

                            <ButtonWithSpinner
                                onClick={() => {
                                    if (!teacher.teacherProfile) {
                                        return;
                                    }

                                    onVerifyTeacher({
                                        teacherId: parseInt(
                                            teacher.teacherProfile.id,
                                            10,
                                        ),
                                    });
                                }}
                                showSpinner={mutation.isPending}
                                variant="outline"
                                size="sm"
                            >
                                Verificar profesor
                            </ButtonWithSpinner>
                        </>
                    )}
                </div>
            </div>

            <div className="rounded bg-white p-4">
                <h2 className="mb-1 font-bold">Colegios</h2>
                <ul className="list-inside list-disc">
                    {teacher.teacherProfile?.colleges.map((school) => (
                        <li key={school.id}>{school.name}</li>
                    ))}
                </ul>
            </div>
        </DashboardContentSafeSpace>
    );
};
