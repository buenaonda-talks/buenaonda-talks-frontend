import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useCreateStudentMutation, useUpdateStudentMutation } from './mutations';
import { ButtonWithSpinner } from '@/components/button-with-spinner';
import { useToast } from '@/components/ui/use-toast';
import { inputToNumber } from '@/lib/utils';
import { TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useCollegesByCommune } from '@/hooks/useCollegesByCommune';
import { Combobox } from '@/components/combobox';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { useQueryClient } from '@tanstack/react-query';
import routesBuilder from '@/lib/routes';
import { useRouter } from 'next/navigation';

type Props = {
    studentId: number | null;
    defaultValues: StudentBuilderFormValues;
    value: string;
    regions: {
        id: string;
        name: string;
        communes: {
            id: string;
            name: string;
        }[];
    }[];
};

export type StudentBuilderFormValues = Partial<{
    firstName: string;
    lastName: string;
    email: string;
    phoneCode: number | null;
    phoneNumber: number | null;

    region: string | null;
    commune: string | null;
    college: string | null;
    newCollegeName: string | null;
    collegeNotFound: boolean;
}>;

export const StudentTabGeneralBuilder = ({
    defaultValues,
    studentId,
    value,
    regions,
}: Props) => {
    const formMethods = useForm<StudentBuilderFormValues>({
        defaultValues: defaultValues,
    });

    const router = useRouter();

    const watchedRegion = formMethods.watch('region');
    const watchedCommune = formMethods.watch('commune');
    const watchedCollegeNotFound = formMethods.watch('collegeNotFound');

    const collegesByCommune = useCollegesByCommune(
        watchedCommune ? parseInt(watchedCommune, 10) : null,
    );

    const someCollegeWasFoundOnLocationOrIsLoading =
        !watchedCommune ||
        collegesByCommune.isFetching ||
        (collegesByCommune.data?.collegesByCommune &&
            collegesByCommune.data.collegesByCommune.length > 0);

    const updateMutation = useUpdateStudentMutation();
    const createMutation = useCreateStudentMutation();
    const { toast } = useToast();

    const client = useQueryClient();
    const onUpdateStudent = async (data: StudentBuilderFormValues, userId: number) => {
        if (
            !data.email ||
            !data.firstName ||
            !data.lastName ||
            (!data.college && !data.newCollegeName) ||
            !data.commune
        ) {
            return;
        }

        updateMutation.mutate(
            {
                userId,
                studentDetails: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phoneCode: data.phoneCode || null,
                    phoneNumber: data.phoneNumber || null,
                },
                collegeId: data.college ? parseInt(data.college, 10) : null,
                communeId: parseInt(data.commune, 10),
                newCollegeName: data.newCollegeName || null,
            },
            {
                onSuccess: () => {
                    toast({
                        variant: 'success',
                        title: 'Estudiante actualizado',
                        description: 'La estudiante ha sido actualizado correctamente',
                    });

                    client.invalidateQueries({
                        queryKey: ['students'],
                    });
                },
                onError: () => {
                    toast({
                        variant: 'destructive',
                        title: 'Error al actualizar el estudiante',
                        description: 'Ocurrió un error al actualizar el estudiante',
                    });
                },
            },
        );
    };

    const onCreateStudent = async (data: StudentBuilderFormValues) => {
        if (
            !data.email ||
            !data.firstName ||
            !data.lastName ||
            (!data.college && !data.newCollegeName) ||
            !data.commune
        ) {
            return;
        }

        createMutation.mutate(
            {
                studentDetails: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phoneCode: data.phoneCode || null,
                    phoneNumber: data.phoneNumber || null,
                },
                collegeId: data.college ? parseInt(data.college, 10) : null,
                communeId: parseInt(data.commune, 10),
                newCollegeName: data.newCollegeName || null,
            },
            {
                onSuccess: () => {
                    toast({
                        variant: 'success',
                        title: 'Estudiante creado',
                        description: 'El estudiante ha sido creado correctamente',
                    });

                    client.invalidateQueries({
                        queryKey: ['students'],
                        type: 'all',
                    });

                    router.push(routesBuilder.students);
                },
                onError: () => {
                    toast({
                        variant: 'destructive',
                        title: 'Error al crear el estudiante',
                        description: 'Ocurrió un error al crear el estudiante',
                    });
                },
            },
        );
    };

    const onSaveStudent = (data: StudentBuilderFormValues) => {
        if (studentId) {
            onUpdateStudent(data, studentId);
        } else {
            onCreateStudent(data);
        }
    };

    return (
        <TabsContent value={value}>
            <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-2">
                <h3 className="text-xl font-bold">Estudiante</h3>

                <ButtonWithSpinner
                    showSpinner={updateMutation.isPending || createMutation.isPending}
                    onClick={formMethods.handleSubmit(onSaveStudent, console.log)}
                >
                    Guardar estudiante
                </ButtonWithSpinner>
            </div>

            <Form {...formMethods}>
                <form className="space-y-4">
                    <FormField
                        name="firstName"
                        control={formMethods.control}
                        rules={{ required: 'Este campo es requerido' }}
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel required>Nombre</FormLabel>

                                    <FormControl>
                                        <Input {...field} value={field.value || ''} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        name="lastName"
                        control={formMethods.control}
                        rules={{ required: 'Este campo es requerido' }}
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel required>Apellido</FormLabel>

                                    <FormControl>
                                        <Input {...field} value={field.value || ''} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        name="email"
                        control={formMethods.control}
                        rules={{ required: 'Este campo es requerido' }}
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel required>Email</FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={field.value || ''}
                                            disabled={!!studentId}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <div className="flex space-x-4">
                        <FormField
                            name="phoneCode"
                            control={formMethods.control}
                            defaultValue={569}
                            render={({ field }) => {
                                return (
                                    <FormItem className="flex-1">
                                        <FormLabel>Código de Área</FormLabel>

                                        <FormControl>
                                            <Input {...field} value={field.value || ''} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            name="phoneNumber"
                            control={formMethods.control}
                            render={({ field }) => {
                                return (
                                    <FormItem className="flex-1">
                                        <FormLabel>Teléfono</FormLabel>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                onChange={(e) => {
                                                    const value = inputToNumber(
                                                        e.target.value,
                                                        {
                                                            max: 999999999,
                                                            min: 0,
                                                        },
                                                    );
                                                    formMethods.setValue(
                                                        'phoneNumber',
                                                        value,
                                                    );
                                                }}
                                                value={field.value || ''}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                    </div>

                    <Separator />

                    <h3 className="text-lg font-bold">Institución educativa</h3>

                    <FormField
                        control={formMethods.control}
                        name="region"
                        rules={{
                            required: 'Este campo es requerido',
                        }}
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-start">
                                <FormLabel required>Región de la institución</FormLabel>

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
                                <FormLabel required>Comuna de la institución</FormLabel>

                                <FormControl>
                                    <Combobox
                                        options={
                                            regions
                                                .find((some) => {
                                                    return some.id === watchedRegion;
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

                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                                    <FormLabel required>Institución educativa</FormLabel>

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
                                                    value={field.value?.toString() || ''}
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
                        collegesByCommune.data.collegesByCommune.length > 0 && (
                            <FormField
                                control={formMethods.control}
                                name="collegeNotFound"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel required>
                                            ¿No encontraste la institución?
                                        </FormLabel>

                                        <FormControl>
                                            <Switch
                                                onCheckedChange={field.onChange}
                                                checked={field.value || false}
                                            />
                                        </FormControl>

                                        <FormDescription>
                                            Si no encontraste tu institución, activa esta
                                            opción para ingresarla manualmente.
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
                                        Nombre de la institución educativa
                                    </FormLabel>

                                    <FormControl>
                                        <Input {...field} value={field.value || ''} />
                                    </FormControl>

                                    <FormDescription>
                                        Ingresa el nombre de la institución educativa.
                                    </FormDescription>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                </form>
            </Form>
        </TabsContent>
    );
};
