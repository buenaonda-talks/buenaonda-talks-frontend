'use client';

import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const LandingStudentTestimonialsYoutube = () => {
    const [showVideo, setShowVideo] = useState(false);
    const { ref, inView } = useInView({ threshold: 1 });

    useEffect(() => {
        if (inView === true) {
            setShowVideo(true);
        }
    }, [inView]);

    return (
        <div className="flex-1">
            <div className="sticky top-0 -mt-4 pt-4">
                <div className="aspect-video overflow-hidden" ref={ref}>
                    <Skeleton className="absolute h-full w-full" />

                    {showVideo && (
                        <iframe
                            className="absolute h-full w-full overflow-hidden rounded-lg"
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
    );
};
