import { fetchClient } from '@/api/fetch-client';
import { DeleteCollegeDocument, DeleteCollegeMutationVariables } from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_EDUCATIONAL_INSTITUTION_TABLE_KEY } from './query';

export const useDeleteEducationalInstitution = () => {
    const { getToken } = useAuth();
    const client = useQueryClient();

    return useMutation({
        mutationFn: (data: DeleteCollegeMutationVariables) => {
            return fetchClient(DeleteCollegeDocument, data, {
                getToken,
            });
        },
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: [ADMIN_EDUCATIONAL_INSTITUTION_TABLE_KEY],
            });
        },
    });
};
