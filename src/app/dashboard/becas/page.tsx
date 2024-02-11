import { AdminScholarshipsTableContainer } from '@/screens/dashboard-admins/scholarships/table';
import { AdminsLayout } from '@/screens/dashboard-admins/shared/layout';

const Page = () => {
    return (
        <AdminsLayout>
            <AdminScholarshipsTableContainer />
        </AdminsLayout>
    );
};

export default Page;
