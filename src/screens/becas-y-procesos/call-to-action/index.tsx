import { TheProcessPageHeroRegisterToNextTalk } from './CurrentTalkDetails/RegisterToNextTalk';
import { TheProcessPageHeroCurrentTalkDetails } from './CurrentTalkDetails';
import { LandingHeroQuery } from '@/api/graphql';

type TheProcessPageHeroProps = {
    currentPlatziTalk: LandingHeroQuery['currentPlatziTalk'];
};

const TheProcessPageHero = async ({ currentPlatziTalk }: TheProcessPageHeroProps) => {
    return currentPlatziTalk ? (
        <TheProcessPageHeroCurrentTalkDetails talk={currentPlatziTalk} />
    ) : (
        <TheProcessPageHeroRegisterToNextTalk />
    );
};

export default TheProcessPageHero;
