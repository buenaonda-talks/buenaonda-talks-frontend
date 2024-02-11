import { fetchServer } from '@/api/fetch-server';
import { AdminApplicationByIdDocument } from '@/api/graphql';
import { PageProps } from '@/types/next';
import { ApplicationByIdPage } from './ApplicationByIdPage';

const getData = async (id: string) => {
    try {
        const response = fetchServer(AdminApplicationByIdDocument, {
            id: parseInt(id, 10),
        });
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const Page = async (props: PageProps<{ id: string }>) => {
    const { id } = props.params;
    const data = await getData(id);

    if (!data) {
        return <div>Error</div>;
    }

    return <ApplicationByIdPage data={data} id={parseInt(id, 10)} />;
};

export default Page;
