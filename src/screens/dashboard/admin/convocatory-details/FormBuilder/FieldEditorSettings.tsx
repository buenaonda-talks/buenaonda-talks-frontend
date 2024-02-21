import { FieldEditorSortableOptions } from './FieldEditorSortableOptions';
import {
    FormField,
    FormMessage,
    FormItem,
    FormLabel,
    FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select';
import { FormFieldType } from '@/api/graphql';
import { Combobox } from '@/components/combobox';
import {
    FormBuilderEnhancedFormFieldType,
    FormBuilderFormValues,
    getFormFieldElementId,
} from '.';
import { UseFormReturn } from 'react-hook-form';

type Props = {
    fieldToEditIndex: number;
    formMethods: UseFormReturn<FormBuilderFormValues>;
    fieldToEdit: FormBuilderEnhancedFormFieldType;
    formValues: FormBuilderFormValues;
};

export const FieldEditorSettings = ({
    fieldToEditIndex,
    fieldToEdit,
    formValues,
    formMethods,
}: Props) => {
    const fieldsItCanDependOn = formValues.fields
        .slice(0, fieldToEditIndex)
        .filter((field) => field.type === FormFieldType.RadioBox);

    const dependsOn = fieldToEdit.dependsOnFieldUUID
        ? formValues.fields.find((field) => field.uuid === fieldToEdit.dependsOnFieldUUID)
        : null;

    return (
        <div key={fieldToEdit.uuid}>
            <div className="mb-4 flex items-center justify-between">
                <h4 className="text-lg font-bold">
                    Editar campo #{fieldToEditIndex + 1}
                </h4>

                <a
                    href={`#${getFormFieldElementId(fieldToEdit)}`}
                    onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(
                            getFormFieldElementId(fieldToEdit),
                        );

                        if (el) {
                            el.scrollIntoView({
                                behavior: 'smooth',
                            });
                        }
                    }}
                    className="text-sm text-blue-500 hover:underline"
                >
                    Ir al campo
                </a>
            </div>

            <div className="space-y-3">
                <FormField
                    control={formMethods.control}
                    rules={{
                        required: 'Este campo es requerido',
                    }}
                    name={`fields.${fieldToEditIndex}.title`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Título</FormLabel>

                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={formMethods.control}
                    name={`fields.${fieldToEditIndex}.description`}
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel>Descripción</FormLabel>

                            <FormControl>
                                <Textarea {...field} value={field.value || ''} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={formMethods.control}
                    name={`fields.${fieldToEditIndex}.isRequired`}
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Es obligatorio</FormLabel>

                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={formMethods.control}
                    name={`fields.${fieldToEditIndex}.isImportant`}
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Es importante</FormLabel>

                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={formMethods.control}
                    name={`fields.${fieldToEditIndex}.type`}
                    rules={{
                        required: 'Este campo es requerido',
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Tipo de campo</FormLabel>

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
                                    <SelectItem value={FormFieldType.Text}>
                                        Texto
                                    </SelectItem>
                                    <SelectItem value={FormFieldType.Textarea}>
                                        Textarea
                                    </SelectItem>
                                    <SelectItem value={FormFieldType.College}>
                                        Colegio
                                    </SelectItem>
                                    <SelectItem value={FormFieldType.RadioBox}>
                                        RadioBox
                                    </SelectItem>
                                    <SelectItem value={FormFieldType.FirstName}>
                                        Nombre
                                    </SelectItem>
                                    <SelectItem value={FormFieldType.LastName}>
                                        Apellido
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />

                <FormField
                    control={formMethods.control}
                    name={`fields.${fieldToEditIndex}.dependsOnFieldUUID`}
                    render={({ field }) => (
                        <FormItem className="mb-4 flex flex-col">
                            <FormLabel>Depende de</FormLabel>

                            {fieldsItCanDependOn.length === 0 ? (
                                <div className="space-y-1 text-sm text-muted-foreground">
                                    <p>
                                        Este campo no puede depender de ningún otro campo.
                                    </p>

                                    <p>
                                        Esto ocurre por que no hay otro campo de tipo
                                        radio box antes de este campo.
                                    </p>
                                </div>
                            ) : (
                                <FormControl>
                                    <Combobox
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={fieldsItCanDependOn.map((someField) => {
                                            const order =
                                                formValues.fields.findIndex(
                                                    (field) =>
                                                        field.uuid === someField.uuid,
                                                ) + 1;

                                            return {
                                                label: `${order}. ${someField.title}`,
                                                value: someField.uuid,
                                                key: someField.uuid,
                                            };
                                        })}
                                        noOptionsMessage="No hay campos de tipo radio box"
                                        placeholder="Selecciona un campo"
                                    />
                                </FormControl>
                            )}

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {dependsOn && (
                    <FormField
                        control={formMethods.control}
                        name={`fields.${fieldToEditIndex}.dependsOnFieldOptionUUID`}
                        render={({ field }) => (
                            <FormItem className="mb-4 flex flex-col">
                                <FormLabel required>Depende de opción</FormLabel>

                                <FormControl>
                                    <Combobox
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={dependsOn.options.map((someOption) => {
                                            return {
                                                label: someOption.label,
                                                value: someOption.uuid,
                                                key: someOption.uuid,
                                            };
                                        })}
                                        noOptionsMessage="No hay opciones"
                                        placeholder="Selecciona una opción"
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {fieldToEdit.type === FormFieldType.RadioBox && (
                    <FieldEditorSortableOptions
                        form={formMethods}
                        fieldIndex={fieldToEditIndex}
                    />
                )}
            </div>
        </div>
    );
};
