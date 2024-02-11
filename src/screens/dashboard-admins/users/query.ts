import { fetchClient } from '@/api/fetch-client';
import {
    AdminUsersTableDocument,
    AdminUsersTableQuery,
    UsersFilter,
} from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

export const ADMIN_USERS_TABLE_KEY = 'admin-users-table';

export const ADMIN_USERS_TABLE_QUERY_KEY = (filters: UsersFilter) => [
    ADMIN_USERS_TABLE_KEY,
    filters,
];

export const useAdminUsersTableInfiniteQuery = (filters: UsersFilter) => {
    const { getToken } = useAuth();
    return useInfiniteQuery<
        AdminUsersTableQuery,
        Error,
        InfiniteData<AdminUsersTableQuery>,
        unknown[],
        string | null
    >({
        queryKey: ADMIN_USERS_TABLE_QUERY_KEY(filters),
        queryFn: (props) => {
            return fetchClient(
                AdminUsersTableDocument,
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
            if (!firstPage.users.pageInfo.hasPreviousPage) {
                return null;
            }

            return firstPage.users.pageInfo.endCursor ?? null;
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage.users.pageInfo.hasNextPage) {
                return null;
            }

            return lastPage.users.pageInfo.endCursor ?? null;
        },
        initialPageParam: null,
    });
};
