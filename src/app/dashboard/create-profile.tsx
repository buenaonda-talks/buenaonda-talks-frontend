import { fetchServer } from '@/api/fetch-server';
import { CreateProfileRegionsDocument } from '@/api/graphql';
import { CreateProfileClient } from './create-profile-client';

const getData = async () => {
    try {
        const response = await fetchServer(CreateProfileRegionsDocument, {});
        return response;
    } catch (error) {
        console.error(error);
    }

    return null;
};

export const DashboardCreateProfile = async () => {
    const res = await getData();

    if (!res) {
        return null;
    }

    return <CreateProfileClient regions={res.regions} />;
};
