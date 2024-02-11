import { TrackerCurrentStepQuery, ApplicationStatus } from '@/api/graphql';
import { PLATZI_FAQ } from '../step-2-platzi-form-open';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import routesBuilder from '@/lib/routes';

type Props = {
    postulation: NonNullable<
        TrackerCurrentStepQuery['trackerCurrentStep']['devfPostulation']
    >;
    newForm: TrackerCurrentStepQuery['trackerCurrentStep']['devfForm'];
};

type StatusDescriptionProps = {
    status: ApplicationStatus;
    observations: string | null;
    formUUID: string | undefined;
    newForm: Props['newForm'];
};

const StatusDescription: React.FC<StatusDescriptionProps> = ({
    status,
    observations,
    formUUID,
    newForm,
}) => {
    if (status === ApplicationStatus.Submitted) {
        return (
            <>
                <h1 className="font-headings text-center text-xl font-medium">
                    POSTULACIÓN RECIBIDA
                </h1>

                <p className="pt-3 text-center">
                    Tu postulación se encuentra en revisión.
                </p>
            </>
        );
    }

    if (status === ApplicationStatus.Accepted) {
        return (
            <>
                <h1 className="font-headings text-center text-xl font-medium">
                    POSTULACIÓN ACEPTADA
                </h1>

                <p className="mb-4 pt-3 text-center">
                    Tu postulación ha sido aceptada. Debes aceptar los términos para
                    continuar.
                </p>

                {formUUID && (
                    <div className="flex justify-center">
                        <Button asChild>
                            <Link href={routesBuilder.formByUUIDTerms(formUUID)}>
                                Aceptar términos
                            </Link>
                        </Button>
                    </div>
                )}
            </>
        );
    }

    if (status === ApplicationStatus.AcceptedTerms) {
        return (
            <>
                <h1 className="font-headings text-center text-xl font-medium">
                    HAS ACEPTADO LOS TÉRMINOS
                </h1>

                <p className="pt-3 text-center">
                    Por favor, contactate con nosotros mediante Discord para continuar con
                    el proceso.
                </p>
            </>
        );
    }

    if (status === ApplicationStatus.Declined) {
        return (
            <>
                <h1 className="font-headings text-center text-xl font-medium">
                    POSTULACIÓN RECHAZADA
                </h1>

                {observations?.length ? (
                    <p className="pt-3 text-center">
                        Tu postulación ha sido rechazada debido a las siguientes razones:{' '}
                        &ldquo;{observations}&rdquo;
                    </p>
                ) : (
                    <p className="pt-3 text-center">
                        No podemos aceptar tu postulación. Generalmente esto ocurre debido
                        a falta de compromiso reflejada en tu postulación.
                    </p>
                )}

                {newForm ? (
                    <div className="flex justify-center pt-2">
                        <Button asChild>
                            <Link href={routesBuilder.formByUUID(newForm.uuid)}>
                                Volver a postular
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <p className="pt-2 text-center">
                        Si crees que esto se trata de un error comunicate con nosotros
                        mediante Discord.
                    </p>
                )}
            </>
        );
    }

    if (status === ApplicationStatus.DeclinedTerms) {
        return (
            <>
                <h1 className="font-headings text-center text-xl font-medium">
                    POSTULACIÓN RECHAZADA
                </h1>

                <p className="pt-3 text-center">
                    Tu postulación ha sido rechazada debido a que no has aceptado los
                    términos de la beca.
                </p>
            </>
        );
    }

    if (status === ApplicationStatus.Pending) {
        return (
            <>
                <h1 className="font-headings text-center text-xl font-medium">
                    POSTULACIÓN PENDIENTE
                </h1>

                {observations?.length ? (
                    <p className="pt-3 text-center">
                        Tu postulación podría ser aceptada pero ha quedado en estado
                        pendiente debido a &ldquo;{observations}&rdquo;.
                    </p>
                ) : (
                    <p className="pt-3 text-center">
                        Tu postulación podría ser aceptada pero debido a alguna razón no
                        podemos admitirla por el momento. Generalmente, esto pasa cuando
                        no tienes conexión a internet o tienes problemas con tu
                        computadora.
                    </p>
                )}

                <p className="pt-2 text-center">
                    Si tu situación cambia o crees que esto se trata de un error
                    comunicate con nosotros mediante Discord.
                </p>
            </>
        );
    }

    if (status === ApplicationStatus.TermsUnanswered) {
        return (
            <>
                <h1 className="font-headings text-center text-xl font-medium">
                    NO HAS RESPONDIDO LOS TÉRMINOS
                </h1>

                <p className="pt-3 text-center">
                    Tu postulación ha sido rechazada debido a que no aceptaste los
                    términos de la beca a tiempo.
                </p>
            </>
        );
    }

    return (
        <>
            <h1 className="font-headings text-center text-xl font-medium">
                POSTULACIÓN RECIBIDA
            </h1>

            <p className="pt-3 text-center">Tu postulación está en revisión</p>
        </>
    );
};

export const TrackerStep9DevFApplicationReceived: React.FC<Props> = ({
    postulation,
    newForm,
}) => {
    const { currentStatus } = postulation;

    return (
        <div>
            <div className="rounded-xl border-[3px] border-black px-4 py-8">
                {currentStatus && (
                    <StatusDescription
                        status={currentStatus.status}
                        observations={currentStatus.observations}
                        formUUID={postulation.form.uuid}
                        newForm={newForm}
                    />
                )}
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
