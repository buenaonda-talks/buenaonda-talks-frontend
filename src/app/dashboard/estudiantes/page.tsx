import { AdminsLayout } from '@/screens/dashboard-admins/shared/layout';
import { AdminStudentsTableContainer } from '@/screens/dashboard-admins/students/table';

const Page = () => {
    return (
        <AdminsLayout>
            <AdminStudentsTableContainer />
        </AdminsLayout>
    );
};

export default Page;
