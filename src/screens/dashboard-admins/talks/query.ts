import { fetchClient } from '@/api/fetch-client';
import { AdminTalksTableDocument } from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

export const ADMIN_TALKS_TABLE_QUERY_KEY = ['admin-talks-table'];

export const useAdminTalksTableQuery = () => {
    const { getToken } = useAuth();
    return useQuery({
        queryKey: ADMIN_TALKS_TABLE_QUERY_KEY,
        queryFn: () => {
            return fetchClient(
                AdminTalksTableDocument,
                {},
                {
                    getToken,
                },
            );
        },
    });
};
