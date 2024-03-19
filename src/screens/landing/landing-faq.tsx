import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { LandingFAQSvg } from './resources/landing-faq-svg';
import { LandingButtonCTA } from './landing-button-cta';

type FAQType = {
    question: string;
    answer: string;
};

const FAQ_LIST: FAQType[] = [
    {
        question: '¿Qué es BuenaOnda Talks?',
        answer: 'Lorem ipsum dolor sit amet',
    },
    {
        question: '¿Me van a cobrar algo?',
        answer: 'Lorem ipsum dolor sit amet',
    },
    {
        question: '¿Por donde son las clases?',
        answer: 'Lorem ipsum dolor sit amet',
    },
    {
        question: '¿En que horario son las clases?',
        answer: 'Lorem ipsum dolor sit amet',
    },
    {
        question: '¿Puedo invitar a un amigo?',
        answer: 'Lorem ipsum dolor sit amet',
    },
    {
        question: '¿Como puedo obtener una beca?',
        answer: 'Lorem ipsum dolor sit amet',
    },
];

export const LandingFAQ = () => (
    <section className="container">
        <div className="space-y-2 rounded-xl bg-brand-muted p-6 xl:space-y-10 xl:p-10">
            <h2 className="text-2xl font-semibold xl:text-3xl">Preguntas Frecuentes</h2>

            <div className="xl:flex xl:space-x-8">
                <div className="xl:flex-1">
                    <Accordion type="single" collapsible className="w-full">
                        {FAQ_LIST.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <div className="relative mt-16 flex items-center justify-center py-20 sm:mt-10 xl:mt-0 xl:flex-1">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <LandingFAQSvg />
                    </div>

                    <div className="relative space-y-2.5">
                        <div className="text-center font-headings font-semibold">
                            <p>¿Aún tienes preguntas o te gustaría participar?</p>
                            <p>Escríbenos por Whatsapp</p>
                        </div>

                        <div className="flex justify-center">
                            <LandingButtonCTA />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
