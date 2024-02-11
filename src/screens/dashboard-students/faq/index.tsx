import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

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
        key: 'item-2',
        title: '¿Me van a cobrar algo?',
        content: (
            <div className="space-y-2">
                <p>
                    No, BuenaOnda Talks es un programa gratuito. No te vamos a cobrar nada
                    por participar en las charlas, postularte a las becas o acceder a las
                    oportunidades laborales.
                </p>
            </div>
        ),
    },
    {
        key: 'item-3',
        title: '¿Qué pasa si no tengo experiencia en programación?',
        content: (
            <div className="space-y-2">
                <p>
                    No te preocupes, BuenaOnda Talks es para jóvenes que quieren iniciarse
                    en el mundo de la tecnología. No necesitas tener conocimientos previos
                    en programación para postularte.
                </p>
            </div>
        ),
    },
    {
        key: 'item-4',
        title: 'No tengo computador ¿Puedo postular?',
        content: (
            <div className="space-y-2">
                <p>
                    Te animamos a postularte y veremos tu caso individualmente. En
                    ocasiones anteriores hemos tenido postulantes sin acceso a computadora
                    y hemos hecho los esfuerzos necesarios para conseguirles una junto a
                    su escuela.
                </p>
            </div>
        ),
    },
    {
        key: 'item-5',
        title: 'No tengo acceso a internet ¿Puedo postular?',
        content: (
            <div className="space-y-2">
                <p>
                    Para participar en BuenaOnda Talks necesitas tener acceso a internet.
                </p>

                <p>
                    Esto es necesario para poder acceder a las charlas, postularte a las
                    becas y acceder a las clases online.
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
            <p>
                <a
                    className="underline hover:opacity-60"
                    href="https://platzi.com"
                    target="_blank"
                    rel="noreferrer"
                >
                    Platzi
                </a>{' '}
                es una plataforma de educación online con cursos de tecnología, marketing
                y negocios.
            </p>
        ),
    },
    {
        key: 'item-4',
        title: '¿Como voy a obtener acceso a Platzi?',
        content: (
            <div className="space-y-2">
                <p>
                    Te enviaremos un email al correo con el que te registraste en
                    BuenaOnda Talks.
                </p>
            </div>
        ),
    },
    {
        key: 'item-1',
        title: '¿Que días son las clases?',
        content: (
            <p>
                Platzi es una plataforma online con clases grabadas por lo tanto puedes
                mirar las clases cuando quieras y donde quieras.
            </p>
        ),
    },
    {
        key: 'item-2',
        title: '¿Qué cursos obligatorios debo tomar y para que sirven?',
        content: (
            <div className="space-y-2">
                <div>
                    <p className="mb-1">
                        Hay dos cursos obligatorios que debes tomar en Platzi:
                    </p>

                    <ul className="list-inside list-disc space-y-1">
                        <li>
                            <a className="underline hover:opacity-60" href="#/">
                                <strong>Curso de Programación Básica</strong>
                            </a>
                            : Este curso te enseñará los fundamentos de la programación y
                            te preparará para los cursos más avanzados.
                        </li>
                        <li>
                            <a className="underline hover:opacity-60" href="#/">
                                <strong>Curso de Inglés Técnico</strong>
                            </a>
                            : Este curso te enseñará inglés técnico para que puedas leer y
                            entender la documentación técnica.
                        </li>
                    </ul>
                </div>

                <p>
                    Estos cursos son obligatorios para poder postularte a la siguiente
                    etapa con DEV.F.
                </p>
            </div>
        ),
    },
    {
        key: 'item-3',
        title: '¿Puedo tomar otros cursos además de los obligatorios?',
        content: (
            <p>
                Sí, puedes tomar todos los cursos que quieras en Platzi. La idea es que
                puedas aprender y formarte en lo que más te interese.
            </p>
        ),
    },
    {
        key: 'item-5',
        title: 'Ya terminé los cursos obligatorios ¿Y ahora?',
        content: (
            <div className="space-y-2">
                <p>Felicitaciones, ya completaste la primera etapa de BuenaOnda Talks.</p>

                <p>
                    Nostros enviaremos un aviso por Discord para que puedas postularte a
                    la siguiente etapa con DEV.F.
                </p>

                <p>Las postulaciones a DEV.F etapa se abren cada 1/2 meses.</p>
            </div>
        ),
    },
];

const DEVF_FAQ = [
    {
        key: 'item-1',
        title: '¿Qué es DEV.F?',
        content: (
            <div className="space-y-2">
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
        key: 'item-2',
        title: '¿Como puedo obtener una beca con DEV.F?',
        content: (
            <div className="space-y-2">
                <p>
                    La etapa con DEV.F es la segunda etapa de BuenaOnda Talks. En esta
                    etapa podrás postularte a becas de formación técnica presencial y
                    online.
                </p>

                <p>
                    Para postularte a una beca con DEV.F necesitas haber completado los
                    cursos obligatorios en Platzi.
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
        title: '¿Que pasa si quiero tomar una pausa en mi formación?',
        content: (
            <div className="space-y-2">
                <p>
                    No hay problema, puedes tomar una pausa en tu formación y retomarla
                    cuando quieras.
                </p>

                <p>
                    Si necesitas tomar una pausa en tu formación, comunicate con tu sensei
                    de DEV.F para que puedan ayudarte.
                </p>
            </div>
        ),
    },
    {
        key: 'item-5',
        title: 'Ya no quiero seguir con la formación ¿Que hago?',
        content: (
            <div className="space-y-2">
                <p>Lamentamos que hayas tomado esa decisión.</p>

                <p>
                    Si ya no quieres seguir con la formación, comunicate con nosotros a
                    través de Discord.
                </p>
            </div>
        ),
    },
];

export const DashboardStudentFaq = () => {
    return (
        <div className="flex min-h-screen">
            <div className="mx-auto w-full px-6 pt-6">
                <div className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_300px]">
                    <div className="pb-20">
                        <div className="mb-12">
                            <h1 className="mb-2 scroll-m-20 text-4xl font-bold tracking-tight">
                                Preguntas Frecuentes
                            </h1>

                            <div className="space-y-2">
                                <p className="text-lg text-muted-foreground">
                                    Aquí encontrarás las preguntas más frecuentes sobre
                                    BuenaOnda Talks. Si tienes alguna otra pregunta, no
                                    dudes en contactarnos mediante Discord.
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
                                            <AccordionTrigger>
                                                {faq.title}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {faq.content}
                                            </AccordionContent>
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
                                            <AccordionTrigger>
                                                {faq.title}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {faq.content}
                                            </AccordionContent>
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
                                            <AccordionTrigger>
                                                {faq.title}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {faq.content}
                                            </AccordionContent>
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
                </div>
            </div>
        </div>
    );
};
