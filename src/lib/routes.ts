export type TypedRoute = string;

export const routesBuilder = {
    home: '/',
    dashboard: '/dashboard',
    theProcess: '/becas-y-procesos',

    colleges: '/dashboard/instituciones-educativas',
    collegeById: (id: string) => `/dashboard/instituciones-educativas/${id}`,

    teachers: '/dashboard/representantes-instituciones-educativas',
    teacherById: (id: string) =>
        `/dashboard/representantes-instituciones-educativas/${id}`,

    teacherUpcomingTalk: '/dashboard/proxima-charla',

    signupStudent: '/dashboard?signup=student',
    signupTeacher: '/dashboard?signup=teacher',

    students: '/dashboard/estudiantes',
    studentById: (id: string) => `/dashboard/estudiantes/${id}`,
    addStudent: '/dashboard/estudiantes/crear',
    importStudents: '/dashboard/estudiantes/importar',

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
