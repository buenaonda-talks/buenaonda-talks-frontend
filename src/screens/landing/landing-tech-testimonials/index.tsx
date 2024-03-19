'use client';

import Image, { StaticImageData } from 'next/image';
import { LANDING_TECH_LEADER_TESTIMONIALS } from './constants';
import Autoplay, { AutoplayType } from 'embla-carousel-autoplay';
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
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
    <div className="h-full space-y-4 rounded-xl border border-border p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="order-2 flex items-center space-x-4 md:order-1">
                <Image
                    className="rounded-full border-2 border-dark"
                    src={person.image}
                    width={60}
                    height={60}
                    alt={`Foto de ${person.name}`}
                    placeholder="blur"
                />

                <div>
                    <p>Pedro Pineda</p>
                    <p className="text-muted-foreground">CEO de Fintual</p>
                </div>
            </div>

            <Image
                className="order-1 hidden md:order-2 md:block"
                src={company.image}
                width={100}
                height={21}
                alt={`Logo de ${company.name}`}
                placeholder={company.name === 'GetOnboard' ? 'empty' : 'blur'}
            />
        </div>

        <p className="text-muted-foreground">{content}</p>
    </div>
);

export const LandingTechTestimonials: React.FC = () => {
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
        <section className="space-y-10">
            <div className="space-y-1 text-center">
                <h3 className="text-[#5522AB]">Apoyo</h3>
                <h2 className="text-3xl font-semibold">
                    Los principales lideres de la industria confían en nosotros
                </h2>
            </div>

            <div className="relative">
                <Carousel
                    setApi={setApi}
                    plugins={[autoplay.current]}
                    opts={{
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        {LANDING_TECH_LEADER_TESTIMONIALS.map((testimony, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-[80%] md:basis-[70%] lg:basis-[50%]  xl:basis-[550px]"
                            >
                                <Item testimony={testimony} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.00),12.5%,rgba(255,255,255,0.00),86.5%,#fff_100%)]" />
            </div>

            <ul className="flex justify-center space-x-2">
                {LANDING_TECH_LEADER_TESTIMONIALS.map((_, index) => {
                    const isSelected = current === index + 1;

                    return (
                        <li key={index}>
                            <button
                                aria-label={`Ir al testimonio ${index + 1}`}
                                onClick={() => {
                                    autoplay.current.stop();
                                    api?.scrollTo(index);
                                }}
                                className={cn(
                                    'h-5 w-5 rounded-full',
                                    isSelected && 'bg-dark',
                                    !isSelected && 'bg-muted',
                                )}
                            />
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};
