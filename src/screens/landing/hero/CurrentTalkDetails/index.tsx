'use client';

import { LandingHeroQuery } from '@/api/graphql';
import { useCountdown } from '@/hooks/useCountdown';
import { LandingHeroCountdown } from './Countdown';
import { LandingHeroJoinNow } from './JoinNow';
import { TalkEndedSoRegisterToNextTalk } from '../TalkEndedSoRegisterToNextTalk';

type CurrentTalkDetailsProps = {
    talk: NonNullable<LandingHeroQuery['currentPlatziTalk']>;
};

export const LandingHeroCurrentTalkDetails = ({ talk }: CurrentTalkDetailsProps) => {
    console.log('talk', talk);
    const countdownStart = useCountdown({
        targetDate: new Date(talk.startDate),
    });
    const countdownEnd = useCountdown({
        targetDate: new Date(talk.endDate),
    });

    if (!countdownStart.isTimeUp) {
        return <LandingHeroCountdown countdownStart={countdownStart} />;
    }

    if (!countdownEnd.isTimeUp) {
        return <LandingHeroJoinNow />;
    }

    return <TalkEndedSoRegisterToNextTalk />;
};
