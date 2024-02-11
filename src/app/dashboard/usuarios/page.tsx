import { AdminsLayout } from '@/screens/dashboard-admins/shared/layout';
import { AdminUsersTableContainer } from '@/screens/dashboard-admins/users/table';

const Page = () => {
    return (
        <AdminsLayout>
            <AdminUsersTableContainer />
        </AdminsLayout>
    );
};

export default Page;
