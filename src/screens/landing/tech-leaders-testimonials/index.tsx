'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useRef, useState } from 'react';

import Image, { StaticImageData } from 'next/image';
import { LANDING_TECH_LEADER_TESTIMONIALS } from './constants';

type TechLeaderTestimony = {
    content: string;
    person: {
        name: string;
        image: StaticImageData;
        position: string;
    };
    company: {
        name: string;
        image: string;
    };
};

type TechLeadersTestimonialItemProps = {
    testimony: TechLeaderTestimony;
};

const Item: React.FC<TechLeadersTestimonialItemProps> = ({
    testimony: { content, person, company },
}) => (
    <div className="flex flex-col items-center p-16 lg:flex-row">
        <div className="mb-4 w-8/12 lg:mb-0 lg:w-[45%]">
            <div className="flex justify-center lg:w-4/5">
                <Image
                    quality={100}
                    src={person.image}
                    width={322}
                    height={303}
                    alt={`Foto de ${person.name}`}
                    placeholder="blur"
                />
            </div>
        </div>

        <div className="flex-1 text-center lg:text-left">
            <div className="mb-7 lg:flex lg:items-center lg:justify-between">
                <div className="mb-8 lg:mb-0">
                    <h3 className="mb-1 text-lg font-bold lg:text-2xl">{person.name}</h3>
                    <span className="font-bold uppercase text-[#6A57E0]">
                        {person.position}
                    </span>
                </div>

                <div>
                    <div className="mx-auto w-32 lg:mx-0">
                        <Image
                            src={company.image}
                            width={487}
                            height={103}
                            alt={`Logo de ${company.name}`}
                            placeholder={company.name === 'GetOnboard' ? 'empty' : 'blur'}
                        />
                    </div>
                </div>
            </div>

            <p className="font-light">{content}</p>
        </div>
    </div>
);

const LandingTechLeadersTestimonials: React.FC = () => {
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
        <section className="pb-24">
            <div className="container">
                <h2 className="mb-16 text-center text-5xl font-bold leading-snug text-[#430AA4]">
                    Esto dicen los principales líderes del sector tecnológico
                </h2>

                <div className="relative px-8 lg:px-14">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {LANDING_TECH_LEADER_TESTIMONIALS.map((testimony, index) => (
                                <div className="shrink-0 grow-0 basis-full" key={index}>
                                    <Item testimony={testimony} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {LANDING_TECH_LEADER_TESTIMONIALS.length > 1 && (
                        <>
                            <div className="absolute inset-y-0 left-0 flex items-center pr-4">
                                <button
                                    className="disabled:opacity-30"
                                    disabled={!emblaApi?.canScrollPrev()}
                                    onClick={onScrollPrev}
                                >
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M20 2.5C15.3587 2.5 10.9075 4.34374 7.62563 7.62563C4.34375 10.9075 2.5 15.3587 2.5 20C2.5 24.6413 4.34374 29.0925 7.62563 32.3744C10.9075 35.6563 15.3587 37.5 20 37.5C24.6413 37.5 29.0925 35.6563 32.3744 32.3744C35.6563 29.0925 37.5 24.6413 37.5 20C37.5 15.3587 35.6563 10.9075 32.3744 7.62563C29.0925 4.34374 24.6413 2.5 20 2.5ZM20 40C14.6957 40 9.60859 37.8929 5.85786 34.1421C2.10713 30.3914 -1.10609e-06 25.3043 -8.74228e-07 20C-6.42368e-07 14.6957 2.10714 9.60859 5.85786 5.85786C9.60859 2.10714 14.6957 -1.10609e-06 20 -8.74228e-07C25.3043 -6.42368e-07 30.3914 2.10714 34.1421 5.85786C37.8929 9.60859 40 14.6957 40 20C40 25.3043 37.8929 30.3914 34.1421 34.1421C30.3914 37.8929 25.3043 40 20 40ZM28.75 21.25C29.0815 21.25 29.3995 21.1183 29.6339 20.8839C29.8683 20.6495 30 20.3315 30 20C30 19.6685 29.8683 19.3505 29.6339 19.1161C29.3995 18.8817 29.0815 18.75 28.75 18.75L14.2675 18.75L19.635 13.385C19.8697 13.1503 20.0016 12.8319 20.0016 12.5C20.0016 12.1681 19.8697 11.8497 19.635 11.615C19.4003 11.3803 19.0819 11.2484 18.75 11.2484C18.4181 11.2484 18.0997 11.3803 17.865 11.615L10.365 19.115C10.2486 19.2311 10.1562 19.3691 10.0932 19.5209C10.0302 19.6728 9.99777 19.8356 9.99777 20C9.99777 20.1644 10.0302 20.3272 10.0932 20.4791C10.1562 20.6309 10.2486 20.7689 10.365 20.885L17.865 28.385C18.0997 28.6197 18.4181 28.7516 18.75 28.7516C19.0819 28.7516 19.4003 28.6197 19.635 28.385C19.8697 28.1503 20.0016 27.8319 20.0016 27.5C20.0016 27.1681 19.8697 26.8497 19.635 26.615L14.2675 21.25L28.75 21.25Z"
                                            fill="#2C0866"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pl-4">
                                <button
                                    className="disabled:opacity-30"
                                    disabled={!emblaApi?.canScrollNext()}
                                    onClick={onScrollNext}
                                >
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M20 37.5C24.6413 37.5 29.0925 35.6563 32.3744 32.3744C35.6563 29.0925 37.5 24.6413 37.5 20C37.5 15.3587 35.6563 10.9075 32.3744 7.62563C29.0925 4.34375 24.6413 2.5 20 2.5C15.3587 2.5 10.9075 4.34375 7.62563 7.62563C4.34374 10.9075 2.5 15.3587 2.5 20C2.5 24.6413 4.34374 29.0925 7.62563 32.3744C10.9075 35.6563 15.3587 37.5 20 37.5ZM20 2.38498e-07C25.3043 3.01751e-07 30.3914 2.10714 34.1421 5.85786C37.8929 9.60859 40 14.6957 40 20C40 25.3043 37.8929 30.3914 34.1421 34.1421C30.3914 37.8929 25.3043 40 20 40C14.6957 40 9.60859 37.8929 5.85786 34.1421C2.10714 30.3914 1.75244e-07 25.3043 2.38498e-07 20C3.01751e-07 14.6957 2.10714 9.60859 5.85786 5.85786C9.60859 2.10714 14.6957 1.75244e-07 20 2.38498e-07ZM11.25 18.75C10.9185 18.75 10.6005 18.8817 10.3661 19.1161C10.1317 19.3505 10 19.6685 10 20C10 20.3315 10.1317 20.6495 10.3661 20.8839C10.6005 21.1183 10.9185 21.25 11.25 21.25L25.7325 21.25L20.365 26.615C20.1303 26.8497 19.9984 27.1681 19.9984 27.5C19.9984 27.8319 20.1303 28.1503 20.365 28.385C20.5997 28.6197 20.9181 28.7516 21.25 28.7516C21.5819 28.7516 21.9003 28.6197 22.135 28.385L29.635 20.885C29.7514 20.7689 29.8438 20.6309 29.9068 20.4791C29.9698 20.3272 30.0022 20.1644 30.0022 20C30.0022 19.8356 29.9698 19.6728 29.9068 19.5209C29.8438 19.3691 29.7514 19.2311 29.635 19.115L22.135 11.615C21.9003 11.3803 21.5819 11.2484 21.25 11.2484C20.9181 11.2484 20.5997 11.3803 20.365 11.615C20.1303 11.8497 19.9984 12.1681 19.9984 12.5C19.9984 12.8319 20.1303 13.1503 20.365 13.385L25.7325 18.75L11.25 18.75Z"
                                            fill="#2C0866"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <ul className="flex justify-center space-x-2">
                                {LANDING_TECH_LEADER_TESTIMONIALS.map((_, index) => {
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
                                                    className="bg-primary-dark-variant hover:bg-primary-dark-variant h-1 w-10"
                                                ></button>
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
                                                    className="hover:bg-primary-dark-variant h-1 w-10 bg-[#AB9CC2] transition duration-200"
                                                ></button>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};
export default LandingTechLeadersTestimonials;
