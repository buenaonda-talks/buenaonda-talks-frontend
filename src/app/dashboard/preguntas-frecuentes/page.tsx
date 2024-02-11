import { DashboardStudentFaq } from '@/screens/dashboard-students/faq';
import { StudentsLayout } from '@/screens/dashboard-students/shared/layout';
import { currentUser } from '@clerk/nextjs';

const Page = async () => {
    const user = await currentUser();

    if (user?.publicMetadata.roles.includes('student')) {
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
