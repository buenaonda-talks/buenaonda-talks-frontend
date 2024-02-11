import { UseCountdownResult } from '@/hooks/useCountdown';
import { padNumber } from '@/lib/utils';
import { PropsWithChildren } from 'react';

const BoldAndBig: React.FC<PropsWithChildren> = ({ children }) => (
    <span className="font-headings block text-center font-bold sm:text-5xl">
        {children}
    </span>
);

const Text: React.FC<PropsWithChildren> = ({ children }) => (
    <span className="block text-center font-sans font-light">{children}</span>
);

export const DeprecatedCountdownTimer = ({
    days,
    hours,
    minutes,
    seconds,
}: UseCountdownResult) => {
    return (
        <div className="flex space-x-2 md:space-x-5">
            <div>
                <BoldAndBig>{padNumber(days)}</BoldAndBig>
                <Text>Días</Text>
            </div>

            <BoldAndBig>:</BoldAndBig>

            <div>
                <BoldAndBig>{padNumber(hours)}</BoldAndBig>
                <Text>Horas</Text>
            </div>

            <BoldAndBig>:</BoldAndBig>

            <div>
                <BoldAndBig>{padNumber(minutes)}</BoldAndBig>
                <Text>Minutos</Text>
            </div>

            <BoldAndBig>:</BoldAndBig>

            <div>
                <BoldAndBig>{padNumber(seconds)}</BoldAndBig>
                <Text>Segundos</Text>
            </div>
        </div>
    );
};
