import { fetchServer } from '@/api/fetch-server';
import { FormByUuidDocument } from '@/api/graphql';
import { PageProps } from '@/types/next';
import { FormByUUIDPage } from './FormByUUIDPage';

const getData = async (uuid: string) => {
    try {
        const response = fetchServer(FormByUuidDocument, { uuid });
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const Page = async (props: PageProps<{ uuid: string }>) => {
    const { uuid } = props.params;
    const data = await getData(uuid);

    if (!data) {
        return <div>Error</div>;
    }

    return <FormByUUIDPage uuid={uuid} data={data} />;
};

export default Page;
