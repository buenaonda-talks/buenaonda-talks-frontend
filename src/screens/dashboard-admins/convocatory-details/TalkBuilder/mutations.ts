import { fetchClient } from '@/api/fetch-client';
import {
    CreateTalkDocument,
    CreateTalkMutationVariables,
    UpdateTalkDocument,
    UpdateTalkMutationVariables,
} from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateTalkMutation = () => {
    const { getToken } = useAuth();
    const _client = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateTalkMutationVariables) => {
            return fetchClient(UpdateTalkDocument, data, {
                getToken,
            });
        },
    });
};

export const useCreateTalkMutation = () => {
    const { getToken } = useAuth();
    const _client = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTalkMutationVariables) => {
            return fetchClient(CreateTalkDocument, data, {
                getToken,
            });
        },
    });
};
