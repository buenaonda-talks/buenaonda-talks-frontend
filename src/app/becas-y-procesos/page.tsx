import { fetchServerInitialData } from '@/api/fetch-server';
import ProcessPage from './page-content';
import { LandingHeroDocument, LandingHeroQuery } from '@/api/graphql';

export type HomeGetData = {
    currentPlatziTalk: LandingHeroQuery['currentPlatziTalk'];
};

const getData = async (): Promise<HomeGetData> => {
    try {
        const { data } = await fetchServerInitialData(LandingHeroDocument, {});
        const currentPlatziTalk = data?.currentPlatziTalk;

        return {
            currentPlatziTalk: currentPlatziTalk || null,
        };
    } catch (err) {
        return {
            currentPlatziTalk: null,
        };
    }
};

const Page = async () => {
    const data = await getData();
    return <ProcessPage currentPlatziTalk={data.currentPlatziTalk} />;
};

export default Page;
