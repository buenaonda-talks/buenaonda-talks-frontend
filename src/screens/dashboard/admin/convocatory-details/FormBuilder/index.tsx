import { DndContext, DragEndEvent } from '@dnd-kit/core';
import {
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import {
    ApplicationStatus,
    ConvocatoryByIdFormQuery,
    FormFieldType,
    FormInput,
} from '@/api/graphql';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useFieldArray, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { SortableFieldEditorPreview } from './SortableFieldEditorPreview';
import { FieldEditorSettings } from './FieldEditorSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { DateTimePicker } from '@/components/date-time-picker/date-time-picker';
import { useCreateFormMutation, useUpdateFormMutation } from './mutation';
import { useToast } from '@/components/ui/use-toast';
import { datetimeToInputValue } from '@/lib/utils';
import { ButtonWithSpinner } from '@/components/button-with-spinner';

type QueryFormType = NonNullable<
    NonNullable<ConvocatoryByIdFormQuery['convocatoryById']>['form']
>;
type QueryFieldType = QueryFormType['fields'][0];

export type FormBuilderEnhancedFormFieldType = Omit<
    QueryFieldType,
    | 'id'
    | 'dependsOnFieldId'
    | 'dependsOnFieldOptionId'
    | 'dependsOnFieldOptionUUID'
    | 'options'
> & {
    id: number | null;
    uuid: string;
    dependsOnFieldUUID: string | null;
    dependsOnFieldOptionUUID: string | null;
    options: (Omit<QueryFieldType['options'][0], 'id'> & {
        id: number | null;
        uuid: string;
    })[];
};

enum Tab {
    GLOBAL_OPTIONS = 'global-options',
    FIELD_OPTIONS = 'field-options',
}

export type FormBuilderFormValues = {
    title: string;
    openDatetime: Date | null;
    closeDatetime: Date | null;
    termsAcceptanceOpenDatetime: Date | null;
    termsAcceptanceCloseDatetime: Date | null;
    fields: FormBuilderEnhancedFormFieldType[];
    fieldsIDsToDelete: number[];
};

export const getFormFieldElementId = ({ uuid }: { uuid: string }) => `field-${uuid}`;

type Props = {
    form: FormBuilderFormValues;
    formId: number | null;
    convocatoryId: number;
};

export const FormBuilder = ({ form, formId, convocatoryId }: Props) => {
    const [fieldUUIDToEdit, setFieldUUIDToEdit] = useState<string | null>(null);

    const formMethods = useForm<FormBuilderFormValues>({
        defaultValues: form,
    });
    const { getValues, watch } = formMethods;

    const {
        fields: formFields,
        move,
        remove,
        insert,
        update,
    } = useFieldArray({
        control: formMethods.control,
        name: 'fields',
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const [tab, setTab] = useState(Tab.GLOBAL_OPTIONS);
    const onTabChange = (value: string) => {
        setTab(value as Tab);
    };

    useEffect(() => {
        const subscription = watch((values, { name, type }) => {
            if (type !== 'change' || !name || !values || !values.fields) return;

            const match = name.match(/^fields\.(\d+)\.dependsOnFieldUUID$/);
            if (match) {
                const index = parseInt(match[1], 10);
                const field = values.fields[index] as FormBuilderEnhancedFormFieldType;
                if (!field) return;

                update(index, {
                    ...field,
                    dependsOnFieldOptionUUID: null,
                });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, update]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = formFields.findIndex(
                (field) => getFormFieldElementId(field) === active.id,
            );
            const newIndex = formFields.findIndex(
                (field) => getFormFieldElementId(field) === over.id,
            );

            const oldDependsOnFieldUUID = formFields[oldIndex].dependsOnFieldUUID;

            if (oldDependsOnFieldUUID) {
                const dependsOnFieldIndex = formFields.findIndex(
                    (field) => field.uuid === oldDependsOnFieldUUID,
                );

                if (dependsOnFieldIndex >= newIndex) {
                    update(oldIndex, {
                        ...formFields[oldIndex],
                        dependsOnFieldUUID: null,
                        dependsOnFieldOptionUUID: null,
                    });
                }
            }

            move(oldIndex, newIndex);
        }
    };

    const watchedFields = watch('fields');
    const fieldToEditIndex = watchedFields.findIndex(
        (field) => field.uuid === fieldUUIDToEdit,
    );
    const fieldToEdit = fieldToEditIndex !== -1 ? watchedFields[fieldToEditIndex] : null;

    const updateMutation = useUpdateFormMutation();
    const createMutation = useCreateFormMutation();
    const { toast } = useToast();

    const onUpdateForm = async (data: FormBuilderFormValues, formId: number) => {
        const {
            title,
            openDatetime,
            closeDatetime,
            termsAcceptanceOpenDatetime,
            termsAcceptanceCloseDatetime,
            fields,
        } = data;

        if (!title || !openDatetime || !closeDatetime) {
            return;
        }

        const inputFields: FormInput['fields'] = fields.map((field) => {
            const inputField: FormInput['fields'][0] = {
                id: field.id,
                uuid: field.uuid,
                title: field.title,
                description: field.description,
                order: field.order,
                type: field.type,
                isRequired: field.isRequired,
                maxLength: field.maxLength,
                minLength: field.minLength,
                dependsOnFieldUUID: field.dependsOnFieldUUID,
                dependsOnFieldOptionUUID: field.dependsOnFieldOptionUUID,
                isImportant: false,
                options: field.options.map((o) => {
                    const option: NonNullable<FormInput['fields'][0]['options']>[0] = {
                        id: o.id,
                        order: o.order,
                        automaticResult:
                            o.automaticResult === ApplicationStatus.Accepted
                                ? null
                                : o.automaticResult,
                        automaticResultObservations:
                            o.automaticResult === ApplicationStatus.Accepted
                                ? null
                                : o.automaticResultObservations,
                        label: o.label,
                        uuid: o.uuid,
                    };

                    return option;
                }),
            };

            return inputField;
        });

        updateMutation.mutate(
            {
                id: formId,
                input: {
                    convocatoryId,
                    title: title,
                    closeDate: datetimeToInputValue(closeDatetime),
                    openDate: datetimeToInputValue(openDatetime),
                    resultsPublicationDate: null,
                    termsAcceptanceCloseDate: termsAcceptanceCloseDatetime
                        ? datetimeToInputValue(termsAcceptanceCloseDatetime)
                        : null,
                    termsAcceptanceOpenDate: termsAcceptanceOpenDatetime
                        ? datetimeToInputValue(termsAcceptanceOpenDatetime)
                        : null,
                    version: 1,
                    fields: inputFields,
                },
                fieldsIDsToDelete: data.fieldsIDsToDelete,
            },
            {
                onSuccess: () => {
                    toast({
                        variant: 'success',
                        title: 'Formulario actualizado',
                        description: 'El formulario ha sido actualizado correctamente',
                    });
                },
                onError: () => {
                    toast({
                        variant: 'destructive',
                        title: 'Error al actualizar el formulario',
                        description: 'Ocurrió un error al actualizar el formulario',
                    });
                },
            },
        );
    };

    const onCreateForm = async (data: FormBuilderFormValues) => {
        const {
            title,
            openDatetime,
            closeDatetime,
            termsAcceptanceOpenDatetime,
            termsAcceptanceCloseDatetime,
            fields,
        } = data;

        if (!title || !openDatetime || !closeDatetime) {
            return;
        }

        const inputFields: FormInput['fields'] = fields.map((field, index) => {
            const inputField: FormInput['fields'][0] = {
                id: field.id,
                uuid: field.uuid,
                title: field.title,
                description: field.description,
                order: index,
                type: field.type,
                isRequired: field.isRequired,
                maxLength: field.maxLength,
                minLength: field.minLength,
                dependsOnFieldUUID: field.dependsOnFieldUUID,
                dependsOnFieldOptionUUID: field.dependsOnFieldOptionUUID,
                isImportant: false,
                options:
                    field.type === FormFieldType.RadioBox
                        ? field.options.map((o, index) => {
                              const option: NonNullable<
                                  FormInput['fields'][0]['options']
                              >[0] = {
                                  id: o.id,
                                  order: index,
                                  automaticResult: null,
                                  automaticResultObservations: null,
                                  label: o.label,
                                  uuid: o.uuid,
                              };

                              return option;
                          })
                        : [],
            };

            return inputField;
        });

        createMutation.mutate(
            {
                input: {
                    convocatoryId,
                    title: title,
                    closeDate: datetimeToInputValue(closeDatetime),
                    openDate: datetimeToInputValue(openDatetime),
                    resultsPublicationDate: null,
                    termsAcceptanceCloseDate: termsAcceptanceCloseDatetime
                        ? datetimeToInputValue(termsAcceptanceCloseDatetime)
                        : null,
                    termsAcceptanceOpenDate: termsAcceptanceOpenDatetime
                        ? datetimeToInputValue(termsAcceptanceOpenDatetime)
                        : null,
                    version: 1,
                    fields: inputFields,
                },
            },
            {
                onSuccess: () => {
                    toast({
                        variant: 'success',
                        title: 'Formulario creado',
                        description: 'El formulario ha sido creado correctamente',
                    });
                },
                onError: () => {
                    toast({
                        variant: 'destructive',
                        title: 'Error al crear el formulario',
                        description: 'Ocurrió un error al crear el formulario',
                    });
                },
            },
        );
    };

    const onSaveForm = (data: FormBuilderFormValues) => {
        if (formId) {
            onUpdateForm(data, formId);
        } else {
            onCreateForm(data);
        }
    };

    return (
        <div>
            <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-2">
                <h3 className="text-xl font-bold">Formulario</h3>

                <ButtonWithSpinner
                    showSpinner={updateMutation.isPending || createMutation.isPending}
                    onClick={formMethods.handleSubmit(onSaveForm, (errors) => {
                        console.error(errors);
                        toast({
                            variant: 'destructive',
                            title: 'Error al guardar el formulario',
                            description: 'Ocurrió un error al guardar el formulario',
                        });
                    })}
                >
                    Guardar formulario
                </ButtonWithSpinner>
            </div>

            <Form {...formMethods}>
                <div className="flex">
                    <div className="w-[400px]">
                        <div className="sticky top-0 -mt-4 h-screen overflow-y-scroll border-r border-gray-300 pb-12 pr-4 pt-4">
                            <div>
                                <Tabs value={tab} onValueChange={onTabChange}>
                                    <div className="mb-4">
                                        <TabsList>
                                            <TabsTrigger value={Tab.GLOBAL_OPTIONS}>
                                                General
                                            </TabsTrigger>

                                            <TabsTrigger value={Tab.FIELD_OPTIONS}>
                                                Opciones del campo
                                            </TabsTrigger>
                                        </TabsList>
                                    </div>

                                    <TabsContent value={Tab.GLOBAL_OPTIONS}>
                                        <div className="space-y-4">
                                            <FormField
                                                control={formMethods.control}
                                                rules={{
                                                    required: 'Este campo es requerido',
                                                }}
                                                name="title"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel required>
                                                            Título
                                                        </FormLabel>

                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <p className="border-b border-gray-200 py-2 text-sm font-bold">
                                                Periodo para llenar el formulario
                                            </p>

                                            <FormField
                                                control={formMethods.control}
                                                name="openDatetime"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel>
                                                            Fecha de apertura
                                                        </FormLabel>

                                                        <FormControl>
                                                            <DateTimePicker
                                                                onChange={field.onChange}
                                                                value={field.value}
                                                            />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={formMethods.control}
                                                name="closeDatetime"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel>
                                                            Fecha de cierre
                                                        </FormLabel>

                                                        <FormControl>
                                                            <DateTimePicker
                                                                onChange={field.onChange}
                                                                value={field.value}
                                                            />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <p className="border-b border-gray-200 py-2 text-sm font-bold">
                                                Periodo para aceptar términos
                                            </p>

                                            <FormField
                                                control={formMethods.control}
                                                name="termsAcceptanceOpenDatetime"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Fecha de aceptación de
                                                            términos
                                                        </FormLabel>

                                                        <FormControl>
                                                            <DateTimePicker
                                                                onChange={field.onChange}
                                                                value={field.value}
                                                            />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={formMethods.control}
                                                name="termsAcceptanceCloseDatetime"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Fecha de cierre de aceptación
                                                            de términos
                                                        </FormLabel>

                                                        <FormControl>
                                                            <DateTimePicker
                                                                onChange={field.onChange}
                                                                value={field.value}
                                                            />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value={Tab.FIELD_OPTIONS}>
                                        {fieldToEdit ? (
                                            <FieldEditorSettings
                                                fieldToEditIndex={fieldToEditIndex}
                                                fieldToEdit={fieldToEdit}
                                                formMethods={formMethods}
                                                formValues={getValues()}
                                            />
                                        ) : (
                                            <div>
                                                <p>
                                                    Si quieres editar un campo, haz click
                                                    en el botón de editar.
                                                </p>
                                            </div>
                                        )}
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    </div>

                    <div className="min-w-0 flex-1 pl-4 pt-4">
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            modifiers={[restrictToVerticalAxis]}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={formFields.map(getFormFieldElementId)}
                            >
                                {formFields.map((field, index) => {
                                    const builderField = formMethods.watch(
                                        `fields.${index}`,
                                        formFields[index],
                                    );
                                    return (
                                        <SortableFieldEditorPreview
                                            key={field.id}
                                            field={builderField}
                                            form={getValues()}
                                            index={index}
                                            onRemoveClick={() => {
                                                remove(index);

                                                if (!builderField.id) {
                                                    return;
                                                }

                                                const fieldsIDsToDelete =
                                                    formMethods.getValues(
                                                        'fieldsIDsToDelete',
                                                    );

                                                formMethods.setValue(
                                                    'fieldsIDsToDelete',
                                                    [
                                                        ...fieldsIDsToDelete,
                                                        builderField.id,
                                                    ],
                                                );
                                            }}
                                            onEditClick={() => {
                                                setFieldUUIDToEdit(field.uuid);
                                                setTab(Tab.FIELD_OPTIONS);
                                            }}
                                            onAddFieldClick={() => {
                                                const newField = createNewFormField();
                                                insert(index + 1, newField);
                                                setFieldUUIDToEdit(newField.uuid);
                                            }}
                                        />
                                    );
                                })}
                            </SortableContext>
                        </DndContext>
                    </div>
                </div>
            </Form>
        </div>
    );
};

const createNewFormField = (): FormBuilderEnhancedFormFieldType => {
    return {
        id: null,
        order: 0,
        minLength: 140,
        maxLength: 140,
        title: 'Nuevo campo',
        description: '',
        type: FormFieldType.Text,
        isRequired: false,
        options: [],
        uuid: crypto.randomUUID(),
        dependsOnFieldUUID: null,
        dependsOnFieldOptionUUID: null,
        isImportant: false,
    };
};
