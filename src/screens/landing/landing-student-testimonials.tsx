import Image, { StaticImageData } from 'next/image';
import photoBenja from './resources/estudiante-benja.png';
import photoDreyco from './resources/estudiante-dreyco.jpg';
import photoMary from './resources/estudiante-mary-avril.png';
import { LandingStudentTestimonialsYoutube } from './landing-student-testimonials copy';

const Star = () => {
    return (
        <svg
            className="h-6 w-6"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="#FBBF24"
                stroke="#FBBF24"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};

type TestimonialType = {
    photo: StaticImageData;
    name: string;
    testimonial: string;
};

type TestimonialProps = {
    testimonial: TestimonialType;
};

const Testimonial = ({ testimonial }: TestimonialProps) => {
    return (
        <div className="space-y-2 rounded-xl border border-border p-4">
            <div className="flex space-x-2">
                <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    width={42}
                    height={42}
                    className="h-10 w-10 rounded-full border border-dark"
                />

                <div className="flex flex-col leading-tight">
                    <span>{testimonial.name}</span>
                    <span className="text-muted-foreground">
                        Becado por BuenaOnda Talks
                    </span>
                </div>
            </div>

            <div className="flex space-x-2">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
            </div>

            <p className="text-muted-foreground">{testimonial.testimonial}</p>
        </div>
    );
};

export const LandingStudentTestimonials = () => {
    return (
        <section className="container space-y-10">
            <div className="space-y-1 text-center">
                <h3 className="text-[#5522AB]">Testimonios</h3>
                <h2 className="text-3xl font-semibold">Nuestra comunidad nos adora</h2>
            </div>

            <div className="flex flex-col space-y-8 xl:flex-row xl:space-x-10 xl:space-y-0">
                <LandingStudentTestimonialsYoutube />

                <div className="flex-1 space-y-4">
                    <Testimonial
                        testimonial={{
                            photo: photoBenja,
                            name: 'Benjamín Quezada',
                            testimonial:
                                'Fue el empujón perfecto para entrar al mundo de la tecnología. Además las clases son flexibles y se acomodan a mis horarios.',
                        }}
                    />

                    <Testimonial
                        testimonial={{
                            photo: photoDreyco,
                            name: 'Dreyco Román',
                            testimonial:
                                'Una experiencia para toda tu vida con una comunidad de las mejores, un grupo de estudio digital con el que puedes hacer grandes cosas. Se que aún me queda todo un camino por recorrer, pero ya siento que soy un programador.',
                        }}
                    />

                    <Testimonial
                        testimonial={{
                            photo: photoMary,
                            name: 'Mary Avril Daboin',
                            testimonial:
                                'Siempre vi la tecnología como una  herramienta para estudiar y conectar con otros pero ahora entiendo que  es un superpoder que permite crear y optar por un mejor futuro laboral.',
                        }}
                    />
                </div>
            </div>
        </section>
    );
};
