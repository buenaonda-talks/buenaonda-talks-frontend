import LandingProcess from '@/screens/landing/the-process';
import LandingUniqueOpportunity from '@/screens/landing/unique-opportunity';
import LandingHabilities from '@/screens/landing/habilities';
import LandingHero from '@/screens/landing/hero';
import LandingHeader from '@/screens/landing/header';
import LandingFooter from '@/screens/landing/landing-footer';
import LandingStudentsInspiration from '@/screens/landing/students-inspiration';
import LandingStats from '@/screens/landing/stats';
import LandingTheyTalkAboutUs from '@/screens/landing/they-talk-about-us';
import LandingTechLeadersTestimonials from '@/screens/landing/tech-leaders-testimonials';

const Page: React.FC = () => {
    return (
        <main>
            <LandingHeader />

            <LandingHero />
            <LandingStats />
            <LandingHabilities />
            <LandingUniqueOpportunity />
            <LandingProcess />
            <LandingTechLeadersTestimonials />
            <LandingTheyTalkAboutUs />
            <LandingStudentsInspiration />

            <LandingFooter />
        </main>
    );
};

export default Page;
