import { StudentUserByIdForUpdateQuery } from '@/api/graphql';
import { StudentBuilderFormValues } from './GeneralTabContent';

export const studentToStudentBuilder = (
    student: NonNullable<NonNullable<StudentUserByIdForUpdateQuery['studentUserById']>>,
    regions: NonNullable<NonNullable<StudentUserByIdForUpdateQuery['regions']>>,
) => {
    const communeId = student.studentProfile.college?.communeId || null;
    const regionId = communeId
        ? regions.find((r) => r.communes.some((c) => c.id === communeId))?.id || null
        : null;

    const builder: StudentBuilderFormValues = {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phoneCode: student.phoneCode ? parseInt(student.phoneCode, 10) : null,
        phoneNumber: student.phoneNumber ? parseInt(student.phoneNumber, 10) : null,
        college: student.studentProfile.college
            ? student.studentProfile.college.id
            : null,
        region: regionId,
        commune: communeId,
    };

    return builder;
};
