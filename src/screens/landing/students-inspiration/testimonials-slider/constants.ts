import { StaticImageData } from 'next/image';
import benja from './benja.png';
import dreyco from './dreyco.jpg';
import mary from './mary-avril.png';

export type StudentTestimony = {
    image: StaticImageData;
    name: string;
    description: string;
};

export const LANDING_STUDENTS_TESTIMONIALS: ReadonlyArray<StudentTestimony> = [
    {
        image: dreyco,
        name: 'Dreyco Román',
        description:
            'Una experiencia para toda tu vida con una comunidad de las mejores, un grupo de estudio digital con el que puedes hacer grandes cosas. Se que aún me queda todo un camino por recorrer, pero ya siento que soy un programador',
    },
    {
        image: mary,
        name: 'Mary Avril Daboin',
        description:
            'Siempre vi la tecnología como una herramienta para estudiar y conectar con otros pero ahora entiendo que es un superpoder que permite crear y optar por un mejor futuro laboral.',
    },
    {
        image: benja,
        name: 'Benjamín Quezada',
        description:
            'Encuentro que es el empujón perfecto que puedes tener para entrar al mundo de la tecnología. Además de una manera cómoda y flexible.',
    },
];

export default LANDING_STUDENTS_TESTIMONIALS;
