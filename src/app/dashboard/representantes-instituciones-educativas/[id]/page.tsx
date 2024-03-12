import { AdminTeachersTableContainer } from '@/screens/dashboard/admin/teachers/table';
import { AdminLayout } from '@/screens/dashboard/admin/shared/layout';

const Page = () => {
    return (
        <AdminLayout>
            <AdminTeachersTableContainer />
        </AdminLayout>
    );
};

export default Page;
