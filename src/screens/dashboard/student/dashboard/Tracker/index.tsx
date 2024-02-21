import clsx from 'clsx';
import Image from 'next/image';
import {
    TRACKER_STEPS,
    TRACKER_STEPS_KEYS,
    TrackerStepNumber,
    TrackerStepsKey,
    TrackerStep as TrackerStepType,
} from './constants';
import TrackerIndicator from './TrackerIndicator';
import TrackerStep from './TrackerStep';

type StepsProps = {
    show: boolean;
    steps: TrackerStepType[];
    activeNumber: TrackerStepNumber;
};

const Steps: React.FC<StepsProps> = ({ steps, show, activeNumber }) => (
    <div
        className={clsx(show ? 'grid gap-y-2.5' : 'hidden')}
        style={{
            gridTemplateColumns: '1fr',
            gridAutoRows: '1fr',
        }}
    >
        {steps.map((step) => (
            <TrackerStep
                number={step.number}
                title={step.title}
                key={step.number}
                isActive={step.number === activeNumber}
            >
                {step.description}
            </TrackerStep>
        ))}
    </div>
);

type Props = {
    activeKey: TrackerStepsKey;
    activeNumber: TrackerStepNumber;
    onIndicatorClick: (key: TrackerStepsKey) => void;
};

const Tracker: React.FC<Props> = ({ activeKey, activeNumber, onIndicatorClick }) => (
    <div>
        <Image
            className="mb-3"
            src={TRACKER_STEPS[activeKey].image}
            alt="Logo"
            width={64}
            height={20}
            placeholder="blur"
        />

        <div className="mb-4 bg-[#430AA4] p-5 text-white">
            <p className="font-headings text-xl font-semibold">¡YA ESTÁS EN CAMINO!</p>

            <div className="font-sans text-sm font-light">
                {TRACKER_STEPS[activeKey].description}
            </div>
        </div>

        <div className="mb-5">
            {TRACKER_STEPS_KEYS.map((key) => (
                <Steps
                    key={key}
                    show={key === activeKey}
                    steps={TRACKER_STEPS[key].steps}
                    activeNumber={activeNumber}
                />
            ))}
        </div>

        <div className="flex space-x-8">
            <div className="w-5"></div>

            <div className="flex flex-1 justify-center space-x-7">
                {TRACKER_STEPS_KEYS.map((key) => (
                    <TrackerIndicator
                        key={key}
                        isActive={activeKey === key}
                        onClick={() => onIndicatorClick(key)}
                    />
                ))}
            </div>
        </div>
    </div>
);

export default Tracker;
