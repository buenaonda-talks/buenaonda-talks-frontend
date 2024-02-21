import { UseFormReturn } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormBuilderFormValues } from '.';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ApplicationStatus } from '@/api/graphql';

export const getFormOptionElementId = ({ uuid }: { uuid: string }) =>
    `field-option-${uuid}`;

type Props = {
    uuid: string;
    index: number;
    fieldIndex: number;
    form: UseFormReturn<FormBuilderFormValues>;
    onDelete: ({ index }: { index: number }) => void;
    watchedIsImportant: boolean;
};

export const SortableFormFieldOption = ({
    index,
    uuid,
    form,
    fieldIndex,
    onDelete,
    watchedIsImportant,
}: Props) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: getFormOptionElementId({ uuid }),
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const watchedAutomaticResult = form.watch(
        `fields.${fieldIndex}.options.${index}.automaticResult`,
    );

    return (
        <div
            id={getFormOptionElementId({ uuid })}
            className="flex cursor-default items-start space-x-4"
            ref={setNodeRef}
            style={style}
            {...attributes}
        >
            <button className="w-4 cursor-grab" {...listeners}>
                <GripVertical />
            </button>

            <div className="min-w-0 flex-1 space-y-2">
                <FormField
                    rules={{
                        required: 'Este campo es requerido',
                    }}
                    control={form.control}
                    name={`fields.${fieldIndex}.options.${index}.label`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {watchedIsImportant && (
                    <FormField
                        control={form.control}
                        name={`fields.${fieldIndex}.options.${index}.automaticResult`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required>Resultado automático</FormLabel>

                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value || ''}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-44">
                                            <SelectValue placeholder="Selecciona un tipo" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent>
                                        <SelectItem value={ApplicationStatus.Accepted}>
                                            No tiene
                                        </SelectItem>
                                        <SelectItem value={ApplicationStatus.Declined}>
                                            Rechazado
                                        </SelectItem>
                                        <SelectItem value={ApplicationStatus.Pending}>
                                            Pendiente
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                )}

                {watchedAutomaticResult &&
                    watchedAutomaticResult !== ApplicationStatus.Accepted && (
                        <FormField
                            control={form.control}
                            name={`fields.${fieldIndex}.options.${index}.automaticResultObservations`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Observaciones</FormLabel>

                                    <FormControl>
                                        <Input {...field} value={field.value || ''} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
            </div>

            <button
                onClick={() => onDelete({ index })}
                className="h-5 w-5 hover:opacity-50"
            >
                <XCircle className="h-4 w-4" />
            </button>
        </div>
    );
};
