import { ScholarshipStatus, TrackerCurrentStepQuery } from '@/api/graphql';
import { PLATZI_FAQ } from '../step-2-platzi-form-open';

type Props = {
    scholarship: NonNullable<
        TrackerCurrentStepQuery['trackerCurrentStep']['platziScholarship']
    >;
};

export const TrackerStep5PlatziGranted: React.FC<Props> = ({ scholarship }) => {
    if (scholarship.currentStatus?.status !== ScholarshipStatus.Resigned) {
        return (
            <div>
                <div className="rounded-xl border-[3px] border-black px-4 py-8">
                    <h1 className="font-headings mb-3 text-center text-xl font-medium">
                        ¡Felicitaciones!
                    </h1>

                    <p className="text-center">
                        Estamos creando tu cuenta en Platzi, pronto te llegará un correo
                        con las credenciales de acceso. Si tienes alguna duda puedes
                        escribirnos en{' '}
                        <a
                            className="text-primary-v2 underline"
                            href="https://discord.gg/QpkPeKRskA"
                        >
                            Discord
                        </a>
                        .
                    </p>
                </div>

                <div className="pt-10">
                    <p className="font-headings text-xl font-medium">
                        PREGUNTAS FRECUENTES
                    </p>

                    <div className="space-y-4 font-sans font-light">
                        {PLATZI_FAQ.map(({ title, content }) => (
                            <div key={title}>
                                <h3 className="font-medium">{title}</h3>
                                <p className="font-light">{content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="rounded-xl border-[3px] border-black px-4 py-8">
                <h1 className="font-headings mb-3 text-center text-xl font-medium">
                    Has renunciado a tu beca
                </h1>

                <p className="text-center">Ya no cuentas con Platzi.</p>
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
