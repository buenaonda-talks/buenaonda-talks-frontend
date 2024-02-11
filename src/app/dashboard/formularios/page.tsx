import routesBuilder from '@/lib/routes';
import { redirect } from 'next/navigation';

const Page = () => {
    redirect(routesBuilder.dashboard);
};

export default Page;
