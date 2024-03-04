'use client';

import { useState } from 'react';

import { CreateProfileRegionsQuery } from '@/api/graphql';
import { CreateProfileRoleSelector } from './create-profile-role-selector';
import { CreateProfileLocationFormClient } from './create-profile-location-form-client';

type Props = {
    regions: CreateProfileRegionsQuery['regions'];
};

export enum CreateProfileRole {
    Student = 'student',
    Institution = 'institution',
}

enum Step {
    STEP_1_ROLE = 1,
    STEP_2_LOCATION = 2,
}

export const CreateProfileClient = ({ regions }: Props) => {
    const [step, setStep] = useState(Step.STEP_1_ROLE);
    const [role, setRole] = useState<CreateProfileRole | null>(null);

    if (step === Step.STEP_1_ROLE) {
        return (
            <CreateProfileRoleSelector
                onContinue={(role) => {
                    setRole(role);
                    setStep(Step.STEP_2_LOCATION);
                }}
            />
        );
    }

    if (step === Step.STEP_2_LOCATION && role) {
        return (
            <CreateProfileLocationFormClient
                onBack={() => {
                    setStep(Step.STEP_1_ROLE);
                }}
                role={role}
                regions={regions}
            />
        );
    }

    return null;
};
