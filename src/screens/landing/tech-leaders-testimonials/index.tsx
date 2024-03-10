'use client';

import Image, { StaticImageData } from 'next/image';
import { LANDING_TECH_LEADER_TESTIMONIALS } from './constants';
import Autoplay, { AutoplayType } from 'embla-carousel-autoplay';
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

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
    <div className="flex flex-col items-center p-4 lg:flex-row lg:p-16">
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
                    <div className="mx-auto w-24 sm:w-32 lg:mx-0">
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

export const LandingTechLeadersTestimonials: React.FC = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const autoplay = useRef<AutoplayType>(
        Autoplay({
            delay: 4000,
            stopOnInteraction: false,
            rootNode: (a: any) => a.parentElement,
        }),
    );
    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap() + 1);

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <section className="pb-24">
            <div className="container">
                <h2 className="mb-16 text-center text-5xl font-bold leading-snug text-[#430AA4]">
                    Esto dicen los principales líderes del sector tecnológico
                </h2>

                <div className="px-12">
                    <Carousel
                        className="w-full"
                        setApi={setApi}
                        plugins={[autoplay.current]}
                    >
                        <CarouselContent>
                            {LANDING_TECH_LEADER_TESTIMONIALS.map((testimony, index) => (
                                <CarouselItem key={index}>
                                    <Item testimony={testimony} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious
                            onClick={() => {
                                api?.scrollPrev();
                                autoplay.current.stop();
                            }}
                        />
                        <CarouselNext
                            onClick={() => {
                                api?.scrollNext();
                                autoplay.current.stop();
                            }}
                        />
                    </Carousel>
                </div>

                <ul className="flex justify-center space-x-2">
                    {LANDING_TECH_LEADER_TESTIMONIALS.map((_, index) => {
                        const isSelected = current === index + 1;

                        return (
                            <li key={index}>
                                <button
                                    onClick={() => {
                                        autoplay.current.stop();
                                        api?.scrollTo(index);
                                    }}
                                    className={cn(
                                        'h-1 w-10',
                                        isSelected && 'bg-[#430AA4]',
                                        !isSelected &&
                                            'bg-[#AB9CC2] transition duration-200 hover:bg-[#430AA4]',
                                    )}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};
