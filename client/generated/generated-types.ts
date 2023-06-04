import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/**
 * ############
 * Assignments#
 * ############
 */
export type Assignment = {
  __typename?: 'Assignment';
  author: User;
  description: Scalars['String'];
  id: Scalars['ID'];
  sandbox: Scalars['Boolean'];
  title: Scalars['String'];
  xml: Scalars['String'];
};

export type Classroom = {
  __typename?: 'Classroom';
  id: Scalars['String'];
  inviteCode: Scalars['String'];
  name: Scalars['String'];
  users: Array<User>;
};

export type CreateAssignmentInput = {
  description: Scalars['String'];
  sandbox: Scalars['Boolean'];
  title: Scalars['String'];
  xml: Scalars['String'];
};

export type CreateClassroomInput = {
  inviteCode: Scalars['String'];
  name: Scalars['String'];
};

export type CreateExamInput = {
  accessibleFrom: Scalars['String'];
  accessibleTo: Scalars['String'];
  assignmentIds: Array<Scalars['ID']>;
  classroomIds: Array<Scalars['ID']>;
  timeLimit: Scalars['Int'];
  title: Scalars['String'];
};

/**
 * ######
 * Exams#
 * ######
 */
export type Exam = {
  __typename?: 'Exam';
  accessibleFrom: Scalars['String'];
  accessibleTo: Scalars['String'];
  assignments: Array<Assignment>;
  author: User;
  classrooms: Array<Classroom>;
  id: Scalars['ID'];
  timeLimit: Scalars['Int'];
  title: Scalars['String'];
};

/**
 * #################
 * Exam submissions#
 * #################
 */
export type ExamSubmission = {
  __typename?: 'ExamSubmission';
  assignment: Assignment;
  comment?: Maybe<Scalars['String']>;
  exam: Exam;
  examSubmissionState: ExamSubmissionState;
  id: Scalars['ID'];
  points?: Maybe<Scalars['Float']>;
  startedAt: Scalars['String'];
  submittedAt?: Maybe<Scalars['String']>;
  user: User;
  validatorReport?: Maybe<ValidatorReport>;
  xml?: Maybe<Scalars['String']>;
};

export type ExamSubmissionCheckpointInput = {
  id?: InputMaybe<Scalars['ID']>;
  xml?: InputMaybe<Scalars['String']>;
};

export type ExamSubmissionGradeInput = {
  comment?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  points?: InputMaybe<Scalars['Float']>;
};

export enum ExamSubmissionState {
  Draft = 'Draft',
  Graded = 'Graded',
  Submitted = 'Submitted'
}

export type ExamSubmissionSubmitInput = {
  id?: InputMaybe<Scalars['ID']>;
  xml?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: Classroom;
  /** Begin exam */
  beginExam: ExamSubmission;
  /** Checkpoint exam submission */
  checkpointExamSubmission: ExamSubmission;
  /** Create assignment */
  createAssignment?: Maybe<Assignment>;
  createClassroom?: Maybe<Classroom>;
  /** Create exam */
  createExam?: Maybe<Exam>;
  /** Create sandbox submission */
  createSandboxSubmission?: Maybe<SandboxSubmission>;
  /** Delete assignment */
  deleteAssignment?: Maybe<Scalars['Boolean']>;
  deleteClassroom?: Maybe<Scalars['Boolean']>;
  /** Delete exam */
  deleteExam?: Maybe<Scalars['Boolean']>;
  /** Delete exam submission */
  deleteExamSubmission?: Maybe<Scalars['Boolean']>;
  /** Delete sandbox submission */
  deleteSandboxSubmission?: Maybe<Scalars['Boolean']>;
  /** Grade exam submission */
  gradeExamSubmission: ExamSubmission;
  removeUser: Classroom;
  signUp?: Maybe<User>;
  /** Submit exam submission */
  submitExamSubmission: ExamSubmission;
  /** Submit sandbox submission */
  submitSandboxSubmission: SandboxSubmission;
  /** Update assignment */
  updateAssignment: Assignment;
  /** Update exam */
  updateExam: Exam;
};


export type MutationAddUserArgs = {
  classroomId: Scalars['String'];
  username: Scalars['String'];
};


export type MutationBeginExamArgs = {
  id: Scalars['String'];
};


export type MutationCheckpointExamSubmissionArgs = {
  input: ExamSubmissionCheckpointInput;
};


export type MutationCreateAssignmentArgs = {
  input: CreateAssignmentInput;
};


export type MutationCreateClassroomArgs = {
  input: CreateClassroomInput;
};


export type MutationCreateExamArgs = {
  input: CreateExamInput;
};


export type MutationCreateSandboxSubmissionArgs = {
  assignmentId: Scalars['String'];
};


export type MutationDeleteAssignmentArgs = {
  id: Scalars['String'];
};


export type MutationDeleteClassroomArgs = {
  id: Scalars['String'];
};


export type MutationDeleteExamArgs = {
  id: Scalars['String'];
};


export type MutationDeleteExamSubmissionArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSandboxSubmissionArgs = {
  id: Scalars['String'];
};


export type MutationGradeExamSubmissionArgs = {
  input: ExamSubmissionGradeInput;
};


export type MutationRemoveUserArgs = {
  classroomId: Scalars['String'];
  username: Scalars['String'];
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationSubmitExamSubmissionArgs = {
  input: ExamSubmissionSubmitInput;
};


export type MutationSubmitSandboxSubmissionArgs = {
  input: SandboxSubmissionSubmitInput;
};


export type MutationUpdateAssignmentArgs = {
  input: UpdateAssignmentInput;
};


export type MutationUpdateExamArgs = {
  input: UpdateExamInput;
};

export type Query = {
  __typename?: 'Query';
  assignmentById: Assignment;
  assignments: Array<Assignment>;
  classroomById: Classroom;
  classrooms: Array<Classroom>;
  examById: Exam;
  examSubmissionById?: Maybe<ExamSubmission>;
  examSubmissions: Array<ExamSubmission>;
  examSubmissionsByExamId: Array<ExamSubmission>;
  exams: Array<Exam>;
  myExamSubmissions: Array<ExamSubmission>;
  mySandboxSubmissions: Array<SandboxSubmission>;
  openedExams: Array<Exam>;
  roles: Array<Role>;
  sandboxAssignments: Array<Assignment>;
  sandboxSubmissionById?: Maybe<SandboxSubmission>;
  sandboxSubmissions: Array<SandboxSubmission>;
  sandboxSubmissionsByAssignment: Array<SandboxSubmission>;
  users: Array<User>;
  validateInviteCode: Scalars['Boolean'];
};


export type QueryAssignmentByIdArgs = {
  id: Scalars['String'];
};


export type QueryClassroomByIdArgs = {
  id: Scalars['String'];
};


export type QueryExamByIdArgs = {
  id: Scalars['String'];
};


export type QueryExamSubmissionByIdArgs = {
  id: Scalars['String'];
};


export type QueryExamSubmissionsByExamIdArgs = {
  examId: Scalars['String'];
};


export type QueryMySandboxSubmissionsArgs = {
  assignmentId: Scalars['String'];
};


export type QuerySandboxSubmissionByIdArgs = {
  id: Scalars['String'];
};


export type QuerySandboxSubmissionsByAssignmentArgs = {
  assignmentId: Scalars['String'];
};


export type QueryValidateInviteCodeArgs = {
  code: Scalars['String'];
};

export type ReferenceMatchingResult = {
  __typename?: 'ReferenceMatchingResult';
  id: Scalars['String'];
  isomorphismCheckResult: Scalars['Boolean'];
  participantsCheckMessage: Scalars['String'];
  participantsCheckResult: Scalars['Boolean'];
  result: ReferenceMatchingResultState;
};

export enum ReferenceMatchingResultState {
  FullMatch = 'FullMatch',
  NoMatch = 'NoMatch',
  PartialMatch = 'PartialMatch'
}

export type Role = {
  __typename?: 'Role';
  name: Scalars['String'];
};

/**
 * #################
 * Sandbox submissions#
 * #################
 */
export type SandboxSubmission = {
  __typename?: 'SandboxSubmission';
  assignment: Assignment;
  id: Scalars['ID'];
  startedAt: Scalars['String'];
  submittedAt?: Maybe<Scalars['String']>;
  user: User;
  validatorReport?: Maybe<ValidatorReport>;
  xml?: Maybe<Scalars['String']>;
};

export type SandboxSubmissionSubmitInput = {
  id?: InputMaybe<Scalars['ID']>;
  xml?: InputMaybe<Scalars['String']>;
};

export type SignUpInput = {
  email: Scalars['String'];
  inviteCode: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  surname: Scalars['String'];
  username: Scalars['String'];
};

export type UpdateAssignmentInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  sandbox: Scalars['Boolean'];
  title?: InputMaybe<Scalars['String']>;
  xml?: InputMaybe<Scalars['String']>;
};

export type UpdateExamInput = {
  accessibleFrom: Scalars['String'];
  accessibleTo: Scalars['String'];
  assignmentIds: Array<Scalars['ID']>;
  classroomIds: Array<Scalars['ID']>;
  id: Scalars['ID'];
  timeLimit: Scalars['Int'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  name: Scalars['String'];
  roles: Array<Role>;
  surname: Scalars['String'];
  username: Scalars['String'];
};

export type ValidatorReport = {
  __typename?: 'ValidatorReport';
  finishedAt: Scalars['String'];
  id: Scalars['String'];
  referenceMatchingResult: ReferenceMatchingResult;
  startedAt: Scalars['String'];
  validatorRuleResults: Array<ValidatorRuleResult>;
};

export type ValidatorRule = {
  __typename?: 'ValidatorRule';
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ValidatorRuleResult = {
  __typename?: 'ValidatorRuleResult';
  id: Scalars['String'];
  message?: Maybe<Scalars['String']>;
  valid: Scalars['Boolean'];
  validatorRule: ValidatorRule;
};

export type CreateAssignmentMutationVariables = Exact<{
  input: CreateAssignmentInput;
}>;


export type CreateAssignmentMutation = { __typename?: 'Mutation', createAssignment?: { __typename?: 'Assignment', id: string, title: string, description: string, xml: string, sandbox: boolean, author: { __typename?: 'User', name: string, surname: string, username: string } } | null };

export type DeleteAssignmentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteAssignmentMutation = { __typename?: 'Mutation', deleteAssignment?: boolean | null };

export type UpdateAssignmentMutationVariables = Exact<{
  input: UpdateAssignmentInput;
}>;


export type UpdateAssignmentMutation = { __typename?: 'Mutation', updateAssignment: { __typename?: 'Assignment', id: string, title: string, description: string, xml: string, sandbox: boolean, author: { __typename?: 'User', name: string, surname: string, username: string } } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp?: { __typename?: 'User', username: string, name: string, surname: string, roles: Array<{ __typename?: 'Role', name: string }> } | null };

export type CreateClassroomMutationVariables = Exact<{
  input: CreateClassroomInput;
}>;


export type CreateClassroomMutation = { __typename?: 'Mutation', createClassroom?: { __typename?: 'Classroom', id: string, name: string, inviteCode: string } | null };

export type DeleteClassroomMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteClassroomMutation = { __typename?: 'Mutation', deleteClassroom?: boolean | null };

export type RemoveUserMutationVariables = Exact<{
  username: Scalars['String'];
  classroomId: Scalars['String'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'Classroom', id: string } };

export type BeginExamMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type BeginExamMutation = { __typename?: 'Mutation', beginExam: { __typename?: 'ExamSubmission', id: string } };

export type CreateExamMutationVariables = Exact<{
  input: CreateExamInput;
}>;


export type CreateExamMutation = { __typename?: 'Mutation', createExam?: { __typename?: 'Exam', id: string, title: string, accessibleFrom: string, accessibleTo: string, author: { __typename?: 'User', name: string, surname: string, username: string }, assignments: Array<{ __typename?: 'Assignment', id: string, title: string, description: string, xml: string, author: { __typename?: 'User', name: string, surname: string, username: string } }>, classrooms: Array<{ __typename?: 'Classroom', id: string, name: string }> } | null };

export type DeleteExamMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteExamMutation = { __typename?: 'Mutation', deleteExam?: boolean | null };

export type UpdateExamMutationVariables = Exact<{
  input: UpdateExamInput;
}>;


export type UpdateExamMutation = { __typename?: 'Mutation', updateExam: { __typename?: 'Exam', id: string, title: string, accessibleFrom: string, accessibleTo: string, author: { __typename?: 'User', name: string, surname: string, username: string }, assignments: Array<{ __typename?: 'Assignment', id: string, title: string, description: string, xml: string, author: { __typename?: 'User', name: string, surname: string, username: string } }>, classrooms: Array<{ __typename?: 'Classroom', id: string, name: string }> } };

export type CreateSandboxSubmissionMutationVariables = Exact<{
  assignmentId: Scalars['String'];
}>;


export type CreateSandboxSubmissionMutation = { __typename?: 'Mutation', createSandboxSubmission?: { __typename?: 'SandboxSubmission', id: string } | null };

export type SubmitSandboxSubmissionMutationVariables = Exact<{
  input: SandboxSubmissionSubmitInput;
}>;


export type SubmitSandboxSubmissionMutation = { __typename?: 'Mutation', submitSandboxSubmission: { __typename?: 'SandboxSubmission', id: string } };

export type CheckpointExamSubmissionMutationVariables = Exact<{
  input: ExamSubmissionCheckpointInput;
}>;


export type CheckpointExamSubmissionMutation = { __typename?: 'Mutation', checkpointExamSubmission: { __typename?: 'ExamSubmission', id: string } };

export type GradeExamSubmissionMutationVariables = Exact<{
  input: ExamSubmissionGradeInput;
}>;


export type GradeExamSubmissionMutation = { __typename?: 'Mutation', gradeExamSubmission: { __typename?: 'ExamSubmission', id: string } };

export type SubmitExamSubmissionMutationVariables = Exact<{
  input: ExamSubmissionSubmitInput;
}>;


export type SubmitExamSubmissionMutation = { __typename?: 'Mutation', submitExamSubmission: { __typename?: 'ExamSubmission', id: string } };

export type AssignmentByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type AssignmentByIdQuery = { __typename?: 'Query', assignmentById: { __typename?: 'Assignment', id: string, title: string, description: string, xml: string, sandbox: boolean, author: { __typename?: 'User', name: string, surname: string, username: string } } };

export type AssignmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AssignmentsQuery = { __typename?: 'Query', assignments: Array<{ __typename?: 'Assignment', id: string, title: string, description: string, xml: string, sandbox: boolean, author: { __typename?: 'User', name: string, surname: string, username: string } }> };

export type AssignmentsPickerQueryVariables = Exact<{ [key: string]: never; }>;


export type AssignmentsPickerQuery = { __typename?: 'Query', assignments: Array<{ __typename?: 'Assignment', id: string, title: string, sandbox: boolean }> };

export type ValidateCodeQueryVariables = Exact<{
  inviteCode: Scalars['String'];
}>;


export type ValidateCodeQuery = { __typename?: 'Query', validateInviteCode: boolean };

export type ClassroomByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ClassroomByIdQuery = { __typename?: 'Query', classroomById: { __typename?: 'Classroom', id: string, name: string, inviteCode: string, users: Array<{ __typename?: 'User', name: string, surname: string, username: string, email: string }> } };

export type ClassroomsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClassroomsQuery = { __typename?: 'Query', classrooms: Array<{ __typename?: 'Classroom', id: string, name: string, inviteCode: string, users: Array<{ __typename?: 'User', username: string }> }> };

export type ExamByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ExamByIdQuery = { __typename?: 'Query', examById: { __typename?: 'Exam', id: string, title: string, accessibleFrom: string, accessibleTo: string, timeLimit: number, author: { __typename?: 'User', name: string, surname: string, username: string }, assignments: Array<{ __typename?: 'Assignment', id: string, title: string, description: string, xml: string }>, classrooms: Array<{ __typename?: 'Classroom', id: string, name: string }> } };

export type ExamsQueryVariables = Exact<{ [key: string]: never; }>;


export type ExamsQuery = { __typename?: 'Query', exams: Array<{ __typename?: 'Exam', id: string, title: string, accessibleFrom: string, accessibleTo: string, timeLimit: number, author: { __typename?: 'User', name: string, surname: string, username: string } }> };

export type OpenedExamsQueryVariables = Exact<{ [key: string]: never; }>;


export type OpenedExamsQuery = { __typename?: 'Query', openedExams: Array<{ __typename?: 'Exam', id: string, title: string, accessibleFrom: string, accessibleTo: string, timeLimit: number }> };

export type MySandboxSubmissionsQueryVariables = Exact<{
  assignmentId: Scalars['String'];
}>;


export type MySandboxSubmissionsQuery = { __typename?: 'Query', mySandboxSubmissions: Array<{ __typename?: 'SandboxSubmission', id: string, startedAt: string, submittedAt?: string | null, assignment: { __typename?: 'Assignment', title: string } }> };

export type SandboxAssignmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type SandboxAssignmentsQuery = { __typename?: 'Query', sandboxAssignments: Array<{ __typename?: 'Assignment', id: string, title: string, description: string, author: { __typename?: 'User', name: string, surname: string, username: string } }> };

export type SandboxSubmissionsByAssignmentIdQueryVariables = Exact<{
  assignmentId: Scalars['String'];
}>;


export type SandboxSubmissionsByAssignmentIdQuery = { __typename?: 'Query', sandboxSubmissionsByAssignment: Array<{ __typename?: 'SandboxSubmission', id: string, startedAt: string, submittedAt?: string | null, user: { __typename?: 'User', name: string, surname: string, username: string } }> };

export type SandboxSubmissionsByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type SandboxSubmissionsByIdQuery = { __typename?: 'Query', sandboxSubmissionById?: { __typename?: 'SandboxSubmission', id: string, startedAt: string, submittedAt?: string | null, xml?: string | null, user: { __typename?: 'User', name: string, surname: string, username: string }, assignment: { __typename?: 'Assignment', id: string, title: string, description: string }, validatorReport?: { __typename?: 'ValidatorReport', id: string, referenceMatchingResult: { __typename?: 'ReferenceMatchingResult', id: string, result: ReferenceMatchingResultState, isomorphismCheckResult: boolean, participantsCheckResult: boolean, participantsCheckMessage: string }, validatorRuleResults: Array<{ __typename?: 'ValidatorRuleResult', id: string, message?: string | null, valid: boolean, validatorRule: { __typename?: 'ValidatorRule', id: string, name: string, description: string } }> } | null } | null };

export type MySubmissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type MySubmissionsQuery = { __typename?: 'Query', myExamSubmissions: Array<{ __typename?: 'ExamSubmission', id: string, startedAt: string, submittedAt?: string | null, examSubmissionState: ExamSubmissionState, exam: { __typename?: 'Exam', title: string }, assignment: { __typename?: 'Assignment', title: string } }> };

export type SubmissionsByExamIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type SubmissionsByExamIdQuery = { __typename?: 'Query', examSubmissionsByExamId: Array<{ __typename?: 'ExamSubmission', id: string, startedAt: string, submittedAt?: string | null, examSubmissionState: ExamSubmissionState, user: { __typename?: 'User', name: string, surname: string, username: string }, exam: { __typename?: 'Exam', id: string, title: string }, assignment: { __typename?: 'Assignment', id: string, title: string } }> };

export type SubmissionByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type SubmissionByIdQuery = { __typename?: 'Query', examSubmissionById?: { __typename?: 'ExamSubmission', id: string, startedAt: string, submittedAt?: string | null, examSubmissionState: ExamSubmissionState, points?: number | null, comment?: string | null, xml?: string | null, user: { __typename?: 'User', username: string, name: string, surname: string }, exam: { __typename?: 'Exam', id: string, title: string, timeLimit: number }, assignment: { __typename?: 'Assignment', id: string, title: string, description: string }, validatorReport?: { __typename?: 'ValidatorReport', id: string, referenceMatchingResult: { __typename?: 'ReferenceMatchingResult', id: string, result: ReferenceMatchingResultState, isomorphismCheckResult: boolean, participantsCheckResult: boolean, participantsCheckMessage: string }, validatorRuleResults: Array<{ __typename?: 'ValidatorRuleResult', id: string, message?: string | null, valid: boolean, validatorRule: { __typename?: 'ValidatorRule', id: string, name: string, description: string } }> } | null } | null };

export type SubmissionByIdGradingQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type SubmissionByIdGradingQuery = { __typename?: 'Query', examSubmissionById?: { __typename?: 'ExamSubmission', id: string, startedAt: string, submittedAt?: string | null, examSubmissionState: ExamSubmissionState, points?: number | null, comment?: string | null, xml?: string | null, user: { __typename?: 'User', name: string, surname: string, username: string }, exam: { __typename?: 'Exam', id: string, title: string }, assignment: { __typename?: 'Assignment', id: string, title: string, description: string, xml: string }, validatorReport?: { __typename?: 'ValidatorReport', id: string, referenceMatchingResult: { __typename?: 'ReferenceMatchingResult', id: string, result: ReferenceMatchingResultState, isomorphismCheckResult: boolean, participantsCheckResult: boolean, participantsCheckMessage: string }, validatorRuleResults: Array<{ __typename?: 'ValidatorRuleResult', id: string, message?: string | null, valid: boolean, validatorRule: { __typename?: 'ValidatorRule', id: string, name: string, description: string } }> } | null } | null };


export const CreateAssignmentDocument = gql`
    mutation CreateAssignment($input: CreateAssignmentInput!) {
  createAssignment(input: $input) {
    id
    title
    description
    author {
      name
      surname
      username
    }
    xml
    sandbox
  }
}
    `;
export type CreateAssignmentMutationFn = Apollo.MutationFunction<CreateAssignmentMutation, CreateAssignmentMutationVariables>;

/**
 * __useCreateAssignmentMutation__
 *
 * To run a mutation, you first call `useCreateAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssignmentMutation, { data, loading, error }] = useCreateAssignmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateAssignmentMutation, CreateAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAssignmentMutation, CreateAssignmentMutationVariables>(CreateAssignmentDocument, options);
      }
export type CreateAssignmentMutationHookResult = ReturnType<typeof useCreateAssignmentMutation>;
export type CreateAssignmentMutationResult = Apollo.MutationResult<CreateAssignmentMutation>;
export type CreateAssignmentMutationOptions = Apollo.BaseMutationOptions<CreateAssignmentMutation, CreateAssignmentMutationVariables>;
export const DeleteAssignmentDocument = gql`
    mutation DeleteAssignment($id: String!) {
  deleteAssignment(id: $id)
}
    `;
export type DeleteAssignmentMutationFn = Apollo.MutationFunction<DeleteAssignmentMutation, DeleteAssignmentMutationVariables>;

/**
 * __useDeleteAssignmentMutation__
 *
 * To run a mutation, you first call `useDeleteAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAssignmentMutation, { data, loading, error }] = useDeleteAssignmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAssignmentMutation, DeleteAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAssignmentMutation, DeleteAssignmentMutationVariables>(DeleteAssignmentDocument, options);
      }
export type DeleteAssignmentMutationHookResult = ReturnType<typeof useDeleteAssignmentMutation>;
export type DeleteAssignmentMutationResult = Apollo.MutationResult<DeleteAssignmentMutation>;
export type DeleteAssignmentMutationOptions = Apollo.BaseMutationOptions<DeleteAssignmentMutation, DeleteAssignmentMutationVariables>;
export const UpdateAssignmentDocument = gql`
    mutation UpdateAssignment($input: UpdateAssignmentInput!) {
  updateAssignment(input: $input) {
    id
    title
    description
    author {
      name
      surname
      username
    }
    xml
    sandbox
  }
}
    `;
export type UpdateAssignmentMutationFn = Apollo.MutationFunction<UpdateAssignmentMutation, UpdateAssignmentMutationVariables>;

/**
 * __useUpdateAssignmentMutation__
 *
 * To run a mutation, you first call `useUpdateAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAssignmentMutation, { data, loading, error }] = useUpdateAssignmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAssignmentMutation, UpdateAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAssignmentMutation, UpdateAssignmentMutationVariables>(UpdateAssignmentDocument, options);
      }
export type UpdateAssignmentMutationHookResult = ReturnType<typeof useUpdateAssignmentMutation>;
export type UpdateAssignmentMutationResult = Apollo.MutationResult<UpdateAssignmentMutation>;
export type UpdateAssignmentMutationOptions = Apollo.BaseMutationOptions<UpdateAssignmentMutation, UpdateAssignmentMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    username
    name
    surname
    roles {
      name
    }
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const CreateClassroomDocument = gql`
    mutation CreateClassroom($input: CreateClassroomInput!) {
  createClassroom(input: $input) {
    id
    name
    inviteCode
  }
}
    `;
export type CreateClassroomMutationFn = Apollo.MutationFunction<CreateClassroomMutation, CreateClassroomMutationVariables>;

/**
 * __useCreateClassroomMutation__
 *
 * To run a mutation, you first call `useCreateClassroomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClassroomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClassroomMutation, { data, loading, error }] = useCreateClassroomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateClassroomMutation(baseOptions?: Apollo.MutationHookOptions<CreateClassroomMutation, CreateClassroomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClassroomMutation, CreateClassroomMutationVariables>(CreateClassroomDocument, options);
      }
export type CreateClassroomMutationHookResult = ReturnType<typeof useCreateClassroomMutation>;
export type CreateClassroomMutationResult = Apollo.MutationResult<CreateClassroomMutation>;
export type CreateClassroomMutationOptions = Apollo.BaseMutationOptions<CreateClassroomMutation, CreateClassroomMutationVariables>;
export const DeleteClassroomDocument = gql`
    mutation DeleteClassroom($id: String!) {
  deleteClassroom(id: $id)
}
    `;
export type DeleteClassroomMutationFn = Apollo.MutationFunction<DeleteClassroomMutation, DeleteClassroomMutationVariables>;

/**
 * __useDeleteClassroomMutation__
 *
 * To run a mutation, you first call `useDeleteClassroomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClassroomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClassroomMutation, { data, loading, error }] = useDeleteClassroomMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClassroomMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClassroomMutation, DeleteClassroomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClassroomMutation, DeleteClassroomMutationVariables>(DeleteClassroomDocument, options);
      }
export type DeleteClassroomMutationHookResult = ReturnType<typeof useDeleteClassroomMutation>;
export type DeleteClassroomMutationResult = Apollo.MutationResult<DeleteClassroomMutation>;
export type DeleteClassroomMutationOptions = Apollo.BaseMutationOptions<DeleteClassroomMutation, DeleteClassroomMutationVariables>;
export const RemoveUserDocument = gql`
    mutation RemoveUser($username: String!, $classroomId: String!) {
  removeUser(username: $username, classroomId: $classroomId) {
    id
  }
}
    `;
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      classroomId: // value for 'classroomId'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const BeginExamDocument = gql`
    mutation BeginExam($id: String!) {
  beginExam(id: $id) {
    id
  }
}
    `;
export type BeginExamMutationFn = Apollo.MutationFunction<BeginExamMutation, BeginExamMutationVariables>;

/**
 * __useBeginExamMutation__
 *
 * To run a mutation, you first call `useBeginExamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBeginExamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [beginExamMutation, { data, loading, error }] = useBeginExamMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBeginExamMutation(baseOptions?: Apollo.MutationHookOptions<BeginExamMutation, BeginExamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BeginExamMutation, BeginExamMutationVariables>(BeginExamDocument, options);
      }
export type BeginExamMutationHookResult = ReturnType<typeof useBeginExamMutation>;
export type BeginExamMutationResult = Apollo.MutationResult<BeginExamMutation>;
export type BeginExamMutationOptions = Apollo.BaseMutationOptions<BeginExamMutation, BeginExamMutationVariables>;
export const CreateExamDocument = gql`
    mutation CreateExam($input: CreateExamInput!) {
  createExam(input: $input) {
    id
    title
    accessibleFrom
    accessibleTo
    author {
      name
      surname
      username
    }
    assignments {
      id
      title
      description
      xml
      author {
        name
        surname
        username
      }
    }
    classrooms {
      id
      name
    }
  }
}
    `;
export type CreateExamMutationFn = Apollo.MutationFunction<CreateExamMutation, CreateExamMutationVariables>;

/**
 * __useCreateExamMutation__
 *
 * To run a mutation, you first call `useCreateExamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExamMutation, { data, loading, error }] = useCreateExamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateExamMutation(baseOptions?: Apollo.MutationHookOptions<CreateExamMutation, CreateExamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExamMutation, CreateExamMutationVariables>(CreateExamDocument, options);
      }
export type CreateExamMutationHookResult = ReturnType<typeof useCreateExamMutation>;
export type CreateExamMutationResult = Apollo.MutationResult<CreateExamMutation>;
export type CreateExamMutationOptions = Apollo.BaseMutationOptions<CreateExamMutation, CreateExamMutationVariables>;
export const DeleteExamDocument = gql`
    mutation DeleteExam($id: String!) {
  deleteExam(id: $id)
}
    `;
export type DeleteExamMutationFn = Apollo.MutationFunction<DeleteExamMutation, DeleteExamMutationVariables>;

/**
 * __useDeleteExamMutation__
 *
 * To run a mutation, you first call `useDeleteExamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExamMutation, { data, loading, error }] = useDeleteExamMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteExamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExamMutation, DeleteExamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExamMutation, DeleteExamMutationVariables>(DeleteExamDocument, options);
      }
export type DeleteExamMutationHookResult = ReturnType<typeof useDeleteExamMutation>;
export type DeleteExamMutationResult = Apollo.MutationResult<DeleteExamMutation>;
export type DeleteExamMutationOptions = Apollo.BaseMutationOptions<DeleteExamMutation, DeleteExamMutationVariables>;
export const UpdateExamDocument = gql`
    mutation UpdateExam($input: UpdateExamInput!) {
  updateExam(input: $input) {
    id
    title
    accessibleFrom
    accessibleTo
    author {
      name
      surname
      username
    }
    assignments {
      id
      title
      description
      xml
      author {
        name
        surname
        username
      }
    }
    classrooms {
      id
      name
    }
  }
}
    `;
export type UpdateExamMutationFn = Apollo.MutationFunction<UpdateExamMutation, UpdateExamMutationVariables>;

/**
 * __useUpdateExamMutation__
 *
 * To run a mutation, you first call `useUpdateExamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExamMutation, { data, loading, error }] = useUpdateExamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateExamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExamMutation, UpdateExamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExamMutation, UpdateExamMutationVariables>(UpdateExamDocument, options);
      }
export type UpdateExamMutationHookResult = ReturnType<typeof useUpdateExamMutation>;
export type UpdateExamMutationResult = Apollo.MutationResult<UpdateExamMutation>;
export type UpdateExamMutationOptions = Apollo.BaseMutationOptions<UpdateExamMutation, UpdateExamMutationVariables>;
export const CreateSandboxSubmissionDocument = gql`
    mutation CreateSandboxSubmission($assignmentId: String!) {
  createSandboxSubmission(assignmentId: $assignmentId) {
    id
  }
}
    `;
export type CreateSandboxSubmissionMutationFn = Apollo.MutationFunction<CreateSandboxSubmissionMutation, CreateSandboxSubmissionMutationVariables>;

/**
 * __useCreateSandboxSubmissionMutation__
 *
 * To run a mutation, you first call `useCreateSandboxSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSandboxSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSandboxSubmissionMutation, { data, loading, error }] = useCreateSandboxSubmissionMutation({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useCreateSandboxSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSandboxSubmissionMutation, CreateSandboxSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSandboxSubmissionMutation, CreateSandboxSubmissionMutationVariables>(CreateSandboxSubmissionDocument, options);
      }
export type CreateSandboxSubmissionMutationHookResult = ReturnType<typeof useCreateSandboxSubmissionMutation>;
export type CreateSandboxSubmissionMutationResult = Apollo.MutationResult<CreateSandboxSubmissionMutation>;
export type CreateSandboxSubmissionMutationOptions = Apollo.BaseMutationOptions<CreateSandboxSubmissionMutation, CreateSandboxSubmissionMutationVariables>;
export const SubmitSandboxSubmissionDocument = gql`
    mutation SubmitSandboxSubmission($input: SandboxSubmissionSubmitInput!) {
  submitSandboxSubmission(input: $input) {
    id
  }
}
    `;
export type SubmitSandboxSubmissionMutationFn = Apollo.MutationFunction<SubmitSandboxSubmissionMutation, SubmitSandboxSubmissionMutationVariables>;

/**
 * __useSubmitSandboxSubmissionMutation__
 *
 * To run a mutation, you first call `useSubmitSandboxSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitSandboxSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitSandboxSubmissionMutation, { data, loading, error }] = useSubmitSandboxSubmissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitSandboxSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<SubmitSandboxSubmissionMutation, SubmitSandboxSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitSandboxSubmissionMutation, SubmitSandboxSubmissionMutationVariables>(SubmitSandboxSubmissionDocument, options);
      }
export type SubmitSandboxSubmissionMutationHookResult = ReturnType<typeof useSubmitSandboxSubmissionMutation>;
export type SubmitSandboxSubmissionMutationResult = Apollo.MutationResult<SubmitSandboxSubmissionMutation>;
export type SubmitSandboxSubmissionMutationOptions = Apollo.BaseMutationOptions<SubmitSandboxSubmissionMutation, SubmitSandboxSubmissionMutationVariables>;
export const CheckpointExamSubmissionDocument = gql`
    mutation CheckpointExamSubmission($input: ExamSubmissionCheckpointInput!) {
  checkpointExamSubmission(input: $input) {
    id
  }
}
    `;
export type CheckpointExamSubmissionMutationFn = Apollo.MutationFunction<CheckpointExamSubmissionMutation, CheckpointExamSubmissionMutationVariables>;

/**
 * __useCheckpointExamSubmissionMutation__
 *
 * To run a mutation, you first call `useCheckpointExamSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckpointExamSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkpointExamSubmissionMutation, { data, loading, error }] = useCheckpointExamSubmissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCheckpointExamSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<CheckpointExamSubmissionMutation, CheckpointExamSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckpointExamSubmissionMutation, CheckpointExamSubmissionMutationVariables>(CheckpointExamSubmissionDocument, options);
      }
export type CheckpointExamSubmissionMutationHookResult = ReturnType<typeof useCheckpointExamSubmissionMutation>;
export type CheckpointExamSubmissionMutationResult = Apollo.MutationResult<CheckpointExamSubmissionMutation>;
export type CheckpointExamSubmissionMutationOptions = Apollo.BaseMutationOptions<CheckpointExamSubmissionMutation, CheckpointExamSubmissionMutationVariables>;
export const GradeExamSubmissionDocument = gql`
    mutation GradeExamSubmission($input: ExamSubmissionGradeInput!) {
  gradeExamSubmission(input: $input) {
    id
  }
}
    `;
export type GradeExamSubmissionMutationFn = Apollo.MutationFunction<GradeExamSubmissionMutation, GradeExamSubmissionMutationVariables>;

/**
 * __useGradeExamSubmissionMutation__
 *
 * To run a mutation, you first call `useGradeExamSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGradeExamSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gradeExamSubmissionMutation, { data, loading, error }] = useGradeExamSubmissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGradeExamSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<GradeExamSubmissionMutation, GradeExamSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GradeExamSubmissionMutation, GradeExamSubmissionMutationVariables>(GradeExamSubmissionDocument, options);
      }
export type GradeExamSubmissionMutationHookResult = ReturnType<typeof useGradeExamSubmissionMutation>;
export type GradeExamSubmissionMutationResult = Apollo.MutationResult<GradeExamSubmissionMutation>;
export type GradeExamSubmissionMutationOptions = Apollo.BaseMutationOptions<GradeExamSubmissionMutation, GradeExamSubmissionMutationVariables>;
export const SubmitExamSubmissionDocument = gql`
    mutation SubmitExamSubmission($input: ExamSubmissionSubmitInput!) {
  submitExamSubmission(input: $input) {
    id
  }
}
    `;
export type SubmitExamSubmissionMutationFn = Apollo.MutationFunction<SubmitExamSubmissionMutation, SubmitExamSubmissionMutationVariables>;

/**
 * __useSubmitExamSubmissionMutation__
 *
 * To run a mutation, you first call `useSubmitExamSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitExamSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitExamSubmissionMutation, { data, loading, error }] = useSubmitExamSubmissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitExamSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<SubmitExamSubmissionMutation, SubmitExamSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitExamSubmissionMutation, SubmitExamSubmissionMutationVariables>(SubmitExamSubmissionDocument, options);
      }
export type SubmitExamSubmissionMutationHookResult = ReturnType<typeof useSubmitExamSubmissionMutation>;
export type SubmitExamSubmissionMutationResult = Apollo.MutationResult<SubmitExamSubmissionMutation>;
export type SubmitExamSubmissionMutationOptions = Apollo.BaseMutationOptions<SubmitExamSubmissionMutation, SubmitExamSubmissionMutationVariables>;
export const AssignmentByIdDocument = gql`
    query AssignmentById($id: String!) {
  assignmentById(id: $id) {
    id
    title
    description
    author {
      name
      surname
      username
    }
    xml
    sandbox
  }
}
    `;

/**
 * __useAssignmentByIdQuery__
 *
 * To run a query within a React component, call `useAssignmentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignmentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignmentByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAssignmentByIdQuery(baseOptions: Apollo.QueryHookOptions<AssignmentByIdQuery, AssignmentByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AssignmentByIdQuery, AssignmentByIdQueryVariables>(AssignmentByIdDocument, options);
      }
export function useAssignmentByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AssignmentByIdQuery, AssignmentByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AssignmentByIdQuery, AssignmentByIdQueryVariables>(AssignmentByIdDocument, options);
        }
export type AssignmentByIdQueryHookResult = ReturnType<typeof useAssignmentByIdQuery>;
export type AssignmentByIdLazyQueryHookResult = ReturnType<typeof useAssignmentByIdLazyQuery>;
export type AssignmentByIdQueryResult = Apollo.QueryResult<AssignmentByIdQuery, AssignmentByIdQueryVariables>;
export function refetchAssignmentByIdQuery(variables: AssignmentByIdQueryVariables) {
      return { query: AssignmentByIdDocument, variables: variables }
    }
export const AssignmentsDocument = gql`
    query Assignments {
  assignments {
    id
    title
    description
    author {
      name
      surname
      username
    }
    xml
    sandbox
  }
}
    `;

/**
 * __useAssignmentsQuery__
 *
 * To run a query within a React component, call `useAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAssignmentsQuery(baseOptions?: Apollo.QueryHookOptions<AssignmentsQuery, AssignmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AssignmentsQuery, AssignmentsQueryVariables>(AssignmentsDocument, options);
      }
export function useAssignmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AssignmentsQuery, AssignmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AssignmentsQuery, AssignmentsQueryVariables>(AssignmentsDocument, options);
        }
export type AssignmentsQueryHookResult = ReturnType<typeof useAssignmentsQuery>;
export type AssignmentsLazyQueryHookResult = ReturnType<typeof useAssignmentsLazyQuery>;
export type AssignmentsQueryResult = Apollo.QueryResult<AssignmentsQuery, AssignmentsQueryVariables>;
export function refetchAssignmentsQuery(variables?: AssignmentsQueryVariables) {
      return { query: AssignmentsDocument, variables: variables }
    }
export const AssignmentsPickerDocument = gql`
    query AssignmentsPicker {
  assignments {
    id
    title
    sandbox
  }
}
    `;

/**
 * __useAssignmentsPickerQuery__
 *
 * To run a query within a React component, call `useAssignmentsPickerQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignmentsPickerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignmentsPickerQuery({
 *   variables: {
 *   },
 * });
 */
export function useAssignmentsPickerQuery(baseOptions?: Apollo.QueryHookOptions<AssignmentsPickerQuery, AssignmentsPickerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AssignmentsPickerQuery, AssignmentsPickerQueryVariables>(AssignmentsPickerDocument, options);
      }
export function useAssignmentsPickerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AssignmentsPickerQuery, AssignmentsPickerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AssignmentsPickerQuery, AssignmentsPickerQueryVariables>(AssignmentsPickerDocument, options);
        }
export type AssignmentsPickerQueryHookResult = ReturnType<typeof useAssignmentsPickerQuery>;
export type AssignmentsPickerLazyQueryHookResult = ReturnType<typeof useAssignmentsPickerLazyQuery>;
export type AssignmentsPickerQueryResult = Apollo.QueryResult<AssignmentsPickerQuery, AssignmentsPickerQueryVariables>;
export function refetchAssignmentsPickerQuery(variables?: AssignmentsPickerQueryVariables) {
      return { query: AssignmentsPickerDocument, variables: variables }
    }
export const ValidateCodeDocument = gql`
    query ValidateCode($inviteCode: String!) {
  validateInviteCode(code: $inviteCode)
}
    `;

/**
 * __useValidateCodeQuery__
 *
 * To run a query within a React component, call `useValidateCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateCodeQuery({
 *   variables: {
 *      inviteCode: // value for 'inviteCode'
 *   },
 * });
 */
export function useValidateCodeQuery(baseOptions: Apollo.QueryHookOptions<ValidateCodeQuery, ValidateCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateCodeQuery, ValidateCodeQueryVariables>(ValidateCodeDocument, options);
      }
export function useValidateCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateCodeQuery, ValidateCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateCodeQuery, ValidateCodeQueryVariables>(ValidateCodeDocument, options);
        }
export type ValidateCodeQueryHookResult = ReturnType<typeof useValidateCodeQuery>;
export type ValidateCodeLazyQueryHookResult = ReturnType<typeof useValidateCodeLazyQuery>;
export type ValidateCodeQueryResult = Apollo.QueryResult<ValidateCodeQuery, ValidateCodeQueryVariables>;
export function refetchValidateCodeQuery(variables: ValidateCodeQueryVariables) {
      return { query: ValidateCodeDocument, variables: variables }
    }
export const ClassroomByIdDocument = gql`
    query ClassroomById($id: String!) {
  classroomById(id: $id) {
    id
    name
    inviteCode
    users {
      name
      surname
      username
      email
    }
  }
}
    `;

/**
 * __useClassroomByIdQuery__
 *
 * To run a query within a React component, call `useClassroomByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useClassroomByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClassroomByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useClassroomByIdQuery(baseOptions: Apollo.QueryHookOptions<ClassroomByIdQuery, ClassroomByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClassroomByIdQuery, ClassroomByIdQueryVariables>(ClassroomByIdDocument, options);
      }
export function useClassroomByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClassroomByIdQuery, ClassroomByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClassroomByIdQuery, ClassroomByIdQueryVariables>(ClassroomByIdDocument, options);
        }
export type ClassroomByIdQueryHookResult = ReturnType<typeof useClassroomByIdQuery>;
export type ClassroomByIdLazyQueryHookResult = ReturnType<typeof useClassroomByIdLazyQuery>;
export type ClassroomByIdQueryResult = Apollo.QueryResult<ClassroomByIdQuery, ClassroomByIdQueryVariables>;
export function refetchClassroomByIdQuery(variables: ClassroomByIdQueryVariables) {
      return { query: ClassroomByIdDocument, variables: variables }
    }
export const ClassroomsDocument = gql`
    query Classrooms {
  classrooms {
    id
    name
    inviteCode
    users {
      username
    }
  }
}
    `;

/**
 * __useClassroomsQuery__
 *
 * To run a query within a React component, call `useClassroomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClassroomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClassroomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useClassroomsQuery(baseOptions?: Apollo.QueryHookOptions<ClassroomsQuery, ClassroomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClassroomsQuery, ClassroomsQueryVariables>(ClassroomsDocument, options);
      }
export function useClassroomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClassroomsQuery, ClassroomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClassroomsQuery, ClassroomsQueryVariables>(ClassroomsDocument, options);
        }
export type ClassroomsQueryHookResult = ReturnType<typeof useClassroomsQuery>;
export type ClassroomsLazyQueryHookResult = ReturnType<typeof useClassroomsLazyQuery>;
export type ClassroomsQueryResult = Apollo.QueryResult<ClassroomsQuery, ClassroomsQueryVariables>;
export function refetchClassroomsQuery(variables?: ClassroomsQueryVariables) {
      return { query: ClassroomsDocument, variables: variables }
    }
export const ExamByIdDocument = gql`
    query ExamById($id: String!) {
  examById(id: $id) {
    id
    title
    accessibleFrom
    accessibleTo
    timeLimit
    author {
      name
      surname
      username
    }
    assignments {
      id
      title
      description
      xml
    }
    classrooms {
      id
      name
    }
  }
}
    `;

/**
 * __useExamByIdQuery__
 *
 * To run a query within a React component, call `useExamByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useExamByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExamByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useExamByIdQuery(baseOptions: Apollo.QueryHookOptions<ExamByIdQuery, ExamByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExamByIdQuery, ExamByIdQueryVariables>(ExamByIdDocument, options);
      }
export function useExamByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExamByIdQuery, ExamByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExamByIdQuery, ExamByIdQueryVariables>(ExamByIdDocument, options);
        }
export type ExamByIdQueryHookResult = ReturnType<typeof useExamByIdQuery>;
export type ExamByIdLazyQueryHookResult = ReturnType<typeof useExamByIdLazyQuery>;
export type ExamByIdQueryResult = Apollo.QueryResult<ExamByIdQuery, ExamByIdQueryVariables>;
export function refetchExamByIdQuery(variables: ExamByIdQueryVariables) {
      return { query: ExamByIdDocument, variables: variables }
    }
export const ExamsDocument = gql`
    query Exams {
  exams {
    id
    title
    accessibleFrom
    accessibleTo
    timeLimit
    author {
      name
      surname
      username
    }
  }
}
    `;

/**
 * __useExamsQuery__
 *
 * To run a query within a React component, call `useExamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useExamsQuery(baseOptions?: Apollo.QueryHookOptions<ExamsQuery, ExamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExamsQuery, ExamsQueryVariables>(ExamsDocument, options);
      }
export function useExamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExamsQuery, ExamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExamsQuery, ExamsQueryVariables>(ExamsDocument, options);
        }
export type ExamsQueryHookResult = ReturnType<typeof useExamsQuery>;
export type ExamsLazyQueryHookResult = ReturnType<typeof useExamsLazyQuery>;
export type ExamsQueryResult = Apollo.QueryResult<ExamsQuery, ExamsQueryVariables>;
export function refetchExamsQuery(variables?: ExamsQueryVariables) {
      return { query: ExamsDocument, variables: variables }
    }
export const OpenedExamsDocument = gql`
    query OpenedExams {
  openedExams {
    id
    title
    accessibleFrom
    accessibleTo
    timeLimit
  }
}
    `;

/**
 * __useOpenedExamsQuery__
 *
 * To run a query within a React component, call `useOpenedExamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpenedExamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpenedExamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOpenedExamsQuery(baseOptions?: Apollo.QueryHookOptions<OpenedExamsQuery, OpenedExamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpenedExamsQuery, OpenedExamsQueryVariables>(OpenedExamsDocument, options);
      }
export function useOpenedExamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpenedExamsQuery, OpenedExamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpenedExamsQuery, OpenedExamsQueryVariables>(OpenedExamsDocument, options);
        }
export type OpenedExamsQueryHookResult = ReturnType<typeof useOpenedExamsQuery>;
export type OpenedExamsLazyQueryHookResult = ReturnType<typeof useOpenedExamsLazyQuery>;
export type OpenedExamsQueryResult = Apollo.QueryResult<OpenedExamsQuery, OpenedExamsQueryVariables>;
export function refetchOpenedExamsQuery(variables?: OpenedExamsQueryVariables) {
      return { query: OpenedExamsDocument, variables: variables }
    }
export const MySandboxSubmissionsDocument = gql`
    query MySandboxSubmissions($assignmentId: String!) {
  mySandboxSubmissions(assignmentId: $assignmentId) {
    id
    startedAt
    submittedAt
    assignment {
      title
    }
  }
}
    `;

/**
 * __useMySandboxSubmissionsQuery__
 *
 * To run a query within a React component, call `useMySandboxSubmissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMySandboxSubmissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMySandboxSubmissionsQuery({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useMySandboxSubmissionsQuery(baseOptions: Apollo.QueryHookOptions<MySandboxSubmissionsQuery, MySandboxSubmissionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MySandboxSubmissionsQuery, MySandboxSubmissionsQueryVariables>(MySandboxSubmissionsDocument, options);
      }
export function useMySandboxSubmissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MySandboxSubmissionsQuery, MySandboxSubmissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MySandboxSubmissionsQuery, MySandboxSubmissionsQueryVariables>(MySandboxSubmissionsDocument, options);
        }
export type MySandboxSubmissionsQueryHookResult = ReturnType<typeof useMySandboxSubmissionsQuery>;
export type MySandboxSubmissionsLazyQueryHookResult = ReturnType<typeof useMySandboxSubmissionsLazyQuery>;
export type MySandboxSubmissionsQueryResult = Apollo.QueryResult<MySandboxSubmissionsQuery, MySandboxSubmissionsQueryVariables>;
export function refetchMySandboxSubmissionsQuery(variables: MySandboxSubmissionsQueryVariables) {
      return { query: MySandboxSubmissionsDocument, variables: variables }
    }
export const SandboxAssignmentsDocument = gql`
    query SandboxAssignments {
  sandboxAssignments {
    id
    title
    description
    author {
      name
      surname
      username
    }
  }
}
    `;

/**
 * __useSandboxAssignmentsQuery__
 *
 * To run a query within a React component, call `useSandboxAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSandboxAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSandboxAssignmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSandboxAssignmentsQuery(baseOptions?: Apollo.QueryHookOptions<SandboxAssignmentsQuery, SandboxAssignmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SandboxAssignmentsQuery, SandboxAssignmentsQueryVariables>(SandboxAssignmentsDocument, options);
      }
export function useSandboxAssignmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SandboxAssignmentsQuery, SandboxAssignmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SandboxAssignmentsQuery, SandboxAssignmentsQueryVariables>(SandboxAssignmentsDocument, options);
        }
export type SandboxAssignmentsQueryHookResult = ReturnType<typeof useSandboxAssignmentsQuery>;
export type SandboxAssignmentsLazyQueryHookResult = ReturnType<typeof useSandboxAssignmentsLazyQuery>;
export type SandboxAssignmentsQueryResult = Apollo.QueryResult<SandboxAssignmentsQuery, SandboxAssignmentsQueryVariables>;
export function refetchSandboxAssignmentsQuery(variables?: SandboxAssignmentsQueryVariables) {
      return { query: SandboxAssignmentsDocument, variables: variables }
    }
export const SandboxSubmissionsByAssignmentIdDocument = gql`
    query SandboxSubmissionsByAssignmentId($assignmentId: String!) {
  sandboxSubmissionsByAssignment(assignmentId: $assignmentId) {
    id
    startedAt
    submittedAt
    user {
      name
      surname
      username
    }
  }
}
    `;

/**
 * __useSandboxSubmissionsByAssignmentIdQuery__
 *
 * To run a query within a React component, call `useSandboxSubmissionsByAssignmentIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSandboxSubmissionsByAssignmentIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSandboxSubmissionsByAssignmentIdQuery({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useSandboxSubmissionsByAssignmentIdQuery(baseOptions: Apollo.QueryHookOptions<SandboxSubmissionsByAssignmentIdQuery, SandboxSubmissionsByAssignmentIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SandboxSubmissionsByAssignmentIdQuery, SandboxSubmissionsByAssignmentIdQueryVariables>(SandboxSubmissionsByAssignmentIdDocument, options);
      }
export function useSandboxSubmissionsByAssignmentIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SandboxSubmissionsByAssignmentIdQuery, SandboxSubmissionsByAssignmentIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SandboxSubmissionsByAssignmentIdQuery, SandboxSubmissionsByAssignmentIdQueryVariables>(SandboxSubmissionsByAssignmentIdDocument, options);
        }
export type SandboxSubmissionsByAssignmentIdQueryHookResult = ReturnType<typeof useSandboxSubmissionsByAssignmentIdQuery>;
export type SandboxSubmissionsByAssignmentIdLazyQueryHookResult = ReturnType<typeof useSandboxSubmissionsByAssignmentIdLazyQuery>;
export type SandboxSubmissionsByAssignmentIdQueryResult = Apollo.QueryResult<SandboxSubmissionsByAssignmentIdQuery, SandboxSubmissionsByAssignmentIdQueryVariables>;
export function refetchSandboxSubmissionsByAssignmentIdQuery(variables: SandboxSubmissionsByAssignmentIdQueryVariables) {
      return { query: SandboxSubmissionsByAssignmentIdDocument, variables: variables }
    }
export const SandboxSubmissionsByIdDocument = gql`
    query SandboxSubmissionsById($id: String!) {
  sandboxSubmissionById(id: $id) {
    id
    startedAt
    submittedAt
    user {
      name
      surname
      username
    }
    xml
    assignment {
      id
      title
      description
    }
    validatorReport {
      id
      referenceMatchingResult {
        id
        result
        isomorphismCheckResult
        participantsCheckResult
        participantsCheckMessage
      }
      validatorRuleResults {
        id
        message
        valid
        validatorRule {
          id
          name
          description
        }
      }
    }
  }
}
    `;

/**
 * __useSandboxSubmissionsByIdQuery__
 *
 * To run a query within a React component, call `useSandboxSubmissionsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSandboxSubmissionsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSandboxSubmissionsByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSandboxSubmissionsByIdQuery(baseOptions: Apollo.QueryHookOptions<SandboxSubmissionsByIdQuery, SandboxSubmissionsByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SandboxSubmissionsByIdQuery, SandboxSubmissionsByIdQueryVariables>(SandboxSubmissionsByIdDocument, options);
      }
export function useSandboxSubmissionsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SandboxSubmissionsByIdQuery, SandboxSubmissionsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SandboxSubmissionsByIdQuery, SandboxSubmissionsByIdQueryVariables>(SandboxSubmissionsByIdDocument, options);
        }
export type SandboxSubmissionsByIdQueryHookResult = ReturnType<typeof useSandboxSubmissionsByIdQuery>;
export type SandboxSubmissionsByIdLazyQueryHookResult = ReturnType<typeof useSandboxSubmissionsByIdLazyQuery>;
export type SandboxSubmissionsByIdQueryResult = Apollo.QueryResult<SandboxSubmissionsByIdQuery, SandboxSubmissionsByIdQueryVariables>;
export function refetchSandboxSubmissionsByIdQuery(variables: SandboxSubmissionsByIdQueryVariables) {
      return { query: SandboxSubmissionsByIdDocument, variables: variables }
    }
export const MySubmissionsDocument = gql`
    query MySubmissions {
  myExamSubmissions {
    id
    startedAt
    submittedAt
    examSubmissionState
    exam {
      title
    }
    assignment {
      title
    }
  }
}
    `;

/**
 * __useMySubmissionsQuery__
 *
 * To run a query within a React component, call `useMySubmissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMySubmissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMySubmissionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMySubmissionsQuery(baseOptions?: Apollo.QueryHookOptions<MySubmissionsQuery, MySubmissionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MySubmissionsQuery, MySubmissionsQueryVariables>(MySubmissionsDocument, options);
      }
export function useMySubmissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MySubmissionsQuery, MySubmissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MySubmissionsQuery, MySubmissionsQueryVariables>(MySubmissionsDocument, options);
        }
export type MySubmissionsQueryHookResult = ReturnType<typeof useMySubmissionsQuery>;
export type MySubmissionsLazyQueryHookResult = ReturnType<typeof useMySubmissionsLazyQuery>;
export type MySubmissionsQueryResult = Apollo.QueryResult<MySubmissionsQuery, MySubmissionsQueryVariables>;
export function refetchMySubmissionsQuery(variables?: MySubmissionsQueryVariables) {
      return { query: MySubmissionsDocument, variables: variables }
    }
export const SubmissionsByExamIdDocument = gql`
    query SubmissionsByExamId($id: String!) {
  examSubmissionsByExamId(examId: $id) {
    id
    startedAt
    submittedAt
    examSubmissionState
    user {
      name
      surname
      username
    }
    exam {
      id
      title
    }
    assignment {
      id
      title
    }
  }
}
    `;

/**
 * __useSubmissionsByExamIdQuery__
 *
 * To run a query within a React component, call `useSubmissionsByExamIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubmissionsByExamIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubmissionsByExamIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSubmissionsByExamIdQuery(baseOptions: Apollo.QueryHookOptions<SubmissionsByExamIdQuery, SubmissionsByExamIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubmissionsByExamIdQuery, SubmissionsByExamIdQueryVariables>(SubmissionsByExamIdDocument, options);
      }
export function useSubmissionsByExamIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubmissionsByExamIdQuery, SubmissionsByExamIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubmissionsByExamIdQuery, SubmissionsByExamIdQueryVariables>(SubmissionsByExamIdDocument, options);
        }
export type SubmissionsByExamIdQueryHookResult = ReturnType<typeof useSubmissionsByExamIdQuery>;
export type SubmissionsByExamIdLazyQueryHookResult = ReturnType<typeof useSubmissionsByExamIdLazyQuery>;
export type SubmissionsByExamIdQueryResult = Apollo.QueryResult<SubmissionsByExamIdQuery, SubmissionsByExamIdQueryVariables>;
export function refetchSubmissionsByExamIdQuery(variables: SubmissionsByExamIdQueryVariables) {
      return { query: SubmissionsByExamIdDocument, variables: variables }
    }
export const SubmissionByIdDocument = gql`
    query SubmissionById($id: String!) {
  examSubmissionById(id: $id) {
    id
    startedAt
    submittedAt
    user {
      username
      name
      surname
    }
    examSubmissionState
    points
    comment
    xml
    exam {
      id
      title
      timeLimit
    }
    assignment {
      id
      title
      description
    }
    validatorReport {
      id
      referenceMatchingResult {
        id
        result
        isomorphismCheckResult
        participantsCheckResult
        participantsCheckMessage
      }
      validatorRuleResults {
        id
        message
        valid
        validatorRule {
          id
          name
          description
        }
      }
    }
  }
}
    `;

/**
 * __useSubmissionByIdQuery__
 *
 * To run a query within a React component, call `useSubmissionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubmissionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubmissionByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSubmissionByIdQuery(baseOptions: Apollo.QueryHookOptions<SubmissionByIdQuery, SubmissionByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubmissionByIdQuery, SubmissionByIdQueryVariables>(SubmissionByIdDocument, options);
      }
export function useSubmissionByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubmissionByIdQuery, SubmissionByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubmissionByIdQuery, SubmissionByIdQueryVariables>(SubmissionByIdDocument, options);
        }
export type SubmissionByIdQueryHookResult = ReturnType<typeof useSubmissionByIdQuery>;
export type SubmissionByIdLazyQueryHookResult = ReturnType<typeof useSubmissionByIdLazyQuery>;
export type SubmissionByIdQueryResult = Apollo.QueryResult<SubmissionByIdQuery, SubmissionByIdQueryVariables>;
export function refetchSubmissionByIdQuery(variables: SubmissionByIdQueryVariables) {
      return { query: SubmissionByIdDocument, variables: variables }
    }
export const SubmissionByIdGradingDocument = gql`
    query SubmissionByIdGrading($id: String!) {
  examSubmissionById(id: $id) {
    id
    startedAt
    submittedAt
    user {
      name
      surname
      username
    }
    examSubmissionState
    points
    comment
    xml
    exam {
      id
      title
    }
    assignment {
      id
      title
      description
      xml
    }
    validatorReport {
      id
      referenceMatchingResult {
        id
        result
        isomorphismCheckResult
        participantsCheckResult
        participantsCheckMessage
      }
      validatorRuleResults {
        id
        message
        valid
        validatorRule {
          id
          name
          description
        }
      }
    }
  }
}
    `;

/**
 * __useSubmissionByIdGradingQuery__
 *
 * To run a query within a React component, call `useSubmissionByIdGradingQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubmissionByIdGradingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubmissionByIdGradingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSubmissionByIdGradingQuery(baseOptions: Apollo.QueryHookOptions<SubmissionByIdGradingQuery, SubmissionByIdGradingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubmissionByIdGradingQuery, SubmissionByIdGradingQueryVariables>(SubmissionByIdGradingDocument, options);
      }
export function useSubmissionByIdGradingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubmissionByIdGradingQuery, SubmissionByIdGradingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubmissionByIdGradingQuery, SubmissionByIdGradingQueryVariables>(SubmissionByIdGradingDocument, options);
        }
export type SubmissionByIdGradingQueryHookResult = ReturnType<typeof useSubmissionByIdGradingQuery>;
export type SubmissionByIdGradingLazyQueryHookResult = ReturnType<typeof useSubmissionByIdGradingLazyQuery>;
export type SubmissionByIdGradingQueryResult = Apollo.QueryResult<SubmissionByIdGradingQuery, SubmissionByIdGradingQueryVariables>;
export function refetchSubmissionByIdGradingQuery(variables: SubmissionByIdGradingQueryVariables) {
      return { query: SubmissionByIdGradingDocument, variables: variables }
    }