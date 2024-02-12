import { fetchServer } from '../fetch-server';
import { UserDocument } from '../graphql';

export const fetchUserServer = async () => {
    try {
        const user = await fetchServer(UserDocument, {});
        return user;
    } catch (error) {
        console.error(error);

        return null;
    }
};
