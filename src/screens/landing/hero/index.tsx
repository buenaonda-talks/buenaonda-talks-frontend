import { LandingHeroRegisterToNextTalk } from './CurrentTalkDetails/RegisterToNextTalk';
import { LandingHeroCurrentTalkDetails } from './CurrentTalkDetails';
import { LandingHeroQuery } from '@/api/graphql';

type LandingHeroProps = {
    currentPlatziTalk: LandingHeroQuery['currentPlatziTalk'];
};

const LandingHero = async ({ currentPlatziTalk }: LandingHeroProps) => {
    return (
        <div className="flex items-center bg-[#430AA4] pt-24 text-white">
            <div className="container py-24 xl:flex xl:space-x-12">
                <div className="xl:w-1/2">
                    <h1 className="mb-4 text-5xl font-bold">
                        UNA COMUNIDAD QUE TE AYUDA A ENTRAR AL MUNDO TECNOLÓGICO
                    </h1>
                    <p className="font-light lg:text-xl">
                        Becas gratuitas para aprender a programar junto a líderes de
                        empresas tecnológicas chilenas
                    </p>
                </div>

                {currentPlatziTalk ? (
                    <LandingHeroCurrentTalkDetails talk={currentPlatziTalk} />
                ) : (
                    <LandingHeroRegisterToNextTalk />
                )}
            </div>
        </div>
    );
};

export default LandingHero;
