import { fetchUserServer } from '@/api/query/fetch-user-server';
import { DashboardStudentFaq } from '@/screens/dashboard-students/faq';
import { StudentsLayout } from '@/screens/dashboard-students/shared/layout';

const Page = async () => {
    const user = await fetchUserServer();

    if (user?.user.isStudent) {
        return (
            <StudentsLayout>
                <DashboardStudentFaq />
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
