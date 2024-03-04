import { fetchClient } from '@/api/fetch-client';
import {
    CreateTeacherDocument,
    CreateStudentDocument,
    CreateStudentMutation,
    CreateStudentMutationVariables,
    CreateTeacherMutationVariables,
    CreateTeacherMutation,
} from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';

import { CreateProfileRegionsQuery } from '@/api/graphql';
import { useToast } from '@/components/ui/use-toast';

import { UserButton } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Combobox } from '@/components/combobox';
import { CollegesByCommuneDocument } from '@/api/graphql';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreateProfileRole } from './create-profile-client';
import { ButtonWithSpinner } from '@/components/button-with-spinner';

export type CreateProfileLocationFormValues = {
    region?: string | null;
    commune?: string | null;
    college?: string | null;
    newCollegeName?: string | null;
    role?: string | null;
};

type Props = {
    regions: CreateProfileRegionsQuery['regions'];
    role: CreateProfileRole;
    onBack: () => void;
};

const useCollegesByCommune = (communeId: number | undefined | null) => {
    const { getToken } = useAuth();
    return useQuery({
        queryKey: ['colleges', { communeId }],
        queryFn: async () => {
            return fetchClient(
                CollegesByCommuneDocument,
                {
                    communeId: communeId as number,
                },
                { getToken },
            );
        },
        enabled: !!communeId,
    });
};

const useCreateTeacher = () => {
    const { getToken } = useAuth();
    return useMutation<CreateTeacherMutation, Error, CreateTeacherMutationVariables>({
        mutationFn: (data) => {
            return fetchClient(CreateTeacherDocument, data, {
                getToken,
            });
        },
    });
};

const useCreateStudent = () => {
    const { getToken } = useAuth();
    return useMutation<CreateStudentMutation, Error, CreateStudentMutationVariables>({
        mutationFn: (data) => {
            return fetchClient(CreateStudentDocument, data, {
                getToken,
            });
        },
    });
};

export const CreateProfileLocationFormClient = ({ regions, onBack, role }: Props) => {
    const formMethods = useForm<CreateProfileLocationFormValues>();

    const { watch, setValue } = formMethods;
    const watchedRegion = formMethods.watch('region');
    const watchedCommune = formMethods.watch('commune');

    const collegesByCommune = useCollegesByCommune(
        watchedCommune ? parseInt(watchedCommune, 10) : null,
    );

    useEffect(() => {
        const subscription = watch((values, { type, name }) => {
            if (type !== 'change') {
                return;
            }

            if (name === 'region') {
                setValue('commune', null);
                setValue('college', null);
                setValue('newCollegeName', null);
            }

            if (name === 'commune') {
                setValue('college', null);
                setValue('newCollegeName', null);
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, setValue]);

    const { toast } = useToast();
    const createTeacher = useCreateTeacher();
    const createStudent = useCreateStudent();
    const creatingSomeRole = createTeacher.isPending || createStudent.isPending;

    const handleSave = (values: CreateProfileLocationFormValues) => {
        if (
            !values.region ||
            !values.commune ||
            (!values.college && !values.newCollegeName)
        ) {
            return;
        }

        if (role === CreateProfileRole.Student) {
            createStudent.mutate(
                {
                    collegeId: values.college ? parseInt(values.college, 10) : null,
                    communeId: parseInt(values.commune, 10),
                    newCollegeName: values.newCollegeName || null,
                },
                {
                    onSuccess: () => {
                        toast({
                            variant: 'success',
                            title: 'Perfil creado',
                            description:
                                'Tu perfil de estudiante ha sido creado exitosamente.',
                        });
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
        } else if (role === CreateProfileRole.Institution) {
            if (!values.role) {
                return;
            }

            createTeacher.mutate(
                {
                    collegeId: values.college ? parseInt(values.college, 10) : null,
                    communeId: parseInt(values.commune, 10),
                    newCollegeName: values.newCollegeName || null,
                    role: values.role,
                },
                {
                    onSuccess: () => {
                        toast({
                            variant: 'success',
                            title: 'Perfil creado',
                            description:
                                'Tu perfil de institución educativa ha sido creado exitosamente.',
                        });
                    },
                    onError: () => {
                        toast({
                            variant: 'destructive',
                            title: 'Error al crear perfil',
                            description:
                                'Ocurrió un error al crear tu perfil de institución educativa. Por favor, intenta de nuevo.',
                        });
                    },
                },
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center">
            <div className="fixed inset-x-0 top-0 bg-white">
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

            <main className="container w-full py-28">
                <div className="mx-auto space-y-6 lg:w-8/12">
                    <div className="space-y-1">
                        <h1 className="text-center text-3xl font-bold">
                            Tu institución educativa
                        </h1>

                        <p className="text-center text-muted-foreground">
                            Para continuar, completa los datos de tu institución educativa
                        </p>
                    </div>

                    <Form {...formMethods}>
                        <form
                            onSubmit={formMethods.handleSubmit(handleSave)}
                            className="space-y-6"
                        >
                            <FormField
                                control={formMethods.control}
                                name="region"
                                rules={{
                                    required: 'Este campo es requerido',
                                }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel required>Región</FormLabel>

                                        <FormControl>
                                            <Combobox
                                                options={regions.map((region) => ({
                                                    label: region.name,
                                                    value: region,
                                                    key: region.id,
                                                }))}
                                                onChange={field.onChange}
                                                value={field.value?.toString() || ''}
                                                noOptionsMessage="No hay regiones"
                                                placeholder="Selecciona una región"
                                            />
                                        </FormControl>

                                        <FormDescription>
                                            Selecciona la región donde se encuentra tu
                                            institución
                                        </FormDescription>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={formMethods.control}
                                name="commune"
                                rules={{
                                    required: 'Este campo es requerido',
                                }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel required>Comuna</FormLabel>

                                        <FormControl>
                                            <Combobox
                                                options={
                                                    regions
                                                        .find((some) => {
                                                            return (
                                                                some.id === watchedRegion
                                                            );
                                                        })
                                                        ?.communes.map((commune) => ({
                                                            label: commune.name,
                                                            value: commune,
                                                            key: commune.id,
                                                        })) || []
                                                }
                                                onChange={(id) => {
                                                    field.onChange(parseInt(id, 10));
                                                }}
                                                value={field.value?.toString() || ''}
                                                noOptionsMessage="No hay comunas"
                                                placeholder="Selecciona una comuna"
                                                disabled={!watchedRegion}
                                            />
                                        </FormControl>

                                        <FormDescription>
                                            Selecciona la comuna donde se encuentra tu
                                            institución
                                        </FormDescription>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {!watchedCommune ||
                            collegesByCommune.isFetching ||
                            (collegesByCommune.data?.collegesByCommune &&
                                collegesByCommune.data.collegesByCommune.length > 0) ? (
                                <FormField
                                    control={formMethods.control}
                                    name="college"
                                    rules={{
                                        required: 'Este campo es requerido',
                                    }}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel required>
                                                Institución educativa
                                            </FormLabel>

                                            <div className="flex">
                                                <div className="relative">
                                                    <FormControl>
                                                        <Combobox
                                                            options={
                                                                collegesByCommune.data?.collegesByCommune.map(
                                                                    (college) => ({
                                                                        label: college.name,
                                                                        value: college,
                                                                        key: college.id,
                                                                    }),
                                                                ) || []
                                                            }
                                                            onChange={field.onChange}
                                                            value={
                                                                field.value?.toString() ||
                                                                ''
                                                            }
                                                            noOptionsMessage="No hay instituciones"
                                                            placeholder={
                                                                collegesByCommune.isFetching
                                                                    ? 'Cargando instituciones...'
                                                                    : 'Selecciona una institución'
                                                            }
                                                            disabled={!watchedCommune}
                                                        />
                                                    </FormControl>

                                                    {collegesByCommune.isFetching && (
                                                        <Skeleton className="absolute inset-0" />
                                                    )}
                                                </div>
                                            </div>

                                            <FormDescription>
                                                Selecciona la institución educativa a la
                                                que representas
                                            </FormDescription>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ) : (
                                <FormField
                                    control={formMethods.control}
                                    name="newCollegeName"
                                    rules={{
                                        required: 'Este campo es requerido',
                                    }}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel required>
                                                Nombre de la institución educativa
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    value={field.value || ''}
                                                />
                                            </FormControl>

                                            <FormDescription>
                                                Ingresa el nombre de la institución
                                                educativa.
                                            </FormDescription>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            {role === CreateProfileRole.Institution && (
                                <FormField
                                    control={formMethods.control}
                                    name="role"
                                    rules={{
                                        required: 'Este campo es requerido',
                                    }}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel required>
                                                ¿Qué rol cumples en la institución?
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    value={field.value || ''}
                                                />
                                            </FormControl>

                                            <FormDescription>
                                                Si eres rector, director, jefe de UTP,
                                                profesor, etc.
                                            </FormDescription>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <div className="flex justify-end space-x-4 pt-6">
                                <Button onClick={onBack} variant="secondary">
                                    Atrás
                                </Button>

                                <ButtonWithSpinner
                                    type="submit"
                                    showSpinner={creatingSomeRole}
                                >
                                    Continuar
                                </ButtonWithSpinner>
                            </div>
                        </form>
                    </Form>
                </div>
            </main>
        </div>
    );
};
