import { Label } from '@/components/ui/label';
import {
    DndContext,
    KeyboardSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext } from '@dnd-kit/sortable';
import { PointerSensor } from '@dnd-kit/core';
import { DragEndEvent } from '@dnd-kit/core';
import { UseFormReturn, useFieldArray, useFormContext } from 'react-hook-form';
import {
    SortableFormFieldOption,
    getFormOptionElementId,
} from './SortableFormFieldOption';
import { Button } from '@/components/ui/button';
import { FormBuilderFormValues } from '.';

type Props = {
    form: UseFormReturn<FormBuilderFormValues>;
    fieldIndex: number;
};

type Option = FormBuilderFormValues['fields'][0]['options'][0];

const createOption = (): Option => ({
    label: '',
    uuid: crypto.randomUUID(),
    order: 0,
    id: null,
    automaticResult: null,
    automaticResultObservations: null,
});

export const FieldEditorSortableOptions = ({ form, fieldIndex }: Props) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const { control, watch } = useFormContext<FormBuilderFormValues>();

    const {
        fields: optionsFields,
        move,
        remove,
        append,
    } = useFieldArray({
        name: `fields.${fieldIndex}.options`,
        control,
    });

    const watchedIsImportant = watch(`fields.${fieldIndex}.isImportant`);
    const watchedOptions = watch(`fields.${fieldIndex}.options`);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = watchedOptions.findIndex(
                (op) => getFormOptionElementId(op) === active.id,
            );
            const newIndex = watchedOptions.findIndex(
                (op) => getFormOptionElementId(op) === over?.id,
            );

            move(oldIndex, newIndex);
        }
    };

    return (
        <div className="space-y-2">
            <Label required>Opciones</Label>

            <div className="space-y-5">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    modifiers={[restrictToVerticalAxis]}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={watchedOptions.map(getFormOptionElementId)}>
                        {optionsFields.map((optionField, index) => {
                            const option = watchedOptions[index];

                            return (
                                <SortableFormFieldOption
                                    watchedIsImportant={watchedIsImportant}
                                    fieldIndex={fieldIndex}
                                    form={form}
                                    uuid={option.uuid}
                                    index={index}
                                    key={optionField.id}
                                    onDelete={({ index }) => {
                                        if (watchedOptions.length === 1) {
                                            append(createOption());
                                        }

                                        remove(index);
                                    }}
                                />
                            );
                        })}
                    </SortableContext>
                </DndContext>
            </div>

            {watchedOptions.length === 0 && (
                <p className="text-sm text-gray-500">No hay opciones</p>
            )}

            <div className="pt-2">
                <Button
                    size="sm"
                    onClick={() => {
                        append(createOption());
                    }}
                >
                    + Agregar opción
                </Button>
            </div>
        </div>
    );
};
