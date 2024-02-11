import { PLATZI_FAQ } from '../step-2-platzi-form-open';

export const TrackerStep3PlatziFormSent: React.FC = () => {
    return (
        <div>
            <div className="rounded-xl border-[3px] border-black px-4 py-8">
                <h1 className="font-headings mb-3 text-center text-xl font-medium">
                    POSTULACIÓN ENVIADA
                </h1>

                <p className="text-center">
                    Tu postulación a sido enviada. En los próximos días notificaremos por
                    Discord los resultados.
                </p>
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
