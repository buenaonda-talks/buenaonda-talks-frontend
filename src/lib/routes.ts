export type TypedRoute = string;

export const routesBuilder = {
    home: '/',
    dashboard: '/dashboard',

    teacherUpcomingTalk: '/dashboard/proxima-charla',

    signupStudent: '/dashboard?signup=student',
    signupTeacher: '/dashboard?signup=teacher',

    students: '/dashboard/estudiantes',
    studentById: (id: string) => `/dashboard/estudiantes/${id}`,

    users: '/dashboard/usuarios',
    userById: (id: string) => `/dashboard/usuarios/${id}`,

    convocatories: '/dashboard/convocatories',
    convocatoryById: (id: string) => `/dashboard/convocatories/${id}`,
    convocatoryCreate: '/dashboard/convocatories/create',

    applications: '/dashboard/postulaciones',
    applicationById: (id: string) => `/dashboard/postulaciones/${id}`,

    scholarships: '/dashboard/becas',
    scholarshipById: (id: string) => `/dashboard/becas/${id}`,

    formByUUID: (uuid: string) => `/dashboard/formularios/${uuid}`,
    formByUUIDTerms: (uuid: string) =>
        `/dashboard/formularios/${uuid}/terminos-y-condiciones`,

    faq: '/dashboard/preguntas-frecuentes',
} as const;

export default routesBuilder;
