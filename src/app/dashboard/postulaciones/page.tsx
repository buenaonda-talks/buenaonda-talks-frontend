import { AdminApplicationsTableContainer } from '@/screens/dashboard-admins/applications/table';
import { AdminsLayout } from '@/screens/dashboard-admins/shared/layout';

const Page = () => {
    return (
        <AdminsLayout>
            <AdminApplicationsTableContainer />
        </AdminsLayout>
    );
};

export default Page;
