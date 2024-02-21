import { TabsContent } from '@/components/ui/tabs';
import { CalendarSingleField } from '@/components/calendar-field';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    AdminConvocatoriesTableQuery,
    CreateConvocatoryDocument,
    CreateConvocatoryMutationVariables,
    ScholarshipConvocatoryKind,
    UpdateConvocatoryDocument,
    UpdateConvocatoryMutationVariables,
} from '@/api/graphql';
import { UseFormReturn } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/api/fetch-client';
import { useAuth } from '@clerk/nextjs';
import { ButtonWithSpinner } from '@/components/button-with-spinner';
import { useToast } from '@/components/ui/use-toast';
import { dateToInputValue } from '@/lib/utils';
import { ADMIN_CONVOCATORIES_TABLE_QUERY_KEY } from '../convocatories/query';

export type ConvocatoryGeneralFormValues = {
    privateLabel: string;
    kind: ScholarshipConvocatoryKind;
    countAddingsFromDate: Date | null;
    countAddingsTillDate: Date | null;
    devfInformedGraduates: number | null;
    devfInformedNotAssisted: number | null;
    devfInformedPaused: number | null;
    devfInformedResigned: number | null;
    devfInformedStudying: number | null;
};

type Props = {
    value: string;
    formMethods: UseFormReturn<ConvocatoryGeneralFormValues>;
    convocatoryId: number | null;
    onSuccessCreation?: () => void;
};

const useUpdateConvocatoryMutation = () => {
    const { getToken } = useAuth();
    const client = useQueryClient();

    return useMutation({
        mutationFn: (values: UpdateConvocatoryMutationVariables) => {
            return fetchClient(UpdateConvocatoryDocument, values, {
                getToken,
            });
        },
        onSuccess: (data, variables) => {
            client.setQueryData<AdminConvocatoriesTableQuery>(
                ADMIN_CONVOCATORIES_TABLE_QUERY_KEY,
                (oldData) => {
                    if (!oldData || !oldData.convocatories) {
                        return oldData;
                    }

                    const next: AdminConvocatoriesTableQuery = {
                        ...oldData,
                        convocatories: oldData.convocatories.map((convocatory) => {
                            if (convocatory.id === variables.id.toString()) {
                                return {
                                    ...convocatory,
                                    privateLabel: variables.input.privateLabel,
                                    kind: variables.input.kind,
                                    countAddingsFromDate:
                                        variables.input.countAddingsFromDate,
                                    countAddingsTillDate:
                                        variables.input.countAddingsTillDate,
                                };
                            }

                            return convocatory;
                        }),
                    };

                    return next;
                },
            );
        },
    });
};

const useCreateConvocatoryMutation = () => {
    const { getToken } = useAuth();
    const client = useQueryClient();

    return useMutation({
        mutationFn: (values: CreateConvocatoryMutationVariables) => {
            return fetchClient(CreateConvocatoryDocument, values, {
                getToken,
            });
        },
        onSuccess: (data, variables) => {
            client.setQueryData<AdminConvocatoriesTableQuery>(
                ADMIN_CONVOCATORIES_TABLE_QUERY_KEY,
                (oldData) => {
                    if (!oldData || !oldData.convocatories) {
                        return oldData;
                    }

                    const next: AdminConvocatoriesTableQuery = {
                        ...oldData,
                        convocatories: [
                            ...oldData.convocatories,
                            {
                                form: null,
                                talk: null,
                                id: data.createConvocatory.id.toString(),
                                kind: variables.input.kind,
                                order: 0,
                                privateLabel: variables.input.privateLabel,
                                countAddingsFromDate:
                                    variables.input.countAddingsFromDate,
                                countAddingsTillDate:
                                    variables.input.countAddingsTillDate,
                            },
                        ],
                    };

                    return next;
                },
            );
        },
    });
};

export const ConvocatoryGeneralTabContent = ({
    value,
    formMethods,
    convocatoryId,
    onSuccessCreation: onSuccessCreation,
}: Props) => {
    const watchKind = formMethods.watch('kind');

    const updateMutation = useUpdateConvocatoryMutation();
    const createMutation = useCreateConvocatoryMutation();
    const { toast } = useToast();

    const updateConvocatory = (
        {
            countAddingsFromDate,
            countAddingsTillDate,
            ...values
        }: ConvocatoryGeneralFormValues,
        id: number,
    ) => {
        updateMutation.mutate(
            {
                id: id,
                input: {
                    countAddingsFromDate: countAddingsFromDate
                        ? dateToInputValue(countAddingsFromDate)
                        : null,
                    countAddingsTillDate: countAddingsTillDate
                        ? dateToInputValue(countAddingsTillDate)
                        : null,
                    devfInformedGraduates: values.devfInformedGraduates,
                    devfInformedNotAssisted: values.devfInformedNotAssisted,
                    devfInformedPaused: values.devfInformedPaused,
                    devfInformedResigned: values.devfInformedResigned,
                    devfInformedStudying: values.devfInformedStudying,
                    isWithdrawable: false,
                    kind: values.kind,
                    lessonsEndDate: null,
                    lessonsStartDate: null,
                    maximumWithdrawalDate: null,
                    order: 0,
                    privateLabel: values.privateLabel,
                },
            },
            {
                onSuccess: () => {
                    toast({
                        variant: 'success',
                        title: 'Convocatoria actualizada',
                        description: 'La convocatoria ha sido actualizada correctamente',
                    });
                },
                onError: () => {
                    toast({
                        variant: 'destructive',
                        title: 'Error al actualizar la convocatoria',
                        description: 'Ocurrió un error al actualizar la convocatoria',
                    });
                },
            },
        );
    };

    const createConvocatory = ({
        countAddingsFromDate,
        countAddingsTillDate,
        ...values
    }: ConvocatoryGeneralFormValues) => {
        createMutation.mutate(
            {
                input: {
                    countAddingsFromDate: countAddingsFromDate
                        ? dateToInputValue(countAddingsFromDate)
                        : null,
                    countAddingsTillDate: countAddingsTillDate
                        ? dateToInputValue(countAddingsTillDate)
                        : null,
                    devfInformedGraduates: values.devfInformedGraduates,
                    devfInformedNotAssisted: values.devfInformedNotAssisted,
                    devfInformedPaused: values.devfInformedPaused,
                    devfInformedResigned: values.devfInformedResigned,
                    devfInformedStudying: values.devfInformedStudying,
                    isWithdrawable: false,
                    kind: values.kind,
                    lessonsEndDate: null,
                    lessonsStartDate: null,
                    maximumWithdrawalDate: null,
                    order: 0,
                    privateLabel: values.privateLabel,
                },
            },
            {
                onSuccess: () => {
                    toast({
                        variant: 'success',
                        title: 'Convocatoria creada',
                        description: 'La convocatoria ha sido creada correctamente',
                    });

                    if (onSuccessCreation) {
                        onSuccessCreation();
                    }
                },
                onError: () => {
                    toast({
                        variant: 'destructive',
                        title: 'Error al crear la convocatoria',
                        description: 'Ocurrió un error al crear la convocatoria',
                    });
                },
            },
        );
    };

    const onSaveConvocatory = async (values: ConvocatoryGeneralFormValues) => {
        if (convocatoryId) {
            updateConvocatory(values, convocatoryId);
        } else {
            createConvocatory(values);
        }
    };

    return (
        <TabsContent value={value}>
            <div className="space-y-8">
                <Form {...formMethods}>
                    <div>
                        <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-2">
                            <h3 className="text-xl font-bold">General</h3>

                            <ButtonWithSpinner
                                showSpinner={
                                    updateMutation.isPending || createMutation.isPending
                                }
                                onClick={formMethods.handleSubmit(onSaveConvocatory)}
                            >
                                Guardar convocatoria
                            </ButtonWithSpinner>
                        </div>

                        <div className="space-y-4">
                            <FormField
                                name="privateLabel"
                                rules={{ required: 'Este campo es requerido' }}
                                control={formMethods.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel required>Nombre</FormLabel>

                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="kind"
                                control={formMethods.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel required>Tipo</FormLabel>

                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-44">
                                                        <SelectValue placeholder="Selecciona un tipo" />
                                                    </SelectTrigger>
                                                </FormControl>

                                                <SelectContent>
                                                    <SelectItem
                                                        value={
                                                            ScholarshipConvocatoryKind.Platzi
                                                        }
                                                    >
                                                        Platzi
                                                    </SelectItem>
                                                    <SelectItem
                                                        value={
                                                            ScholarshipConvocatoryKind.Devf
                                                        }
                                                    >
                                                        DEV.F
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="countAddingsFromDate"
                                rules={{ required: 'Este campo es requerido' }}
                                control={formMethods.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel required>Se cuentan desde</FormLabel>

                                        <FormControl>
                                            <CalendarSingleField
                                                selected={field.value}
                                                onSelect={field.onChange}
                                            />
                                        </FormControl>

                                        <FormDescription>
                                            Fecha en la que se comienzan a contar los
                                            signups, agregados, etc.
                                        </FormDescription>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="countAddingsTillDate"
                                rules={{
                                    validate: (value) => {
                                        if (!value) {
                                            return 'Este campo es requerido';
                                        }

                                        const fromDate =
                                            formMethods.getValues('countAddingsFromDate');
                                        if (fromDate && value < fromDate) {
                                            return 'La fecha debe ser mayor a la de inicio';
                                        }

                                        return true;
                                    },
                                }}
                                control={formMethods.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel required>Se cuentan hasta</FormLabel>

                                        <FormControl>
                                            <CalendarSingleField
                                                selected={field.value}
                                                onSelect={field.onChange}
                                            />
                                        </FormControl>

                                        <FormDescription>
                                            Fecha en la que se dejan de contar los
                                            signups, agregados, etc.
                                        </FormDescription>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {watchKind === ScholarshipConvocatoryKind.Devf && (
                        <div className="space-y-8">
                            <div>
                                <h3 className="mb-4 border-b border-gray-300 pb-2 text-xl font-bold">
                                    DEV.F
                                </h3>

                                <div className="space-y-4">
                                    <FormField
                                        name="devfInformedGraduates"
                                        control={formMethods.control}
                                        rules={DEVF_INFORM_FIELD_RULES}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>
                                                    Graduados informados
                                                </FormLabel>

                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        value={field.value ?? ''}
                                                        onChange={(e) => {
                                                            field.onChange(
                                                                valueToOnlyDigitsOrNull(
                                                                    e.target.value,
                                                                ),
                                                            );
                                                        }}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        name="devfInformedNotAssisted"
                                        control={formMethods.control}
                                        rules={DEVF_INFORM_FIELD_RULES}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>
                                                    No asistidos informados
                                                </FormLabel>

                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        value={field.value ?? ''}
                                                        onChange={(e) => {
                                                            field.onChange(
                                                                valueToOnlyDigitsOrNull(
                                                                    e.target.value,
                                                                ),
                                                            );
                                                        }}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        name="devfInformedPaused"
                                        control={formMethods.control}
                                        rules={DEVF_INFORM_FIELD_RULES}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Pausados informados</FormLabel>

                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        value={field.value ?? ''}
                                                        onChange={(e) => {
                                                            field.onChange(
                                                                valueToOnlyDigitsOrNull(
                                                                    e.target.value,
                                                                ),
                                                            );
                                                        }}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        name="devfInformedResigned"
                                        control={formMethods.control}
                                        rules={DEVF_INFORM_FIELD_RULES}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>
                                                    Renunciantes informados
                                                </FormLabel>

                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        value={field.value ?? ''}
                                                        onChange={(e) => {
                                                            field.onChange(
                                                                valueToOnlyDigitsOrNull(
                                                                    e.target.value,
                                                                ),
                                                            );
                                                        }}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </TabsContent>
    );
};

const valueToOnlyDigitsOrNull = (value: string): number | null => {
    const onlyNumbersValue = value.replace(/\D/g, '');

    if (onlyNumbersValue === '') {
        return null;
    }

    return parseInt(onlyNumbersValue, 10);
};

const DEVF_INFORM_FIELD_RULES = {
    validate: (value: number | null) => {
        if (value === null) {
            return true;
        }

        if (value < 0) {
            return 'El valor no puede ser negativo';
        }

        return true;
    },
};
