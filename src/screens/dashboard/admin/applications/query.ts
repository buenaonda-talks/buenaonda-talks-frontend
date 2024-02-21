import { fetchClient } from '@/api/fetch-client';
import {
    AdminApplicationsTableDocument,
    AdminApplicationsTableFilterOptionsDocument,
    AdminApplicationsTableQuery,
    ApplicationsFilter,
} from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const ADMIN_APPLICATIONS_TABLE_KEY = 'admin-applications-table';

export const ADMIN_APPLICATIONS_TABLE_QUERY_KEY = (filters: ApplicationsFilter) => [
    ADMIN_APPLICATIONS_TABLE_KEY,
    filters,
];

export const useAdminApplicationsTableInfiniteQuery = (filters: ApplicationsFilter) => {
    const { getToken } = useAuth();
    return useInfiniteQuery<
        AdminApplicationsTableQuery,
        Error,
        InfiniteData<AdminApplicationsTableQuery>,
        unknown[],
        string | null
    >({
        queryKey: ADMIN_APPLICATIONS_TABLE_QUERY_KEY(filters),
        queryFn: (props) => {
            return fetchClient(
                AdminApplicationsTableDocument,
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
            if (!firstPage.applications.pageInfo.hasPreviousPage) {
                return null;
            }

            return firstPage.applications.pageInfo.endCursor ?? null;
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage.applications.pageInfo.hasNextPage) {
                return null;
            }

            return lastPage.applications.pageInfo.endCursor ?? null;
        },
        initialPageParam: null,
    });
};

export const useAdminApplicationsTableFilterOptionsQuery = () => {
    const { getToken } = useAuth();
    return useQuery({
        queryKey: ['admin-applications-table-filter-options'],
        queryFn: () => {
            return fetchClient(
                AdminApplicationsTableFilterOptionsDocument,
                {},
                { getToken },
            );
        },
    });
};
