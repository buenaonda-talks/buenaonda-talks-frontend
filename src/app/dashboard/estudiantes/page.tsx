import { AdminsLayout } from '@/screens/dashboard/admin/shared/layout';
import { AdminStudentsTableContainer } from '@/screens/dashboard/admin/students/table';

const Page = () => {
    return (
        <AdminsLayout>
            <AdminStudentsTableContainer />
        </AdminsLayout>
    );
};

export default Page;
