import { StudentUserByIdQuery } from '@/api/graphql';
import { StudentBuilderFormValues } from './GeneralTabContent';

export const studentToStudentBuilder = (
    student: NonNullable<NonNullable<StudentUserByIdQuery['studentUserById']>>,
) => {
    const builder: StudentBuilderFormValues = {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phoneCode: student.phoneCode ? parseInt(student.phoneCode, 10) : null,
        phoneNumber: student.phoneNumber ? parseInt(student.phoneNumber, 10) : null,
        college: student.studentProfile.college
            ? {
                  label: student.studentProfile.college.name,
                  value: student.studentProfile.college.id.toString(),
              }
            : null,
    };

    return builder;
};
