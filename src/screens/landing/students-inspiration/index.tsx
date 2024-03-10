'use client';

import { useInView } from 'react-intersection-observer';
import LandingStudentTestimonialsSlider from './testimonials-slider';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LandingStudentsInspiration = () => {
    const [showVideo, setShowVideo] = useState(false);
    const { ref, inView } = useInView({ threshold: 1 });

    useEffect(() => {
        if (inView === true) {
            setShowVideo(true);
        }
    }, [inView]);

    return (
        <section className="py-20">
            <div className="container">
                <h2 className="mb-14 text-center text-5xl font-extrabold text-[#430AA4]">
                    MÁS ALLÁ DE B.O TALKS
                </h2>

                <div className="lg:mx-auto lg:w-10/12">
                    <div
                        className="relative mb-16 aspect-video overflow-hidden rounded"
                        ref={ref}
                    >
                        <Skeleton className="absolute h-full w-full" />

                        {showVideo && (
                            <iframe
                                className="absolute h-full w-full"
                                width="791"
                                height="445"
                                src="https://www.youtube.com/embed/l39FJUkXGVM"
                                title="BuenaOnda Talks"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        )}
                    </div>

                    <LandingStudentTestimonialsSlider />
                </div>
            </div>
        </section>
    );
};

export default LandingStudentsInspiration;
