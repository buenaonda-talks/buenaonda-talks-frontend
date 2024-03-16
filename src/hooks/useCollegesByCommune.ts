import { fetchClient } from '@/api/fetch-client';
import { CollegesByCommuneDocument } from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

export const useCollegesByCommune = (communeId: number | undefined | null) => {
    const { getToken } = useAuth();
    return useQuery({
        queryKey: ['colleges', { communeId }],
        queryFn: async () => {
            return fetchClient(
                CollegesByCommuneDocument,
                {
                    communeId: communeId as number,
                },
                { getToken },
            );
        },
        enabled: !!communeId,
    });
};
