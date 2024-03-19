'use client';

import Image from 'next/image';
import botalksPathImage from './botalks-path.jpg';
import { cn } from '@/lib/utils';

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
        description: '',
    },
    {
        title: 'Introducción a la Web',
        description: '',
    },
    {
        title: 'Computer Science',
        description: '',
    },
    {
        title: 'Frontend avanzado',
        description: '',
    },
    {
        title: 'Crea tu portafolio y demuestra de lo que eres capaz',
        description: '',
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

                            <div className="min-w-0 flex-1 space-y-5">
                                {PATHS.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            'space-y-2',
                                            index !== 0 && 'opacity-30',
                                        )}
                                    >
                                        <div className="space-y-1">
                                            <span className="font-headings text-lg font-semibold">
                                                {benefit.title}
                                            </span>
                                        </div>

                                        <p className="text-muted-foreground">
                                            {benefit.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
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
                    <span className="pl-[2px] text-center font-headings text-brand-primary sm:text-left sm:text-lg">
                        Ver la ruta de aprendizaje completa →
                    </span>
                </div>
            </div>
        </section>
    );
};
