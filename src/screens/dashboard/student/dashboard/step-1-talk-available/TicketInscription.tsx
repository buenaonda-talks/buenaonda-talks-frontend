'use client';

import clsx from 'clsx';

import { LoadingSpinner } from '@/components/loading-spinner';
import { padNumber } from '@/lib/utils';
import { getDate, getYear } from 'date-fns';
import { TrackerCurrentStep, TrackerCurrentStepQuery } from '@/api/graphql';
import { useToast } from '@/components/ui/use-toast';
import { useSignUpToTalkMutation } from '../mutation';
import { getMonthName } from '@/lib/date-fns';

type TicketDetailsProps = {
    startDate: Date;
    speakers: string;
};

const TicketDetails: React.FC<TicketDetailsProps> = ({ startDate, speakers }) => (
    <div className="mb-8 space-y-4 text-center">
        <div>
            <span className="font-headings block text-xl font-medium">
                Charla impartida por
            </span>
            <span className="font-sans font-light">{speakers}</span>
        </div>

        <div>
            <span className="font-headings block text-xl font-medium">Ubicación</span>

            <span className="flex items-center justify-center space-x-2 font-sans font-light">
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15 7.5C15 11.6419 11.6419 15 7.5 15C3.35813 15 0 11.6419 0 7.5C0 3.35813 3.35813 0 7.5 0C11.6419 0 15 3.35813 15 7.5ZM3.75 10.125H9.375V6C9.375 5.85226 9.3459 5.70597 9.28936 5.56948C9.23283 5.43299 9.14996 5.30897 9.0455 5.2045C8.94103 5.10004 8.81701 5.01717 8.68052 4.96064C8.54403 4.9041 8.39774 4.875 8.25 4.875H2.625V9C2.625 9.29837 2.74353 9.58452 2.9545 9.7955C3.05897 9.89996 3.18299 9.98283 3.31948 10.0394C3.45597 10.0959 3.60226 10.125 3.75 10.125ZM10.125 8.625L12.375 10.125V4.875L10.125 6.375V8.625Z"
                        fill="black"
                    />
                </svg>

                <span>Zoom</span>
            </span>
        </div>

        <div>
            <span className="font-headings block text-xl font-medium">Fecha</span>
            <span className="font-sans">
                {getDate(startDate)} {getMonthName(startDate)}, {getYear(startDate)}
            </span>
        </div>
    </div>
);

type TicketProps = {
    Details: React.ReactElement;
};

const UnconfirmedTicket: React.FC<
    TicketProps & {
        uuid: string;
    }
> = ({ Details, uuid }) => {
    const { toast } = useToast();

    const { mutate, isPending } = useSignUpToTalkMutation({
        onError: () => {
            toast({
                variant: 'destructive',
                description: 'No se pudo confirmar tu asistencia. Intentalo más tarde.',
            });
        },
    });

    const confirmAssistance = () => {
        if (isPending) return;
        mutate({
            uuid,
        });
    };

    return (
        <div className="mb-10 rounded-3xl border border-solid border-gray-700">
            <div className="font-headings px-10 py-4 text-center text-sm font-bold">
                <span>N° 00000</span>
            </div>

            <div className="relative border-b border-dashed border-black">
                <div className="absolute left-[-1px] top-1/2 h-6 w-3 -translate-y-1/2 rounded-r-full border-y border-r border-solid border-gray-700 bg-white"></div>
                <div className="absolute right-[-1px] top-1/2 h-6 w-3 -translate-y-1/2 rounded-l-full border-y border-l border-solid border-gray-700 bg-white"></div>
            </div>

            <div className="px-10 py-8">
                {Details}

                <div className="flex justify-center">
                    <button
                        aria-label="Confirmar asistencia"
                        onClick={confirmAssistance}
                        className="bg-primary-v2 font-headings hover:bg-primary-v2-hover relative rounded px-6 py-3 font-bold text-white"
                    >
                        <span className={clsx(isPending && 'invisible')}>
                            Confirmar asistencia
                        </span>

                        <div
                            className={clsx(
                                'absolute inset-0 flex items-center justify-center',
                                !isPending && 'hidden',
                            )}
                        >
                            <LoadingSpinner />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

const ConfirmedTicket: React.FC<
    TicketProps & {
        number: number;
    }
> = ({ Details, number }) => (
    <div className="mb-10 rounded-3xl border border-solid border-black bg-black text-white">
        <div className="font-headings px-10 py-4 text-center text-sm font-bold">
            <span>N° {padNumber(number, 5)}</span>
        </div>

        <div className="relative border-b border-dashed border-white">
            <div className="absolute left-[-1px] top-1/2 h-6 w-3 -translate-y-1/2 rounded-r-full border-y border-r border-solid border-gray-700 bg-white"></div>
            <div className="absolute right-[-1px] top-1/2 h-6 w-3 -translate-y-1/2 rounded-l-full border-y border-l border-solid border-gray-700 bg-white"></div>
        </div>

        <div className="px-10 py-8">
            {Details}

            <div className="font-headings flex items-center justify-center space-x-3 font-bold text-success">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 2.25C14.5859 2.25 17.0658 3.27723 18.8943 5.10571C20.7228 6.93419 21.75 9.41414 21.75 12C21.75 14.5859 20.7228 17.0658 18.8943 18.8943C17.0658 20.7228 14.5859 21.75 12 21.75C9.41414 21.75 6.93419 20.7228 5.10571 18.8943C3.27723 17.0658 2.25 14.5859 2.25 12C2.25 9.41414 3.27723 6.93419 5.10571 5.10571C6.93419 3.27723 9.41414 2.25 12 2.25ZM12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76516 22.7357 8.8174 24 12 24ZM17.2969 9.79688C17.7375 9.35625 17.7375 8.64375 17.2969 8.20781C16.8563 7.77188 16.1438 7.76719 15.7078 8.20781L10.5047 13.4109L8.30156 11.2078C7.86094 10.7672 7.14844 10.7672 6.7125 11.2078C6.27656 11.6484 6.27187 12.3609 6.7125 12.7969L9.7125 15.7969C10.1531 16.2375 10.8656 16.2375 11.3016 15.7969L17.2969 9.79688Z"
                        className="fill-current"
                    />
                </svg>

                <span>Asistencia confirmada</span>
            </div>
        </div>
    </div>
);

type TalkStepTicketProps = {
    inscription: NonNullable<
        TrackerCurrentStepQuery['trackerCurrentStep']['platziTalk']
    >['myInscription'];
    speakers: NonNullable<TrackerCurrentStep['platziTalk']>['speakers'];
    startDate: Date;
    uuid: string;
};

export const TrackerStep1TalkAvailableTicketInscription: React.FC<TalkStepTicketProps> = (
    props,
) => {
    const { inscription, startDate, speakers, uuid } = props;

    const Details = <TicketDetails startDate={startDate} speakers={speakers} />;

    if (inscription) {
        return <ConfirmedTicket number={inscription.number} Details={Details} />;
    }

    return <UnconfirmedTicket Details={Details} uuid={uuid} />;
};
