import React from 'react';
import {Alert, Button, Flex, Group, Loader, NumberInput, Paper, Stack, Text, Textarea, Title} from "@mantine/core";
import {
    ExamSubmissionGradeInput,
    ExamSubmissionSubmitInput,
    QueryExamSubmissionByIdArgs,
    refetchExamByIdQuery,
    refetchMySubmissionsQuery,
    refetchOpenedExamsQuery, refetchSubmissionByIdGradingQuery,
    refetchSubmissionByIdQuery, refetchSubmissionsByExamIdQuery,
    SubmissionByIdGradingQuery,
    SubmissionByIdQuery,
    useGradeExamSubmissionMutation,
    useSubmitExamSubmissionMutation
} from "../../client/generated/generated-types";
import {useForm} from "@mantine/form";
import {showNotification} from "@mantine/notifications";
import {
    IconAlertCircle,
    IconAlertTriangle,
    IconCheck,
    IconCircleCheck,
    IconDeviceFloppy,
    IconX,
    IconZoomCheck
} from "@tabler/icons";
import {useRouter} from "next/router";

interface GradeSubmissionProps {
    submission: SubmissionByIdGradingQuery['examSubmissionById']
}

const GradeSubmission = ({submission}: GradeSubmissionProps) => {
    let router = useRouter();
    const [gradeSubmission, {loading, error}] = useGradeExamSubmissionMutation({
        refetchQueries: [
            refetchMySubmissionsQuery(),
            refetchSubmissionByIdQuery({id: submission?.id ?? ''}),
            refetchSubmissionsByExamIdQuery({id: submission?.exam.id ?? ''}),
            refetchSubmissionByIdGradingQuery({id: submission?.id ?? ''}),
        ]
    });

    const formo = useForm<ExamSubmissionGradeInput>({
        initialValues: {
            id: submission?.id ?? '',
            points: submission?.points ?? 0.0,
            comment: submission?.comment,
        },
        validate: {
            id: (value: string) => (value == undefined ? 'ID nesmí být prázdný.' : null),
            points: (value: number) => (value < 0 ? 'Bodů musí být více než 0! Na záporné to snad nikdo nenapsal' : null),
        },
    });

    const submit = (input: ExamSubmissionGradeInput) => {
        gradeSubmission({
            variables: {
                input: input
            }
        })
            .then(assignment => {
                showNotification({
                    title: "Úspěšně ohodnoceno",
                    message: `Student ohodnocen s ${input.points} body.`,
                    color: "green",
                    icon: <IconCheck/>,
                })
                router.back();
            })
            .catch(err => showNotification({
                title: "Chyba při ohodnocení zkoušky",
                message: err.message,
                color: "red",
                icon: <IconX/>,
                autoClose: false
            }));
    }

    if (error)
        return <Alert icon={<IconAlertCircle size={16}/>} title="Chyba!" color="red">{error.message}</Alert>;

    return (
        <Paper shadow="xs" p="md" mih={"100%"} withBorder>
            <form onSubmit={formo.onSubmit((values) => submit(values))}>
                <Stack>
                    <NumberInput
                        defaultValue={18}
                        label="Body"
                        withAsterisk
                        required
                        {...formo.getInputProps('points')}
                    />
                    <Textarea
                        placeholder="Your comment"
                        label="Komentář"
                        autosize
                        minRows={2}
                        maxRows={4}
                        miw={"15vw"}
                        {...formo.getInputProps('comment')}
                    />
                    {
                        submission?.examSubmissionState === "Graded" ?
                            <Button type={"submit"} color={"yellow"} leftIcon={<IconDeviceFloppy/>}
                                    loading={loading}>Aktualizovat hodnocení</Button>
                            :
                            <Button type={"submit"} color={"green"} leftIcon={<IconDeviceFloppy/>}
                                    loading={loading}>Ohodnotit</Button>
                    }
                </Stack>
            </form>
        </Paper>
    );
};

export default GradeSubmission;
