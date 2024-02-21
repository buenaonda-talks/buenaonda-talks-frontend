import { StaticImageData } from 'next/image';

import devfLogo from './devf-logo.jpg';
import platziLogo from './platzi-logo.jpg';

export enum TrackerStepNumber {
    STEP_1_PLATZI_TALK = 1,
    STEP_2_PLATZI_FORM_OPEN = 2,
    STEP_3_PLATZI_APPLICATION_SENT = 3,
    STEP_4_PLATZI_APPLICATION_RECEIVED = 4,
    STEP_5_PLATZI_GRANTED = 5,
    STEP_6_PLATZI_COMPLETED = 6,
    STEP_7_DEVF_APPLICATION = 7,
    STEP_8_DEVF_APPLICATION_SENT = 8,
    STEP_9_DEVF_APPLICATION_RECEIVED = 9,
    STEP_10_DEVF_GRANTED = 10,
}

export type TrackerStep = {
    number: TrackerStepNumber;
    title: string;
    description: React.ReactNode;
};

export const TRACKER_PLATZI_STEPS: TrackerStep[] = [
    {
        number: TrackerStepNumber.STEP_1_PLATZI_TALK,
        title: 'Charla',
        description: (
            <>
                <p>
                    Inscríbete y participa de una charla informativa sobre como obtener
                    tus becas.
                </p>
                <p className="font-normal">
                    Confirma tu asistencia para obtener el link al evento.
                </p>
            </>
        ),
    },
    {
        number: TrackerStepNumber.STEP_2_PLATZI_FORM_OPEN,
        title: 'Postulación a Beca Platzi',
        description: (
            <p>
                Rellena el formulario para solicitar una beca en Platzi. Solo necesitas
                Internet, un computador y tiempo disponible para completar el curso
            </p>
        ),
    },
    {
        number: TrackerStepNumber.STEP_3_PLATZI_APPLICATION_SENT,
        title: 'Postulación a Platzi enviada',
        description: (
            <>
                <p>¡Tu postulación ya fue envíada!</p>
                <p>Te mantendremos informado sobre tu solicitud</p>
            </>
        ),
    },
    {
        number: TrackerStepNumber.STEP_4_PLATZI_APPLICATION_RECEIVED,
        title: 'Postulación a Platzi recibida',
        description: (
            <>
                <p>Hemos recibido tu postulación.</p>
                <p className="font-normal">
                    Recuerda que debes aceptar los terminos y condiciones para acceder a
                    la beca.
                </p>
            </>
        ),
    },
    {
        number: TrackerStepNumber.STEP_5_PLATZI_GRANTED,
        title: 'Beca Platzi otorgada',
        description: (
            <>
                <p>¡Felicidades!</p>
                <p>
                    <span className="font-normal">
                        Estamos creando tu cuenta en Platzi
                    </span>
                    , pronto te llegará un correo con las credenciales de acceso. Si
                    tienes alguna duda puedes escribirnos en{' '}
                    <a
                        className="font-bold text-white underline"
                        href="https://discord.gg/QpkPeKRskA"
                    >
                        Discord
                    </a>
                    .
                </p>
            </>
        ),
    },
];

export enum PlatziStepKey {
    TALK = 1,
    PLATZI_APPLICATION = 2,
    PLATZI_APPLICATION_SENT = 3,
    PLATZI_APPLICATION_RECEIVED = 4,
    PLATZI_GRANTED = 5,
}

export const TRACKER_DEVF_STEPS: TrackerStep[] = [
    {
        number: TrackerStepNumber.STEP_6_PLATZI_COMPLETED,
        title: 'Cursos de Platzi completados',
        description: (
            <>
                <p>Haz terminado tus cursos en platzi</p>
                <p>Ya puedes postular a tu beca 100% gratuita en Dev.F</p>
            </>
        ),
    },
    {
        number: TrackerStepNumber.STEP_7_DEVF_APPLICATION,
        title: 'Postulación a Beca Dev.F',
        description: (
            <>
                <p>Rellena el formulario para solicitar tu beca Dev.F</p>
                <p>
                    Solo necesitas Internet, tu computador y tiempo disponible para
                    completar el curso
                </p>
            </>
        ),
    },
    {
        number: TrackerStepNumber.STEP_8_DEVF_APPLICATION_SENT,
        title: 'Postulación a Dev.F enviada',
        description: (
            <>
                <p>¡Tu postulación ya fue envíada!</p>
                <p>Te mantendremos informado sobre tu solicitud</p>
            </>
        ),
    },
    {
        number: TrackerStepNumber.STEP_9_DEVF_APPLICATION_RECEIVED,
        title: 'Postulación a Dev.F recibida',
        description: (
            <>
                <p>Hemos recibido tu postulación.</p>
                <p className="font-normal">
                    Recuerda que debes aceptar los terminos y condiciones para acceder a
                    la beca.
                </p>
            </>
        ),
    },
    {
        number: TrackerStepNumber.STEP_10_DEVF_GRANTED,
        title: 'Beca Dev.F otorgada',
        description: (
            <>
                <p>¡Felicidades!</p>
                <p>Haz obtenido una beca 100% gratuita en Dev.F</p>
                <p className="font-normal">
                    Sigue las indicaciones para iniciar tus clases.
                </p>
            </>
        ),
    },
];

export enum TrackerStepsKey {
    PLATZI = 1,
    DEVF = 2,
}

type TrackerSteps = Record<
    TrackerStepsKey,
    {
        steps: TrackerStep[];
        image: StaticImageData;
        description: React.ReactElement;
    }
>;

export const TRACKER_STEPS: TrackerSteps = {
    [TrackerStepsKey.PLATZI]: {
        steps: TRACKER_PLATZI_STEPS,
        image: platziLogo,
        description: (
            <>
                <p>Trackea tu progreso.</p>
                <p>
                    Completa los siguientes pasos pasos para obtener tu primera beca con
                    Platzi y aprende los aspectos básicos de la programación.
                </p>
            </>
        ),
    },
    [TrackerStepsKey.DEVF]: {
        steps: TRACKER_DEVF_STEPS,
        image: devfLogo,
        description: (
            <>
                <p>Trackea tu progreso.</p>
                <p>
                    Completa los siguientes pasos pasos para obtener tu beca Dev.F y
                    estudia online en la escuela de tecnología más grande de Latinoámerica
                </p>
            </>
        ),
    },
};

export const TRACKER_STEPS_KEYS = [TrackerStepsKey.PLATZI, TrackerStepsKey.DEVF];
