import { AdminsLayout } from '@/screens/dashboard/admin/shared/layout';
import { AdminUsersTableContainer } from '@/screens/dashboard/admin/users/table';

const Page = () => {
    return (
        <AdminsLayout>
            <AdminUsersTableContainer />
        </AdminsLayout>
    );
};

export default Page;
