import { AdminLayout } from '@/screens/dashboard/admin/shared/layout';
import { AdminUsersTableContainer } from '@/screens/dashboard/admin/users/table';

const Page = () => {
    return (
        <AdminLayout>
            <AdminUsersTableContainer />
        </AdminLayout>
    );
};

export default Page;
