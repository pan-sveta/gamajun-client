import * as Apollo from '@apollo/client';
import {gql} from '@apollo/client';

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
  author: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  sandbox: Scalars['Boolean'];
  title: Scalars['String'];
  xml: Scalars['String'];
};

export type AssignmentInput = {
  author: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  sandbox: Scalars['Boolean'];
  title: Scalars['String'];
  xml: Scalars['String'];
};

export type CreateAssignmentInput = {
  description: Scalars['String'];
  sandbox: Scalars['Boolean'];
  title: Scalars['String'];
  xml: Scalars['String'];
};

export type CreateExamInput = {
  accessibleFrom: Scalars['String'];
  accessibleTo: Scalars['String'];
  assignmentIds: Array<Scalars['ID']>;
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
  author: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type ExamInput = {
  accessibleFrom: Scalars['String'];
  accessibleTo: Scalars['String'];
  assignmentIds: Array<Scalars['ID']>;
  author: Scalars['String'];
  id: Scalars['ID'];
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
  author: Scalars['String'];
  exam: Exam;
  examSubmissionState: ExamSubmissionState;
  id: Scalars['ID'];
  startedAt: Scalars['String'];
  submittedAt?: Maybe<Scalars['String']>;
  validatorReport?: Maybe<ValidatorReport>;
  xml?: Maybe<Scalars['String']>;
};

export type ExamSubmissionCheckpointInput = {
  id?: InputMaybe<Scalars['ID']>;
  xml?: InputMaybe<Scalars['String']>;
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
  /** Begin exam */
  beginExam: ExamSubmission;
  /** Checkpoint exam submission */
  checkpointExamSubmission: ExamSubmission;
  /** Create assignment */
  createAssignment: Assignment;
  /** Create exam */
  createExam: Exam;
  /** Create sandbox submission */
  createSandboxSubmission: SandboxSubmission;
  /** Delete assignment */
  deleteAssignment: Scalars['Boolean'];
  /** Delete exam */
  deleteExam: Scalars['Boolean'];
  /** Delete exam submission */
  deleteExamSubmission?: Maybe<Scalars['Boolean']>;
  /** Delete sandbox submission */
  deleteSandboxSubmission: Scalars['Boolean'];
  /** Submit exam submission */
  submitExamSubmission: ExamSubmission;
  /** Submit sandbox submission */
  submitSandboxSubmission: SandboxSubmission;
  /** Update assignment */
  updateAssignment: Assignment;
  /** Update exam */
  updateExam: Exam;
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


export type MutationCreateExamArgs = {
  input: CreateExamInput;
};


export type MutationCreateSandboxSubmissionArgs = {
  assignmentId: Scalars['String'];
};


export type MutationDeleteAssignmentArgs = {
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
  assignmentById?: Maybe<Assignment>;
  assignments: Array<Assignment>;
  examById: Exam;
  examSubmissionById?: Maybe<ExamSubmission>;
  examSubmissions: Array<ExamSubmission>;
  examSubmissionsByExamId: Array<ExamSubmission>;
  exams: Array<Exam>;
  myExamSubmissions: Array<ExamSubmission>;
  mySandboxSubmissions: Array<SandboxSubmission>;
  openedExams: Array<Exam>;
  sandboxAssignments: Array<Assignment>;
  sandboxSubmissionById?: Maybe<SandboxSubmission>;
  sandboxSubmissions: Array<SandboxSubmission>;
  sandboxSubmissionsByAssignment: Array<SandboxSubmission>;
  validatorReportByExamSubmissionId?: Maybe<ValidatorReport>;
  validatorReports: Array<ValidatorReport>;
};


export type QueryAssignmentByIdArgs = {
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


export type QueryValidatorReportByExamSubmissionIdArgs = {
  id: Scalars['String'];
};

/**
 * #################
 * Sandbox submissions#
 * #################
 */
export type SandboxSubmission = {
  __typename?: 'SandboxSubmission';
  assignment: Assignment;
  author: Scalars['String'];
  id: Scalars['ID'];
  startedAt: Scalars['String'];
  submittedAt?: Maybe<Scalars['String']>;
  validatorReport?: Maybe<ValidatorReport>;
  xml?: Maybe<Scalars['String']>;
};

export type SandboxSubmissionSubmitInput = {
  id?: InputMaybe<Scalars['ID']>;
  xml?: InputMaybe<Scalars['String']>;
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
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type ValidatorReport = {
  __typename?: 'ValidatorReport';
  finishedAt: Scalars['String'];
  id: Scalars['String'];
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


export type CreateAssignmentMutation = { __typename?: 'Mutation', createAssignment: { __typename?: 'Assignment', id: string, title: string, description: string, author: string, xml: string, sandbox: boolean } };

export type DeleteAssignmentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteAssignmentMutation = { __typename?: 'Mutation', deleteAssignment: boolean };

export type UpdateAssignmentMutationVariables = Exact<{
  input: UpdateAssignmentInput;
}>;


export type UpdateAssignmentMutation = { __typename?: 'Mutation', updateAssignment: { __typename?: 'Assignment', id: string, title: string, description: string, author: string, xml: string, sandbox: boolean } };

export type BeginExamMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type BeginExamMutation = { __typename?: 'Mutation', beginExam: { __typename?: 'ExamSubmission', id: string } };

export type CreateExamMutationVariables = Exact<{
  input: CreateExamInput;
}>;


export type CreateExamMutation = { __typename?: 'Mutation', createExam: { __typename?: 'Exam', id: string, title: string, accessibleFrom: string, accessibleTo: string, author: string, assignments: Array<{ __typename?: 'Assignment', id: string, title: string, description: string, xml: string, author: string }> } };

export type DeleteExamMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteExamMutation = { __typename?: 'Mutation', deleteExam: boolean };

export type UpdateExamMutationVariables = Exact<{
  input: UpdateExamInput;
}>;


export type UpdateExamMutation = { __typename?: 'Mutation', updateExam: { __typename?: 'Exam', id: string, title: string, accessibleFrom: string, accessibleTo: string, author: string, assignments: Array<{ __typename?: 'Assignment', id: string, title: string, description: string, xml: string, author: string }> } };

export type CreateSandboxSubmissionMutationVariables = Exact<{
  assignmentId: Scalars['String'];
}>;


export type CreateSandboxSubmissionMutation = { __typename?: 'Mutation', createSandboxSubmission: { __typename?: 'SandboxSubmission', id: string } };

export type SandboxSubmissionsByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type SandboxSubmissionsByIdQuery = { __typename?: 'Query', sandboxSubmissionById?: { __typename?: 'SandboxSubmission', id: string, startedAt: string, submittedAt?: string | null, author: string, xml?: string | null, assignment: { __typename?: 'Assignment', id: string, title: string, description: string } } | null };

export type SubmitSandboxSubmissionMutationVariables = Exact<{
  input: SandboxSubmissionSubmitInput;
}>;


export type SubmitSandboxSubmissionMutation = { __typename?: 'Mutation', submitSandboxSubmission: { __typename?: 'SandboxSubmission', id: string } };

export type SubmitExamSubmissionMutationVariables = Exact<{
  input: ExamSubmissionSubmitInput;
}>;


export type SubmitExamSubmissionMutation = { __typename?: 'Mutation', submitExamSubmission: { __typename?: 'ExamSubmission', id: string } };

export type AssignmentByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type AssignmentByIdQuery = { __typename?: 'Query', assignmentById?: { __typename?: 'Assignment', id: string, title: string, description: string, author: string, xml: string, sandbox: boolean } | null };

export type AssignmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AssignmentsQuery = { __typename?: 'Query', assignments: Array<{ __typename?: 'Assignment', id: string, title: string, description: string, author: string, xml: string, sandbox: boolean }> };

export type AssignmentsPickerQueryVariables = Exact<{ [key: string]: never; }>;


export type AssignmentsPickerQuery = { __typename?: 'Query', assignments: Array<{ __typename?: 'Assignment', id: string, title: string, sandbox: boolean }> };

export type ExamByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ExamByIdQuery = { __typename?: 'Query', examById: { __typename?: 'Exam', id: string, title: string, accessibleFrom: string, accessibleTo: string, author: string, assignments: Array<{ __typename?: 'Assignment', id: string, title: string, description: string, xml: string }> } };

export type ExamsQueryVariables = Exact<{ [key: string]: never; }>;


export type ExamsQuery = { __typename?: 'Query', exams: Array<{ __typename?: 'Exam', id: string, title: string, accessibleFrom: string, accessibleTo: string, author: string }> };

export type OpenedExamsQueryVariables = Exact<{ [key: string]: never; }>;


export type OpenedExamsQuery = { __typename?: 'Query', openedExams: Array<{ __typename?: 'Exam', id: string, title: string, accessibleFrom: string, accessibleTo: string }> };

export type AssignmentSandboxSubmissionsQueryVariables = Exact<{
  assignmentId: Scalars['String'];
}>;


export type AssignmentSandboxSubmissionsQuery = { __typename?: 'Query', sandboxSubmissionsByAssignment: Array<{ __typename?: 'SandboxSubmission', id: string, startedAt: string, submittedAt?: string | null, author: string }> };

export type MySandboxSubmissionsQueryVariables = Exact<{
  assignmentId: Scalars['String'];
}>;


export type MySandboxSubmissionsQuery = { __typename?: 'Query', mySandboxSubmissions: Array<{ __typename?: 'SandboxSubmission', id: string, startedAt: string, submittedAt?: string | null, assignment: { __typename?: 'Assignment', title: string } }> };

export type SandboxAssignmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type SandboxAssignmentsQuery = { __typename?: 'Query', sandboxAssignments: Array<{ __typename?: 'Assignment', id: string, title: string, description: string, author: string }> };

export type MySubmissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type MySubmissionsQuery = { __typename?: 'Query', myExamSubmissions: Array<{ __typename?: 'ExamSubmission', id: string, startedAt: string, submittedAt?: string | null, examSubmissionState: ExamSubmissionState, exam: { __typename?: 'Exam', title: string }, assignment: { __typename?: 'Assignment', title: string } }> };

export type SubmissionsByExamIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type SubmissionsByExamIdQuery = { __typename?: 'Query', examSubmissionsByExamId: Array<{ __typename?: 'ExamSubmission', id: string, startedAt: string, submittedAt?: string | null, author: string, exam: { __typename?: 'Exam', id: string, title: string }, assignment: { __typename?: 'Assignment', id: string, title: string } }> };

export type SubmissionByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type SubmissionByIdQuery = { __typename?: 'Query', examSubmissionById?: { __typename?: 'ExamSubmission', id: string, startedAt: string, submittedAt?: string | null, author: string, examSubmissionState: ExamSubmissionState, xml?: string | null, exam: { __typename?: 'Exam', id: string, title: string }, assignment: { __typename?: 'Assignment', id: string, title: string, description: string } } | null };

export type SubmissionByIdGradingQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type SubmissionByIdGradingQuery = { __typename?: 'Query', examSubmissionById?: { __typename?: 'ExamSubmission', id: string, startedAt: string, submittedAt?: string | null, author: string, examSubmissionState: ExamSubmissionState, xml?: string | null, exam: { __typename?: 'Exam', id: string, title: string }, assignment: { __typename?: 'Assignment', id: string, title: string, description: string, xml: string } } | null };

export type ValidatorReportByExamSubmissionIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ValidatorReportByExamSubmissionIdQuery = { __typename?: 'Query', validatorReportByExamSubmissionId?: { __typename?: 'ValidatorReport', id: string, startedAt: string, finishedAt: string, validatorRuleResults: Array<{ __typename?: 'ValidatorRuleResult', id: string, valid: boolean, message?: string | null, validatorRule: { __typename?: 'ValidatorRule', id: string, name: string, description: string } }> } | null };


export const CreateAssignmentDocument = gql`
    mutation CreateAssignment($input: CreateAssignmentInput!) {
  createAssignment(input: $input) {
    id
    title
    description
    author
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
    author
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
    author
    assignments {
      id
      title
      description
      xml
      author
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
    author
    assignments {
      id
      title
      description
      xml
      author
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
export const SandboxSubmissionsByIdDocument = gql`
    query SandboxSubmissionsById($id: String!) {
  sandboxSubmissionById(id: $id) {
    id
    startedAt
    submittedAt
    author
    xml
    assignment {
      id
      title
      description
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
    author
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
    author
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
export const ExamByIdDocument = gql`
    query ExamById($id: String!) {
  examById(id: $id) {
    id
    title
    accessibleFrom
    accessibleTo
    author
    assignments {
      id
      title
      description
      xml
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
    author
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
export const AssignmentSandboxSubmissionsDocument = gql`
    query AssignmentSandboxSubmissions($assignmentId: String!) {
  sandboxSubmissionsByAssignment(assignmentId: $assignmentId) {
    id
    startedAt
    submittedAt
    author
  }
}
    `;

/**
 * __useAssignmentSandboxSubmissionsQuery__
 *
 * To run a query within a React component, call `useAssignmentSandboxSubmissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignmentSandboxSubmissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignmentSandboxSubmissionsQuery({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useAssignmentSandboxSubmissionsQuery(baseOptions: Apollo.QueryHookOptions<AssignmentSandboxSubmissionsQuery, AssignmentSandboxSubmissionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AssignmentSandboxSubmissionsQuery, AssignmentSandboxSubmissionsQueryVariables>(AssignmentSandboxSubmissionsDocument, options);
      }
export function useAssignmentSandboxSubmissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AssignmentSandboxSubmissionsQuery, AssignmentSandboxSubmissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AssignmentSandboxSubmissionsQuery, AssignmentSandboxSubmissionsQueryVariables>(AssignmentSandboxSubmissionsDocument, options);
        }
export type AssignmentSandboxSubmissionsQueryHookResult = ReturnType<typeof useAssignmentSandboxSubmissionsQuery>;
export type AssignmentSandboxSubmissionsLazyQueryHookResult = ReturnType<typeof useAssignmentSandboxSubmissionsLazyQuery>;
export type AssignmentSandboxSubmissionsQueryResult = Apollo.QueryResult<AssignmentSandboxSubmissionsQuery, AssignmentSandboxSubmissionsQueryVariables>;
export function refetchAssignmentSandboxSubmissionsQuery(variables: AssignmentSandboxSubmissionsQueryVariables) {
      return { query: AssignmentSandboxSubmissionsDocument, variables: variables }
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
    author
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
    author
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
    author
    examSubmissionState
    xml
    exam {
      id
      title
    }
    assignment {
      id
      title
      description
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
    author
    examSubmissionState
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
export const ValidatorReportByExamSubmissionIdDocument = gql`
    query ValidatorReportByExamSubmissionId($id: String!) {
  validatorReportByExamSubmissionId(id: $id) {
    id
    startedAt
    finishedAt
    validatorRuleResults {
      id
      valid
      message
      validatorRule {
        id
        name
        description
      }
    }
  }
}
    `;

/**
 * __useValidatorReportByExamSubmissionIdQuery__
 *
 * To run a query within a React component, call `useValidatorReportByExamSubmissionIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidatorReportByExamSubmissionIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidatorReportByExamSubmissionIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useValidatorReportByExamSubmissionIdQuery(baseOptions: Apollo.QueryHookOptions<ValidatorReportByExamSubmissionIdQuery, ValidatorReportByExamSubmissionIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidatorReportByExamSubmissionIdQuery, ValidatorReportByExamSubmissionIdQueryVariables>(ValidatorReportByExamSubmissionIdDocument, options);
      }
export function useValidatorReportByExamSubmissionIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidatorReportByExamSubmissionIdQuery, ValidatorReportByExamSubmissionIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidatorReportByExamSubmissionIdQuery, ValidatorReportByExamSubmissionIdQueryVariables>(ValidatorReportByExamSubmissionIdDocument, options);
        }
export type ValidatorReportByExamSubmissionIdQueryHookResult = ReturnType<typeof useValidatorReportByExamSubmissionIdQuery>;
export type ValidatorReportByExamSubmissionIdLazyQueryHookResult = ReturnType<typeof useValidatorReportByExamSubmissionIdLazyQuery>;
export type ValidatorReportByExamSubmissionIdQueryResult = Apollo.QueryResult<ValidatorReportByExamSubmissionIdQuery, ValidatorReportByExamSubmissionIdQueryVariables>;
export function refetchValidatorReportByExamSubmissionIdQuery(variables: ValidatorReportByExamSubmissionIdQueryVariables) {
      return { query: ValidatorReportByExamSubmissionIdDocument, variables: variables }
    }