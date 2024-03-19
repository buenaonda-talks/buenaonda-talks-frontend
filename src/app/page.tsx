import LandingHero from '@/screens/landing/hero';
import { LandingFAQ } from '@/screens/landing/landing-faq';
import LandingFooter from '@/screens/landing/landing-footer';
import { LandingPath } from '@/screens/landing/landing-path';
import { LandingPress } from '@/screens/landing/landing-press';
import { LandingSteps } from '@/screens/landing/landing-steps';
import { LandingStudentTestimonials } from '@/screens/landing/landing-student-testimonials';
import { LandingTechTestimonials } from '@/screens/landing/landing-tech-testimonials';
import { LandingWhyBoTalks } from '@/screens/landing/landing-why-botalks';

const Page = () => (
    <main className="space-y-40">
        <LandingHero />

        <LandingWhyBoTalks />
        <LandingTechTestimonials />
        <LandingPath />
        <LandingSteps />
        <LandingStudentTestimonials />
        <LandingPress />
        <LandingFAQ />

        <LandingFooter />
    </main>
);

export default Page;
