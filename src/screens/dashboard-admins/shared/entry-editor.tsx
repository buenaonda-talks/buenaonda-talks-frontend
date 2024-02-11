import { ButtonWithSpinner } from '@/components/button-with-spinner';
import { TypographyAdminH1 } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type AdminEntryEditorHeaderProps = {
    title: string;
    cancelHref: string;
    onSave: () => void;
    isSaving: boolean;
};

export const AdminEntryEditorHeader = ({
    title,
    cancelHref,
    onSave,
    isSaving,
}: AdminEntryEditorHeaderProps) => {
    return (
        <div className="flex items-center justify-between border-b px-6 py-3">
            <TypographyAdminH1>{title}</TypographyAdminH1>

            <div className="flex space-x-4">
                <Button asChild variant="secondary">
                    <Link href={cancelHref}>Cancelar</Link>
                </Button>

                <ButtonWithSpinner showSpinner={isSaving} onClick={onSave}>
                    Guardar cambios
                </ButtonWithSpinner>
            </div>
        </div>
    );
};

type AdminEntryEditorFormProps<T extends FieldValues> = PropsWithChildren<{
    form: UseFormReturn<T>;
    onSubmit?: () => void;
}>;

export const AdminEntryEditorForm = <T extends FieldValues>({
    form,
    children,
    onSubmit,
}: AdminEntryEditorFormProps<T>) => {
    return (
        <div className="p-6">
            <form className="space-y-4" onSubmit={onSubmit}>
                <Form {...form}>{children}</Form>
            </form>
        </div>
    );
};
