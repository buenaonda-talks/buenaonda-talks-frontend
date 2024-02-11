'use client';

import { getCleanErrorMessage } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { ButtonWithSpinner } from '@/components/button-with-spinner';
import { useCountdown } from '@/hooks/useCountdown';
import { getDayName, getHHMM12FormatText, getMonthName } from '@/lib/date-fns';
import { getDate } from 'date-fns';
import { TrackerCurrentStepQuery } from '@/api/graphql';
import { useAssistToTalk } from '../mutation';
import { DeprecatedCountdownTimer } from '@/components/deprecated-countdown-timer';
import { TrackerStep1TalkAvailableTicketInscription } from './TicketInscription';

type Props = {
    talk: NonNullable<TrackerCurrentStepQuery['trackerCurrentStep']['platziTalk']>;
};

export const TrackerStep1TalkAvailable: React.FC<Props> = ({ talk }) => {
    const inscription = talk.myInscription;

    const startDate = new Date(talk.startDate);
    const countdownTillStart = useCountdown({ targetDate: startDate });

    const { toast } = useToast();

    const { mutate: assist, isPending: trackingAssistance } = useAssistToTalk({
        onSuccess: (data) => {
            const link = data.assistToTalk;
            if (!link || link.__typename !== 'AssistToTalkLink') {
                throw new Error('Hubo un error al obtener el link de la charla');
            }

            const win = window.open(link.url, '_blank');

            if (!win) throw new Error('Hubo un error al abrir la charla');

            win.focus();
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
        <div>
            <h2 className="text-xl font-bold">1. Charla</h2>

            <div className="text-muted-foreground">
                <p>
                    Inscríbete y participa de una charla informativa sobre como obtener
                    tus becas.
                </p>

                <p>Confirma tu asistencia para obtener el link al evento.</p>
            </div>

            <div className="flex justify-center py-6">
                <TrackerStep1TalkAvailableTicketInscription
                    inscription={inscription}
                    startDate={startDate}
                    speakers={talk.speakers}
                    uuid={talk.uuid}
                />
            </div>

            <div>
                <h3 className="font-bold">Te estamos esperando</h3>
                <div className="text-muted-foreground">
                    <p>
                        Acompáñanos este{' '}
                        <span className="font-bold">
                            {getDayName(new Date())} {getDate(new Date())} de{' '}
                            {getMonthName(new Date())} a las{' '}
                            {getHHMM12FormatText(new Date())} PM
                        </span>{' '}
                        (hora de Santiago).
                    </p>
                    <p>
                        No te pierdas esta oportunidad. ¡El primer paso para obtener tu
                        beca!
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
    );
};
