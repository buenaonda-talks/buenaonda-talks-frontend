import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { DashboardContentSafeSpace } from '../../shared/dashboard-content-safe-space';

const COMMON_FAQ = [
    {
        key: 'item-1',
        title: '¿Que es BuenaOnda Talks?',
        content: (
            <div className="space-y-2">
                <p>
                    BuenaOnda Talks es un espacio de oportunidades y movilidad social que
                    inspira, articula y conecta a jóvenes con el mundo tech mediante
                    charlas, becas de formación y opciones laborales.
                </p>

                <p>
                    Nuestro objetivo es que más jóvenes puedan acceder a una formación
                    técnica de calidad y a oportunidades laborales en el mundo de la
                    tecnología.
                </p>
            </div>
        ),
    },
    {
        key: 'teacher-item-2',
        title: '¿Cómo les beneficia una beca BuenaOnda Talks a los alumnos?',
        content: (
            <div className="space-y-2">
                <p>
                    BuenaOnda Talks ofrece a los alumnos la oportunidad de aprender
                    habilidades tecnológicas y de programación, fundamentales en el
                    mercado laboral actual.
                </p>

                <p>
                    A través de nuestras becas, los estudiantes acceden a formación
                    técnica de calidad sin costo, mejorando así sus oportunidades de
                    empleabilidad y desarrollo personal.
                </p>
            </div>
        ),
    },
    {
        key: 'teacher-item-3',
        title: '¿Qué requisitos deben cumplir los alumnos para aplicar?',
        content: (
            <div className="space-y-2">
                <p>
                    Los estudiantes interesados deben estar cursando y tener interés en el
                    mundo de la tecnología y programación
                </p>

                <p>
                    No es necesario que tengan experiencia previa en programación, ya que
                    nuestro programa está diseñado para introducir a los jóvenes en este
                    campo desde un nivel básico.
                </p>

                <p>
                    Los deben tener conexión a internet y computador para poder acceder a
                    las clases.
                </p>
            </div>
        ),
    },
    {
        key: 'teacher-item-4',
        title: '¿Cómo puedo promover BuenaOnda Talks entre mis alumnos?',
        content: (
            <div className="space-y-2">
                <p>
                    Puede informar a sus alumnos sobre la existencia del programa durante
                    clases.
                </p>
                <p>
                    Puede ponerse en contacto con nosotros para obtener material
                    informativo y de promoción que puede ser útil para compartir con los
                    estudiantes y otros miembros del cuerpo docente.
                </p>
            </div>
        ),
    },
    {
        key: 'teacher-item-5',
        title: '¿Puedo ver el progreso de mis alumnos en BuenaOnda Talks?',
        content: (
            <div className="space-y-2">
                <p>
                    Sí, puede ver el progreso de sus alumnos en BuenaOnda Talks a través
                    de nuestra plataforma accediendo al{' '}
                    <Link href="/dashboard" className="underline">
                        {' '}
                        menú titulado &quot;Estudiantes&quot;
                    </Link>
                    .
                </p>

                <p>
                    Allí aparecerán todos los estudiantes que se han registrado en
                    BuenaOnda Talks y han seleccionado el mismo colegio que usted al crear
                    su cuenta.
                </p>
            </div>
        ),
    },
];

const PLATZI_FAQ = [
    {
        key: 'item-0',
        title: '¿Qué es Platzi?',
        content: (
            <div className="space-y-2">
                <p>La primera etapa de BuenaOnda Talks es a través de Platzi.</p>

                <p>
                    <a
                        className="underline hover:opacity-60"
                        href="https://platzi.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Platzi
                    </a>{' '}
                    es una plataforma de educación online con cursos de tecnología,
                    marketing y negocios.
                </p>
            </div>
        ),
    },
    {
        key: 'item-2',
        title: '¿Que días son las clases?',
        content: (
            <p>
                Platzi es una plataforma online con clases grabadas por lo tanto los
                alumnos pueden tomar los cursos a su propio ritmo.
            </p>
        ),
    },
];

const DEVF_FAQ = [
    {
        key: 'item-1',
        title: '¿Qué es DEV.F?',
        content: (
            <div className="space-y-2">
                <p>La segunda etapa de BuenaOnda Talks es a través de DEV.F.</p>

                <p>
                    Para postular a una beca con DEV.F el alumno debe haber completado los
                    cursos obligatorios en Platzi.
                </p>

                <p>
                    <a
                        className="underline hover:opacity-60"
                        href="https://devf.la"
                        target="_blank"
                        rel="noreferrer"
                    >
                        DEV.F
                    </a>{' '}
                    es una escuela de programación que ofrece formación técnica online con
                    clases a través de Zoom.
                </p>
            </div>
        ),
    },
    {
        key: 'item-3',
        title: '¿Donde y que días son las clases?',
        content: (
            <div className="space-y-2">
                <p>Las clases de DEV.F son online y se realizan a través de Zoom.</p>

                <p>
                    Las clases son en vivo y se realizan Martes y Jueves de 6:30pm a
                    9:30pm.
                </p>
            </div>
        ),
    },
    {
        key: 'item-4',
        title: '¿Que pasa si el alumno quiere tomar una pausa en su formación?',
        content: (
            <div className="space-y-2">
                <p>
                    No hay problema, pueden tomar una pausa en tu formación y retomarla
                    cuando quiern.
                </p>

                <p>
                    Si alguien necesita tomar una pausa en tu formación, el alumno debe
                    comunicarse con su sensei de DEV.F para que puedan ayudarle.
                </p>
            </div>
        ),
    },
    {
        key: 'item-5',
        title: 'Un alumno ya no quiero seguir con la formación ¿Que puede hacer?',
        content: (
            <div className="space-y-2">
                <p>Lamentamos que haya tomado esa decisión.</p>

                <p>
                    Si ya no quiere seguir con la formación, el alumno puede comunicarse
                    con nosotros a través de Discord o WhatsApp para que podamos ayudarle.
                </p>
            </div>
        ),
    },
];

export const DashboardTeacherFaq = () => {
    return (
        <DashboardContentSafeSpace containerClassName="flex min-h-screen relative lg:gap-10 xl:grid xl:grid-cols-[1fr_300px]">
            <div className="pb-20">
                <div className="mb-12">
                    <h1 className="mb-2 scroll-m-20 text-4xl font-bold tracking-tight">
                        Preguntas Frecuentes
                    </h1>

                    <div className="space-y-2">
                        <p className="text-lg text-muted-foreground">
                            Aquí encontrarás las preguntas más frecuentes sobre BuenaOnda
                            Talks. Si tienes alguna otra pregunta, no dudes en
                            contactarnos mediante Whatsapp.
                        </p>
                    </div>
                </div>

                <div className="space-y-12">
                    <div id="general">
                        <h2 className="mb-1 border-b border-gray-300 pb-4 text-2xl font-bold tracking-tight">
                            Preguntas generales
                        </h2>

                        <Accordion type="single" collapsible>
                            {COMMON_FAQ.map((faq) => (
                                <AccordionItem key={faq.key} value={faq.key}>
                                    <AccordionTrigger className="text-left">
                                        {faq.title}
                                    </AccordionTrigger>
                                    <AccordionContent>{faq.content}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <div id="platzi">
                        <h2 className="mb-1 border-b border-gray-300 pb-4 text-2xl font-bold tracking-tight">
                            Sobre Platzi
                        </h2>

                        <Accordion type="single" collapsible>
                            {PLATZI_FAQ.map((faq) => (
                                <AccordionItem key={faq.key} value={faq.key}>
                                    <AccordionTrigger>{faq.title}</AccordionTrigger>
                                    <AccordionContent>{faq.content}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <div id="devf">
                        <h2 className="mb-1 border-b border-gray-300 pb-4 text-2xl font-bold tracking-tight">
                            Sobre DEV.F
                        </h2>

                        <Accordion type="single" collapsible>
                            {DEVF_FAQ.map((faq) => (
                                <AccordionItem key={faq.key} value={faq.key}>
                                    <AccordionTrigger>{faq.title}</AccordionTrigger>
                                    <AccordionContent>{faq.content}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>

            <div className="hidden text-sm xl:block">
                <div className="sticky top-0 -mt-12 pt-4">
                    <div dir="ltr" className="relative overflow-hidden pb-10">
                        <div>
                            <div className="sticky top-8 -mt-8 h-[calc(100vh-3.5rem)] py-12">
                                <div className="space-y-2">
                                    <p className="font-medium">En esta página</p>

                                    <ul className="m-0 list-none">
                                        <li className="mt-0 pt-2">
                                            <a
                                                href="#general"
                                                className="inline-block font-medium text-foreground no-underline transition-colors hover:text-foreground"
                                            >
                                                Preguntas generales
                                            </a>
                                        </li>
                                        <li className="mt-0 pt-2">
                                            <a
                                                href="#platzi"
                                                className="inline-block text-muted-foreground no-underline transition-colors hover:text-foreground"
                                            >
                                                Sobre Platzi
                                            </a>
                                        </li>
                                        <li className="mt-0 pt-2">
                                            <a
                                                href="#devf"
                                                className="inline-block text-muted-foreground no-underline transition-colors hover:text-foreground"
                                            >
                                                Sobre DEV.F
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardContentSafeSpace>
    );
};
