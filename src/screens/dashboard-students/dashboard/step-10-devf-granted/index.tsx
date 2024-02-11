import { ScholarshipStatus, TrackerCurrentStepQuery } from '@/api/graphql';
import { DEVF_FAQ } from '../step-7-devf-form';

type Props = {
    scholarship: NonNullable<
        TrackerCurrentStepQuery['trackerCurrentStep']['devfScholarship']
    >;
};

export const TrackerStep10DevFGranted: React.FC<Props> = ({ scholarship }) => {
    if (scholarship.currentStatus?.status !== ScholarshipStatus.Resigned) {
        return (
            <div>
                <div className="rounded-xl border-[3px] border-black px-4 py-8">
                    <h1 className="font-headings mb-3 text-center text-xl font-medium">
                        ¡Felicitaciones!
                    </h1>

                    <p className="text-center">Ya cuentas con Dev.F.</p>
                </div>

                <div className="pt-10">
                    <p className="font-headings text-xl font-medium">
                        PREGUNTAS FRECUENTES
                    </p>

                    <div className="space-y-4 font-sans font-light">
                        {DEVF_FAQ.map(({ title, content }) => (
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

                <p className="text-center">Ya no cuentas con Dev.F.</p>
            </div>

            <div className="pt-10">
                <p className="font-headings text-xl font-medium">PREGUNTAS FRECUENTES</p>

                <div className="space-y-4 font-sans font-light">
                    {DEVF_FAQ.map(({ title, content }) => (
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
