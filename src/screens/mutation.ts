import { fetchClient } from '@/api/fetch-client';
import {
    AssistToTalkDocument,
    AssistToTalkMutation,
    AssistToTalkMutationVariables,
    SignUpToTalkDocument,
    SignUpToTalkMutation,
    SignUpToTalkMutationVariables,
    TrackerCurrentStepQuery,
} from '@/api/graphql';
import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { TRACKER_CURRENT_STEP_QUERY_KEY } from './dashboard/student/dashboard/query';
import { useAuth } from '@clerk/nextjs';

type UseSignUpToTalkMutation = UseMutationOptions<
    SignUpToTalkMutation,
    Error,
    SignUpToTalkMutationVariables
>;

export const useSignUpToTalkMutation = ({
    onSuccess,
    ...options
}: UseSignUpToTalkMutation = {}) => {
    const client = useQueryClient();
    const { getToken } = useAuth();

    return useMutation<SignUpToTalkMutation, Error, SignUpToTalkMutationVariables>({
        mutationFn: (data) => {
            return fetchClient(SignUpToTalkDocument, data, {
                getToken,
            });
        },
        onSuccess: (data, variables, context) => {
            const signUpToTalk =
                data.signUpToTalk.__typename === 'TalkInscription'
                    ? data.signUpToTalk
                    : null;

            if (signUpToTalk) {
                client.setQueryData<TrackerCurrentStepQuery>(
                    TRACKER_CURRENT_STEP_QUERY_KEY,
                    (prev) => {
                        const trackerCurrentStep = prev?.trackerCurrentStep;

                        if (
                            !prev ||
                            !trackerCurrentStep ||
                            !trackerCurrentStep.platziTalk ||
                            variables.uuid !== trackerCurrentStep.platziTalk.uuid
                        ) {
                            return prev;
                        }

                        const next: TrackerCurrentStepQuery = {
                            ...prev,
                            trackerCurrentStep: {
                                ...trackerCurrentStep,
                                platziTalk: {
                                    ...trackerCurrentStep.platziTalk,
                                    myInscription: {
                                        number: signUpToTalk.number,
                                    },
                                },
                            },
                        };

                        return next;
                    },
                );
            }

            if (onSuccess) {
                onSuccess(data, variables, context);
            }
        },
        ...options,
    });
};

type AssistToTalkOptions = UseMutationOptions<
    AssistToTalkMutation,
    Error,
    AssistToTalkMutationVariables
>;

export const useAssistToTalk = ({ onSuccess, ...options }: AssistToTalkOptions = {}) => {
    const { getToken } = useAuth();

    return useMutation<AssistToTalkMutation, Error, AssistToTalkMutationVariables>({
        mutationFn: async (data) => {
            return fetchClient(AssistToTalkDocument, data, {
                getToken,
            });
        },
        onSuccess: (data, variables, context) => {
            if (onSuccess) {
                onSuccess(data, variables, context);
            }
        },
        ...options,
    });
};
