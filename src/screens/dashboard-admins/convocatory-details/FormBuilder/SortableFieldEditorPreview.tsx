import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    FormBuilderEnhancedFormFieldType,
    FormBuilderFormValues,
    getFormFieldElementId,
} from '.';
import { ChevronsUpDown, GripVertical, Pencil, PlusCircle, XCircle } from 'lucide-react';
import { ApplicationStatus, FormFieldType } from '@/api/graphql';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMemo } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type SortableElementProps = {
    field: FormBuilderEnhancedFormFieldType;
    index: number;
    form: FormBuilderFormValues;
    onEditClick: () => void;
    onRemoveClick: () => void;
    onAddFieldClick: () => void;
};

const FieldContent = ({
    field,
    fieldOptions,
}: {
    field: FormBuilderEnhancedFormFieldType;
    fieldOptions: FormBuilderEnhancedFormFieldType['options'];
}) => {
    switch (field.type) {
        case FormFieldType.RadioBox:
            return field.options.length > 0 ? (
                <RadioGroup disabled>
                    {fieldOptions.map((option) => {
                        return (
                            <div className="space-y-1" key={option.uuid}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value={`option-${option.uuid}`}
                                        id={`option-${option.uuid}`}
                                    />

                                    <Label htmlFor={`option-${option.uuid}`}>
                                        {option.label}
                                    </Label>
                                </div>

                                {option.automaticResult &&
                                    option.automaticResult !==
                                        ApplicationStatus.Accepted && (
                                        <p className="pl-6 text-sm text-muted-foreground">
                                            <b>Resultado automático:</b>{' '}
                                            {option.automaticResult}
                                        </p>
                                    )}

                                {option.automaticResult &&
                                    option.automaticResult !==
                                        ApplicationStatus.Accepted &&
                                    option.automaticResultObservations && (
                                        <p className="pl-6 text-sm text-muted-foreground">
                                            <b>Observaciones:</b>{' '}
                                            {option.automaticResultObservations}
                                        </p>
                                    )}
                            </div>
                        );
                    })}
                </RadioGroup>
            ) : (
                <p className="text-sm text-gray-500">No hay opciones</p>
            );
        case FormFieldType.Text:
        case FormFieldType.FirstName:
        case FormFieldType.LastName:
            return <Input disabled type="text" />;
        case FormFieldType.Textarea:
            return <Textarea rows={2} disabled />;
        case FormFieldType.College:
            return (
                <Button disabled variant="outline">
                    Selecciona un colegio <ChevronsUpDown className="ml-2" />
                </Button>
            );
        default:
            return null;
    }
};

export const SortableFieldEditorPreview = ({
    form,
    field,
    index,
    onEditClick,
    onRemoveClick,
    onAddFieldClick,
}: SortableElementProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: getFormFieldElementId(field),
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const dependsOnFieldIndex = form.fields.findIndex(
        (f) => f.uuid === field.dependsOnFieldUUID,
    );
    const dependsOnField = form.fields[dependsOnFieldIndex];

    const optionItDependsOn = useMemo(() => {
        if (dependsOnField) {
            return dependsOnField.options.find(
                (option) => option.uuid === field.dependsOnFieldOptionUUID,
            );
        }

        return null;
    }, [dependsOnField, field.dependsOnFieldOptionUUID]);

    return (
        <div>
            <div
                id={getFormFieldElementId(field)}
                ref={setNodeRef}
                style={style}
                {...attributes}
            >
                <div className="flex cursor-default space-x-4">
                    <button className="w-4 cursor-grab" {...listeners}>
                        <GripVertical />
                    </button>

                    <div className="relative min-w-0 flex-1">
                        <Card
                            className={cn(
                                field.isImportant && 'border-[3px] border-red-500',
                            )}
                            key={field.id}
                        >
                            <CardHeader className="flex flex-row items-center justify-between space-x-4 space-y-0 pb-1">
                                <CardTitle className="text-base font-medium">
                                    {index + 1}. {field.title}
                                    {field.isRequired && (
                                        <span className="text-red-500"> *</span>
                                    )}
                                </CardTitle>

                                <div className="flex space-x-2">
                                    <Button variant="outline" onClick={onEditClick}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="secondary">
                                                <XCircle className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Confirmar eliminación
                                                </DialogTitle>
                                                <DialogDescription className="space-y-2">
                                                    <p>
                                                        ¿Estás seguro que deseas eliminar
                                                        el campo &ldquo;
                                                        <strong>
                                                            <em>
                                                                #{index + 1}.{' '}
                                                                {field.title}
                                                            </em>
                                                        </strong>
                                                        &rdquo;?
                                                    </p>
                                                </DialogDescription>
                                            </DialogHeader>

                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="secondary">
                                                        Cancelar
                                                    </Button>
                                                </DialogClose>

                                                <Button
                                                    variant={'destructive'}
                                                    onClick={onRemoveClick}
                                                >
                                                    Eliminar
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <CardDescription className="mb-4">
                                    {field.description}
                                </CardDescription>

                                <FieldContent
                                    field={field}
                                    fieldOptions={field.options}
                                />
                            </CardContent>

                            <CardFooter className="block w-full space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <p>
                                        <strong>Depende de:</strong>{' '}
                                        {dependsOnField ? (
                                            <a
                                                className="text-blue-500 hover:underline"
                                                href={`#field-${dependsOnField?.id}`}
                                                onClick={(e) => {
                                                    e.preventDefault();

                                                    const el = document.getElementById(
                                                        getFormFieldElementId(
                                                            dependsOnField,
                                                        ),
                                                    );

                                                    if (el) {
                                                        el.scrollIntoView({
                                                            behavior: 'smooth',
                                                        });
                                                    }
                                                }}
                                            >
                                                {dependsOnFieldIndex + 1}.{' '}
                                                {dependsOnField?.title}
                                            </a>
                                        ) : (
                                            '-'
                                        )}
                                    </p>

                                    <p>
                                        <strong>Opción:</strong>{' '}
                                        {optionItDependsOn?.label || '-'}
                                    </p>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center bg-white py-5">
                <span className="flex-1 border-b border-gray-200 "></span>

                <button
                    onClick={onAddFieldClick}
                    className="flex items-center space-x-2 px-8 py-3 opacity-30 hover:opacity-100"
                >
                    <PlusCircle className="h-6 w-6" />
                    <span>Agregar campo</span>
                </button>

                <span className="flex-1 border-b border-gray-200 "></span>
            </div>
        </div>
    );
};
