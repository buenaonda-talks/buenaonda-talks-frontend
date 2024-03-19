type BenefitType = {
    heading: string;
    subheading: string;
    description: string;
};

const BENEFITS: BenefitType[] = [
    {
        heading: 'Aprende construyendo',
        subheading: 'Desarrolla un videojuego en 45 días',
        description:
            'Tu primer curso para entrar al mundo de la tecnología te permitirá crear un videojuego simple donde podrás poner a prueba tus conocimientos.',
    },
    {
        heading: 'Discord y Comunidad',
        subheading: 'Aprende junto a tus compañeros',
        description:
            'Postulando a una beca obtendrás acceso a nuestra exclusiva comunidad en Discord donde podrás conectar con otros estudiantes como tú.',
    },
    {
        heading: 'Empleabilidad',
        subheading: 'Contenido avalado por empresas',
        description:
            'Aprende las habilidades más demandadas por el mercado. Accede a  capacitaciones, workshops y un acompañamiento personalizado para tu búsqueda laboral.',
    },
    {
        heading: 'Sin cobros',
        subheading: 'Beca del 100%',
        description:
            'Obtén una beca gratuita con la que desarrollarás las habilidades necesarias para entrar en la industria digital y crear tu futuro.',
    },
    {
        heading: 'Líderes de la industria',
        subheading: 'Profesores expertos',
        description:
            'Aprende interactuando con líderes de gran trayectoria en las empresas de tecnología más innovadoras a nivel global.',
    },
    {
        heading: 'Método educativo',
        subheading: 'Aprende a tu ritmo',
        description:
            'Online, flexible y rápido. Pondrás en práctica todos los conocimientos aprendidos y crearás tu portfolio de proyectos.',
    },
];

export const LandingWhyBoTalks = () => {
    return (
        <section className="container space-y-10">
            <div className="space-y-1 text-center">
                <h3 className="text-[#5522AB]">Beneficios</h3>
                <h2 className="text-3xl font-semibold">
                    ¿Por qué <span className="text-brand-primary">BuenaOnda Talks?</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {BENEFITS.map((benefit, index) => (
                    <div key={index} className="space-y-2 rounded-xl bg-brand-muted p-8">
                        <div className="space-y-1">
                            <span className="font-semibold text-[#9F97DC]">
                                {benefit.heading}
                            </span>

                            <h4 className="text-xl font-semibold">
                                {benefit.subheading}
                            </h4>
                        </div>

                        <p>{benefit.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
