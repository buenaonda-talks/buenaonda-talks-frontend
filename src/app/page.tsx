import LandingHabilities from '@/screens/landing/habilities';
import LandingHero from '@/screens/landing/hero';
import LandingHeader from '@/screens/landing/header';
import LandingFooter from '@/screens/landing/landing-footer';
import LandingStudentsInspiration from '@/screens/landing/students-inspiration';
import LandingStats from '@/screens/landing/stats';
import LandingTheyTalkAboutUs from '@/screens/landing/they-talk-about-us';
import { LandingHeroDocument } from '@/api/graphql';
import { fetchServer } from '@/api/fetch-server';
import { LandingTechLeadersTestimonials } from '@/screens/landing/tech-leaders-testimonials';

const getCurrentPlatziTalk = async () => {
    try {
        const response = await fetchServer(LandingHeroDocument, {});
        return response.currentPlatziTalk;
    } catch (error) {
        return null;
    }
};

const Page = async () => {
    const currentPlatziTalk = await getCurrentPlatziTalk();

    return (
        <main>
            <LandingHeader />

            <LandingHero currentPlatziTalk={currentPlatziTalk} />
            <LandingStats />
            <LandingHabilities />
            <LandingTechLeadersTestimonials />
            <LandingTheyTalkAboutUs />
            <LandingStudentsInspiration />

            <LandingFooter />
        </main>
    );
};

export default Page;
