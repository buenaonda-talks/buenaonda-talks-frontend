import { AdminApplicationsTableContainer } from '@/screens/dashboard/admin/applications/table';
import { AdminLayout } from '@/screens/dashboard/admin/shared/layout';

const Page = () => {
    return (
        <AdminLayout>
            <AdminApplicationsTableContainer />
        </AdminLayout>
    );
};

export default Page;
