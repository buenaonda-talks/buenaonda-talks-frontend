import { LandingHeroRegisterToNextTalk } from './CurrentTalkDetails/RegisterToNextTalk';
import { fetchServer } from '@/api/fetch-server';
import { LandingHeroDocument } from '@/api/graphql';
import { LandingHeroCurrentTalkDetails } from './CurrentTalkDetails';

const getCurrentPlatziTalk = async () => {
    try {
        const response = await fetchServer(LandingHeroDocument, {});
        return response.currentPlatziTalk;
    } catch (error) {
        console.error('Error getting current talk', error);
        return null;
    }
};

const LandingHero = async () => {
    const talk = await getCurrentPlatziTalk();

    return (
        <div className="flex items-center bg-[#430AA4] pt-24 text-white">
            <div className="container py-24 xl:flex xl:space-x-8">
                <div className="xl:w-1/2">
                    <h1 className="mb-4 text-5xl font-bold">
                        INGRESA AL MUNDO TECNOLÓGICO
                    </h1>
                    <p className="font-light lg:text-xl">
                        Becas gratuitas para que estudiantes de 3° y 4° medio ingresen al
                        mundo de la tecnología aprendiendo a programar junto a líderes de
                        empresas tecnológicas chilenas.
                    </p>
                </div>

                {talk ? (
                    <LandingHeroCurrentTalkDetails talk={talk} />
                ) : (
                    <LandingHeroRegisterToNextTalk />
                )}
            </div>
        </div>
    );
};

export default LandingHero;
