import { AdminApplicationsTableContainer } from '@/screens/dashboard/admin/applications/table';
import { AdminsLayout } from '@/screens/dashboard/admin/shared/layout';

const Page = () => {
    return (
        <AdminsLayout>
            <AdminApplicationsTableContainer />
        </AdminsLayout>
    );
};

export default Page;
