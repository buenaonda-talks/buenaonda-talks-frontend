'use client';

import Image from 'next/image';
import botalksPathImage from './botalks-path.jpg';
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

type PathItemType = {
    title: string;
    description: string;
};

const PATHS: PathItemType[] = [
    {
        title: 'Como cumplir tus objetivos profesionales',
        description:
            'Desarrolla habilidades de aprendizaje autónomo para triunfar como estudiante de cursos en línea y convertirte en profesional en lo que quieras. Deja volar tu curiosidad y adopta la mentalidad adecuada para  que nunca pares de aprender.',
    },
    {
        title: 'Curso de programación básica',
        description: 'Lorem ipsum',
    },
    {
        title: 'Introducción a la Web',
        description: 'Lorem ipsum',
    },
    {
        title: 'Computer Science',
        description: 'Lorem ipsum',
    },
    {
        title: 'Frontend avanzado',
        description: 'Lorem ipsum',
    },
    {
        title: 'Crea tu portafolio y demuestra de lo que eres capaz',
        description: 'Lorem ipsum',
    },
];

export const LandingPath = () => {
    return (
        <section className="container space-y-10">
            <div className="space-y-1 text-center">
                <h3 className="text-[#5522AB]">Contenidos</h3>
                <h2 className="text-3xl font-semibold">
                    Tu ruta con{' '}
                    <span className="text-brand-primary">BuenaOnda Talks</span>
                </h2>
            </div>

            <div className="space-y-5">
                <div className="flex flex-col space-y-8 xl:flex-row xl:space-x-10 xl:space-y-0">
                    <div className="flex-1">
                        <div className="flex items-stretch space-x-5">
                            <div className="w-[2px] bg-gradient-to-b from-brand-primary to-transparent"></div>

                            <Accordion
                                type="single"
                                collapsible
                                className="min-w-0 flex-1 space-y-5"
                                defaultValue="item-0"
                            >
                                {PATHS.map((benefit, index) => (
                                    <AccordionItem
                                        key={index}
                                        className="space-y-2 border-0"
                                        value={`item-${index}`}
                                    >
                                        <AccordionPrimitive.Header className="flex">
                                            <AccordionPrimitive.Trigger className="text-left transition duration-100 data-[state=closed]:opacity-30 data-[state=closed]:hover:opacity-70">
                                                <span className="font-headings text-lg font-semibold">
                                                    {benefit.title}
                                                </span>
                                            </AccordionPrimitive.Trigger>
                                        </AccordionPrimitive.Header>

                                        <AccordionContent className="p-0">
                                            <p className="text-muted-foreground">
                                                {benefit.description}
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>

                    <div className="flex flex-1 items-center">
                        <div className="mx-auto w-8/12 max-w-[325px]">
                            <Image
                                src={botalksPathImage}
                                alt=""
                                width={652}
                                height={744}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex pl-5">
                    <a
                        href="#"
                        className="pl-[2px] text-center font-headings text-brand-primary sm:text-left sm:text-lg"
                    >
                        Ver la ruta de aprendizaje completa →
                    </a>
                </div>
            </div>
        </section>
    );
};
