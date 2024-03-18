import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import { Building, Check, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { CreateProfileRole } from './create-profile-client';
import { useAuth } from '@clerk/nextjs';
import { fetchClient } from '@/api/fetch-client';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

import {
    CreateMyStudentProfileDocument,
    CreateMyStudentProfileMutation,
    CreateMyStudentProfileMutationVariables,
} from '@/api/graphql';
import { ButtonWithSpinner } from '@/components/button-with-spinner';

type Props = {
    onContinue: (role: CreateProfileRole) => void;
};

const useCreateMyStudentProfile = () => {
    const { getToken } = useAuth();
    return useMutation<
        CreateMyStudentProfileMutation,
        Error,
        CreateMyStudentProfileMutationVariables
    >({
        mutationFn: (data) => {
            return fetchClient(CreateMyStudentProfileDocument, data, {
                getToken,
            });
        },
    });
};

export const CreateProfileRoleSelector = ({ onContinue }: Props) => {
    const [role, setRole] = useState<CreateProfileRole | null>(null);

    const handleRoleChange = (role: CreateProfileRole) => {
        setRole(role);
    };

    const createMyStudentProfile = useCreateMyStudentProfile();
    const { toast } = useToast();

    if (createMyStudentProfile.isSuccess) {
        return (
            <div className="flex min-h-screen items-center">
                <div className="container w-full text-center">
                    <div className="mx-auto space-y-8 lg:w-8/12">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold">Perfil creado</h1>

                            <p className="text-muted-foreground">
                                Te estamos redirigiendo a tu perfil...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center">
            <div className="fixed inset-x-0 top-0 z-50 bg-white">
                <div className="border-b border-gray-100 py-4 shadow-sm">
                    <div className="container">
                        <div className="flex items-center justify-between space-x-4">
                            <span className="text-sm font-bold uppercase tracking-widest">
                                BUENAONDA TALKS
                            </span>

                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </div>
                </div>
            </div>

            <main className="container w-full space-y-6 py-28">
                <div className="space-y-1">
                    <h1 className="text-center text-3xl font-bold">Selecciona tu rol</h1>

                    <p className="text-center text-muted-foreground">
                        ¡Te damos la bienvenida a BuenaOnda Talks! Para continuar,
                        selecciona el rol que mejor te identifique.
                    </p>
                </div>

                <div className="mx-auto lg:w-8/12">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Card
                            className={cn(
                                'group text-center transition-colors duration-150 hover:bg-neutral-900 hover:text-white hover:shadow-lg',
                                role === CreateProfileRole.Student &&
                                    'bg-neutral-900 text-white shadow-lg',
                            )}
                        >
                            <button
                                onClick={() => {
                                    handleRoleChange(CreateProfileRole.Student);
                                }}
                            >
                                <CardHeader className="relative pb-2">
                                    <GraduationCap className="mx-auto h-10 w-10" />
                                    <CardTitle className="text-xl">Estudiante</CardTitle>

                                    <div className="absolute right-4 top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-200">
                                        {role === CreateProfileRole.Student && (
                                            <Check className="h-3.5 w-3.5" />
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <CardDescription
                                        className={cn(
                                            'group-hover:text-slate-300',
                                            role === CreateProfileRole.Student &&
                                                'text-slate-300',
                                        )}
                                    >
                                        Soy estudiante y quiero obtener una beca para
                                        estudiar programación.
                                    </CardDescription>
                                </CardContent>
                            </button>
                        </Card>

                        <Card
                            className={cn(
                                'group text-center transition-colors duration-150 hover:bg-neutral-900 hover:text-white hover:shadow-lg',
                                role === CreateProfileRole.Institution &&
                                    'bg-neutral-900 text-white shadow-lg',
                            )}
                        >
                            <button
                                onClick={() => {
                                    handleRoleChange(CreateProfileRole.Institution);
                                }}
                            >
                                <CardHeader className="relative pb-2">
                                    <Building className="mx-auto h-10 w-10" />
                                    <CardTitle className="text-xl">
                                        Representante institución educativa
                                    </CardTitle>

                                    <div className="absolute right-4 top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-200">
                                        {role === CreateProfileRole.Institution && (
                                            <Check className="h-3.5 w-3.5" />
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <CardDescription
                                        className={cn(
                                            'group-hover:text-slate-300',
                                            role === CreateProfileRole.Institution &&
                                                'text-slate-300',
                                        )}
                                    >
                                        Represento a una institución educativa y quiero
                                        que estudiantes obtengan becas para estudiar
                                        programación.
                                    </CardDescription>
                                </CardContent>
                            </button>
                        </Card>
                    </div>
                </div>

                <div className="flex justify-center">
                    <ButtonWithSpinner
                        onClick={() => {
                            if (!role) return;

                            if (role === CreateProfileRole.Student) {
                                createMyStudentProfile.mutate(
                                    {},
                                    {
                                        onSuccess: () => {
                                            toast({
                                                variant: 'success',
                                                title: 'Perfil creado',
                                                description:
                                                    'Tu perfil de estudiante ha sido creado exitosamente.',
                                            });

                                            window.setTimeout(() => {
                                                window.location.reload();
                                            }, 1000);
                                        },
                                        onError: () => {
                                            toast({
                                                variant: 'destructive',
                                                title: 'Error al crear perfil',
                                                description:
                                                    'Ocurrió un error al crear tu perfil de estudiante. Por favor, intenta de nuevo.',
                                            });
                                        },
                                    },
                                );
                            } else {
                                onContinue(role);
                            }
                        }}
                        showSpinner={createMyStudentProfile.isPending}
                        disabled={!role}
                    >
                        {role === CreateProfileRole.Student || !role
                            ? 'Crear perfil'
                            : 'Siguiente paso'}
                    </ButtonWithSpinner>
                </div>
            </main>
        </div>
    );
};
