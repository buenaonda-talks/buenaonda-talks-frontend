import { ConvocatoryByIdFormQuery } from '@/api/graphql';
import { FormBuilderEnhancedFormFieldType, FormBuilderFormValues } from '.';

type QueryFormType = NonNullable<
    NonNullable<ConvocatoryByIdFormQuery['convocatoryById']>['form']
>;

export const convocatoryFormToBuilderForm = ({
    fields,
    ...form
}: QueryFormType): FormBuilderFormValues => {
    const fieldsWithUUID = fields
        .sort((a, b) => a.order - b.order)
        .map((field) => ({
            ...field,
            uuid: crypto.randomUUID(),
            options: field.options
                .map((option) => ({
                    ...option,
                    uuid: crypto.randomUUID(),
                }))
                .sort((a, b) => a.order - b.order),
        }));

    const idToUUIDMap = new Map<string, string>(
        fieldsWithUUID.map((x) => [x.id, x.uuid]),
    );

    const optionIdToUUIDMap = new Map<string, string>();
    fieldsWithUUID.forEach((field) => {
        field.options.forEach((option) => {
            optionIdToUUIDMap.set(option.id, option.uuid);
        });
    });

    const convertedFields: FormBuilderEnhancedFormFieldType[] = fieldsWithUUID.map(
        (field) => {
            const next: FormBuilderEnhancedFormFieldType = {
                id: parseInt(field.id, 10),
                description: field.description,
                isRequired: field.isRequired,
                maxLength: field.maxLength,
                minLength: field.minLength,
                isImportant: field.isImportant,
                options: field.options.map((option) => ({
                    id: parseInt(option.id, 10),
                    label: option.label,
                    uuid: option.uuid,
                    order: option.order,
                    automaticResult: option.automaticResult,
                    automaticResultObservations: option.automaticResultObservations,
                })),
                title: field.title,
                order: field.order,
                type: field.type,
                uuid: field.uuid,
                dependsOnFieldUUID: field.dependsOnFieldId
                    ? idToUUIDMap.get(field.dependsOnFieldId) || null
                    : null,
                dependsOnFieldOptionUUID: field.dependsOnFieldOptionId
                    ? optionIdToUUIDMap.get(field.dependsOnFieldOptionId) || null
                    : null,
            };

            return next;
        },
    );

    return {
        fields: convertedFields,
        closeDatetime: form.closeDate ? new Date(form.closeDate) : null,
        openDatetime: form.openDate ? new Date(form.openDate) : null,
        title: form.title,
        termsAcceptanceCloseDatetime: form.termsAcceptanceCloseDate
            ? new Date(form.termsAcceptanceCloseDate)
            : null,
        termsAcceptanceOpenDatetime: form.termsAcceptanceOpenDate
            ? new Date(form.termsAcceptanceOpenDate)
            : null,
        fieldsIDsToDelete: [],
    };
};
