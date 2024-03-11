import { fetchClient } from '@/api/fetch-client';
import {
    AdminCollegesTableDocument,
    AdminCollegesTableFilterOptionsDocument,
    AdminCollegesTableQuery,
    CollegesFilter,
} from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const ADMIN_EDUCATIONAL_INSTITUTION_TABLE_KEY =
    'admin-educational-institutions-table';

export const ADMIN_EDUCATIONAL_INSTITUTION_TABLE_QUERY_KEY = (
    filters: CollegesFilter,
) => [ADMIN_EDUCATIONAL_INSTITUTION_TABLE_KEY, filters];

export const useAdminEducationalInstitutionsTableInfiniteQuery = (
    filters: CollegesFilter,
) => {
    const { getToken } = useAuth();
    return useInfiniteQuery<
        AdminCollegesTableQuery,
        Error,
        InfiniteData<AdminCollegesTableQuery>,
        unknown[],
        string | null
    >({
        queryKey: ADMIN_EDUCATIONAL_INSTITUTION_TABLE_QUERY_KEY(filters),
        queryFn: (props) => {
            return fetchClient(
                AdminCollegesTableDocument,
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
            if (!firstPage.collegesCursor.pageInfo.hasPreviousPage) {
                return null;
            }

            return firstPage.collegesCursor.pageInfo.endCursor ?? null;
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage.collegesCursor.pageInfo.hasNextPage) {
                return null;
            }

            return lastPage.collegesCursor.pageInfo.endCursor ?? null;
        },
        initialPageParam: null,
    });
};

export const useAdminEducationalInstitutionsTableFilterOptionsQuery = () => {
    const { getToken } = useAuth();
    return useQuery({
        queryKey: ['admin-educational-institutions-table-filter-options'],
        queryFn: () => {
            return fetchClient(AdminCollegesTableFilterOptionsDocument, {}, { getToken });
        },
    });
};
