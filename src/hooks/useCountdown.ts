import { useState, useEffect } from 'react';
import {
    differenceInSeconds,
    differenceInMinutes,
    differenceInHours,
    differenceInDays,
    differenceInMonths,
} from 'date-fns';

export interface UseCountdownResult {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    months: number;
    isTimeUp: boolean;
}

type Options = {
    targetDate: Date;
};

export const useCountdown = ({ targetDate }: Options): UseCountdownResult => {
    const [countdown, setCountdown] = useState<UseCountdownResult>({
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0,
        months: 0,
        isTimeUp: false,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const timeDifference = targetDate.getTime() - now.getTime();

            if (timeDifference <= 0) {
                setCountdown({
                    seconds: 0,
                    minutes: 0,
                    hours: 0,
                    days: 0,
                    months: 0,
                    isTimeUp: true,
                });
                clearInterval(interval);
            } else {
                setCountdown({
                    seconds: differenceInSeconds(targetDate, now) % 60,
                    minutes: differenceInMinutes(targetDate, now) % 60,
                    hours: differenceInHours(targetDate, now) % 24,
                    days: differenceInDays(targetDate, now),
                    months: differenceInMonths(targetDate, now),
                    isTimeUp: false,
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return countdown;
};
