import { fetchUserServer } from '@/api/query/fetch-user-server';
import { DashboardStudentFaq } from '@/screens/dashboard/student/faq';
import { StudentsLayout } from '@/screens/dashboard/student/shared/layout';
import { DashboardTeacherFaq } from '@/screens/dashboard/teacher/faq';
import { TeacherLayout } from '@/screens/dashboard/teacher/shared/layout';

const Page = async () => {
    const user = await fetchUserServer();

    if (user?.user.isStudent) {
        return (
            <StudentsLayout>
                <DashboardStudentFaq />
            </StudentsLayout>
        );
    }

    if (user?.user.isTeacher) {
        return (
            <TeacherLayout>
                <DashboardTeacherFaq />
            </TeacherLayout>
        );
    }

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};

export default Page;
