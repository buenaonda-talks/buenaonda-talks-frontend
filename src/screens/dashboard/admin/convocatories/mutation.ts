import { fetchClient } from '@/api/fetch-client';
import {
    AdminConvocatoriesTableQuery,
    DeleteConvocatoryDocument,
    DeleteConvocatoryMutationVariables,
} from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_CONVOCATORIES_TABLE_QUERY_KEY } from './query';

export const useDeleteConvocatory = () => {
    const { getToken } = useAuth();
    const client = useQueryClient();

    return useMutation({
        mutationFn: (data: DeleteConvocatoryMutationVariables) => {
            return fetchClient(DeleteConvocatoryDocument, data, {
                getToken,
            });
        },
        onSuccess: (data, variables) => {
            client.setQueryData<AdminConvocatoriesTableQuery>(
                ADMIN_CONVOCATORIES_TABLE_QUERY_KEY,
                (oldData) => {
                    if (!oldData) return oldData;

                    return {
                        ...oldData,
                        convocatories: oldData.convocatories.filter(
                            (convocatory) => convocatory.id !== variables.id.toString(),
                        ),
                    };
                },
            );
        },
    });
};
