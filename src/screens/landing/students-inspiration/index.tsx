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
                <h2 className="mb-14 text-center text-5xl font-bold text-[#430AA4]">
                    MÁS ALLÁ DE B.O TALKS
                </h2>

                <div className="lg:mx-auto lg:w-10/12">
                    <div className="mb-16 lg:flex lg:items-center">
                        <div className="mb-6 lg:mb-0 lg:w-1/2 lg:pr-6">
                            <h3 className="mb-4 text-xl font-medium">
                                ESTUDIANTES EN ESCENA:
                                <br />
                                Cuenta tu historia
                            </h3>

                            <p className="font-light">
                                ¡Comparte tu experiencia en video! Tu historia puede ser
                                la chispa que motive a otros a perseguir sus sueños. Así
                                que no dudes en alzar tu voz y contar tu historia. Juntos,
                                construimos una red de inspiración que nos impulsa a todos
                                hacia el éxito.
                            </p>
                        </div>

                        <div className="lg:w-1/2 lg:pl-6">
                            <div
                                className="relative aspect-video overflow-hidden"
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
                        </div>
                    </div>

                    <LandingStudentTestimonialsSlider />
                </div>
            </div>
        </section>
    );
};

export default LandingStudentsInspiration;
