import { fetchClient } from '@/api/fetch-client';
import {
    CreateFormDocument,
    CreateFormMutationVariables,
    UpdateFormDocument,
    UpdateFormMutationVariables,
} from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateFormMutation = () => {
    const { getToken } = useAuth();
    const _client = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateFormMutationVariables) => {
            return fetchClient(CreateFormDocument, data, {
                getToken,
            });
        },
    });
};

export const useUpdateFormMutation = () => {
    const { getToken } = useAuth();
    const _client = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateFormMutationVariables) => {
            return fetchClient(UpdateFormDocument, data, {
                getToken,
            });
        },
    });
};
