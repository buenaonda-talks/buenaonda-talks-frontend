import { DateTimePicker } from '@/components/date-time-picker/date-time-picker';
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
import { Textarea } from '@/components/ui/textarea';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useCreateTalkMutation, useUpdateTalkMutation } from './mutations';
import { TalkType } from '@/api/graphql';
import { ButtonWithSpinner } from '@/components/button-with-spinner';
import { useToast } from '@/components/ui/use-toast';
import { datetimeToInputValue } from '@/lib/utils';

type Props = {
    convocatoryId: number;
    talkId: number | null;
    talk: TalkBuilderFormValues;
};

export type TalkBuilderFormValues = {
    description: string;
    speakers: string;
    zoomId: string | null;
    zoomRegisterUrl: string | null;
    startDatetime: Date | null;
    endDatetime: Date | null;
};

export const TalkBuilder = ({ talk, talkId, convocatoryId }: Props) => {
    const formMethods = useForm<TalkBuilderFormValues>({
        defaultValues: talk,
    });

    const talkStartDate = formMethods.watch('startDatetime');
    const talkEndDate = formMethods.watch('endDatetime');

    const updateMutation = useUpdateTalkMutation();
    const createMutation = useCreateTalkMutation();
    const { toast } = useToast();

    const onUpdateTalk = async (data: TalkBuilderFormValues, talkId: number) => {
        const {
            description,
            speakers,
            zoomId,
            startDatetime,
            endDatetime,
            zoomRegisterUrl,
        } = data;

        if (!description || !speakers || !zoomId || !startDatetime || !endDatetime) {
            return;
        }

        updateMutation.mutate(
            {
                id: talkId,
                input: {
                    internalLabel: 'Charla',
                    convocatoryId: convocatoryId,
                    description,
                    speakers,
                    zoomId,
                    startDateTime: datetimeToInputValue(startDatetime),
                    endDateTime: datetimeToInputValue(endDatetime),
                    isVisible: true,
                    type: TalkType.FirstPlatzi,
                    forOrganizationId: null,
                    zoomApiKey: null,
                    zoomApiSecret: null,
                    zoomRegisterUrl: zoomRegisterUrl,
                },
            },
            {
                onSuccess: () => {
                    toast({
                        variant: 'success',
                        title: 'Charla actualizada',
                        description: 'La charla ha sido actualizada correctamente',
                    });
                },
                onError: () => {
                    toast({
                        variant: 'destructive',
                        title: 'Error al actualizar la charla',
                        description: 'Ocurrió un error al actualizar la charla',
                    });
                },
            },
        );
    };

    const onCreateTalk = async (data: TalkBuilderFormValues) => {
        const {
            description,
            speakers,
            zoomId,
            startDatetime,
            endDatetime,
            zoomRegisterUrl,
        } = data;

        if (!description || !speakers || !zoomId || !startDatetime || !endDatetime) {
            return;
        }

        createMutation.mutate(
            {
                input: {
                    internalLabel: 'Charla',
                    convocatoryId,
                    description,
                    speakers,
                    zoomId,
                    startDateTime: datetimeToInputValue(startDatetime),
                    endDateTime: datetimeToInputValue(endDatetime),
                    isVisible: true,
                    type: TalkType.FirstPlatzi,
                    forOrganizationId: null,
                    zoomApiKey: null,
                    zoomApiSecret: null,
                    zoomRegisterUrl: zoomRegisterUrl,
                },
            },
            {
                onSuccess: () => {
                    toast({
                        variant: 'success',
                        title: 'Charla creada',
                        description: 'La charla ha sido creada correctamente',
                    });
                },
                onError: () => {
                    toast({
                        variant: 'destructive',
                        title: 'Error al crear la charla',
                        description: 'Ocurrió un error al crear la charla',
                    });
                },
            },
        );
    };

    const onSaveTalk = (data: TalkBuilderFormValues) => {
        if (talkId) {
            onUpdateTalk(data, talkId);
        } else {
            onCreateTalk(data);
        }
    };

    return (
        <div>
            <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-2">
                <h3 className="text-xl font-bold">Charla</h3>

                <ButtonWithSpinner
                    showSpinner={updateMutation.isPending || createMutation.isPending}
                    onClick={formMethods.handleSubmit(onSaveTalk)}
                >
                    Guardar charla
                </ButtonWithSpinner>
            </div>

            <Form {...formMethods}>
                <form className="space-y-4">
                    <FormField
                        name="description"
                        control={formMethods.control}
                        rules={{ required: 'Este campo es requerido' }}
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel required>Descripción</FormLabel>

                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        name="speakers"
                        control={formMethods.control}
                        rules={{ required: 'Este campo es requerido' }}
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel required>Speakers</FormLabel>

                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        name="zoomId"
                        control={formMethods.control}
                        rules={{
                            validate: (value) => {
                                if (!value) {
                                    return true;
                                }

                                if (value.length < 9 || value.length > 12) {
                                    return 'El ID de Zoom debe tener entre 9 y 12 dígitos';
                                }

                                const isOnlyDigits = /^\d+$/.test(value);
                                if (!isOnlyDigits) {
                                    return 'El ID de Zoom debe contener solo dígitos';
                                }

                                return true;
                            },
                        }}
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Zoom ID</FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(e) => {
                                                const onlyDigits = e.target.value.replace(
                                                    /\D/g,
                                                    '',
                                                );

                                                field.onChange(onlyDigits);
                                            }}
                                            value={field.value || ''}
                                            minLength={9}
                                            maxLength={12}
                                        />
                                    </FormControl>

                                    <FormDescription>
                                        Este es el ID de la charla en Zoom. Sirve para
                                        activar el ingreso mediante el sitio web.
                                    </FormDescription>

                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        name="zoomRegisterUrl"
                        control={formMethods.control}
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>URL de registro de Zoom</FormLabel>

                                    <FormControl>
                                        <Input {...field} value={field.value || ''} />
                                    </FormControl>

                                    <FormDescription>
                                        Este enlace lo pasamos cuando un alumno tiene
                                        problemas para ingresar a la charla mediante el
                                        sitio web.
                                    </FormDescription>

                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        name="startDatetime"
                        control={formMethods.control}
                        rules={{
                            validate: (value) => {
                                if (!value) {
                                    return 'Este campo es requerido';
                                }

                                if (talkEndDate && new Date(value) > talkEndDate) {
                                    return 'La fecha de inicio debe ser menor a la fecha de fin';
                                }

                                return true;
                            },
                        }}
                        render={({ field }) => {
                            return (
                                <FormItem className="flex flex-col">
                                    <FormLabel required>Fecha de inicio</FormLabel>

                                    <FormControl>
                                        <DateTimePicker
                                            onChange={field.onChange}
                                            value={field.value}
                                            fromDate={dayjs().subtract(1, 'day').toDate()}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        name="endDatetime"
                        control={formMethods.control}
                        rules={{
                            validate: (value) => {
                                if (!value) {
                                    return 'Este campo es requerido';
                                }

                                if (talkStartDate && new Date(value) < talkStartDate) {
                                    return 'La fecha de fin debe ser mayor a la fecha de inicio';
                                }

                                return true;
                            },
                        }}
                        render={({ field }) => {
                            const startDatetime = formMethods.watch('startDatetime');
                            const minDatetime = startDatetime || dayjs().toDate();

                            return (
                                <FormItem className="flex flex-col">
                                    <FormLabel required>Fecha de fin</FormLabel>

                                    <FormControl>
                                        <DateTimePicker
                                            onChange={field.onChange}
                                            value={field.value}
                                            fromDate={minDatetime}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                </form>
            </Form>
        </div>
    );
};
