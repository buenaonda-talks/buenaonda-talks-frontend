'use client';

import Image from 'next/image';
import logoElMercurio from './resources/el-mercurio.png';
import logoElReportero from './resources/el-reportero.png';
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Props = {
    Image: React.ReactNode;
    item: {
        title: string;
        content: string;
        href: string;
    };
    index: number;
    selectedIndex: number;
    onNavigate: (n: number) => void;
};

const Item = ({
    item: { title, content, href },
    Image,
    selectedIndex,
    onNavigate,
}: Props) => (
    <div className="flex h-full flex-col space-y-8 rounded-lg bg-brand-muted p-8 xl:flex-row xl:space-x-4 xl:space-y-0">
        <div className="flex flex-col xl:flex-1 xl:justify-center">
            <div className="flex flex-1 items-center">{Image}</div>

            <div className="mt-auto hidden space-x-4 xl:flex">
                <button
                    aria-label={`Ir al slide ${1}`}
                    onClick={() => onNavigate(0)}
                    className={cn(
                        'h-4 w-4 rounded-full',
                        selectedIndex === 1 && 'bg-dark',
                        selectedIndex !== 1 && 'bg-dark/30',
                    )}
                />

                <button
                    aria-label={`Ir al slide ${2}`}
                    onClick={() => onNavigate(1)}
                    className={cn(
                        'h-4 w-4 rounded-full',
                        selectedIndex === 2 && 'bg-dark',
                        selectedIndex !== 2 && 'bg-dark/30',
                    )}
                />
            </div>
        </div>

        <div className="flex flex-col xl:flex-1">
            <div className="space-y-2 pb-4">
                <h4 className="text-xl font-semibold">{title}</h4>

                <p className="text-muted-foreground">{content.slice(0, 140)}...</p>
            </div>

            <a
                className="mt-auto inline-block font-headings font-semibold text-brand-primary"
                href={href}
            >
                Leer artículo
            </a>
        </div>
    </div>
);

export const LandingPress = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

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
        <section className="container space-y-10">
            <div className="space-y-1 text-center">
                <h3 className="text-[#5522AB]">Prensa</h3>
                <h2 className="text-3xl font-semibold">
                    <span className="text-brand-primary">BuenaOnda Talks</span> en los
                    medios
                </h2>
            </div>

            <div className="xl:mx-auto xl:w-10/12">
                <div className="xl:px-12">
                    <Carousel setApi={setApi} className="bg-muted">
                        <CarouselContent>
                            <CarouselItem>
                                <Item
                                    item={{
                                        title: 'Phaway, la fundación liderada por cofundador de Cornershop que busca potenciar la educación escolar a través de la tecnología',
                                        content:
                                            'Usar la tecnología para acortar las brechas sociales y dar oportunidades a jóvenes talentosos desde la etapa escolar es el objetivo de Fundación Phaway, el nuevo provecto de Daniel Undurraga, uno de los fundadores de Cornershop.',
                                        href: '#/',
                                    }}
                                    Image={
                                        <Image
                                            src={logoElMercurio}
                                            alt="El Mercurio"
                                            width={255}
                                            height={26}
                                        />
                                    }
                                    index={0}
                                    selectedIndex={current}
                                    onNavigate={(n) => {
                                        api?.scrollTo(n);
                                    }}
                                />
                            </CarouselItem>

                            <CarouselItem>
                                <Item
                                    item={{
                                        title: 'Emprendedores exitosos compartieron experiencia con estudiantes de Alto Hospicio',
                                        content:
                                            'Más de 100 estudiantes y docentes del Liceo Bicentenario Metodista William Taylor se conectaron virtualmente con dos importantes referentes de la innovación en Chile, en el marco de la iniciativa “Buena Onda Talks” que lideran el cofundador de Cornershop, Daniel Undurraga, y uno de los emprendedores tecnológicos pioneros del país y actual cofundador de Capitalizarme.com, Paolo Colonnello.',
                                        href: 'https://elreporterodeiquique.com/emprendedores-exitosos-compartieron-experiencia-con-estudiantes-de-alto-hospicio/',
                                    }}
                                    Image={
                                        <Image
                                            src={logoElReportero}
                                            alt="El Mercurio"
                                            width={255}
                                            height={26}
                                        />
                                    }
                                    index={1}
                                    selectedIndex={current}
                                    onNavigate={(n) => {
                                        api?.scrollTo(n);
                                    }}
                                />
                            </CarouselItem>
                        </CarouselContent>

                        <div className="hidden xl:block">
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                    </Carousel>

                    <div className="mt-auto flex justify-center space-x-4 pt-4 xl:hidden">
                        <button
                            aria-label={`Ir al slide ${1}`}
                            onClick={() => api?.scrollTo(0)}
                            className={cn(
                                'h-4 w-4 rounded-full',
                                current === 1 && 'bg-dark',
                                current !== 1 && 'bg-dark/30',
                            )}
                        />

                        <button
                            aria-label={`Ir al slide ${2}`}
                            onClick={() => api?.scrollTo(1)}
                            className={cn(
                                'h-4 w-4 rounded-full',
                                current === 2 && 'bg-dark',
                                current !== 2 && 'bg-dark/30',
                            )}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
