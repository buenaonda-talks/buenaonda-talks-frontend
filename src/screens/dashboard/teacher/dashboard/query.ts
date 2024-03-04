import { fetchClient } from '@/api/fetch-client';
import {
    MyStudentsTableDocument,
    MyStudentsTableQuery,
    UsersFilter,
} from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

export const TEACHER_STUDENTS_TABLE_KEY = 'teacher-students-table';

export const TEACHER_STUDENTS_TABLE_QUERY_KEY = (filters: UsersFilter) => [
    TEACHER_STUDENTS_TABLE_KEY,
    filters,
];

export const useAdminUsersTableInfiniteQuery = (filters: UsersFilter) => {
    const { getToken } = useAuth();
    return useInfiniteQuery<
        MyStudentsTableQuery,
        Error,
        InfiniteData<MyStudentsTableQuery>,
        unknown[],
        string | null
    >({
        queryKey: TEACHER_STUDENTS_TABLE_QUERY_KEY(filters),
        queryFn: (props) => {
            return fetchClient(
                MyStudentsTableDocument,
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
            if (!firstPage.myStudents.pageInfo.hasPreviousPage) {
                return null;
            }

            return firstPage.myStudents.pageInfo.endCursor ?? null;
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage.myStudents.pageInfo.hasNextPage) {
                return null;
            }

            return lastPage.myStudents.pageInfo.endCursor ?? null;
        },
        initialPageParam: null,
    });
};
