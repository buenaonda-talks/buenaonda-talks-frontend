import { fetchUserServer } from '@/api/query/fetch-user-server';
import { DashboardAdminsPageContent } from '@/screens/dashboard-admins/dashboard';
import { AdminsLayout } from '@/screens/dashboard-admins/shared/layout';
import { DashboardStudentsHome } from '@/screens/dashboard-students/dashboard';
import { StudentsLayout } from '@/screens/dashboard-students/shared/layout';

const Page = async () => {
    const user = await fetchUserServer();

    if (user?.user.isAdmin) {
        return (
            <AdminsLayout>
                <DashboardAdminsPageContent />
            </AdminsLayout>
        );
    }

    if (user?.user.isStudent) {
        return (
            <StudentsLayout>
                <DashboardStudentsHome />
            </StudentsLayout>
        );
    }

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};

export default Page;
