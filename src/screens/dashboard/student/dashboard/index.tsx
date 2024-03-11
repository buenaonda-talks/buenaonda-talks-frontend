'use client';

import { cn } from '@/lib/utils';
import {
    TRACKER_DEVF_STEPS,
    TRACKER_PLATZI_STEPS,
    TrackerStep,
    TrackerStepNumber,
} from './Tracker/constants';
import Image from 'next/image';

import platziLogo from './platzi-logo.png';
import devfLogo from './devf-logo.png';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrackerStep1TalkAvailable } from './step-1-talk-available';
import { useTrackerCurrentStep } from './query';
import { TrackerStep1NoTalkAvailable } from './step-1-no-talk-available';
import { ApplicationStatus, TrackerCurrentStepQuery } from '@/api/graphql';
import { TrackerStep2PlatziFormOpen } from './step-2-platzi-form-open';
import { TrackerStep3PlatziFormSent } from './step-3-platzi-form-sent';
import { TrackerStep4PlatziApplicationReceived } from './step-4-platzi-application-received';
import { TrackerStep5PlatziGranted } from './step-5-platzi-granted';
import { TrackerStep6PlatziCompleted } from './step-6-platzi-completed';
import { TrackerStep7DevFForm } from './step-7-devf-form';
import { TrackerStep8DevFApplicationSent } from './step-8-devf-application-sent';
import { TrackerStep9DevFApplicationReceived } from './step-9-devf-application-received';
import { TrackerStep10DevFGranted } from './step-10-devf-granted';
import { DashboardContentSafeSpace } from '../../shared/dashboard-content-safe-space';

enum TabValue {
    PLATZI = 'platzi',
    DEVF = 'devf',
}

const determineCurrentStep = (
    trackerData: TrackerCurrentStepQuery['trackerCurrentStep'],
): TrackerStepNumber | null => {
    if (trackerData.devfScholarship) {
        return TrackerStepNumber.STEP_10_DEVF_GRANTED;
    }

    if (trackerData.devfPostulation) {
        return TrackerStepNumber.STEP_9_DEVF_APPLICATION_RECEIVED;
    }

    if (trackerData.devfForm) {
        return TrackerStepNumber.STEP_7_DEVF_APPLICATION;
    }

    if (trackerData.platziScholarship?.platziCompletedMandatoryCourses) {
        return TrackerStepNumber.STEP_6_PLATZI_COMPLETED;
    }

    if (trackerData.platziScholarship) {
        return TrackerStepNumber.STEP_5_PLATZI_GRANTED;
    }

    if (
        trackerData.platziPostulation?.currentStatus?.status !==
        ApplicationStatus.Submitted
    ) {
        return TrackerStepNumber.STEP_4_PLATZI_APPLICATION_RECEIVED;
    }

    if (trackerData.platziPostulation) {
        return TrackerStepNumber.STEP_3_PLATZI_APPLICATION_SENT;
    }

    if (trackerData.platziForm) {
        return TrackerStepNumber.STEP_2_PLATZI_FORM_OPEN;
    }

    if (trackerData.platziTalk) {
        return TrackerStepNumber.STEP_1_PLATZI_TALK;
    }

    return null;
};

const StepItem = ({
    step,
    current,
}: {
    step: TrackerStep;
    current: TrackerStepNumber | null;
}) => {
    return (
        <li
            key={step.number}
            className={cn(
                'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all',
                current === step.number && 'bg-muted',
            )}
        >
            <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                    <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-black text-center text-xs">
                            {step.number}
                        </span>

                        <div className="font-semibold">{step.title}</div>
                    </div>
                </div>
            </div>

            <div className="text-sm text-muted-foreground">{step.description}</div>
        </li>
    );
};

export const DashboardStudentsHome: React.FC = () => {
    const trackerCurrentStepResult = useTrackerCurrentStep();

    if (!trackerCurrentStepResult.data) {
        return (
            <div className="flex min-h-screen">
                <div className="order-2 w-6/12 px-6 pt-6 xl:order-1">
                    <div className="mb-4 h-[30px] animate-pulse rounded-xl bg-gray-200"></div>

                    <div className="mb-4 h-[40px] w-[100px] animate-pulse rounded-xl bg-gray-200"></div>

                    <div className="space-y-2">
                        <div className="h-[100px] animate-pulse rounded-xl bg-gray-200"></div>
                        <div className="h-[100px] animate-pulse rounded-xl bg-gray-200"></div>
                        <div className="h-[100px] animate-pulse rounded-xl bg-gray-200"></div>
                    </div>
                </div>

                <div className="order-1 w-6/12 px-6 pt-6 xl:order-2">
                    <div className="h-[350px] animate-pulse rounded-xl bg-gray-200"></div>
                </div>
            </div>
        );
    }

    const currentStep = determineCurrentStep(
        trackerCurrentStepResult.data.trackerCurrentStep,
    );

    return (
        <DashboardContentSafeSpace containerClassName="flex lg:flex-row flex-col">
            <div className="order-2 border-t pt-6 lg:order-1 lg:w-6/12 lg:border-r lg:border-t-0 lg:pr-6 lg:pt-0">
                <Tabs defaultValue={TabValue.PLATZI}>
                    <div className="flex items-center">
                        <h2 className="mb-4 text-lg font-bold">Sigue tu proceso</h2>

                        <TabsList className="ml-auto">
                            <TabsTrigger
                                value={TabValue.PLATZI}
                                className="text-zinc-600 dark:text-zinc-200"
                            >
                                Beca Platzi
                            </TabsTrigger>

                            <TabsTrigger
                                value={TabValue.DEVF}
                                className="text-zinc-600 dark:text-zinc-200"
                            >
                                Beca Dev.F
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="platzi" className="m-0">
                        <div className="mb-4 flex h-8 w-24 items-center">
                            <Image
                                src={platziLogo}
                                width={1558}
                                height={496}
                                alt="Platzi"
                            />
                        </div>

                        <ul className="flex flex-col gap-2">
                            {TRACKER_PLATZI_STEPS.map((step) => (
                                <StepItem
                                    current={currentStep}
                                    step={step}
                                    key={step.number}
                                />
                            ))}
                        </ul>
                    </TabsContent>

                    <TabsContent value={TabValue.DEVF} className="m-0">
                        <div className="mb-4 flex h-8 w-24 items-center">
                            <Image src={devfLogo} width={800} height={185} alt="Dev.F" />
                        </div>

                        <ul className="flex flex-col gap-2">
                            {TRACKER_DEVF_STEPS.map((step) => (
                                <StepItem
                                    current={currentStep}
                                    step={step}
                                    key={step.number}
                                />
                            ))}
                        </ul>
                    </TabsContent>
                </Tabs>
            </div>

            <div className="order-1 pb-6 lg:order-2 lg:w-6/12 lg:pb-0 lg:pl-6">
                {currentStep === null && <TrackerStep1NoTalkAvailable />}

                {currentStep === TrackerStepNumber.STEP_1_PLATZI_TALK &&
                    trackerCurrentStepResult.data.trackerCurrentStep.platziTalk && (
                        <TrackerStep1TalkAvailable
                            talk={
                                trackerCurrentStepResult.data.trackerCurrentStep
                                    .platziTalk
                            }
                        />
                    )}

                {currentStep === TrackerStepNumber.STEP_2_PLATZI_FORM_OPEN &&
                    trackerCurrentStepResult.data.trackerCurrentStep.platziForm && (
                        <TrackerStep2PlatziFormOpen
                            form={
                                trackerCurrentStepResult.data.trackerCurrentStep
                                    .platziForm
                            }
                        />
                    )}

                {currentStep === TrackerStepNumber.STEP_3_PLATZI_APPLICATION_SENT && (
                    <TrackerStep3PlatziFormSent />
                )}

                {currentStep === TrackerStepNumber.STEP_4_PLATZI_APPLICATION_RECEIVED &&
                    trackerCurrentStepResult.data.trackerCurrentStep
                        .platziPostulation && (
                        <TrackerStep4PlatziApplicationReceived
                            newForm={
                                trackerCurrentStepResult.data.trackerCurrentStep
                                    .platziForm
                            }
                            postulation={
                                trackerCurrentStepResult.data.trackerCurrentStep
                                    .platziPostulation
                            }
                        />
                    )}

                {currentStep === TrackerStepNumber.STEP_5_PLATZI_GRANTED &&
                    trackerCurrentStepResult.data.trackerCurrentStep
                        .platziScholarship && (
                        <TrackerStep5PlatziGranted
                            scholarship={
                                trackerCurrentStepResult.data.trackerCurrentStep
                                    .platziScholarship
                            }
                        />
                    )}

                {currentStep === TrackerStepNumber.STEP_6_PLATZI_COMPLETED && (
                    <TrackerStep6PlatziCompleted />
                )}

                {currentStep === TrackerStepNumber.STEP_7_DEVF_APPLICATION &&
                    trackerCurrentStepResult.data.trackerCurrentStep.devfForm && (
                        <TrackerStep7DevFForm
                            form={
                                trackerCurrentStepResult.data.trackerCurrentStep.devfForm
                            }
                        />
                    )}

                {currentStep === TrackerStepNumber.STEP_8_DEVF_APPLICATION_SENT && (
                    <TrackerStep8DevFApplicationSent />
                )}

                {currentStep === TrackerStepNumber.STEP_9_DEVF_APPLICATION_RECEIVED &&
                    trackerCurrentStepResult.data.trackerCurrentStep.devfPostulation && (
                        <TrackerStep9DevFApplicationReceived
                            newForm={
                                trackerCurrentStepResult.data.trackerCurrentStep.devfForm
                            }
                            postulation={
                                trackerCurrentStepResult.data.trackerCurrentStep
                                    .devfPostulation
                            }
                        />
                    )}

                {currentStep === TrackerStepNumber.STEP_10_DEVF_GRANTED &&
                    trackerCurrentStepResult.data.trackerCurrentStep.devfScholarship && (
                        <TrackerStep10DevFGranted
                            scholarship={
                                trackerCurrentStepResult.data.trackerCurrentStep
                                    .devfScholarship
                            }
                        />
                    )}
            </div>
        </DashboardContentSafeSpace>
    );
};
