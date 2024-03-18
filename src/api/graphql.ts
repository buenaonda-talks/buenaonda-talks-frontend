import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: string;
    DateTime: string;
};

/** Admin stats */
export type AdminStats = {
    __typename?: 'AdminStats';
    assistancesToTalks: Scalars['Int'];
    maxDevfScholarships: Scalars['Int'];
    maxPlatziScholarships: Scalars['Int'];
    postulationSubmissionsCount: Scalars['Int'];
    scholarshipsCount: Scalars['Int'];
    stats: Array<AdminStatsItem>;
    studentsCount: Scalars['Int'];
};

/** Admin stats item */
export type AdminStatsItem = {
    __typename?: 'AdminStatsItem';
    addedStudents: Scalars['Int'];
    convocatory: Convocatory;
    postulationSubmissions: Scalars['Int'];
    postulationSubmissionsAccepted: Scalars['Int'];
    postulationSubmissionsAcceptedTerms: Scalars['Int'];
    postulationSubmissionsPending: Array<AdminStatsItemPostulationStatusDataItem>;
    postulationSubmissionsPendingTerms: Scalars['Int'];
    postulationSubmissionsRejected: Array<AdminStatsItemPostulationStatusDataItem>;
    postulationSubmissionsRejectedTerms: Scalars['Int'];
    postulationSubmissionsUnansweredTerms: Scalars['Int'];
    scholarships: Scalars['Int'];
    scholarshipsByConvocatorySource: Array<AdminStatsItemScholarshipByConvocatory>;
    scholarshipsFinished: Scalars['Int'];
    scholarshipsStudying: Scalars['Int'];
    scholarshipsWithdrawn: Scalars['Int'];
    signedUpStudents: Scalars['Int'];
    talkAssistants: Scalars['Int'];
    talkInscriptions: Scalars['Int'];
};

/** Admin stats item postulation status data item */
export type AdminStatsItemPostulationStatusDataItem = {
    __typename?: 'AdminStatsItemPostulationStatusDataItem';
    count: Scalars['Int'];
    reason: Scalars['String'];
};

/** Admin stats item scholarship by convocatory */
export type AdminStatsItemScholarshipByConvocatory = {
    __typename?: 'AdminStatsItemScholarshipByConvocatory';
    convocatory: Convocatory;
    scholarships: Scalars['Int'];
    scholarshipsWithdrawn: Scalars['Int'];
};

/** Admin students count by date */
export type AdminStudentsCountByDate = {
    __typename?: 'AdminStudentsCountByDate';
    joinedAtItems: Array<AdminStudentsCountByDateItem>;
    signedUpAtItems: Array<AdminStudentsCountByDateItem>;
};

/** Admin students count by date item */
export type AdminStudentsCountByDateItem = {
    __typename?: 'AdminStudentsCountByDateItem';
    count: Scalars['Int'];
    date: Scalars['Date'];
};

/** Representation of an API error, it's meant to be used to return errors from the API that the frontend can understand */
export type ApiError = {
    __typename?: 'ApiError';
    code: Scalars['String'];
    message: Scalars['String'];
};

/** Representation of a scholarship application */
export type Application = {
    __typename?: 'Application';
    acceptedTerms: Maybe<Scalars['Boolean']>;
    answers: Array<ApplicationFieldAnswer>;
    createdOn: Scalars['DateTime'];
    currentStatus: Maybe<ApplicationHistory>;
    currentStatusid: Maybe<Scalars['ID']>;
    form: Form;
    formId: Scalars['ID'];
    id: Scalars['ID'];
    resultNotificationViaEmailStatus: Scalars['String'];
    studentId: Scalars['ID'];
    termsAcceptanceDate: Maybe<Scalars['Date']>;
    user: User;
    uuid: Scalars['String'];
};

/** Representation of a scholarship application field answer */
export type ApplicationFieldAnswer = {
    __typename?: 'ApplicationFieldAnswer';
    fieldId: Scalars['ID'];
    id: Scalars['ID'];
    submissionid: Scalars['ID'];
    value: Maybe<Scalars['String']>;
};

/** Representation of a scholarship application history */
export type ApplicationHistory = {
    __typename?: 'ApplicationHistory';
    id: Scalars['ID'];
    observations: Maybe<Scalars['String']>;
    status: ApplicationStatus;
    submissionid: Scalars['ID'];
};

export enum ApplicationStatus {
    Accepted = 'ACCEPTED',
    AcceptedTerms = 'ACCEPTED_TERMS',
    Declined = 'DECLINED',
    DeclinedTerms = 'DECLINED_TERMS',
    Pending = 'PENDING',
    Submitted = 'SUBMITTED',
    TermsUnanswered = 'TERMS_UNANSWERED',
}

export type ApplicationsFilter = {
    collegeIDs: InputMaybe<Array<Scalars['Int']>>;
    convocatoryIDs: InputMaybe<Array<Scalars['Int']>>;
    query: InputMaybe<Scalars['String']>;
    statuses: InputMaybe<Array<ApplicationStatus>>;
};

export type ApplyToScholarship = ApiError | Application;

export type AssistToTalk = ApiError | AssistToTalkLink;

/** Representation of a link to assist to a talk */
export type AssistToTalkLink = {
    __typename?: 'AssistToTalkLink';
    /** The URL to join the talk */
    url: Scalars['String'];
};

/** Representation of a college */
export type College = {
    __typename?: 'College';
    /** The commune where the college is located */
    communeId: Maybe<Scalars['ID']>;
    hideFromSelection: Scalars['Boolean'];
    id: Scalars['ID'];
    name: Scalars['String'];
    normalizedName: Scalars['String'];
};

export type CollegeInput = {
    communeId: Scalars['Int'];
    name: Scalars['String'];
};

/** Representation of a college-teacher relation */
export type CollegeTeacherRelation = {
    __typename?: 'CollegeTeacherRelation';
    /** The college */
    collegeId: Scalars['ID'];
    commitsToParticipate: Scalars['Boolean'];
    id: Scalars['ID'];
    rol: Scalars['String'];
    /** The teacher */
    teacherid: Scalars['ID'];
};

export type CollegesFilter = {
    communeIDs: InputMaybe<Array<Scalars['Int']>>;
    query: InputMaybe<Scalars['String']>;
    regionsIDs: InputMaybe<Array<Scalars['Int']>>;
};

/** Representation of a commune */
export type Commune = {
    __typename?: 'Commune';
    id: Scalars['ID'];
    name: Scalars['String'];
    regionId: Scalars['ID'];
};

/** Representation of a convocatory */
export type Convocatory = {
    __typename?: 'Convocatory';
    countAddingsFromDate: Maybe<Scalars['Date']>;
    countAddingsTillDate: Maybe<Scalars['Date']>;
    devfInformedGraduates: Maybe<Scalars['Int']>;
    devfInformedNotAssisted: Maybe<Scalars['Int']>;
    devfInformedPaused: Maybe<Scalars['Int']>;
    devfInformedResigned: Maybe<Scalars['Int']>;
    devfInformedStudying: Maybe<Scalars['Int']>;
    form: Maybe<Form>;
    id: Scalars['ID'];
    isWithdrawable: Scalars['Boolean'];
    kind: ScholarshipConvocatoryKind;
    lessonsEndDate: Maybe<Scalars['Date']>;
    lessonsStartDate: Maybe<Scalars['String']>;
    maximumWithdrawalDate: Maybe<Scalars['Date']>;
    order: Scalars['Int'];
    privateLabel: Scalars['String'];
    talk: Maybe<Talk>;
};

export type ConvocatoryInput = {
    countAddingsFromDate: InputMaybe<Scalars['Date']>;
    countAddingsTillDate: InputMaybe<Scalars['Date']>;
    devfInformedGraduates: InputMaybe<Scalars['Int']>;
    devfInformedNotAssisted: InputMaybe<Scalars['Int']>;
    devfInformedPaused: InputMaybe<Scalars['Int']>;
    devfInformedResigned: InputMaybe<Scalars['Int']>;
    devfInformedStudying: InputMaybe<Scalars['Int']>;
    isWithdrawable: Scalars['Boolean'];
    kind: ScholarshipConvocatoryKind;
    lessonsEndDate: InputMaybe<Scalars['Date']>;
    lessonsStartDate: InputMaybe<Scalars['Date']>;
    maximumWithdrawalDate: InputMaybe<Scalars['Date']>;
    order: Scalars['Int'];
    privateLabel: Scalars['String'];
};

export type DeleteCollege = ApiError | DeleteCollegeSuccess;

/** The link to assist to a talk */
export type DeleteCollegeSuccess = {
    __typename?: 'DeleteCollegeSuccess';
    /** The ID of the deleted college */
    id: Scalars['Int'];
};

/** Representation of a scholarship form */
export type Form = {
    __typename?: 'Form';
    closeDate: Maybe<Scalars['DateTime']>;
    convocatory: Maybe<Convocatory>;
    fields: Array<FormField>;
    id: Scalars['ID'];
    myApplication: Maybe<Application>;
    openDate: Maybe<Scalars['DateTime']>;
    resultsPublicationDate: Maybe<Scalars['DateTime']>;
    resultsStatus: Scalars['String'];
    termsAcceptanceCloseDate: Maybe<Scalars['DateTime']>;
    termsAcceptanceOpenDate: Maybe<Scalars['DateTime']>;
    title: Scalars['String'];
    uuid: Scalars['String'];
    version: Scalars['Int'];
};

/** Representation of a scholarship form field */
export type FormField = {
    __typename?: 'FormField';
    dependsOnFieldId: Maybe<Scalars['ID']>;
    dependsOnFieldOptionId: Maybe<Scalars['ID']>;
    description: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    isImportant: Scalars['Boolean'];
    isRequired: Scalars['Boolean'];
    maxLength: Maybe<Scalars['Int']>;
    minLength: Maybe<Scalars['Int']>;
    options: Array<FormFieldOption>;
    order: Scalars['Int'];
    title: Scalars['String'];
    type: FormFieldType;
};

export type FormFieldAnswerInput = {
    id: Scalars['Int'];
    value: Scalars['String'];
};

export type FormFieldInput = {
    dependsOnFieldOptionUUID: InputMaybe<Scalars['String']>;
    dependsOnFieldUUID: InputMaybe<Scalars['String']>;
    description: InputMaybe<Scalars['String']>;
    id: InputMaybe<Scalars['Int']>;
    isImportant: Scalars['Boolean'];
    isRequired: Scalars['Boolean'];
    maxLength: InputMaybe<Scalars['Int']>;
    minLength: InputMaybe<Scalars['Int']>;
    options: InputMaybe<Array<FormFieldOptionInput>>;
    order: Scalars['Int'];
    title: Scalars['String'];
    type: FormFieldType;
    uuid: Scalars['String'];
};

/** Representation of a scholarship form field option */
export type FormFieldOption = {
    __typename?: 'FormFieldOption';
    automaticResult: Maybe<ApplicationStatus>;
    automaticResultObservations: Maybe<Scalars['String']>;
    field: FormField;
    id: Scalars['ID'];
    label: Scalars['String'];
    order: Scalars['Int'];
};

export type FormFieldOptionInput = {
    automaticResult: InputMaybe<ApplicationStatus>;
    automaticResultObservations: InputMaybe<Scalars['String']>;
    id: InputMaybe<Scalars['Int']>;
    label: Scalars['String'];
    order: Scalars['Int'];
    uuid: Scalars['String'];
};

export enum FormFieldType {
    College = 'COLLEGE',
    FirstName = 'FIRST_NAME',
    LastName = 'LAST_NAME',
    RadioBox = 'RADIO_BOX',
    Text = 'TEXT',
    Textarea = 'TEXTAREA',
}

export type FormInput = {
    closeDate: Scalars['DateTime'];
    convocatoryId: Scalars['Int'];
    fields: Array<FormFieldInput>;
    openDate: Scalars['DateTime'];
    resultsPublicationDate: InputMaybe<Scalars['DateTime']>;
    termsAcceptanceCloseDate: InputMaybe<Scalars['DateTime']>;
    termsAcceptanceOpenDate: InputMaybe<Scalars['DateTime']>;
    title: Scalars['String'];
    version: Scalars['Int'];
};

export enum FormResultsStatus {
    Finished = 'FINISHED',
    NotScheduled = 'NOT_SCHEDULED',
    Running = 'RUNNING',
    Scheduled = 'SCHEDULED',
}

export type Mutation = {
    __typename?: 'Mutation';
    applyToScholarship: ApplyToScholarship;
    assistToTalk: AssistToTalk;
    createCollege: College;
    createConvocatory: Convocatory;
    createForm: Form;
    createMyStudentProfile: Student;
    createMyTeacherProfile: Teacher;
    createStudent: Student;
    createTalk: Talk;
    createVerifiedTeacherProfile: Teacher;
    deleteCollege: DeleteCollege;
    deleteConvocatory: Scalars['Int'];
    deleteUser: Scalars['Boolean'];
    importStudents: Scalars['Boolean'];
    mergeColleges: Scalars['Boolean'];
    signUpToTalk: SignUpToTalk;
    updateCollege: College;
    updateConvocatory: Convocatory;
    updateForm: Form;
    updateScholarshipApplicationStatus: Application;
    updateStudent: Student;
    updateStudentCollege: Student;
    updateTalk: Talk;
    updateTeacher: Teacher;
    verifyTeacher: Scalars['Boolean'];
};

export type MutationApplyToScholarshipArgs = {
    answers: Array<FormFieldAnswerInput>;
    error: InputMaybe<Scalars['String']>;
    uuid: Scalars['String'];
};

export type MutationAssistToTalkArgs = {
    talkUuid: Scalars['String'];
};

export type MutationCreateCollegeArgs = {
    input: CollegeInput;
};

export type MutationCreateConvocatoryArgs = {
    input: ConvocatoryInput;
};

export type MutationCreateFormArgs = {
    input: FormInput;
};

export type MutationCreateMyStudentProfileArgs = {
    collegeId: InputMaybe<Scalars['Int']>;
    communeId: Scalars['Int'];
    newCollegeName: InputMaybe<Scalars['String']>;
};

export type MutationCreateMyTeacherProfileArgs = {
    collegeId: InputMaybe<Scalars['Int']>;
    communeId: Scalars['Int'];
    newCollegeName: InputMaybe<Scalars['String']>;
    role: Scalars['String'];
};

export type MutationCreateStudentArgs = {
    collegeId: InputMaybe<Scalars['Int']>;
    communeId: InputMaybe<Scalars['Int']>;
    newCollegeName: InputMaybe<Scalars['String']>;
    studentDetails: StudentInput;
};

export type MutationCreateTalkArgs = {
    input: TalkInput;
};

export type MutationCreateVerifiedTeacherProfileArgs = {
    collegeId: InputMaybe<Scalars['Int']>;
    communeId: Scalars['Int'];
    newCollegeName: InputMaybe<Scalars['String']>;
    role: Scalars['String'];
    userId: Scalars['Int'];
};

export type MutationDeleteCollegeArgs = {
    id: Scalars['Int'];
};

export type MutationDeleteConvocatoryArgs = {
    id: Scalars['Int'];
};

export type MutationDeleteUserArgs = {
    userId: Scalars['Int'];
};

export type MutationImportStudentsArgs = {
    collegeId: Scalars['Int'];
    students: Array<StudentInput>;
};

export type MutationMergeCollegesArgs = {
    sourceCollegeId: Scalars['Int'];
    targetCollegeId: Scalars['Int'];
};

export type MutationSignUpToTalkArgs = {
    talkUuid: Scalars['String'];
};

export type MutationUpdateCollegeArgs = {
    id: Scalars['Int'];
    input: CollegeInput;
};

export type MutationUpdateConvocatoryArgs = {
    id: Scalars['Int'];
    input: ConvocatoryInput;
};

export type MutationUpdateFormArgs = {
    fieldsIDsToDelete: Array<Scalars['Int']>;
    id: Scalars['Int'];
    input: FormInput;
};

export type MutationUpdateScholarshipApplicationStatusArgs = {
    applicationId: Scalars['Int'];
    observations: InputMaybe<Scalars['String']>;
    sendEmail: InputMaybe<Scalars['Boolean']>;
    status: ApplicationStatus;
};

export type MutationUpdateStudentArgs = {
    collegeId: InputMaybe<Scalars['Int']>;
    communeId: InputMaybe<Scalars['Int']>;
    newCollegeName: InputMaybe<Scalars['String']>;
    studentDetails: StudentInput;
    userId: Scalars['Int'];
};

export type MutationUpdateStudentCollegeArgs = {
    collegeId: InputMaybe<Scalars['Int']>;
    collegeInput: InputMaybe<CollegeInput>;
    studentId: Scalars['Int'];
};

export type MutationUpdateTalkArgs = {
    id: Scalars['Int'];
    input: TalkInput;
};

export type MutationUpdateTeacherArgs = {
    colleges: Array<UpdateTeacherCollegesInput>;
    collegesToRemove: Array<Scalars['Int']>;
    isVerified: InputMaybe<Scalars['Boolean']>;
    teacherId: Scalars['Int'];
};

export type MutationVerifyTeacherArgs = {
    teacherId: Scalars['Int'];
};

/** Representation of an organization */
export type Organization = {
    __typename?: 'Organization';
    id: Scalars['ID'];
    name: Scalars['String'];
};

export type PageInfo = {
    __typename?: 'PageInfo';
    endCursor: Maybe<Scalars['String']>;
    hasNextPage: Scalars['Boolean'];
    hasPreviousPage: Scalars['Boolean'];
    startCursor: Maybe<Scalars['String']>;
};

export type Query = {
    __typename?: 'Query';
    adminStats: AdminStats;
    adminStudentsCountByDate: AdminStudentsCountByDate;
    applicationById: Maybe<Application>;
    applications: QueryApplicationsConnection;
    colleges: Array<College>;
    collegesByCommune: Array<College>;
    collegesCursor: QueryCollegesCursorConnection;
    communes: Array<Commune>;
    communesByRegion: Array<Commune>;
    convocatories: Array<Convocatory>;
    convocatoryById: Maybe<Convocatory>;
    currentPlatziTalk: Maybe<Talk>;
    formByUUID: Maybe<Form>;
    forms: Array<Form>;
    myStudents: QueryMyStudentsConnection;
    organizations: Array<Organization>;
    regions: Array<Region>;
    scholarships: QueryScholarshipsConnection;
    studentUserById: User;
    students: QueryStudentsConnection;
    talkById: Maybe<Talk>;
    talks: Array<Talk>;
    teacherUserById: User;
    teachers: QueryTeachersConnection;
    trackerCurrentStep: TrackerCurrentStep;
    user: Maybe<User>;
    users: QueryUsersConnection;
};

export type QueryAdminStatsArgs = {
    convocatoriesIds: InputMaybe<Array<Scalars['Int']>>;
};

export type QueryAdminStudentsCountByDateArgs = {
    convocatory: InputMaybe<Scalars['Int']>;
    endDate: InputMaybe<Scalars['Date']>;
    startDate: InputMaybe<Scalars['Date']>;
};

export type QueryApplicationByIdArgs = {
    id: Scalars['Int'];
};

export type QueryApplicationsArgs = {
    after: InputMaybe<Scalars['String']>;
    before: InputMaybe<Scalars['String']>;
    filter: ApplicationsFilter;
    first: InputMaybe<Scalars['Int']>;
    last: InputMaybe<Scalars['Int']>;
};

export type QueryCollegesByCommuneArgs = {
    communeId: Scalars['Int'];
};

export type QueryCollegesCursorArgs = {
    after: InputMaybe<Scalars['String']>;
    before: InputMaybe<Scalars['String']>;
    filter: CollegesFilter;
    first: InputMaybe<Scalars['Int']>;
    last: InputMaybe<Scalars['Int']>;
};

export type QueryCommunesByRegionArgs = {
    regionId: Scalars['Int'];
};

export type QueryConvocatoryByIdArgs = {
    id: Scalars['Int'];
};

export type QueryFormByUuidArgs = {
    uuid: Scalars['String'];
};

export type QueryMyStudentsArgs = {
    after: InputMaybe<Scalars['String']>;
    before: InputMaybe<Scalars['String']>;
    first: InputMaybe<Scalars['Int']>;
    last: InputMaybe<Scalars['Int']>;
};

export type QueryScholarshipsArgs = {
    after: InputMaybe<Scalars['String']>;
    before: InputMaybe<Scalars['String']>;
    filter: ScholarshipsFilter;
    first: InputMaybe<Scalars['Int']>;
    last: InputMaybe<Scalars['Int']>;
};

export type QueryStudentUserByIdArgs = {
    userId: Scalars['Int'];
};

export type QueryStudentsArgs = {
    after: InputMaybe<Scalars['String']>;
    before: InputMaybe<Scalars['String']>;
    filter: StudentsFilter;
    first: InputMaybe<Scalars['Int']>;
    last: InputMaybe<Scalars['Int']>;
};

export type QueryTalkByIdArgs = {
    id: Scalars['Int'];
};

export type QueryTeacherUserByIdArgs = {
    id: Scalars['Int'];
};

export type QueryTeachersArgs = {
    after: InputMaybe<Scalars['String']>;
    before: InputMaybe<Scalars['String']>;
    filter: TeachersFilter;
    first: InputMaybe<Scalars['Int']>;
    last: InputMaybe<Scalars['Int']>;
};

export type QueryUsersArgs = {
    after: InputMaybe<Scalars['String']>;
    before: InputMaybe<Scalars['String']>;
    filter: UsersFilter;
    first: InputMaybe<Scalars['Int']>;
    last: InputMaybe<Scalars['Int']>;
};

export type QueryApplicationsConnection = {
    __typename?: 'QueryApplicationsConnection';
    edges: Array<Maybe<QueryApplicationsConnectionEdge>>;
    pageInfo: PageInfo;
};

export type QueryApplicationsConnectionEdge = {
    __typename?: 'QueryApplicationsConnectionEdge';
    cursor: Scalars['String'];
    node: Application;
};

export type QueryCollegesCursorConnection = {
    __typename?: 'QueryCollegesCursorConnection';
    edges: Array<Maybe<QueryCollegesCursorConnectionEdge>>;
    pageInfo: PageInfo;
};

export type QueryCollegesCursorConnectionEdge = {
    __typename?: 'QueryCollegesCursorConnectionEdge';
    cursor: Scalars['String'];
    node: College;
};

export type QueryMyStudentsConnection = {
    __typename?: 'QueryMyStudentsConnection';
    edges: Array<Maybe<QueryMyStudentsConnectionEdge>>;
    pageInfo: PageInfo;
};

export type QueryMyStudentsConnectionEdge = {
    __typename?: 'QueryMyStudentsConnectionEdge';
    cursor: Scalars['String'];
    node: User;
};

export type QueryScholarshipsConnection = {
    __typename?: 'QueryScholarshipsConnection';
    edges: Array<Maybe<QueryScholarshipsConnectionEdge>>;
    pageInfo: PageInfo;
};

export type QueryScholarshipsConnectionEdge = {
    __typename?: 'QueryScholarshipsConnectionEdge';
    cursor: Scalars['String'];
    node: Scholarship;
};

export type QueryStudentsConnection = {
    __typename?: 'QueryStudentsConnection';
    edges: Array<Maybe<QueryStudentsConnectionEdge>>;
    pageInfo: PageInfo;
};

export type QueryStudentsConnectionEdge = {
    __typename?: 'QueryStudentsConnectionEdge';
    cursor: Scalars['String'];
    node: User;
};

export type QueryTeachersConnection = {
    __typename?: 'QueryTeachersConnection';
    edges: Array<Maybe<QueryTeachersConnectionEdge>>;
    pageInfo: PageInfo;
};

export type QueryTeachersConnectionEdge = {
    __typename?: 'QueryTeachersConnectionEdge';
    cursor: Scalars['String'];
    node: User;
};

export type QueryUsersConnection = {
    __typename?: 'QueryUsersConnection';
    edges: Array<Maybe<QueryUsersConnectionEdge>>;
    pageInfo: PageInfo;
};

export type QueryUsersConnectionEdge = {
    __typename?: 'QueryUsersConnectionEdge';
    cursor: Scalars['String'];
    node: User;
};

/** Representation of a region */
export type Region = {
    __typename?: 'Region';
    communes: Array<Commune>;
    id: Scalars['ID'];
    name: Scalars['String'];
};

/** Representation of a scholarship form field option */
export type Scholarship = {
    __typename?: 'Scholarship';
    applicationid: Maybe<Scalars['ID']>;
    askedToRenew: Scalars['Boolean'];
    askedToRenewDate: Maybe<Scalars['Date']>;
    convocatoryId: Scalars['ID'];
    createdOn: Scalars['DateTime'];
    currentStatus: Maybe<ScholarshipStatusHistory>;
    currentStatusid: Maybe<Scalars['ID']>;
    devfAddedArtificially: Scalars['Boolean'];
    devfBatchGroupid: Maybe<Scalars['ID']>;
    id: Scalars['ID'];
    platziCompletedMandatoryCourses: Scalars['Boolean'];
    resignDate: Maybe<Scalars['Date']>;
    resignInfluences: Maybe<Scalars['String']>;
    resignReasons: Maybe<Scalars['String']>;
    resigned: Scalars['Boolean'];
    studentId: Scalars['ID'];
    user: User;
    userId: Scalars['ID'];
    uuid: Scalars['String'];
};

export enum ScholarshipConvocatoryKind {
    Devf = 'DEVF',
    Platzi = 'PLATZI',
}

export enum ScholarshipStatus {
    Active = 'ACTIVE',
    Finished = 'FINISHED',
    Inactive = 'INACTIVE',
    Paused = 'PAUSED',
    Resigned = 'RESIGNED',
}

/** Representation of a scholarship form field option */
export type ScholarshipStatusHistory = {
    __typename?: 'ScholarshipStatusHistory';
    id: Scalars['ID'];
    observations: Maybe<Scalars['String']>;
    scholarshipid: Scalars['ID'];
    status: ScholarshipStatus;
};

export type ScholarshipsFilter = {
    collegeIDs: InputMaybe<Array<Scalars['Int']>>;
    convocatoryIDs: InputMaybe<Array<Scalars['Int']>>;
    query: InputMaybe<Scalars['String']>;
    statuses: InputMaybe<Array<ScholarshipStatus>>;
};

export type SignUpToTalk = ApiError | TalkInscription;

/** Representation of a student */
export type Student = {
    __typename?: 'Student';
    college: Maybe<College>;
    collegeId: Maybe<Scalars['ID']>;
    convocatoryId: Maybe<Scalars['ID']>;
    id: Scalars['ID'];
    lastDevfApplication: Maybe<Application>;
    lastPlatziApplication: Maybe<Application>;
    lastPlatziTalkInscription: Maybe<TalkInscription>;
    user: User;
};

export type StudentInput = {
    email: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    phoneCode: InputMaybe<Scalars['Int']>;
    phoneNumber: InputMaybe<Scalars['Int']>;
};

export type StudentsFilter = {
    collegeIDs: InputMaybe<Array<Scalars['Int']>>;
    convocatoryIDs: InputMaybe<Array<Scalars['Int']>>;
    query: InputMaybe<Scalars['String']>;
};

/** Representation of a talk */
export type Talk = {
    __typename?: 'Talk';
    convocatory: Convocatory;
    convocatoryId: Scalars['ID'];
    description: Maybe<Scalars['String']>;
    endDate: Scalars['DateTime'];
    forOrganizationId: Maybe<Scalars['ID']>;
    id: Scalars['ID'];
    internalLabel: Maybe<Scalars['String']>;
    isVisible: Scalars['Boolean'];
    myInscription: Maybe<TalkInscription>;
    speakers: Scalars['String'];
    startDate: Scalars['DateTime'];
    type: TalkType;
    uuid: Scalars['String'];
    zoomApiKey: Maybe<Scalars['String']>;
    zoomApiSecret: Maybe<Scalars['String']>;
    zoomId: Maybe<Scalars['String']>;
    zoomRegisterUrl: Maybe<Scalars['String']>;
};

export type TalkInput = {
    convocatoryId: Scalars['Int'];
    description: InputMaybe<Scalars['String']>;
    endDateTime: Scalars['DateTime'];
    forOrganizationId: InputMaybe<Scalars['Int']>;
    internalLabel: InputMaybe<Scalars['String']>;
    isVisible: Scalars['Boolean'];
    speakers: Scalars['String'];
    startDateTime: Scalars['DateTime'];
    type: TalkType;
    zoomApiKey: InputMaybe<Scalars['String']>;
    zoomApiSecret: InputMaybe<Scalars['String']>;
    zoomId: InputMaybe<Scalars['String']>;
    zoomRegisterUrl: InputMaybe<Scalars['String']>;
};

/** Representation of a talk inscription */
export type TalkInscription = {
    __typename?: 'TalkInscription';
    assistanceDatetime: Maybe<Scalars['Date']>;
    assisted: Maybe<Scalars['Boolean']>;
    id: Scalars['ID'];
    joinUrl: Maybe<Scalars['String']>;
    number: Scalars['Int'];
    talkid: Scalars['ID'];
    userid: Scalars['ID'];
};

export enum TalkType {
    FirstDevf = 'FIRST_DEVF',
    FirstDevfIntroduction = 'FIRST_DEVF_INTRODUCTION',
    FirstDevfRevindication = 'FIRST_DEVF_REVINDICATION',
    FirstPlatzi = 'FIRST_PLATZI',
    FirstPlatziIntroduction = 'FIRST_PLATZI_INTRODUCTION',
    FirstPlatziRevindication = 'FIRST_PLATZI_REVINDICATION',
}

/** Representation of a teacher */
export type Teacher = {
    __typename?: 'Teacher';
    colleges: Array<College>;
    id: Scalars['ID'];
    isVerified: Scalars['Boolean'];
    user: User;
};

export type TeachersFilter = {
    query: InputMaybe<Scalars['String']>;
};

/** Representation of the current step of the user */
export type TrackerCurrentStep = {
    __typename?: 'TrackerCurrentStep';
    devfForm: Maybe<Form>;
    devfPostulation: Maybe<Application>;
    devfScholarship: Maybe<Scholarship>;
    platziForm: Maybe<Form>;
    platziPostulation: Maybe<Application>;
    platziScholarship: Maybe<Scholarship>;
    platziTalk: Maybe<Talk>;
};

export type UpdateTeacherCollegesInput = {
    collegeId: Scalars['Int'];
    rol: Scalars['String'];
};

/** Representation of a user */
export type User = {
    __typename?: 'User';
    dateJoined: Scalars['DateTime'];
    email: Scalars['String'];
    firstName: Scalars['String'];
    id: Scalars['ID'];
    isAdmin: Scalars['Boolean'];
    isStudent: Scalars['Boolean'];
    isSuperAdmin: Scalars['Boolean'];
    isTeacher: Scalars['Boolean'];
    lastName: Scalars['String'];
    phoneCode: Maybe<Scalars['String']>;
    phoneNumber: Maybe<Scalars['String']>;
    studentProfile: Student;
    teacherProfile: Maybe<Teacher>;
};

export type UsersFilter = {
    query: InputMaybe<Scalars['String']>;
};

export type UserQueryVariables = Exact<{ [key: string]: never }>;

export type UserQuery = {
    __typename?: 'Query';
    user: {
        __typename?: 'User';
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        isStudent: boolean;
        isTeacher: boolean;
        isAdmin: boolean;
        isSuperAdmin: boolean;
        teacherProfile: { __typename?: 'Teacher'; isVerified: boolean } | null;
    } | null;
};

export type UpdateConvocatoryMutationVariables = Exact<{
    id: Scalars['Int'];
    input: ConvocatoryInput;
}>;

export type UpdateConvocatoryMutation = {
    __typename?: 'Mutation';
    updateConvocatory: { __typename?: 'Convocatory'; id: string };
};

export type ConvocatoryByIdForUpdateQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type ConvocatoryByIdForUpdateQuery = {
    __typename?: 'Query';
    convocatoryById: {
        __typename?: 'Convocatory';
        id: string;
        countAddingsFromDate: string | null;
        countAddingsTillDate: string | null;
        devfInformedGraduates: number | null;
        devfInformedNotAssisted: number | null;
        devfInformedPaused: number | null;
        devfInformedResigned: number | null;
        devfInformedStudying: number | null;
        isWithdrawable: boolean;
        kind: ScholarshipConvocatoryKind;
        lessonsEndDate: string | null;
        lessonsStartDate: string | null;
        maximumWithdrawalDate: string | null;
        order: number;
        privateLabel: string;
    } | null;
};

export type ConvocatoryByIdFormQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type ConvocatoryByIdFormQuery = {
    __typename?: 'Query';
    convocatoryById: {
        __typename?: 'Convocatory';
        form: {
            __typename?: 'Form';
            id: string;
            openDate: string | null;
            closeDate: string | null;
            title: string;
            termsAcceptanceOpenDate: string | null;
            termsAcceptanceCloseDate: string | null;
            resultsPublicationDate: string | null;
            fields: Array<{
                __typename?: 'FormField';
                id: string;
                order: number;
                title: string;
                description: string | null;
                type: FormFieldType;
                isRequired: boolean;
                minLength: number | null;
                maxLength: number | null;
                dependsOnFieldId: string | null;
                dependsOnFieldOptionId: string | null;
                isImportant: boolean;
                options: Array<{
                    __typename?: 'FormFieldOption';
                    id: string;
                    label: string;
                    order: number;
                    automaticResult: ApplicationStatus | null;
                    automaticResultObservations: string | null;
                }>;
            }>;
        } | null;
    } | null;
};

export type ConvocatoryByIdTalkQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type ConvocatoryByIdTalkQuery = {
    __typename?: 'Query';
    convocatoryById: {
        __typename?: 'Convocatory';
        talk: {
            __typename?: 'Talk';
            id: string;
            description: string | null;
            speakers: string;
            startDate: string;
            endDate: string;
            type: TalkType;
            zoomApiKey: string | null;
            zoomApiSecret: string | null;
            zoomId: string | null;
            zoomRegisterUrl: string | null;
            convocatoryId: string;
            forOrganizationId: string | null;
            isVisible: boolean;
            internalLabel: string | null;
        } | null;
    } | null;
};

export type CreateConvocatoryMutationVariables = Exact<{
    input: ConvocatoryInput;
}>;

export type CreateConvocatoryMutation = {
    __typename?: 'Mutation';
    createConvocatory: { __typename?: 'Convocatory'; id: string };
};

export type CreateTalkFieldsQueryVariables = Exact<{ [key: string]: never }>;

export type CreateTalkFieldsQuery = {
    __typename?: 'Query';
    convocatories: Array<{
        __typename?: 'Convocatory';
        id: string;
        privateLabel: string;
    }>;
};

export type CreateStudentFieldsQueryVariables = Exact<{ [key: string]: never }>;

export type CreateStudentFieldsQuery = {
    __typename?: 'Query';
    regions: Array<{
        __typename?: 'Region';
        id: string;
        name: string;
        communes: Array<{ __typename?: 'Commune'; id: string; name: string }>;
    }>;
};

export type ApplyToScholarshipMutationVariables = Exact<{
    uuid: Scalars['String'];
    answers: Array<FormFieldAnswerInput>;
}>;

export type ApplyToScholarshipMutation = {
    __typename?: 'Mutation';
    applyToScholarship:
        | { __typename: 'ApiError'; message: string }
        | { __typename: 'Application'; id: string };
};

export type FormByUuidQueryVariables = Exact<{
    uuid: Scalars['String'];
}>;

export type FormByUuidQuery = {
    __typename?: 'Query';
    formByUUID: {
        __typename?: 'Form';
        title: string;
        fields: Array<{
            __typename?: 'FormField';
            id: string;
            order: number;
            title: string;
            description: string | null;
            type: FormFieldType;
            isRequired: boolean;
            minLength: number | null;
            maxLength: number | null;
            dependsOnFieldId: string | null;
            dependsOnFieldOptionId: string | null;
            options: Array<{
                __typename?: 'FormFieldOption';
                id: string;
                label: string;
                order: number;
            }>;
        }>;
        myApplication: { __typename?: 'Application'; id: string } | null;
    } | null;
};

export type CreateMyStudentProfileMutationVariables = Exact<{
    communeId: Scalars['Int'];
    collegeId: InputMaybe<Scalars['Int']>;
    newCollegeName: InputMaybe<Scalars['String']>;
}>;

export type CreateMyStudentProfileMutation = {
    __typename?: 'Mutation';
    createMyStudentProfile: { __typename?: 'Student'; id: string };
};

export type CreateMyTeacherProfileMutationVariables = Exact<{
    communeId: Scalars['Int'];
    role: Scalars['String'];
    collegeId: InputMaybe<Scalars['Int']>;
    newCollegeName: InputMaybe<Scalars['String']>;
}>;

export type CreateMyTeacherProfileMutation = {
    __typename?: 'Mutation';
    createMyTeacherProfile: { __typename?: 'Teacher'; id: string };
};

export type UpdateScholarshipApplicationStatusMutationVariables = Exact<{
    applicationId: Scalars['Int'];
    status: ApplicationStatus;
    observations: InputMaybe<Scalars['String']>;
    sendEmail: InputMaybe<Scalars['Boolean']>;
}>;

export type UpdateScholarshipApplicationStatusMutation = {
    __typename?: 'Mutation';
    updateScholarshipApplicationStatus: { __typename?: 'Application'; id: string };
};

export type AdminApplicationByIdQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type AdminApplicationByIdQuery = {
    __typename?: 'Query';
    applicationById: {
        __typename?: 'Application';
        user: { __typename?: 'User'; email: string; firstName: string; lastName: string };
        currentStatus: {
            __typename?: 'ApplicationHistory';
            status: ApplicationStatus;
            observations: string | null;
        } | null;
        form: {
            __typename?: 'Form';
            title: string;
            fields: Array<{
                __typename?: 'FormField';
                id: string;
                order: number;
                title: string;
                description: string | null;
                type: FormFieldType;
                isRequired: boolean;
                minLength: number | null;
                maxLength: number | null;
                dependsOnFieldId: string | null;
                dependsOnFieldOptionId: string | null;
                isImportant: boolean;
                options: Array<{
                    __typename?: 'FormFieldOption';
                    id: string;
                    label: string;
                    order: number;
                    automaticResult: ApplicationStatus | null;
                    automaticResultObservations: string | null;
                }>;
            }>;
            myApplication: { __typename?: 'Application'; id: string } | null;
        };
        answers: Array<{
            __typename?: 'ApplicationFieldAnswer';
            id: string;
            fieldId: string;
            value: string | null;
        }>;
    } | null;
};

export type CreateProfileRegionsQueryVariables = Exact<{ [key: string]: never }>;

export type CreateProfileRegionsQuery = {
    __typename?: 'Query';
    regions: Array<{
        __typename?: 'Region';
        id: string;
        name: string;
        communes: Array<{ __typename?: 'Commune'; id: string; name: string }>;
    }>;
};

export type CollegesByCommuneQueryVariables = Exact<{
    communeId: Scalars['Int'];
}>;

export type CollegesByCommuneQuery = {
    __typename?: 'Query';
    collegesByCommune: Array<{ __typename?: 'College'; id: string; name: string }>;
};

export type AdminApplicationsTableQueryVariables = Exact<{
    after: InputMaybe<Scalars['String']>;
    before: InputMaybe<Scalars['String']>;
    first: InputMaybe<Scalars['Int']>;
    last: InputMaybe<Scalars['Int']>;
    filter: ApplicationsFilter;
}>;

export type AdminApplicationsTableQuery = {
    __typename?: 'Query';
    applications: {
        __typename?: 'QueryApplicationsConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            endCursor: string | null;
        };
        edges: Array<{
            __typename?: 'QueryApplicationsConnectionEdge';
            cursor: string;
            node: {
                __typename?: 'Application';
                id: string;
                formId: string;
                createdOn: string;
                currentStatus: {
                    __typename?: 'ApplicationHistory';
                    status: ApplicationStatus;
                } | null;
                user: {
                    __typename?: 'User';
                    email: string;
                    firstName: string;
                    lastName: string;
                    phoneCode: string | null;
                    phoneNumber: string | null;
                    studentProfile: { __typename?: 'Student'; collegeId: string | null };
                };
            };
        } | null>;
    };
};

export type AdminApplicationsTableFilterOptionsQueryVariables = Exact<{
    [key: string]: never;
}>;

export type AdminApplicationsTableFilterOptionsQuery = {
    __typename?: 'Query';
    convocatories: Array<{
        __typename?: 'Convocatory';
        id: string;
        privateLabel: string;
        form: { __typename?: 'Form'; id: string } | null;
    }>;
    colleges: Array<{ __typename?: 'College'; id: string; name: string }>;
};

export type DeleteCollegeMutationVariables = Exact<{
    id: Scalars['Int'];
}>;

export type DeleteCollegeMutation = {
    __typename?: 'Mutation';
    deleteCollege:
        | { __typename: 'ApiError'; message: string }
        | { __typename: 'DeleteCollegeSuccess'; id: number };
};

export type AdminCollegesTableQueryVariables = Exact<{
    after: InputMaybe<Scalars['String']>;
    before: InputMaybe<Scalars['String']>;
    first: InputMaybe<Scalars['Int']>;
    last: InputMaybe<Scalars['Int']>;
    filter: CollegesFilter;
}>;

export type AdminCollegesTableQuery = {
    __typename?: 'Query';
    collegesCursor: {
        __typename?: 'QueryCollegesCursorConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            endCursor: string | null;
        };
        edges: Array<{
            __typename?: 'QueryCollegesCursorConnectionEdge';
            cursor: string;
            node: {
                __typename?: 'College';
                id: string;
                name: string;
                communeId: string | null;
            };
        } | null>;
    };
};

export type AdminCollegesTableFilterOptionsQueryVariables = Exact<{
    [key: string]: never;
}>;

export type AdminCollegesTableFilterOptionsQuery = {
    __typename?: 'Query';
    regions: Array<{ __typename?: 'Region'; id: string; name: string }>;
    communes: Array<{
        __typename?: 'Commune';
        id: string;
        name: string;
        regionId: string;
    }>;
};

export type DeleteConvocatoryMutationVariables = Exact<{
    id: Scalars['Int'];
}>;

export type DeleteConvocatoryMutation = {
    __typename?: 'Mutation';
    deleteConvocatory: number;
};

export type AdminConvocatoriesTableQueryVariables = Exact<{ [key: string]: never }>;

export type AdminConvocatoriesTableQuery = {
    __typename?: 'Query';
    convocatories: Array<{
        __typename?: 'Convocatory';
        id: string;
        kind: ScholarshipConvocatoryKind;
        order: number;
        privateLabel: string;
        countAddingsFromDate: string | null;
        countAddingsTillDate: string | null;
        form: { __typename?: 'Form'; id: string; uuid: string } | null;
        talk: { __typename?: 'Talk'; startDate: string; endDate: string } | null;
    }>;
};

export type CreateFormMutationVariables = Exact<{
    input: FormInput;
}>;

export type CreateFormMutation = {
    __typename?: 'Mutation';
    createForm: { __typename?: 'Form'; id: string };
};

export type UpdateFormMutationVariables = Exact<{
    id: Scalars['Int'];
    input: FormInput;
    fieldsIDsToDelete: Array<Scalars['Int']>;
}>;

export type UpdateFormMutation = {
    __typename?: 'Mutation';
    updateForm: { __typename?: 'Form'; id: string };
};

export type CreateTalkMutationVariables = Exact<{
    input: TalkInput;
}>;

export type CreateTalkMutation = {
    __typename?: 'Mutation';
    createTalk: { __typename?: 'Talk'; id: string };
};

export type UpdateTalkMutationVariables = Exact<{
    id: Scalars['Int'];
    input: TalkInput;
}>;

export type UpdateTalkMutation = {
    __typename?: 'Mutation';
    updateTalk: { __typename?: 'Talk'; id: string };
};

export type AdminConvocatoriesQueryVariables = Exact<{ [key: string]: never }>;

export type AdminConvocatoriesQuery = {
    __typename?: 'Query';
    convocatories: Array<{
        __typename?: 'Convocatory';
        id: string;
        privateLabel: string;
        order: number;
    }>;
};

export type AdminStatsQueryVariables = Exact<{
    convocatoriesIds: InputMaybe<Array<Scalars['Int']>>;
}>;

export type AdminStatsQuery = {
    __typename?: 'Query';
    adminStats: {
        __typename?: 'AdminStats';
        maxPlatziScholarships: number;
        maxDevfScholarships: number;
        studentsCount: number;
        assistancesToTalks: number;
        postulationSubmissionsCount: number;
        scholarshipsCount: number;
        stats: Array<{
            __typename?: 'AdminStatsItem';
            addedStudents: number;
            signedUpStudents: number;
            talkInscriptions: number;
            talkAssistants: number;
            postulationSubmissions: number;
            postulationSubmissionsAccepted: number;
            postulationSubmissionsAcceptedTerms: number;
            postulationSubmissionsRejectedTerms: number;
            postulationSubmissionsPendingTerms: number;
            postulationSubmissionsUnansweredTerms: number;
            scholarships: number;
            scholarshipsWithdrawn: number;
            scholarshipsFinished: number;
            scholarshipsStudying: number;
            convocatory: {
                __typename?: 'Convocatory';
                id: string;
                order: number;
                privateLabel: string;
                countAddingsFromDate: string | null;
                countAddingsTillDate: string | null;
                kind: ScholarshipConvocatoryKind;
                lessonsStartDate: string | null;
                talk: { __typename?: 'Talk'; startDate: string } | null;
            };
            postulationSubmissionsRejected: Array<{
                __typename?: 'AdminStatsItemPostulationStatusDataItem';
                reason: string;
                count: number;
            }>;
            postulationSubmissionsPending: Array<{
                __typename?: 'AdminStatsItemPostulationStatusDataItem';
                reason: string;
                count: number;
            }>;
            scholarshipsByConvocatorySource: Array<{
                __typename?: 'AdminStatsItemScholarshipByConvocatory';
                scholarships: number;
                scholarshipsWithdrawn: number;
                convocatory: {
                    __typename?: 'Convocatory';
                    id: string;
                    privateLabel: string;
                    countAddingsFromDate: string | null;
                    countAddingsTillDate: string | null;
                };
            }>;
        }>;
    };
};

export type AdminStudentsCountByDateQueryVariables = Exact<{
    startDate: InputMaybe<Scalars['Date']>;
    endDate: InputMaybe<Scalars['Date']>;
    convocatory: InputMaybe<Scalars['Int']>;
}>;

export type AdminStudentsCountByDateQuery = {
    __typename?: 'Query';
    adminStudentsCountByDate: {
        __typename?: 'AdminStudentsCountByDate';
        joinedAtItems: Array<{
            __typename?: 'AdminStudentsCountByDateItem';
            date: string;
            count: number;
        }>;
        signedUpAtItems: Array<{
            __typename?: 'AdminStudentsCountByDateItem';
            date: string;
            count: number;
        }>;
    };
};

export type AdminScholarshipsTableQueryVariables = Exact<{
    after: InputMaybe<Scalars['String']>;
    before: InputMaybe<Scalars['String']>;
    first: InputMaybe<Scalars['Int']>;
    last: InputMaybe<Scalars['Int']>;
    filter: ScholarshipsFilter;
}>;

export type AdminScholarshipsTableQuery = {
    __typename?: 'Query';
    scholarships: {
        __typename?: 'QueryScholarshipsConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            endCursor: string | null;
        };
        edges: Array<{
            __typename?: 'QueryScholarshipsConnectionEdge';
            cursor: string;
            node: {
                __typename?: 'Scholarship';
                id: string;
                convocatoryId: string;
                createdOn: string;
                user: {
                    __typename?: 'User';
                    id: string;
                    email: string;
                    firstName: string;
                    lastName: string;
                    phoneCode: string | null;
                    phoneNumber: string | null;
                    studentProfile: { __typename?: 'Student'; collegeId: string | null };
                };
            };
        } | null>;
    };
};

export type AdminScholarshipsTableFilterOptionsQueryVariables = Exact<{
    [key: string]: never;
}>;

export type AdminScholarshipsTableFilterOptionsQuery = {
    __typename?: 'Query';
    convocatories: Array<{
        __typename?: 'Convocatory';
        id: string;
        privateLabel: string;
    }>;
    colleges: Array<{ __typename?: 'College'; id: string; name: string }>;
};

export type CreateStudentMutationVariables = Exact<{
    studentDetails: StudentInput;
    collegeId: InputMaybe<Scalars['Int']>;
    newCollegeName: InputMaybe<Scalars['String']>;
    communeId: InputMaybe<Scalars['Int']>;
}>;

export type CreateStudentMutation = {
    __typename?: 'Mutation';
    createStudent: { __typename?: 'Student'; id: string };
};

export type UpdateStudentMutationVariables = Exact<{
    userId: Scalars['Int'];
    studentDetails: StudentInput;
    collegeId: InputMaybe<Scalars['Int']>;
    newCollegeName: InputMaybe<Scalars['String']>;
    communeId: InputMaybe<Scalars['Int']>;
}>;

export type UpdateStudentMutation = {
    __typename?: 'Mutation';
    updateStudent: { __typename?: 'Student'; id: string };
};

export type ImportStudentsMutationVariables = Exact<{
    students: Array<StudentInput>;
    collegeId: Scalars['Int'];
}>;

export type ImportStudentsMutation = { __typename?: 'Mutation'; importStudents: boolean };

export type StudentUserByIdForUpdateQueryVariables = Exact<{
    userId: Scalars['Int'];
}>;

export type StudentUserByIdForUpdateQuery = {
    __typename?: 'Query';
    studentUserById: {
        __typename?: 'User';
        firstName: string;
        lastName: string;
        email: string;
        phoneCode: string | null;
        phoneNumber: string | null;
        studentProfile: {
            __typename?: 'Student';
            college: {
                __typename?: 'College';
                id: string;
                communeId: string | null;
            } | null;
        };
    };
    regions: Array<{
        __typename?: 'Region';
        id: string;
        name: string;
        communes: Array<{ __typename?: 'Commune'; id: string; name: string }>;
    }>;
};

export type AdminStudentsTableQueryVariables = Exact<{
    after: InputMaybe<Scalars['String']>;
    before: InputMaybe<Scalars['String']>;
    first: InputMaybe<Scalars['Int']>;
    last: InputMaybe<Scalars['Int']>;
    filter: StudentsFilter;
}>;

export type AdminStudentsTableQuery = {
    __typename?: 'Query';
    students: {
        __typename?: 'QueryStudentsConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            endCursor: string | null;
        };
        edges: Array<{
            __typename?: 'QueryStudentsConnectionEdge';
            cursor: string;
            node: {
                __typename?: 'User';
                id: string;
                dateJoined: string;
                email: string;
                firstName: string;
                lastName: string;
                phoneCode: string | null;
                phoneNumber: string | null;
                studentProfile: {
                    __typename?: 'Student';
                    collegeId: string | null;
                    convocatoryId: string | null;
                };
            };
        } | null>;
    };
};

export type AdminStudentsTableFilterOptionsQueryVariables = Exact<{
    [key: string]: never;
}>;

export type AdminStudentsTableFilterOptionsQuery = {
    __typename?: 'Query';
    convocatories: Array<{
        __typename?: 'Convocatory';
        id: string;
        privateLabel: string;
    }>;
    colleges: Array<{ __typename?: 'College'; id: string; name: string }>;
};

export type AdminTalksTableQueryVariables = Exact<{ [key: string]: never }>;

export type AdminTalksTableQuery = {
    __typename?: 'Query';
    talks: Array<{
        __typename?: 'Talk';
        id: string;
        startDate: string;
        endDate: string;
        internalLabel: string | null;
        isVisible: boolean;
        convocatory: { __typename?: 'Convocatory'; privateLabel: string };
    }>;
};

export type VerifyTeacherMutationVariables = Exact<{
    teacherId: Scalars['Int'];
}>;

export type VerifyTeacherMutation = { __typename?: 'Mutation'; verifyTeacher: boolean };

export type AdminTeacherUserByIdQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type AdminTeacherUserByIdQuery = {
    __typename?: 'Query';
    teacherUserById: {
        __typename?: 'User';
        email: string;
        firstName: string;
        lastName: string;
        teacherProfile: {
            __typename?: 'Teacher';
            id: string;
            isVerified: boolean;
            colleges: Array<{ __typename?: 'College'; id: string; name: string }>;
        } | null;
    };
};

export type AdminTeachersTableQueryVariables = Exact<{
    after: InputMaybe<Scalars['String']>;
    before: InputMaybe<Scalars['String']>;
    first: InputMaybe<Scalars['Int']>;
    last: InputMaybe<Scalars['Int']>;
    filter: TeachersFilter;
}>;

export type AdminTeachersTableQuery = {
    __typename?: 'Query';
    teachers: {
        __typename?: 'QueryTeachersConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            endCursor: string | null;
        };
        edges: Array<{
            __typename?: 'QueryTeachersConnectionEdge';
            cursor: string;
            node: {
                __typename?: 'User';
                id: string;
                dateJoined: string;
                email: string;
                firstName: string;
                lastName: string;
                teacherProfile: {
                    __typename?: 'Teacher';
                    isVerified: boolean;
                    colleges: Array<{ __typename?: 'College'; id: string; name: string }>;
                } | null;
            };
        } | null>;
    };
};

export type DeleteUserMutationVariables = Exact<{
    userId: Scalars['Int'];
}>;

export type DeleteUserMutation = { __typename?: 'Mutation'; deleteUser: boolean };

export type AdminUsersTableQueryVariables = Exact<{
    after: InputMaybe<Scalars['String']>;
    before: InputMaybe<Scalars['String']>;
    first: InputMaybe<Scalars['Int']>;
    last: InputMaybe<Scalars['Int']>;
    filter: UsersFilter;
}>;

export type AdminUsersTableQuery = {
    __typename?: 'Query';
    users: {
        __typename?: 'QueryUsersConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            endCursor: string | null;
        };
        edges: Array<{
            __typename?: 'QueryUsersConnectionEdge';
            cursor: string;
            node: {
                __typename?: 'User';
                id: string;
                dateJoined: string;
                email: string;
                firstName: string;
                lastName: string;
            };
        } | null>;
    };
};

export type TrackerCurrentStepQueryVariables = Exact<{ [key: string]: never }>;

export type TrackerCurrentStepQuery = {
    __typename?: 'Query';
    trackerCurrentStep: {
        __typename?: 'TrackerCurrentStep';
        devfScholarship: {
            __typename?: 'Scholarship';
            currentStatus: {
                __typename?: 'ScholarshipStatusHistory';
                status: ScholarshipStatus;
                observations: string | null;
            } | null;
        } | null;
        devfPostulation: {
            __typename?: 'Application';
            currentStatus: {
                __typename?: 'ApplicationHistory';
                status: ApplicationStatus;
                observations: string | null;
            } | null;
            form: {
                __typename?: 'Form';
                uuid: string;
                termsAcceptanceCloseDate: string | null;
            };
        } | null;
        devfForm: {
            __typename?: 'Form';
            uuid: string;
            openDate: string | null;
            closeDate: string | null;
        } | null;
        platziScholarship: {
            __typename?: 'Scholarship';
            platziCompletedMandatoryCourses: boolean;
            currentStatus: {
                __typename?: 'ScholarshipStatusHistory';
                status: ScholarshipStatus;
                observations: string | null;
            } | null;
        } | null;
        platziPostulation: {
            __typename?: 'Application';
            currentStatus: {
                __typename?: 'ApplicationHistory';
                status: ApplicationStatus;
                observations: string | null;
            } | null;
            form: {
                __typename?: 'Form';
                uuid: string;
                termsAcceptanceCloseDate: string | null;
            };
        } | null;
        platziForm: {
            __typename?: 'Form';
            uuid: string;
            openDate: string | null;
            closeDate: string | null;
        } | null;
        platziTalk: {
            __typename?: 'Talk';
            uuid: string;
            startDate: string;
            endDate: string;
            type: TalkType;
            speakers: string;
            myInscription: { __typename?: 'TalkInscription'; number: number } | null;
            convocatory: {
                __typename?: 'Convocatory';
                kind: ScholarshipConvocatoryKind;
                form: {
                    __typename?: 'Form';
                    uuid: string;
                    openDate: string | null;
                    closeDate: string | null;
                } | null;
            };
        } | null;
    };
};

export type TrackerCurrentStepScholarshipFragment = {
    __typename?: 'Scholarship';
    currentStatus: {
        __typename?: 'ScholarshipStatusHistory';
        status: ScholarshipStatus;
        observations: string | null;
    } | null;
};

export type TrackerCurrentStepPostulationFragment = {
    __typename?: 'Application';
    currentStatus: {
        __typename?: 'ApplicationHistory';
        status: ApplicationStatus;
        observations: string | null;
    } | null;
    form: { __typename?: 'Form'; uuid: string; termsAcceptanceCloseDate: string | null };
};

export type TrackerCurrentStepFormFragment = {
    __typename?: 'Form';
    uuid: string;
    openDate: string | null;
    closeDate: string | null;
};

export type MyStudentsTableQueryVariables = Exact<{
    after: InputMaybe<Scalars['String']>;
    before: InputMaybe<Scalars['String']>;
    first: InputMaybe<Scalars['Int']>;
    last: InputMaybe<Scalars['Int']>;
}>;

export type MyStudentsTableQuery = {
    __typename?: 'Query';
    myStudents: {
        __typename?: 'QueryMyStudentsConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            endCursor: string | null;
        };
        edges: Array<{
            __typename?: 'QueryMyStudentsConnectionEdge';
            cursor: string;
            node: {
                __typename?: 'User';
                id: string;
                dateJoined: string;
                email: string;
                firstName: string;
                lastName: string;
                studentProfile: {
                    __typename?: 'Student';
                    lastPlatziTalkInscription: {
                        __typename?: 'TalkInscription';
                        assisted: boolean | null;
                    } | null;
                    lastPlatziApplication: {
                        __typename?: 'Application';
                        currentStatus: {
                            __typename?: 'ApplicationHistory';
                            status: ApplicationStatus;
                        } | null;
                    } | null;
                    lastDevfApplication: {
                        __typename?: 'Application';
                        currentStatus: {
                            __typename?: 'ApplicationHistory';
                            status: ApplicationStatus;
                        } | null;
                    } | null;
                };
            };
        } | null>;
    };
};

export type TeacherUpcomingTalkQueryVariables = Exact<{ [key: string]: never }>;

export type TeacherUpcomingTalkQuery = {
    __typename?: 'Query';
    currentPlatziTalk: {
        __typename?: 'Talk';
        uuid: string;
        startDate: string;
        endDate: string;
        type: TalkType;
        speakers: string;
        myInscription: { __typename?: 'TalkInscription'; number: number } | null;
        convocatory: {
            __typename?: 'Convocatory';
            kind: ScholarshipConvocatoryKind;
            form: {
                __typename?: 'Form';
                uuid: string;
                openDate: string | null;
                closeDate: string | null;
            } | null;
        };
    } | null;
};

export type LandingHeroQueryVariables = Exact<{ [key: string]: never }>;

export type LandingHeroQuery = {
    __typename?: 'Query';
    currentPlatziTalk: { __typename?: 'Talk'; startDate: string; endDate: string } | null;
};

export type SignUpToTalkMutationVariables = Exact<{
    uuid: Scalars['String'];
}>;

export type SignUpToTalkMutation = {
    __typename?: 'Mutation';
    signUpToTalk:
        | { __typename: 'ApiError'; message: string }
        | { __typename: 'TalkInscription'; number: number };
};

export type AssistToTalkMutationVariables = Exact<{
    talkUuid: Scalars['String'];
}>;

export type AssistToTalkMutation = {
    __typename?: 'Mutation';
    assistToTalk:
        | { __typename: 'ApiError'; message: string }
        | { __typename: 'AssistToTalkLink'; url: string };
};

export const TrackerCurrentStepScholarshipFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'TrackerCurrentStepScholarship' },
            typeCondition: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'Scholarship' },
            },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currentStatus' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'status' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'observations' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<TrackerCurrentStepScholarshipFragment, unknown>;
export const TrackerCurrentStepPostulationFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'TrackerCurrentStepPostulation' },
            typeCondition: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'Application' },
            },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currentStatus' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'status' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'observations' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'form' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'uuid' } },
                                {
                                    kind: 'Field',
                                    name: {
                                        kind: 'Name',
                                        value: 'termsAcceptanceCloseDate',
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<TrackerCurrentStepPostulationFragment, unknown>;
export const TrackerCurrentStepFormFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'TrackerCurrentStepForm' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Form' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'uuid' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'openDate' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'closeDate' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<TrackerCurrentStepFormFragment, unknown>;
export const UserDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'firstName' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'lastName' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'isStudent' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'isTeacher' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'isAdmin' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'isSuperAdmin' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'teacherProfile' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'isVerified',
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const UpdateConvocatoryDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateConvocatory' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'input' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'ConvocatoryInput' },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updateConvocatory' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'id' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'input' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    UpdateConvocatoryMutation,
    UpdateConvocatoryMutationVariables
>;
export const ConvocatoryByIdForUpdateDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'convocatoryByIdForUpdate' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'convocatoryById' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'id' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'countAddingsFromDate' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'countAddingsTillDate' },
                                },
                                {
                                    kind: 'Field',
                                    name: {
                                        kind: 'Name',
                                        value: 'devfInformedGraduates',
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: {
                                        kind: 'Name',
                                        value: 'devfInformedNotAssisted',
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'devfInformedPaused' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'devfInformedResigned' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'devfInformedStudying' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'isWithdrawable' },
                                },
                                { kind: 'Field', name: { kind: 'Name', value: 'kind' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'lessonsEndDate' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'lessonsStartDate' },
                                },
                                {
                                    kind: 'Field',
                                    name: {
                                        kind: 'Name',
                                        value: 'maximumWithdrawalDate',
                                    },
                                },
                                { kind: 'Field', name: { kind: 'Name', value: 'order' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'privateLabel' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    ConvocatoryByIdForUpdateQuery,
    ConvocatoryByIdForUpdateQueryVariables
>;
export const ConvocatoryByIdFormDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'convocatoryByIdForm' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'convocatoryById' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'id' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'form' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'openDate' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'closeDate',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'title' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'termsAcceptanceOpenDate',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'termsAcceptanceCloseDate',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'resultsPublicationDate',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'fields' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'id',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'order',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'title',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'description',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'type',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'isRequired',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'minLength',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'maxLength',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'dependsOnFieldId',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'dependsOnFieldOptionId',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'isImportant',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'options',
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'id',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'label',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'order',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'automaticResult',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'automaticResultObservations',
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<ConvocatoryByIdFormQuery, ConvocatoryByIdFormQueryVariables>;
export const ConvocatoryByIdTalkDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'convocatoryByIdTalk' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'convocatoryById' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'id' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'talk' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'description',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'speakers' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'startDate',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'endDate' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'type' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'zoomApiKey',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'zoomApiSecret',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'zoomId' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'zoomRegisterUrl',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'convocatoryId',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'forOrganizationId',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'isVisible',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'internalLabel',
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<ConvocatoryByIdTalkQuery, ConvocatoryByIdTalkQueryVariables>;
export const CreateConvocatoryDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'CreateConvocatory' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'input' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'ConvocatoryInput' },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createConvocatory' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'input' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    CreateConvocatoryMutation,
    CreateConvocatoryMutationVariables
>;
export const CreateTalkFieldsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'createTalkFields' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'convocatories' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'privateLabel' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<CreateTalkFieldsQuery, CreateTalkFieldsQueryVariables>;
export const CreateStudentFieldsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'createStudentFields' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'regions' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'communes' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'name' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<CreateStudentFieldsQuery, CreateStudentFieldsQueryVariables>;
export const ApplyToScholarshipDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'ApplyToScholarship' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'uuid' } },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'String' },
                        },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'answers' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: { kind: 'Name', value: 'FormFieldAnswerInput' },
                                },
                            },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'applyToScholarship' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'uuid' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'uuid' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'answers' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'answers' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'InlineFragment',
                                    typeCondition: {
                                        kind: 'NamedType',
                                        name: { kind: 'Name', value: 'Application' },
                                    },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: '__typename',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'InlineFragment',
                                    typeCondition: {
                                        kind: 'NamedType',
                                        name: { kind: 'Name', value: 'ApiError' },
                                    },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: '__typename',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'message' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    ApplyToScholarshipMutation,
    ApplyToScholarshipMutationVariables
>;
export const FormByUuidDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'formByUUID' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'uuid' } },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'String' },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'formByUUID' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'uuid' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'uuid' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'fields' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'order' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'title' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'description',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'type' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'isRequired',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'minLength',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'maxLength',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'dependsOnFieldId',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'dependsOnFieldOptionId',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'options' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'id',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'label',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'order',
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'myApplication' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<FormByUuidQuery, FormByUuidQueryVariables>;
export const CreateMyStudentProfileDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'CreateMyStudentProfile' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'communeId' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'collegeId' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'newCollegeName' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createMyStudentProfile' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'communeId' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'communeId' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'collegeId' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'collegeId' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'newCollegeName' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'newCollegeName' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    CreateMyStudentProfileMutation,
    CreateMyStudentProfileMutationVariables
>;
export const CreateMyTeacherProfileDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'CreateMyTeacherProfile' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'communeId' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'role' } },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'String' },
                        },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'collegeId' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'newCollegeName' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createMyTeacherProfile' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'communeId' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'communeId' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'role' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'role' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'collegeId' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'collegeId' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'newCollegeName' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'newCollegeName' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    CreateMyTeacherProfileMutation,
    CreateMyTeacherProfileMutationVariables
>;
export const UpdateScholarshipApplicationStatusDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateScholarshipApplicationStatus' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'applicationId' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'status' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'ApplicationStatus' },
                        },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'observations' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'sendEmail' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: {
                            kind: 'Name',
                            value: 'updateScholarshipApplicationStatus',
                        },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'applicationId' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'applicationId' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'status' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'status' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'observations' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'observations' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'sendEmail' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'sendEmail' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    UpdateScholarshipApplicationStatusMutation,
    UpdateScholarshipApplicationStatusMutationVariables
>;
export const AdminApplicationByIdDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'adminApplicationById' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'applicationById' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'id' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'user' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'email' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'firstName',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'lastName' },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'currentStatus' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'status' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'observations',
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'form' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'title' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'fields' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'id',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'order',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'title',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'description',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'type',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'isRequired',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'minLength',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'maxLength',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'dependsOnFieldId',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'dependsOnFieldOptionId',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'options',
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'id',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'label',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'order',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'automaticResult',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'automaticResultObservations',
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'isImportant',
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'myApplication',
                                                },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'id',
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'answers' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'fieldId' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'value' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    AdminApplicationByIdQuery,
    AdminApplicationByIdQueryVariables
>;
export const CreateProfileRegionsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'createProfileRegions' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'regions' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'communes' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'name' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    CreateProfileRegionsQuery,
    CreateProfileRegionsQueryVariables
>;
export const CollegesByCommuneDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'collegesByCommune' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'communeId' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'collegesByCommune' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'communeId' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'communeId' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<CollegesByCommuneQuery, CollegesByCommuneQueryVariables>;
export const AdminApplicationsTableDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'adminApplicationsTable' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'before' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'filter' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'ApplicationsFilter' },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'applications' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'after' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'after' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'before' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'before' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'first' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'first' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'last' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'last' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'filter' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'filter' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'pageInfo' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'hasNextPage',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'hasPreviousPage',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'endCursor',
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'cursor' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'node' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'id',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'formId',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'createdOn',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'currentStatus',
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'status',
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'user',
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'email',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'firstName',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'lastName',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'phoneCode',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'phoneNumber',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'studentProfile',
                                                                        },
                                                                        selectionSet: {
                                                                            kind: 'SelectionSet',
                                                                            selections: [
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'collegeId',
                                                                                    },
                                                                                },
                                                                            ],
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    AdminApplicationsTableQuery,
    AdminApplicationsTableQueryVariables
>;
export const AdminApplicationsTableFilterOptionsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'adminApplicationsTableFilterOptions' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'convocatories' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'privateLabel' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'form' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'colleges' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    AdminApplicationsTableFilterOptionsQuery,
    AdminApplicationsTableFilterOptionsQueryVariables
>;
export const DeleteCollegeDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'deleteCollege' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'deleteCollege' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'id' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'InlineFragment',
                                    typeCondition: {
                                        kind: 'NamedType',
                                        name: {
                                            kind: 'Name',
                                            value: 'DeleteCollegeSuccess',
                                        },
                                    },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: '__typename',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'InlineFragment',
                                    typeCondition: {
                                        kind: 'NamedType',
                                        name: { kind: 'Name', value: 'ApiError' },
                                    },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: '__typename',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'message' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<DeleteCollegeMutation, DeleteCollegeMutationVariables>;
export const AdminCollegesTableDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'adminCollegesTable' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'before' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'filter' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'CollegesFilter' },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'collegesCursor' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'after' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'after' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'before' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'before' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'first' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'first' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'last' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'last' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'filter' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'filter' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'pageInfo' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'hasNextPage',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'hasPreviousPage',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'endCursor',
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'cursor' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'node' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'id',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'name',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'communeId',
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<AdminCollegesTableQuery, AdminCollegesTableQueryVariables>;
export const AdminCollegesTableFilterOptionsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'adminCollegesTableFilterOptions' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'regions' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'communes' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'regionId' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    AdminCollegesTableFilterOptionsQuery,
    AdminCollegesTableFilterOptionsQueryVariables
>;
export const DeleteConvocatoryDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'deleteConvocatory' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'deleteConvocatory' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'id' },
                                },
                            },
                        ],
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    DeleteConvocatoryMutation,
    DeleteConvocatoryMutationVariables
>;
export const AdminConvocatoriesTableDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'adminConvocatoriesTable' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'convocatories' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'form' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'uuid' },
                                            },
                                        ],
                                    },
                                },
                                { kind: 'Field', name: { kind: 'Name', value: 'kind' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'order' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'privateLabel' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'talk' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'startDate',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'endDate' },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'countAddingsFromDate' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'countAddingsTillDate' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    AdminConvocatoriesTableQuery,
    AdminConvocatoriesTableQueryVariables
>;
export const CreateFormDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'createForm' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'input' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'FormInput' },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createForm' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'input' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<CreateFormMutation, CreateFormMutationVariables>;
export const UpdateFormDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'updateForm' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'input' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'FormInput' },
                        },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'fieldsIDsToDelete' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: { kind: 'Name', value: 'Int' },
                                },
                            },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updateForm' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'id' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'input' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'fieldsIDsToDelete' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'fieldsIDsToDelete' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<UpdateFormMutation, UpdateFormMutationVariables>;
export const CreateTalkDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'createTalk' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'input' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'TalkInput' },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createTalk' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'input' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<CreateTalkMutation, CreateTalkMutationVariables>;
export const UpdateTalkDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'updateTalk' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'input' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'TalkInput' },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updateTalk' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'id' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'input' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<UpdateTalkMutation, UpdateTalkMutationVariables>;
export const AdminConvocatoriesDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'adminConvocatories' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'convocatories' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'privateLabel' },
                                },
                                { kind: 'Field', name: { kind: 'Name', value: 'order' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<AdminConvocatoriesQuery, AdminConvocatoriesQueryVariables>;
export const AdminStatsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'adminStats' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'convocatoriesIds' },
                    },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: {
                                kind: 'NamedType',
                                name: { kind: 'Name', value: 'Int' },
                            },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'adminStats' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'convocatoriesIds' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'convocatoriesIds' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: {
                                        kind: 'Name',
                                        value: 'maxPlatziScholarships',
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'maxDevfScholarships' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'studentsCount' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'assistancesToTalks' },
                                },
                                {
                                    kind: 'Field',
                                    name: {
                                        kind: 'Name',
                                        value: 'postulationSubmissionsCount',
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'scholarshipsCount' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'stats' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'convocatory',
                                                },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'id',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'order',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'privateLabel',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'countAddingsFromDate',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'countAddingsTillDate',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'kind',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'lessonsStartDate',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'talk',
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'startDate',
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'addedStudents',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'signedUpStudents',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'talkInscriptions',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'talkAssistants',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'postulationSubmissions',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'postulationSubmissionsAccepted',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'postulationSubmissionsRejected',
                                                },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'reason',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'count',
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'postulationSubmissionsPending',
                                                },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'reason',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'count',
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'postulationSubmissionsAcceptedTerms',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'postulationSubmissionsRejectedTerms',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'postulationSubmissionsPendingTerms',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'postulationSubmissionsUnansweredTerms',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'scholarships',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'scholarshipsWithdrawn',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'scholarshipsFinished',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'scholarshipsStudying',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'scholarshipsByConvocatorySource',
                                                },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'convocatory',
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'id',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'privateLabel',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'countAddingsFromDate',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'countAddingsTillDate',
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'scholarships',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'scholarshipsWithdrawn',
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<AdminStatsQuery, AdminStatsQueryVariables>;
export const AdminStudentsCountByDateDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'adminStudentsCountByDate' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'startDate' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Date' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'endDate' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Date' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'convocatory' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'adminStudentsCountByDate' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'convocatory' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'convocatory' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'startDate' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'startDate' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'endDate' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'endDate' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'joinedAtItems' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'date' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'count' },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'signedUpAtItems' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'date' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'count' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    AdminStudentsCountByDateQuery,
    AdminStudentsCountByDateQueryVariables
>;
export const AdminScholarshipsTableDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'adminScholarshipsTable' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'before' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'filter' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'ScholarshipsFilter' },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'scholarships' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'after' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'after' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'before' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'before' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'first' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'first' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'last' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'last' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'filter' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'filter' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'pageInfo' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'hasNextPage',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'hasPreviousPage',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'endCursor',
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'cursor' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'node' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'id',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'convocatoryId',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'createdOn',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'user',
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'id',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'email',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'firstName',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'lastName',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'phoneCode',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'phoneNumber',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'studentProfile',
                                                                        },
                                                                        selectionSet: {
                                                                            kind: 'SelectionSet',
                                                                            selections: [
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'collegeId',
                                                                                    },
                                                                                },
                                                                            ],
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    AdminScholarshipsTableQuery,
    AdminScholarshipsTableQueryVariables
>;
export const AdminScholarshipsTableFilterOptionsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'adminScholarshipsTableFilterOptions' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'convocatories' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'privateLabel' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'colleges' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    AdminScholarshipsTableFilterOptionsQuery,
    AdminScholarshipsTableFilterOptionsQueryVariables
>;
export const CreateStudentDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'createStudent' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'studentDetails' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'StudentInput' },
                        },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'collegeId' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'newCollegeName' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'communeId' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createStudent' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'studentDetails' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'studentDetails' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'collegeId' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'collegeId' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'newCollegeName' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'newCollegeName' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'communeId' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'communeId' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<CreateStudentMutation, CreateStudentMutationVariables>;
export const UpdateStudentDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'updateStudent' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'userId' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'studentDetails' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'StudentInput' },
                        },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'collegeId' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'newCollegeName' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'communeId' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updateStudent' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'userId' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'userId' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'studentDetails' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'studentDetails' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'collegeId' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'collegeId' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'newCollegeName' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'newCollegeName' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'communeId' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'communeId' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<UpdateStudentMutation, UpdateStudentMutationVariables>;
export const ImportStudentsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'importStudents' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'students' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: { kind: 'Name', value: 'StudentInput' },
                                },
                            },
                        },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'collegeId' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'importStudents' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'students' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'students' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'collegeId' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'collegeId' },
                                },
                            },
                        ],
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<ImportStudentsMutation, ImportStudentsMutationVariables>;
export const StudentUserByIdForUpdateDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'studentUserByIdForUpdate' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'userId' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'studentUserById' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'userId' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'userId' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'firstName' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'lastName' },
                                },
                                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'phoneCode' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'phoneNumber' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'studentProfile' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'college' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'id',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'communeId',
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'regions' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'communes' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'name' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    StudentUserByIdForUpdateQuery,
    StudentUserByIdForUpdateQueryVariables
>;
export const AdminStudentsTableDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'adminStudentsTable' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'before' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'filter' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'StudentsFilter' },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'students' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'after' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'after' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'before' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'before' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'first' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'first' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'last' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'last' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'filter' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'filter' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'pageInfo' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'hasNextPage',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'hasPreviousPage',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'endCursor',
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'cursor' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'node' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'id',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'dateJoined',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'email',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'firstName',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'lastName',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'phoneCode',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'phoneNumber',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'studentProfile',
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'collegeId',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'convocatoryId',
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<AdminStudentsTableQuery, AdminStudentsTableQueryVariables>;
export const AdminStudentsTableFilterOptionsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'adminStudentsTableFilterOptions' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'convocatories' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'privateLabel' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'colleges' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    AdminStudentsTableFilterOptionsQuery,
    AdminStudentsTableFilterOptionsQueryVariables
>;
export const AdminTalksTableDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'adminTalksTable' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'talks' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'convocatory' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'privateLabel',
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'startDate' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'endDate' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'internalLabel' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'isVisible' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<AdminTalksTableQuery, AdminTalksTableQueryVariables>;
export const VerifyTeacherDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'verifyTeacher' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'teacherId' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'verifyTeacher' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'teacherId' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'teacherId' },
                                },
                            },
                        ],
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<VerifyTeacherMutation, VerifyTeacherMutationVariables>;
export const AdminTeacherUserByIdDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'AdminTeacherUserById' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'teacherUserById' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'id' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'firstName' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'lastName' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'teacherProfile' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'isVerified',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'colleges' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'id',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'name',
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    AdminTeacherUserByIdQuery,
    AdminTeacherUserByIdQueryVariables
>;
export const AdminTeachersTableDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'adminTeachersTable' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'before' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'filter' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'TeachersFilter' },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'teachers' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'after' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'after' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'before' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'before' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'first' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'first' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'last' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'last' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'filter' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'filter' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'pageInfo' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'hasNextPage',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'hasPreviousPage',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'endCursor',
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'cursor' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'node' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'id',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'dateJoined',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'email',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'firstName',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'lastName',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'teacherProfile',
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'isVerified',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'colleges',
                                                                        },
                                                                        selectionSet: {
                                                                            kind: 'SelectionSet',
                                                                            selections: [
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'id',
                                                                                    },
                                                                                },
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'name',
                                                                                    },
                                                                                },
                                                                            ],
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<AdminTeachersTableQuery, AdminTeachersTableQueryVariables>;
export const DeleteUserDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'DeleteUser' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'userId' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'deleteUser' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'userId' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'userId' },
                                },
                            },
                        ],
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const AdminUsersTableDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'adminUsersTable' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'before' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'filter' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'UsersFilter' },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'users' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'after' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'after' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'before' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'before' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'first' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'first' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'last' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'last' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'filter' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'filter' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'pageInfo' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'hasNextPage',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'hasPreviousPage',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'endCursor',
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'cursor' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'node' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'id',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'dateJoined',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'email',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'firstName',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'lastName',
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<AdminUsersTableQuery, AdminUsersTableQueryVariables>;
export const TrackerCurrentStepDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'TrackerCurrentStep' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'trackerCurrentStep' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'devfScholarship' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'FragmentSpread',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'TrackerCurrentStepScholarship',
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'devfPostulation' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'FragmentSpread',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'TrackerCurrentStepPostulation',
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'devfForm' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'FragmentSpread',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'TrackerCurrentStepForm',
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'platziScholarship' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'FragmentSpread',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'TrackerCurrentStepScholarship',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'platziCompletedMandatoryCourses',
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'platziPostulation' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'FragmentSpread',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'TrackerCurrentStepPostulation',
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'platziForm' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'FragmentSpread',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'TrackerCurrentStepForm',
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'platziTalk' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'uuid' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'startDate',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'endDate' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'type' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'speakers' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'myInscription',
                                                },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'number',
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'convocatory',
                                                },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'kind',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'form',
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'uuid',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'openDate',
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'closeDate',
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'TrackerCurrentStepScholarship' },
            typeCondition: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'Scholarship' },
            },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currentStatus' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'status' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'observations' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'TrackerCurrentStepPostulation' },
            typeCondition: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'Application' },
            },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currentStatus' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'status' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'observations' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'form' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'uuid' } },
                                {
                                    kind: 'Field',
                                    name: {
                                        kind: 'Name',
                                        value: 'termsAcceptanceCloseDate',
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'TrackerCurrentStepForm' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Form' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'uuid' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'openDate' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'closeDate' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<TrackerCurrentStepQuery, TrackerCurrentStepQueryVariables>;
export const MyStudentsTableDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'myStudentsTable' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'before' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                    },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'myStudents' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'after' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'after' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'before' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'before' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'first' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'first' },
                                },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'last' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'last' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'pageInfo' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'hasNextPage',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'hasPreviousPage',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'endCursor',
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'cursor' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'node' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'id',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'dateJoined',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'email',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'firstName',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'lastName',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'studentProfile',
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'lastPlatziTalkInscription',
                                                                        },
                                                                        selectionSet: {
                                                                            kind: 'SelectionSet',
                                                                            selections: [
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'assisted',
                                                                                    },
                                                                                },
                                                                            ],
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'lastPlatziApplication',
                                                                        },
                                                                        selectionSet: {
                                                                            kind: 'SelectionSet',
                                                                            selections: [
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'currentStatus',
                                                                                    },
                                                                                    selectionSet:
                                                                                        {
                                                                                            kind: 'SelectionSet',
                                                                                            selections:
                                                                                                [
                                                                                                    {
                                                                                                        kind: 'Field',
                                                                                                        name: {
                                                                                                            kind: 'Name',
                                                                                                            value: 'status',
                                                                                                        },
                                                                                                    },
                                                                                                ],
                                                                                        },
                                                                                },
                                                                            ],
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'lastDevfApplication',
                                                                        },
                                                                        selectionSet: {
                                                                            kind: 'SelectionSet',
                                                                            selections: [
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'currentStatus',
                                                                                    },
                                                                                    selectionSet:
                                                                                        {
                                                                                            kind: 'SelectionSet',
                                                                                            selections:
                                                                                                [
                                                                                                    {
                                                                                                        kind: 'Field',
                                                                                                        name: {
                                                                                                            kind: 'Name',
                                                                                                            value: 'status',
                                                                                                        },
                                                                                                    },
                                                                                                ],
                                                                                        },
                                                                                },
                                                                            ],
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<MyStudentsTableQuery, MyStudentsTableQueryVariables>;
export const TeacherUpcomingTalkDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'teacherUpcomingTalk' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currentPlatziTalk' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'uuid' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'startDate' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'endDate' },
                                },
                                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'speakers' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'myInscription' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'number' },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'convocatory' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'kind' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'form' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'uuid',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'openDate',
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'closeDate',
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<TeacherUpcomingTalkQuery, TeacherUpcomingTalkQueryVariables>;
export const LandingHeroDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'landingHero' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currentPlatziTalk' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'startDate' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'endDate' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<LandingHeroQuery, LandingHeroQueryVariables>;
export const SignUpToTalkDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'signUpToTalk' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'uuid' } },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'String' },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'signUpToTalk' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'talkUuid' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'uuid' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'InlineFragment',
                                    typeCondition: {
                                        kind: 'NamedType',
                                        name: { kind: 'Name', value: 'TalkInscription' },
                                    },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: '__typename',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'number' },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'InlineFragment',
                                    typeCondition: {
                                        kind: 'NamedType',
                                        name: { kind: 'Name', value: 'ApiError' },
                                    },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: '__typename',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'message' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<SignUpToTalkMutation, SignUpToTalkMutationVariables>;
export const AssistToTalkDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'assistToTalk' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'talkUuid' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'String' },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'assistToTalk' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'talkUuid' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'talkUuid' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'InlineFragment',
                                    typeCondition: {
                                        kind: 'NamedType',
                                        name: { kind: 'Name', value: 'AssistToTalkLink' },
                                    },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: '__typename',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'url' },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'InlineFragment',
                                    typeCondition: {
                                        kind: 'NamedType',
                                        name: { kind: 'Name', value: 'ApiError' },
                                    },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: {
                                                    kind: 'Name',
                                                    value: '__typename',
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'message' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<AssistToTalkMutation, AssistToTalkMutationVariables>;
