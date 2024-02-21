import { fetchClient } from '@/api/fetch-client';
import { TrackerCurrentStepDocument } from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

export const TRACKER_CURRENT_STEP_QUERY_KEY = ['trackerCurrentStep'];

export const useTrackerCurrentStep = () => {
    const { getToken } = useAuth();

    return useQuery({
        queryKey: TRACKER_CURRENT_STEP_QUERY_KEY,
        queryFn: () => {
            return fetchClient(
                TrackerCurrentStepDocument,
                {},
                {
                    getToken,
                },
            );
        },
        retry: false,
    });
};
