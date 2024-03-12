import { fetchClient } from '@/api/fetch-client';
import { DeleteUserDocument, DeleteUserMutationVariables } from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_USERS_TABLE_KEY } from './query';

export const useDeleteUser = () => {
    const { getToken } = useAuth();
    const client = useQueryClient();

    return useMutation({
        mutationFn: (data: DeleteUserMutationVariables) => {
            return fetchClient(DeleteUserDocument, data, {
                getToken,
            });
        },
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: [ADMIN_USERS_TABLE_KEY],
            });
        },
    });
};
