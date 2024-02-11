import { fetchClient } from '@/api/fetch-client';
import { AdminConvocatoriesTableDocument } from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

export const ADMIN_CONVOCATORIES_TABLE_QUERY_KEY = ['admin-convocatories-table'];

export const useAdminConvocatoriesTableQuery = () => {
    const { getToken } = useAuth();
    return useQuery({
        queryKey: ADMIN_CONVOCATORIES_TABLE_QUERY_KEY,
        queryFn: () => {
            return fetchClient(
                AdminConvocatoriesTableDocument,
                {},
                {
                    getToken,
                },
            );
        },
    });
};
