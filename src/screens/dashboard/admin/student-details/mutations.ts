import { fetchClient } from '@/api/fetch-client';
import {
    CreateStudentDocument,
    CreateStudentMutationVariables,
    UpdateStudentDocument,
    UpdateStudentMutationVariables,
} from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateStudentMutation = () => {
    const { getToken } = useAuth();
    const _client = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateStudentMutationVariables) => {
            return fetchClient(UpdateStudentDocument, data, {
                getToken,
            });
        },
    });
};

export const useCreateStudentMutation = () => {
    const { getToken } = useAuth();
    const _client = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateStudentMutationVariables) => {
            return fetchClient(CreateStudentDocument, data, {
                getToken,
            });
        },
    });
};
