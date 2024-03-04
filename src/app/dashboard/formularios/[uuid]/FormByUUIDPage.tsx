'use client';

import { fetchClient } from '@/api/fetch-client';
import {
    ApplyToScholarshipDocument,
    ApplyToScholarshipMutationVariables,
    FormByUuidQuery,
    FormFieldType,
} from '@/api/graphql';
import { fetchUserServer } from '@/api/query/fetch-user-server';
import { ButtonWithSpinner } from '@/components/button-with-spinner';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import routesBuilder from '@/lib/routes';
import { UserButton, useAuth } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const fieldShouldBeVisible = (
    field: FillableFormProps['form']['fields'][0],
    watchedFields: FormValues['fields'],
) => {
    if (field.dependsOnFieldId && field.dependsOnFieldOptionId) {
        if (!watchedFields) {
            return false;
        }

        const dependsOnField = watchedFields[field.dependsOnFieldId];
        if (dependsOnField !== field.dependsOnFieldOptionId.toString()) {
            return false;
        }
    }

    return true;
};

type FormValues = {
    fields?: Record<string, string>;
};

type AnswerItem = ApplyToScholarshipMutationVariables['answers'][0];

const useApplyToScholarship = () => {
    const _client = useQueryClient();
    const { getToken } = useAuth();

    return useMutation({
        mutationFn: async (data: ApplyToScholarshipMutationVariables) => {
            return await fetchClient(ApplyToScholarshipDocument, data, {
                getToken,
            });
        },
    });
};

type FillableFormProps = {
    uuid: string;
    form: NonNullable<FormByUuidQuery['formByUUID']>;
};

const APPLICATION_LOCAL_STORAGE_KEY = 'botalks-application';

const saveApplicationOnLocalStorage = (values: FormValues) => {
    localStorage.setItem(APPLICATION_LOCAL_STORAGE_KEY, JSON.stringify(values));
};

const getApplicationFromLocalStorage = (): FormValues | null => {
    const data = localStorage.getItem(APPLICATION_LOCAL_STORAGE_KEY);
    if (!data) {
        return null;
    }

    let parsed = null;
    try {
        parsed = JSON.parse(data);
    } catch (error) {
        console.error(error);
    }

    return parsed;
};

const Header = () => {
    return (
        <header className="border-b border-gray-200 py-4">
            <div className="container flex items-center justify-between">
                <Link
                    href={routesBuilder.dashboard}
                    className="font-bold uppercase tracking-widest"
                >
                    BuenaOnda Talks
                </Link>

                <div className="flex items-center space-x-6">
                    <Link
                        className="text-sm hover:opacity-60"
                        href={routesBuilder.dashboard}
                    >
                        Volver al dashboard
                    </Link>

                    <UserButton />
                </div>
            </div>
        </header>
    );
};

const FillableForm = async ({ form, uuid }: FillableFormProps) => {
    const user = await fetchUserServer();
    const formMethods = useForm<FormValues>({
        defaultValues: {
            fields: {},
        },
    });
    const { watch, reset } = formMethods;
    const fieldsWatch = watch('fields');
    const applyToScholarshipMutation = useApplyToScholarship();

    const { toast } = useToast();

    const onSubmit = (values: FormValues) => {
        if (!user) {
            return;
        }

        if (user.user.isAdmin) {
            toast({
                title: 'No puedes aplicar como administrador',
                description: 'Para aplicar a una beca, utiliza una cuenta de estudiante.',
            });
            return;
        }

        const answers = form.fields
            .map<AnswerItem | null>((field) => {
                const value = values.fields?.[field.id];
                if (!value || !fieldShouldBeVisible(field, fieldsWatch)) {
                    return null;
                }

                const next: AnswerItem = {
                    id: parseInt(field.id, 10),
                    value,
                };

                return next;
            })
            .filter((x) => x !== null) as AnswerItem[];

        applyToScholarshipMutation.mutate(
            {
                uuid,
                answers,
            },
            {
                onSuccess: (data) => {
                    if (data.applyToScholarship.__typename === 'ApiError') {
                        toast({
                            variant: 'destructive',
                            title: 'Error al enviar el formulario',
                            description: data.applyToScholarship.message,
                        });
                        return;
                    }

                    if (data.applyToScholarship.__typename === 'Application') {
                        toast({
                            variant: 'success',
                            title: 'Formulario enviado',
                            description: 'Tu formulario ha sido enviado correctamente',
                        });
                        return;
                    }

                    toast({
                        variant: 'destructive',
                        title: 'Error al enviar el formulario',
                        description:
                            'Ocurrió un error al enviar el formulario. Por favor, intenta nuevamente.',
                    });
                },
                onError: () => {
                    toast({
                        variant: 'destructive',
                        title: 'Error al enviar el formulario',
                        description:
                            'Ocurrió un error al enviar el formulario. Por favor, intenta nuevamente.',
                    });
                },
            },
        );
    };

    useEffect(() => {
        const subscription = watch((values, { type }) => {
            console.log(values);
            if (type === 'change') {
                saveApplicationOnLocalStorage(values);
            }
        });

        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        const data = getApplicationFromLocalStorage();
        if (data) {
            reset(data);
        }
    }, [reset]);

    return (
        <>
            <Header />

            <main className="pb-24 pt-8">
                <div className="container">
                    <h1 className="mb-4 text-3xl font-bold">{form.title}</h1>

                    <Form {...formMethods}>
                        <form
                            className="space-y-12"
                            onSubmit={formMethods.handleSubmit(onSubmit)}
                        >
                            {form.fields.map((formField, index) => {
                                if (!fieldShouldBeVisible(formField, fieldsWatch)) {
                                    return null;
                                }

                                const dependsOn = form.fields.find(
                                    (someField) =>
                                        someField.id === formField.dependsOnFieldId,
                                );
                                if (
                                    dependsOn &&
                                    !fieldShouldBeVisible(dependsOn, fieldsWatch)
                                ) {
                                    return null;
                                }

                                return (
                                    <FormField
                                        key={formField.id}
                                        control={formMethods.control}
                                        name={`fields.${formField.id}`}
                                        rules={{
                                            validate: (value) => {
                                                if (formField.isRequired && !value) {
                                                    return 'Este campo es requerido';
                                                }

                                                if (
                                                    formField.maxLength &&
                                                    value.length > formField.maxLength
                                                ) {
                                                    const extraChars =
                                                        value.length -
                                                        formField.maxLength;

                                                    if (extraChars === 1) {
                                                        return `El campo no puede tener más de ${formField.maxLength} caracteres. Te sobra 1 caracter.`;
                                                    }

                                                    return `El campo no puede tener más de ${formField.maxLength} caracteres. Te sobran ${extraChars} caracteres.`;
                                                }

                                                if (
                                                    formField.minLength &&
                                                    value.length < formField.minLength
                                                ) {
                                                    const missingChars =
                                                        formField.minLength -
                                                        value.length;

                                                    if (missingChars === 1) {
                                                        return `El campo no puede tener menos de ${formField.minLength} caracteres. Te falta 1 caracter.`;
                                                    }

                                                    return `El campo no puede tener menos de ${formField.minLength} caracteres. Te faltan ${missingChars} caracteres.`;
                                                }
                                            },
                                        }}
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel
                                                        className="mb-0"
                                                        required={formField.isRequired}
                                                    >
                                                        {index + 1}. {formField.title}
                                                    </FormLabel>

                                                    {formField.description && (
                                                        <FormDescription className="!mt-0.5 pb-2">
                                                            {formField.description}
                                                        </FormDescription>
                                                    )}

                                                    {[
                                                        FormFieldType.FirstName,
                                                        FormFieldType.LastName,
                                                        FormFieldType.Text,
                                                    ].includes(formField.type) && (
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                value={field.value || ''}
                                                            />
                                                        </FormControl>
                                                    )}

                                                    {formField.type ===
                                                        FormFieldType.RadioBox && (
                                                        <FormControl>
                                                            <RadioGroup
                                                                onValueChange={
                                                                    field.onChange
                                                                }
                                                                value={field.value}
                                                                className="flex flex-col space-y-1"
                                                            >
                                                                {formField.options.map(
                                                                    (option) => {
                                                                        return (
                                                                            <FormItem
                                                                                key={
                                                                                    option.id
                                                                                }
                                                                                className="flex items-center space-x-3 space-y-0"
                                                                            >
                                                                                <FormControl>
                                                                                    <RadioGroupItem
                                                                                        value={option.id.toString()}
                                                                                    />
                                                                                </FormControl>
                                                                                <FormLabel className="font-normal">
                                                                                    {
                                                                                        option.label
                                                                                    }
                                                                                </FormLabel>
                                                                            </FormItem>
                                                                        );
                                                                    },
                                                                )}
                                                            </RadioGroup>
                                                        </FormControl>
                                                    )}

                                                    {formField.type ===
                                                        FormFieldType.Textarea && (
                                                        <FormControl>
                                                            <Textarea {...field} />
                                                        </FormControl>
                                                    )}

                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                );
                            })}

                            <div className="flex justify-end">
                                <ButtonWithSpinner
                                    showSpinner={applyToScholarshipMutation.isPending}
                                    size="lg"
                                    type="submit"
                                >
                                    Enviar
                                </ButtonWithSpinner>
                            </div>
                        </form>
                    </Form>
                </div>
            </main>

            {user?.user?.isAdmin && (
                <div className="fixed inset-x-0 bottom-0 border-t border-gray-100 bg-muted py-4 text-muted-foreground">
                    <div className="container text-center text-sm">
                        <p>
                            Estás viendo esta página como administrador. Si quieres
                            aplicar a la beca, utiliza una cuenta de estudiante.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

type Props = {
    uuid: string;
    data: FormByUuidQuery;
};

export const FormByUUIDPage = async ({ uuid, data }: Props) => {
    const { toast } = useToast();
    const router = useRouter();
    const user = await fetchUserServer();

    useEffect(() => {
        if (!user) {
            return;
        }

        if (!data.formByUUID) {
            toast({
                variant: 'destructive',
                title: 'Formulario no encontrado',
                description: 'El formulario que estás buscando no existe',
            });

            router.push(routesBuilder.dashboard);
        }

        if (data.formByUUID?.myApplication) {
            if (user.user.isAdmin) {
                return;
            }

            toast({
                variant: 'destructive',
                title: 'Ya has aplicado a esta beca',
                description: 'No puedes aplicar a una beca más de una vez',
            });

            router.push(routesBuilder.dashboard);
        }
    }, [data.formByUUID, router, toast, user]);

    if (!user) {
        return (
            <>
                <Header />

                <main className="pb-24 pt-8">
                    <div className="container">
                        <Skeleton className="mb-4 h-8 w-80" />

                        <Skeleton className="h-4 w-64" />
                    </div>
                </main>
            </>
        );
    }

    if (!data.formByUUID) {
        return (
            <>
                <Header />

                <main className="pb-24 pt-8">
                    <div className="container">
                        <h1 className="text-3xl font-bold">Formulario no encontrado</h1>
                        <p className="text-muted-foreground">
                            El formulario que estás buscando no existe
                        </p>
                    </div>
                </main>
            </>
        );
    }

    if (data.formByUUID.myApplication && !user.user.isAdmin) {
        return (
            <>
                <Header />

                <main className="pb-24 pt-8">
                    <div className="container">
                        <h1 className="text-3xl font-bold">
                            Ya has aplicado a esta beca
                        </h1>
                        <p className="text-muted-foreground">
                            No puedes aplicar a una beca más de una vez
                        </p>
                    </div>
                </main>
            </>
        );
    }

    return <FillableForm form={data.formByUUID} uuid={uuid} />;
};
