import { fetchClient } from '@/api/fetch-client';
import {
    AdminStudentsTableDocument,
    AdminStudentsTableFilterOptionsDocument,
    AdminStudentsTableQuery,
    StudentsFilter,
} from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const ADMIN_STUDENTS_TABLE_KEY = 'admin-students-table';

export const ADMIN_STUDENTS_TABLE_QUERY_KEY = (filters: StudentsFilter) => [
    ADMIN_STUDENTS_TABLE_KEY,
    filters,
];

export const useAdminStudentsTableInfiniteQuery = (filters: StudentsFilter) => {
    const { getToken } = useAuth();
    return useInfiniteQuery<
        AdminStudentsTableQuery,
        Error,
        InfiniteData<AdminStudentsTableQuery>,
        unknown[],
        string | null
    >({
        queryKey: ADMIN_STUDENTS_TABLE_QUERY_KEY(filters),
        queryFn: (props) => {
            return fetchClient(
                AdminStudentsTableDocument,
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
            if (!firstPage.students.pageInfo.hasPreviousPage) {
                return null;
            }

            return firstPage.students.pageInfo.endCursor ?? null;
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage.students.pageInfo.hasNextPage) {
                return null;
            }

            return lastPage.students.pageInfo.endCursor ?? null;
        },
        initialPageParam: null,
    });
};

export const useAdminStudentsTableFilterOptionsQuery = () => {
    const { getToken } = useAuth();
    return useQuery({
        queryKey: ['admin-students-table-filter-options'],
        queryFn: () => {
            return fetchClient(AdminStudentsTableFilterOptionsDocument, {}, { getToken });
        },
    });
};
