import { fetchClient } from '@/api/fetch-client';
import {
    AdminScholarshipsTableDocument,
    AdminScholarshipsTableFilterOptionsDocument,
    AdminScholarshipsTableQuery,
    ScholarshipsFilter,
} from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const ADMIN_SCHOLARSHIPS_TABLE_KEY = 'admin-scholarships-table';

export const ADMIN_SCHOLARSHIPS_TABLE_QUERY_KEY = (filters: ScholarshipsFilter) => [
    ADMIN_SCHOLARSHIPS_TABLE_KEY,
    filters,
];

export const useAdminScholarshipsTableInfiniteQuery = (filters: ScholarshipsFilter) => {
    const { getToken } = useAuth();
    return useInfiniteQuery<
        AdminScholarshipsTableQuery,
        Error,
        InfiniteData<AdminScholarshipsTableQuery>,
        unknown[],
        string | null
    >({
        queryKey: ADMIN_SCHOLARSHIPS_TABLE_QUERY_KEY(filters),
        queryFn: (props) => {
            return fetchClient(
                AdminScholarshipsTableDocument,
                {
                    after: props.pageParam ?? null,
                    before: null,
                    first: null,
                    last: null,
                    filter: filters,
                },
                {
                    getToken,
                },
            );
        },
        getPreviousPageParam: (firstPage) => {
            if (!firstPage.scholarships.pageInfo.hasPreviousPage) {
                return null;
            }

            return firstPage.scholarships.pageInfo.endCursor ?? null;
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage.scholarships.pageInfo.hasNextPage) {
                return null;
            }

            return lastPage.scholarships.pageInfo.endCursor ?? null;
        },
        initialPageParam: null,
    });
};

export const useAdminScholarshipsTableFilterOptionsQuery = () => {
    const { getToken } = useAuth();
    return useQuery({
        queryKey: ['admin-scholarships-table-filter-options'],
        queryFn: () => {
            return fetchClient(
                AdminScholarshipsTableFilterOptionsDocument,
                {},
                { getToken },
            );
        },
    });
};
