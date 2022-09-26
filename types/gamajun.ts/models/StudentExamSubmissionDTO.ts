/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { StudentAssignmentDTO } from './StudentAssignmentDTO';
import {
    StudentAssignmentDTOFromJSON,
    StudentAssignmentDTOFromJSONTyped,
    StudentAssignmentDTOToJSON,
} from './StudentAssignmentDTO';
import type { StudentExamDTO } from './StudentExamDTO';
import {
    StudentExamDTOFromJSON,
    StudentExamDTOFromJSONTyped,
    StudentExamDTOToJSON,
} from './StudentExamDTO';

/**
 * 
 * @export
 * @interface StudentExamSubmissionDTO
 */
export interface StudentExamSubmissionDTO {
    /**
     * 
     * @type {string}
     * @memberof StudentExamSubmissionDTO
     */
    id?: string;
    /**
     * 
     * @type {StudentExamDTO}
     * @memberof StudentExamSubmissionDTO
     */
    exam?: StudentExamDTO;
    /**
     * 
     * @type {StudentAssignmentDTO}
     * @memberof StudentExamSubmissionDTO
     */
    assignment?: StudentAssignmentDTO;
    /**
     * 
     * @type {string}
     * @memberof StudentExamSubmissionDTO
     */
    xml?: string;
    /**
     * 
     * @type {Date}
     * @memberof StudentExamSubmissionDTO
     */
    startedAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof StudentExamSubmissionDTO
     */
    submittedAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof StudentExamSubmissionDTO
     */
    author?: string;
    /**
     * 
     * @type {string}
     * @memberof StudentExamSubmissionDTO
     */
    examSubmissionState?: StudentExamSubmissionDTOExamSubmissionStateEnum;
}


/**
 * @export
 */
export const StudentExamSubmissionDTOExamSubmissionStateEnum = {
    Draft: 'Draft',
    Submitted: 'Submitted',
    Graded: 'Graded'
} as const;
export type StudentExamSubmissionDTOExamSubmissionStateEnum = typeof StudentExamSubmissionDTOExamSubmissionStateEnum[keyof typeof StudentExamSubmissionDTOExamSubmissionStateEnum];


/**
 * Check if a given object implements the StudentExamSubmissionDTO interface.
 */
export function instanceOfStudentExamSubmissionDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function StudentExamSubmissionDTOFromJSON(json: any): StudentExamSubmissionDTO {
    return StudentExamSubmissionDTOFromJSONTyped(json, false);
}

export function StudentExamSubmissionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): StudentExamSubmissionDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'exam': !exists(json, 'exam') ? undefined : StudentExamDTOFromJSON(json['exam']),
        'assignment': !exists(json, 'assignment') ? undefined : StudentAssignmentDTOFromJSON(json['assignment']),
        'xml': !exists(json, 'xml') ? undefined : json['xml'],
        'startedAt': !exists(json, 'startedAt') ? undefined : (new Date(json['startedAt'])),
        'submittedAt': !exists(json, 'submittedAt') ? undefined : (new Date(json['submittedAt'])),
        'author': !exists(json, 'author') ? undefined : json['author'],
        'examSubmissionState': !exists(json, 'examSubmissionState') ? undefined : json['examSubmissionState'],
    };
}

export function StudentExamSubmissionDTOToJSON(value?: StudentExamSubmissionDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'exam': StudentExamDTOToJSON(value.exam),
        'assignment': StudentAssignmentDTOToJSON(value.assignment),
        'xml': value.xml,
        'startedAt': value.startedAt === undefined ? undefined : (value.startedAt.toISOString()),
        'submittedAt': value.submittedAt === undefined ? undefined : (value.submittedAt.toISOString()),
        'author': value.author,
        'examSubmissionState': value.examSubmissionState,
    };
}
