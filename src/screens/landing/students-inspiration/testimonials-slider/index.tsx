'use client';

import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';

import Image, { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import landingStudentsTestimonials from './constants';

type StudentTestimonialItemProps = {
    image: StaticImageData;
    name: string;
    description: string;
};

const StudentTestimonialItem: React.FC<StudentTestimonialItemProps> = ({
    image,
    name,
    description,
}) => (
    <li className="relative z-0 flex h-full flex-col items-center p-[5px] lg:items-start">
        <div className="relative z-10 h-32 w-32 rounded-full border-[5px] border-[#2B2B2B]">
            <Image
                className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-center"
                src={image}
                width={379}
                height={412}
                alt={name}
                placeholder="blur"
            />
        </div>

        <div className="relative z-0 -mt-16 h-full lg:ml-[3.875rem] lg:mt-[-7.84rem]">
            <div className="absolute -inset-0.5 z-0 rounded-2xl bg-gradient-to-b from-[#430AA4] to-[#DB055D]"></div>

            <div className="relative z-10 flex h-full flex-col rounded-2xl bg-white px-8 pb-5 pt-20 lg:pl-24 lg:pt-8">
                <span className="mb-2 block border-b border-gray-200 pb-2 text-xl font-medium">
                    {name}
                </span>

                <span className="mb-5 block font-light">{description}</span>

                <div className="flex justify-end">
                    <span className="flex space-x-4 font-light">
                        <span>Estudiante</span>

                        <svg
                            className="-mt-2"
                            width="18"
                            height="27"
                            viewBox="0 0 18 27"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14.8553 19.4893C13.8908 21.0876 12.4313 21.8977 10.518 21.8977L9.83052 21.8977L9.83052 18.9356L10.3833 18.7664C11.3251 18.4785 11.9803 17.9121 12.3309 17.081C12.5138 16.6332 12.6176 16.1205 12.632 15.5931L10.518 15.5931C10.3357 15.5931 10.1608 15.4824 10.0319 15.2853C9.90295 15.0882 9.83052 14.821 9.83052 14.5423L9.83052 7.18686C9.83052 6.02786 10.4472 5.08531 11.2055 5.08532L15.3304 5.08532C15.5127 5.08532 15.6875 5.19602 15.8165 5.39308C15.9454 5.59014 16.0178 5.85741 16.0178 6.13609L16.0178 11.39L16.0158 14.4572C16.022 14.5738 16.1526 17.3373 14.8553 19.4893ZM3.64321 5.08531L7.76808 5.08531C7.95041 5.08531 8.12528 5.19602 8.2542 5.39308C8.38313 5.59014 8.45556 5.85741 8.45556 6.13609L8.45556 11.39L8.4535 14.4572C8.45969 14.5738 8.59031 17.3373 7.29303 19.4893C6.3285 21.0876 4.86898 21.8977 2.95573 21.8977L2.26825 21.8977L2.26825 18.9356L2.82098 18.7664C3.76283 18.4785 4.41799 17.9121 4.76861 17.081C4.95155 16.6332 5.05531 16.1205 5.06973 15.5931L2.95573 15.5931C2.77339 15.5931 2.59853 15.4824 2.4696 15.2853C2.34068 15.0882 2.26825 14.821 2.26825 14.5423L2.26825 7.18686C2.26825 6.02786 2.88492 5.08531 3.64321 5.08531Z"
                                fill="#430AA4"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    </li>
);

const LandingStudentTestimonialsSlider = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel();

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);

    useEffect(() => {
        setSelectedSlideIndex(0);
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        const onScroll = () => {
            setSelectedSlideIndex(emblaApi.selectedScrollSnap() || 0);
        };

        emblaApi.on('scroll', onScroll);

        intervalRef.current = setInterval(() => {
            if (emblaApi.canScrollNext()) {
                emblaApi.scrollNext();
            } else {
                emblaApi.scrollTo(0);
            }
        }, 4000);

        const onPointerDown = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };

        emblaApi.on('pointerDown', onPointerDown);

        return () => {
            emblaApi.off('scroll', onScroll);
            emblaApi.off('pointerDown', onPointerDown);

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [emblaApi]);

    const onScrollPrev = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        emblaApi?.scrollPrev();
    };

    const onScrollNext = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        emblaApi?.scrollNext();
    };

    return (
        <div>
            <div className="mb-4 overflow-hidden" ref={emblaRef}>
                <div className="flex space-x-8">
                    {landingStudentsTestimonials.map((testimony, index) => (
                        <div className="shrink-0 grow-0 basis-full" key={index}>
                            <StudentTestimonialItem key={index} {...testimony} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center">
                {landingStudentsTestimonials.length > 1 && (
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={onScrollPrev}
                            className={clsx(
                                !emblaApi?.canScrollPrev() &&
                                    'pointer-events-none opacity-20',
                            )}
                        >
                            <svg
                                width="13"
                                height="19"
                                viewBox="0 0 13 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.1638 1.33132C12.0015 1.19547 11.8084 1.08764 11.5956 1.01406C11.3829 0.940473 11.1547 0.902588 10.9242 0.902588C10.6937 0.902588 10.4655 0.940473 10.2528 1.01406C10.04 1.08764 9.84692 1.19547 9.68462 1.33132L0.955153 8.5783C0.791513 8.71304 0.661629 8.87334 0.572992 9.04996C0.484355 9.22659 0.438721 9.41603 0.438721 9.60737C0.438721 9.7987 0.484355 9.98815 0.572992 10.1648C0.661629 10.3414 0.791513 10.5017 0.955153 10.6364L9.68462 17.8834C9.84692 18.0193 10.04 18.1271 10.2528 18.2007C10.4655 18.2743 10.6937 18.3121 10.9242 18.3121C11.1547 18.3121 11.3829 18.2743 11.5956 18.2007C11.8084 18.1271 12.0015 18.0193 12.1638 17.8834C12.3274 17.7487 12.4573 17.5884 12.5459 17.4118C12.6346 17.2351 12.6802 17.0457 12.6802 16.8543C12.6802 16.663 12.6346 16.4736 12.5459 16.2969C12.4573 16.1203 12.3274 15.96 12.1638 15.8253L4.65645 9.60737L12.1638 3.38946C12.3274 3.25472 12.4573 3.09441 12.5459 2.91779C12.6346 2.74117 12.6802 2.55173 12.6802 2.36039C12.6802 2.16905 12.6346 1.97961 12.5459 1.80298C12.4573 1.62636 12.3274 1.46606 12.1638 1.33132Z"
                                    fill="#5F27BD"
                                />
                            </svg>
                        </button>

                        <ul className="flex items-center justify-center space-x-3">
                            {landingStudentsTestimonials.map((_, index) => {
                                const isSelected = selectedSlideIndex === index;

                                return (
                                    <li key={index}>
                                        {isSelected ? (
                                            <button
                                                onClick={() => {
                                                    if (intervalRef.current) {
                                                        clearInterval(
                                                            intervalRef.current,
                                                        );
                                                    }
                                                    emblaApi?.scrollTo(index);
                                                }}
                                                className="h-6 w-6 rounded bg-[#2C0866] text-white"
                                            >
                                                {index + 1}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    if (intervalRef.current) {
                                                        clearInterval(
                                                            intervalRef.current,
                                                        );
                                                    }
                                                    emblaApi?.scrollTo(index);
                                                }}
                                                className="h-6 w-6"
                                            >
                                                {index + 1}
                                            </button>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>

                        <button
                            onClick={onScrollNext}
                            className={clsx(
                                !emblaApi?.canScrollNext() &&
                                    'pointer-events-none opacity-20',
                            )}
                        >
                            <svg
                                width="13"
                                height="19"
                                viewBox="0 0 13 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0.819855 1.33132C0.982158 1.19547 1.17526 1.08764 1.38801 1.01406C1.60076 0.940473 1.82896 0.902588 2.05944 0.902588C2.28992 0.902588 2.51812 0.940473 2.73087 1.01406C2.94362 1.08764 3.13672 1.19547 3.29902 1.33132L12.0285 8.5783C12.1921 8.71304 12.322 8.87334 12.4107 9.04996C12.4993 9.22659 12.5449 9.41603 12.5449 9.60737C12.5449 9.7987 12.4993 9.98815 12.4107 10.1648C12.322 10.3414 12.1921 10.5017 12.0285 10.6364L3.29902 17.8834C3.13672 18.0193 2.94362 18.1271 2.73087 18.2007C2.51812 18.2743 2.28992 18.3121 2.05944 18.3121C1.82896 18.3121 1.60076 18.2743 1.38801 18.2007C1.17526 18.1271 0.982158 18.0193 0.819855 17.8834C0.656215 17.7487 0.526331 17.5884 0.437695 17.4118C0.349058 17.2351 0.303423 17.0457 0.303423 16.8543C0.303423 16.663 0.349058 16.4736 0.437695 16.2969C0.526331 16.1203 0.656215 15.96 0.819855 15.8253L8.3272 9.60737L0.819855 3.38946C0.656215 3.25472 0.526331 3.09441 0.437695 2.91779C0.349058 2.74117 0.303423 2.55173 0.303423 2.36039C0.303423 2.16905 0.349058 1.97961 0.437695 1.80298C0.526331 1.62636 0.656215 1.46606 0.819855 1.33132Z"
                                    fill="#5F27BD"
                                />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingStudentTestimonialsSlider;
