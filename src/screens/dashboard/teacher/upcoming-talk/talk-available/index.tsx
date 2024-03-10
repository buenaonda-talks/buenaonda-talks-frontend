'use client';

import { getCleanErrorMessage } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { ButtonWithSpinner } from '@/components/button-with-spinner';
import { useCountdown } from '@/hooks/useCountdown';
import { getDayName, getHHMM12FormatText, getMonthName } from '@/lib/date-fns';
import { getDate } from 'date-fns';
import { TrackerCurrentStepQuery } from '@/api/graphql';
import { DeprecatedCountdownTimer } from '@/components/deprecated-countdown-timer';
import { TrackerStep1TalkAvailableTicketInscription } from './TicketInscription';
import { useAssistToTalk } from '@/screens/mutation';
import { DashboardContentSafeSpace } from '@/screens/dashboard/shared/dashboard-content-safe-space';

type Props = {
    talk: NonNullable<TrackerCurrentStepQuery['trackerCurrentStep']['platziTalk']>;
};

export const TeacherTalkAvailable: React.FC<Props> = ({ talk }) => {
    const inscription = talk.myInscription;

    const startDate = new Date(talk.startDate);
    const countdownTillStart = useCountdown({ targetDate: startDate });

    const { toast } = useToast();

    const { mutate: assist, isPending: trackingAssistance } = useAssistToTalk({
        onSuccess: (data) => {
            if (data.assistToTalk.__typename === 'ApiError') {
                toast({
                    variant: 'destructive',
                    description: data.assistToTalk.message,
                });
            }

            if (data.assistToTalk.__typename === 'AssistToTalkLink') {
                const win = window.open(data.assistToTalk.url, '_blank');

                if (!win) {
                    toast({
                        variant: 'destructive',
                        description: 'No se pudo abrir la charla',
                    });
                } else {
                    win.focus();
                }
            }
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                description: getCleanErrorMessage(error),
            });
        },
    });

    const handleAssistClick = () => {
        if (trackingAssistance) return;

        assist({
            talkUuid: talk.uuid,
        });
    };

    return (
        <DashboardContentSafeSpace>
            <div className="space-y-6">
                <div>
                    <h1 className="mb-1 text-center text-3xl font-bold">Nueva charla</h1>

                    <div className="text-center text-muted-foreground">
                        <p>
                            Acompaña a los alumnos en una charla informativa sobre cómo
                            obtener una beca. Este es el primer paso que deben seguir.
                        </p>

                        <p>Confirma tu asistencia para obtener el link al evento.</p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <TrackerStep1TalkAvailableTicketInscription
                        inscription={inscription}
                        startDate={startDate}
                        speakers={talk.speakers}
                        uuid={talk.uuid}
                    />
                </div>

                <div className="text-center">
                    <h3 className="font-bold">Te estamos esperando</h3>
                    <div className="text-muted-foreground">
                        <p>
                            Acompáñanos este{' '}
                            <span className="font-bold">
                                {getDayName(startDate)} {getDate(startDate)} de{' '}
                                {getMonthName(startDate)} a las{' '}
                                {getHHMM12FormatText(startDate)} PM
                            </span>{' '}
                            (hora de Santiago).
                        </p>
                        <p>
                            No te pierdas esta oportunidad. ¡El primer paso para obtener
                            tu beca!
                        </p>
                    </div>
                </div>

                {inscription && (
                    <div className="flex flex-col items-center rounded bg-gray-100 px-4 py-8">
                        <DeprecatedCountdownTimer {...countdownTillStart} />

                        <div className="pt-4">
                            <span className="mb-2 block text-center font-light">
                                {countdownTillStart.isTimeUp
                                    ? 'La charla está en curso'
                                    : 'Esta sala aún no está abierta'}
                            </span>

                            <div className="flex justify-center">
                                <ButtonWithSpinner
                                    showSpinner={trackingAssistance}
                                    disabled={!countdownTillStart.isTimeUp}
                                    onClick={handleAssistClick}
                                >
                                    Ingresar a la charla
                                </ButtonWithSpinner>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardContentSafeSpace>
    );
};
