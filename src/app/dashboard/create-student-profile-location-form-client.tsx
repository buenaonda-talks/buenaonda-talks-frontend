import { fetchClient } from '@/api/fetch-client';
import {
    CreateStudentDocument,
    CreateStudentMutation,
    CreateStudentMutationVariables,
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';

enum PlaceOfStudy {
    HIGH_SCHOOL = 'high_school',
    UNIVERSITY = 'university',
    NONE = 'none',
}

export type CreateProfileLocationFormValues = Partial<{
    region: string | null;
    commune: string | null;
    college: string | null;
    newCollegeName: string | null;
    placeOfStudy: PlaceOfStudy | null;
    collegeNotFound: boolean;
}>;

type Props = {
    regions: CreateProfileRegionsQuery['regions'];
    role: CreateProfileRole.Student;
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

export const CreateStudentProfileLocationFormClient = ({ regions, onBack }: Props) => {
    const formMethods = useForm<CreateProfileLocationFormValues>({
        defaultValues: {
            placeOfStudy: PlaceOfStudy.HIGH_SCHOOL,
        },
    });

    const { watch, setValue } = formMethods;
    const watchedRegion = formMethods.watch('region');
    const watchedCommune = formMethods.watch('commune');
    const watchedPlaceOfStudy = formMethods.watch('placeOfStudy');
    const watchedCollegeNotFound = formMethods.watch('collegeNotFound');

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
    const createStudent = useCreateStudent();
    const creatingSomeRole = createStudent.isPending;

    const handleSave = (values: CreateProfileLocationFormValues) => {
        if (!values.commune) {
            return;
        }

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

                    window.location.reload();
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
    };

    const someCollegeWasFoundOnLocationOrIsLoading =
        !watchedCommune ||
        collegesByCommune.isFetching ||
        (collegesByCommune.data?.collegesByCommune &&
            collegesByCommune.data.collegesByCommune.length > 0);

    if (createStudent.isSuccess) {
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
                <div className="mx-auto space-y-8 lg:w-8/12">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold">
                            Crea tu perfil de estudiante
                        </h1>

                        <p className="text-muted-foreground">
                            Completa los siguientes campos para crear tu perfil de
                            estudiante
                        </p>
                    </div>

                    <Form {...formMethods}>
                        <form
                            onSubmit={formMethods.handleSubmit(handleSave)}
                            className="space-y-6"
                        >
                            <FormField
                                defaultValue={PlaceOfStudy.HIGH_SCHOOL}
                                control={formMethods.control}
                                name="placeOfStudy"
                                rules={{
                                    required: 'Este campo es requerido',
                                }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="mb-1 font-normal" required>
                                            ¿En que tipo de institución estudias?
                                        </FormLabel>

                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                value={field.value || undefined}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value={
                                                                PlaceOfStudy.HIGH_SCHOOL
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Colegio
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value={
                                                                PlaceOfStudy.UNIVERSITY
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Universidad
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value={PlaceOfStudy.NONE}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        No estudio
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <>
                                <FormField
                                    control={formMethods.control}
                                    name="region"
                                    rules={{
                                        required: 'Este campo es requerido',
                                    }}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel required>
                                                {watchedPlaceOfStudy ===
                                                PlaceOfStudy.HIGH_SCHOOL
                                                    ? 'Región del colegio'
                                                    : watchedPlaceOfStudy ===
                                                        PlaceOfStudy.UNIVERSITY
                                                      ? 'Región de la universidad'
                                                      : 'Región de residencia'}
                                            </FormLabel>

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
                                                {watchedPlaceOfStudy ===
                                                PlaceOfStudy.HIGH_SCHOOL
                                                    ? 'Selecciona la región donde se encuentra el colegio'
                                                    : watchedPlaceOfStudy ===
                                                        PlaceOfStudy.UNIVERSITY
                                                      ? 'Selecciona la región donde se encuentra la universidad'
                                                      : 'Selecciona la región donde vives'}
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
                                            <FormLabel required>
                                                {watchedPlaceOfStudy ===
                                                PlaceOfStudy.HIGH_SCHOOL
                                                    ? 'Comuna del colegio'
                                                    : watchedPlaceOfStudy ===
                                                        PlaceOfStudy.UNIVERSITY
                                                      ? 'Comuna de la universidad'
                                                      : 'Comuna de residencia'}
                                            </FormLabel>

                                            <FormControl>
                                                <Combobox
                                                    options={
                                                        regions
                                                            .find((some) => {
                                                                return (
                                                                    some.id ===
                                                                    watchedRegion
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
                                                {watchedPlaceOfStudy ===
                                                PlaceOfStudy.HIGH_SCHOOL
                                                    ? 'Selecciona la comuna donde se encuentra el colegio'
                                                    : watchedPlaceOfStudy ===
                                                        PlaceOfStudy.UNIVERSITY
                                                      ? 'Selecciona la comuna donde se encuentra la universidad'
                                                      : 'Selecciona la comuna donde vives'}
                                            </FormDescription>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>

                            {watchedPlaceOfStudy &&
                                watchedPlaceOfStudy !== PlaceOfStudy.NONE && (
                                    <>
                                        {someCollegeWasFoundOnLocationOrIsLoading && (
                                            <FormField
                                                control={formMethods.control}
                                                name="college"
                                                rules={{
                                                    required: 'Este campo es requerido',
                                                }}
                                                disabled={watchedCollegeNotFound}
                                                shouldUnregister={watchedCollegeNotFound}
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col items-start">
                                                        <FormLabel required>
                                                            {watchedPlaceOfStudy ===
                                                            PlaceOfStudy.HIGH_SCHOOL
                                                                ? 'Colegio'
                                                                : 'Universidad'}
                                                        </FormLabel>

                                                        <div className="flex">
                                                            <div className="relative">
                                                                <FormControl>
                                                                    <Combobox
                                                                        options={
                                                                            collegesByCommune.data?.collegesByCommune.map(
                                                                                (
                                                                                    college,
                                                                                ) => ({
                                                                                    label: college.name,
                                                                                    value: college,
                                                                                    key: college.id,
                                                                                }),
                                                                            ) || []
                                                                        }
                                                                        onChange={
                                                                            field.onChange
                                                                        }
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
                                                                        disabled={
                                                                            !watchedCommune ||
                                                                            watchedCollegeNotFound
                                                                        }
                                                                    />
                                                                </FormControl>

                                                                {collegesByCommune.isFetching && (
                                                                    <Skeleton className="absolute inset-0" />
                                                                )}
                                                            </div>
                                                        </div>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}

                                        {collegesByCommune.data &&
                                            collegesByCommune.data.collegesByCommune
                                                .length > 0 && (
                                                <FormField
                                                    control={formMethods.control}
                                                    name="collegeNotFound"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col items-start">
                                                            <FormLabel required>
                                                                ¿No encontraste tu
                                                                institución?
                                                            </FormLabel>

                                                            <FormControl>
                                                                <Switch
                                                                    onCheckedChange={
                                                                        field.onChange
                                                                    }
                                                                    checked={
                                                                        field.value ||
                                                                        false
                                                                    }
                                                                />
                                                            </FormControl>

                                                            <FormDescription>
                                                                Si no encontraste tu
                                                                institución, activa esta
                                                                opción para ingresarla
                                                                manualmente.
                                                            </FormDescription>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            )}

                                        {(!someCollegeWasFoundOnLocationOrIsLoading ||
                                            watchedCollegeNotFound) && (
                                            <FormField
                                                control={formMethods.control}
                                                name="newCollegeName"
                                                rules={{
                                                    required: 'Este campo es requerido',
                                                    minLength: {
                                                        value: 3,
                                                        message:
                                                            'El nombre de la institución debe tener al menos 3 caracteres',
                                                    },
                                                }}
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col items-start">
                                                        <FormLabel required>
                                                            Nombre de la institución
                                                            educativa
                                                        </FormLabel>

                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                value={field.value || ''}
                                                            />
                                                        </FormControl>

                                                        <FormDescription>
                                                            Ingresa el nombre de la
                                                            institución educativa.
                                                        </FormDescription>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}
                                    </>
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
