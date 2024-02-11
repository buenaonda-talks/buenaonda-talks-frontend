import { TrackerCurrentStepQuery } from '@/api/graphql';
import { Button } from '@/components/ui/button';
import { getDayName, getHHMM12FormatText, getMonthName } from '@/lib/date-fns';
import routesBuilder from '@/lib/routes';
import { getDate } from 'date-fns';
import Link from 'next/link';

type Props = {
    form: NonNullable<
        NonNullable<TrackerCurrentStepQuery['trackerCurrentStep']>['platziForm']
    >;
};

export const PLATZI_FAQ = [
    {
        title: '¿Que días son las clases?',
        content: (
            <p>
                Platzi es una plataforma online con clases grabadas por lo tanto puedes
                mirar las clases cuando quieras y donde quieras.
            </p>
        ),
    },
    {
        title: 'No tengo computador ¿Puedo postular?',
        content: (
            <>
                <p>Te animamos a postular y veremos tu caso individualmente.</p>
                <p>
                    En ocasiones anteriores hemos tenido postulantes sin acceso a
                    computador y hemos hecho los esfuerzos necesarios para conseguirles
                    uno junto a su escuela.
                </p>
            </>
        ),
    },
];
export const TrackerStep2PlatziFormOpen: React.FC<Props> = ({ form }) => {
    const closeDate = form.closeDate ? new Date(form.closeDate) : new Date();
    const dayName = getDayName(closeDate);
    const monthName = getMonthName(closeDate);

    return (
        <div>
            <div className="rounded-xl border-[3px] border-black px-4 py-8">
                <h1 className="font-headings mb-3 text-center text-xl font-medium">
                    POSTULACIONES ABIERTAS
                </h1>

                <p className="text-center">
                    El formulario de postulación ya se encuentra abierto. Tienes tiempo
                    hasta el{' '}
                    <strong>
                        {dayName} {getDate(closeDate)} de {monthName} a las{' '}
                        {getHHMM12FormatText(closeDate)}hs
                    </strong>
                    .
                </p>

                <div className="flex justify-center pt-8">
                    <Button asChild>
                        <Link href={routesBuilder.formByUUID(form.uuid)}>
                            POSTULA AHORA
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="pt-10">
                <p className="font-headings text-xl font-medium">PREGUNTAS FRECUENTES</p>

                <div className="space-y-4 font-sans font-light">
                    {PLATZI_FAQ.map(({ title, content }) => (
                        <div key={title}>
                            <h3 className="font-medium">{title}</h3>
                            <div className="font-light">{content}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
