import { useAuth } from '@clerk/nextjs';
import { fetchClient } from '../fetch-client';
import { UserDocument } from '../graphql';
import { useQuery } from '@tanstack/react-query';

export const useUserQuery = () => {
    const { getToken } = useAuth();

    return useQuery({
        queryKey: ['user'],
        queryFn: () =>
            fetchClient(
                UserDocument,
                {},
                {
                    getToken,
                },
            ),
    });
};
