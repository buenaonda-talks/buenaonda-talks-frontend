'use client';

import { fetchClient } from '@/api/fetch-client';
import {
    AdminApplicationByIdQuery,
    ApplicationStatus,
    FormFieldType,
    UpdateScholarshipApplicationStatusDocument,
    UpdateScholarshipApplicationStatusMutationVariables,
} from '@/api/graphql';
import { fetchUserServer } from '@/api/query/fetch-user-server';
import { ButtonWithSpinner } from '@/components/button-with-spinner';
import { Button } from '@/components/ui/button';
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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import routesBuilder from '@/lib/routes';
import { cn } from '@/lib/utils';
import { ADMIN_APPLICATIONS_TABLE_KEY } from '@/screens/dashboard-admins/applications/query';
import { UserButton, useAuth, useUser } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

const fieldShouldBeVisible = (
    field: FillableFormProps['application']['form']['fields'][0],
    answers: Record<string, string>,
) => {
    if (field.dependsOnFieldId && field.dependsOnFieldOptionId) {
        if (!answers) {
            return false;
        }

        const dependsOnField = answers[field.dependsOnFieldId];
        if (dependsOnField !== field.dependsOnFieldOptionId.toString()) {
            return false;
        }
    }

    return true;
};

type FillableFormProps = {
    id: number;
    application: NonNullable<AdminApplicationByIdQuery['applicationById']>;
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
                        href={routesBuilder.applications}
                    >
                        Volver a postulaciones
                    </Link>

                    <UserButton />
                </div>
            </div>
        </header>
    );
};

const FillableForm = async ({ application, id }: FillableFormProps) => {
    const user = await fetchUserServer();
    const form = application.form;
    const answers = useMemo(() => {
        return application.answers.reduce(
            (acc, answer) => {
                if (answer.value) {
                    acc[answer.fieldId] = answer.value;
                }

                return acc;
            },
            {} as Record<string, string>,
        );
    }, [application.answers]);

    const { getToken } = useAuth();
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: UpdateScholarshipApplicationStatusMutationVariables) => {
            return fetchClient(UpdateScholarshipApplicationStatusDocument, data, {
                getToken,
            });
        },
    });

    const { toast } = useToast();

    const client = useQueryClient();
    const handleUpdateStatus = async (
        status: ApplicationStatus,
        observations: string,
        sendEmail: boolean,
    ) => {
        toast({
            title: 'Actualizando estado',
            description: 'Por favor espera un momento',
        });

        mutate(
            {
                applicationId: id,
                status,
                observations,
                sendEmail,
            },
            {
                onSuccess: () => {
                    toast({
                        variant: 'success',
                        title: 'Estado actualizado',
                        description: `La postulación ahora tiene el estado ${status}`,
                    });

                    client.removeQueries({
                        predicate: (key) => {
                            return key.queryKey.includes(ADMIN_APPLICATIONS_TABLE_KEY);
                        },
                    });
                },
                onError: (error) => {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: error.message,
                    });
                },
            },
        );
    };

    const formMethods = useForm<{
        status: ApplicationStatus;
        observations: string;
    }>({
        defaultValues: {
            status: application.currentStatus?.status || ApplicationStatus.Submitted,
            observations: application.currentStatus?.observations || '',
        },
    });

    return (
        <>
            <Header />

            <main className="pb-24 pt-8">
                <div className="container">
                    <h1 className="mb-4 text-3xl font-bold">{form.title}</h1>

                    <form
                        className="space-y-12"
                        onSubmit={() => {
                            return;
                        }}
                    >
                        {form.fields.map((formField, index) => {
                            if (!fieldShouldBeVisible(formField, answers)) {
                                return null;
                            }

                            const dependsOn = form.fields.find(
                                (someField) =>
                                    someField.id === formField.dependsOnFieldId,
                            );
                            if (dependsOn && !fieldShouldBeVisible(dependsOn, answers)) {
                                return null;
                            }

                            const answerValue = answers[formField.id];
                            if (!answerValue) {
                                return null;
                            }

                            const selectedOption =
                                formField.type === FormFieldType.RadioBox
                                    ? formField.options.find(
                                          (option) =>
                                              option.id.toString() === answerValue,
                                      )
                                    : null;

                            return (
                                <div
                                    className={cn(
                                        'space-y-2',
                                        formField.isImportant ||
                                            selectedOption?.automaticResult
                                            ? 'border border-red-500 p-4 rounded-lg'
                                            : '',
                                    )}
                                    key={formField.id}
                                >
                                    {(formField.isImportant ||
                                        selectedOption?.automaticResult) && (
                                        <div className="pb-2">
                                            <div className="mb-4 flex items-center space-x-2 border-b border-gray-200 pb-4 text-sm">
                                                <p className="font-bold text-red-500">
                                                    Importante
                                                </p>

                                                <p className="text-muted-foreground">
                                                    Este campo es importante para la
                                                    postulación
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <Label
                                        className="mb-0"
                                        required={formField.isRequired}
                                    >
                                        {index + 1}. {formField.title}
                                    </Label>

                                    {formField.description && (
                                        <p className="!mt-0.5 pb-2 text-sm text-muted-foreground">
                                            {formField.description}
                                        </p>
                                    )}

                                    {[
                                        FormFieldType.FirstName,
                                        FormFieldType.LastName,
                                        FormFieldType.Text,
                                    ].includes(formField.type) && (
                                        <Input disabled value={answerValue} />
                                    )}

                                    {formField.type === FormFieldType.RadioBox && (
                                        <RadioGroup
                                            disabled
                                            value={answerValue}
                                            className="flex flex-col space-y-1"
                                        >
                                            {formField.options.map((option) => {
                                                return (
                                                    <div
                                                        className="space-y-2"
                                                        key={option.id}
                                                    >
                                                        <div className="flex items-center space-x-3 space-y-0">
                                                            <RadioGroupItem
                                                                value={option.id.toString()}
                                                            />

                                                            <Label className="text-sm font-normal text-muted-foreground">
                                                                {option.label}
                                                            </Label>

                                                            {option.automaticResult && (
                                                                <p className="text-sm text-muted-foreground">
                                                                    - Resultado
                                                                    automático:{' '}
                                                                    {
                                                                        option.automaticResult
                                                                    }
                                                                </p>
                                                            )}

                                                            {option.automaticResultObservations && (
                                                                <p className="text-sm text-muted-foreground">
                                                                    - Observaciones:{' '}
                                                                    {
                                                                        option.automaticResultObservations
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </RadioGroup>
                                    )}

                                    {formField.type === FormFieldType.Textarea && (
                                        <Textarea disabled value={answerValue} />
                                    )}

                                    {selectedOption?.automaticResult && (
                                        <div className="pt-4">
                                            <div className="flex items-center space-x-2 border-t border-gray-200 pt-4">
                                                <p className="text-sm font-bold text-red-500">
                                                    Resultado automático
                                                </p>

                                                <p className="text-sm text-muted-foreground">
                                                    {selectedOption.automaticResult}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </form>
                </div>
            </main>

            {user?.user.isAdmin && (
                <div className="fixed inset-x-0 bottom-0 border-t border-gray-100 bg-muted py-4 text-muted-foreground">
                    <div className="container flex items-center justify-center space-x-2">
                        <p className="text-sm">
                            Está postulación pertenece a{' '}
                            <strong>
                                {application.user.firstName} {application.user.lastName}
                            </strong>{' '}
                            ({application.user.email}) y tiene el estado{' '}
                            <strong>{application.currentStatus?.status}</strong>
                        </p>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant={'link'}>Cambiar estado</Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Cambiar estado de la postulación
                                    </DialogTitle>

                                    <DialogDescription>
                                        Selecciona un estado para la postulación
                                    </DialogDescription>
                                </DialogHeader>

                                <form className="space-y-2">
                                    <Form {...formMethods}>
                                        <FormField
                                            name="status"
                                            control={formMethods.control}
                                            rules={{
                                                required: 'Este campo es requerido',
                                            }}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Estado</FormLabel>

                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="w-40">
                                                                <SelectValue placeholder="Selecciona un estado" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem
                                                                value={
                                                                    ApplicationStatus.Accepted
                                                                }
                                                            >
                                                                Aceptada
                                                            </SelectItem>
                                                            <SelectItem
                                                                value={
                                                                    ApplicationStatus.AcceptedTerms
                                                                }
                                                            >
                                                                Aceptó términos
                                                            </SelectItem>
                                                            <SelectItem
                                                                value={
                                                                    ApplicationStatus.Declined
                                                                }
                                                            >
                                                                Rechazada
                                                            </SelectItem>
                                                            <SelectItem
                                                                value={
                                                                    ApplicationStatus.DeclinedTerms
                                                                }
                                                            >
                                                                Rechazó términos
                                                            </SelectItem>
                                                            <SelectItem
                                                                value={
                                                                    ApplicationStatus.Pending
                                                                }
                                                            >
                                                                Pendiente
                                                            </SelectItem>
                                                            <SelectItem
                                                                value={
                                                                    ApplicationStatus.Submitted
                                                                }
                                                            >
                                                                Nueva
                                                            </SelectItem>
                                                            <SelectItem
                                                                value={
                                                                    ApplicationStatus.TermsUnanswered
                                                                }
                                                            >
                                                                Términos sin responder
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            name="observations"
                                            control={formMethods.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Observaciones</FormLabel>

                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            placeholder="Escribe observaciones"
                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Form>
                                </form>

                                <DialogFooter className="w-full">
                                    <div className="flex w-full justify-between space-x-2">
                                        <DialogClose asChild>
                                            <Button variant="secondary">Cancelar</Button>
                                        </DialogClose>

                                        <div className="flex space-x-2">
                                            {[
                                                ApplicationStatus.Accepted,
                                                ApplicationStatus.Declined,
                                                ApplicationStatus.Pending,
                                                ApplicationStatus.Submitted,
                                            ].includes(formMethods.watch('status')) && (
                                                <ButtonWithSpinner
                                                    showSpinner={isPending}
                                                    onClick={formMethods.handleSubmit(
                                                        (data) => {
                                                            handleUpdateStatus(
                                                                data.status,
                                                                data.observations || '',
                                                                true,
                                                            );
                                                        },
                                                    )}
                                                    variant="outline"
                                                >
                                                    Guardar y enviar email
                                                </ButtonWithSpinner>
                                            )}

                                            <ButtonWithSpinner
                                                showSpinner={isPending}
                                                onClick={formMethods.handleSubmit(
                                                    (data) => {
                                                        handleUpdateStatus(
                                                            data.status,
                                                            data.observations || '',
                                                            false,
                                                        );
                                                    },
                                                )}
                                            >
                                                Guardar
                                            </ButtonWithSpinner>
                                        </div>
                                    </div>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            )}
        </>
    );
};

type Props = {
    data: AdminApplicationByIdQuery;
    id: number;
};

export const ApplicationByIdPage = ({ data, id }: Props) => {
    const { toast } = useToast();
    const router = useRouter();
    const { user } = useUser();

    useEffect(() => {
        if (!user) {
            return;
        }

        if (!data.applicationById) {
            toast({
                variant: 'destructive',
                title: 'Postulación no encontrada',
                description: 'La postulación que estás buscando no existe',
            });

            router.push(routesBuilder.applications);
        }
    }, [data.applicationById, router, toast, user]);

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

    if (!data.applicationById) {
        return (
            <>
                <Header />

                <main className="pb-24 pt-8">
                    <div className="container">
                        <h1 className="text-3xl font-bold">Postulación no encontrada</h1>
                        <p className="text-muted-foreground">
                            La postulación que estás buscando no existe
                        </p>
                    </div>
                </main>
            </>
        );
    }

    return <FillableForm application={data.applicationById} id={id} />;
};
