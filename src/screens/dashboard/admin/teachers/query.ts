import { fetchClient } from '@/api/fetch-client';
import {
    AdminTeachersTableDocument,
    AdminTeachersTableQuery,
    TeachersFilter,
} from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

export const ADMIN_TEACHERS_TABLE_KEY = 'admin-teachers-table';

export const ADMIN_TEACHERS_TABLE_QUERY_KEY = (filters: TeachersFilter) => [
    ADMIN_TEACHERS_TABLE_KEY,
    filters,
];

export const useAdminTeachersTableInfiniteQuery = (filters: TeachersFilter) => {
    const { getToken } = useAuth();
    return useInfiniteQuery<
        AdminTeachersTableQuery,
        Error,
        InfiniteData<AdminTeachersTableQuery>,
        unknown[],
        string | null
    >({
        queryKey: ADMIN_TEACHERS_TABLE_QUERY_KEY(filters),
        queryFn: (props) => {
            return fetchClient(
                AdminTeachersTableDocument,
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
            if (!firstPage.teachers.pageInfo.hasPreviousPage) {
                return null;
            }

            return firstPage.teachers.pageInfo.endCursor ?? null;
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage.teachers.pageInfo.hasNextPage) {
                return null;
            }

            return lastPage.teachers.pageInfo.endCursor ?? null;
        },
        initialPageParam: null,
    });
};
