import { AdminLayout } from '@/screens/dashboard/admin/shared/layout';
import { AdminStudentsTableContainer } from '@/screens/dashboard/admin/students/table';

const Page = () => {
    return (
        <AdminLayout>
            <AdminStudentsTableContainer />
        </AdminLayout>
    );
};

export default Page;
