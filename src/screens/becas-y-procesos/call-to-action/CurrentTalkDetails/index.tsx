'use client';

import { useCountdown } from '@/hooks/useCountdown';
import { TheProcessPageHeroCountdown } from './Countdown';
import { TheProcessPageHeroJoinNow } from './JoinNow';
import { LandingHeroQuery } from '@/api/graphql';
import { TheProcessPageTalkEndedSoRegisterToNextTalk } from '../TheProcessPageTalkEndedSoRegisterToNextTalk';

type CurrentTalkDetailsProps = {
    talk: NonNullable<LandingHeroQuery['currentPlatziTalk']>;
};

export const TheProcessPageHeroCurrentTalkDetails = ({
    talk,
}: CurrentTalkDetailsProps) => {
    const countdownStart = useCountdown({
        targetDate: new Date(talk.startDate),
    });
    const countdownEnd = useCountdown({
        targetDate: new Date(talk.endDate),
    });

    if (!countdownStart.isTimeUp) {
        return <TheProcessPageHeroCountdown countdownStart={countdownStart} />;
    }

    if (!countdownEnd.isTimeUp) {
        return <TheProcessPageHeroJoinNow />;
    }

    return <TheProcessPageTalkEndedSoRegisterToNextTalk />;
};
