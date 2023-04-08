import {Alert, Button, Grid, Group, NumberInput, Paper, Stack, Text, TextInput} from "@mantine/core";
import {DateInput, DatePicker, DateTimePicker, TimeInput} from "@mantine/dates";
import {useForm} from "@mantine/form";
import {IconAlertCircle, IconCheck, IconDeviceFloppy, IconX} from "@tabler/icons";
import {showNotification} from "@mantine/notifications";
import {useRouter} from "next/router";
import DeleteExamButton from "./DeleteExamButton";
import {
    ExamByIdQuery,
    refetchExamsQuery,
    refetchMySubmissionsQuery,
    refetchOpenedExamsQuery,
    UpdateExamInput,
    useUpdateExamMutation
} from "../../client/generated/generated-types";
import ExamAssignmentPicker from "./ExamAssignmentPicker";
import ExamClassroomPicker from "./ExamClassroomPicker";
import React from "react";
import Head from "next/head";

interface ExamEditorProps {
    exam: ExamByIdQuery['examById'],
}

const ExamEditor = ({exam}: ExamEditorProps) => {
    const router = useRouter();

    const [updateExam, {loading, error}] = useUpdateExamMutation({
        refetchQueries: [refetchExamsQuery(), refetchOpenedExamsQuery(), refetchMySubmissionsQuery()],
    });

    const formo = useForm<UpdateExamInput>({
        initialValues: {
            id: exam?.id,
            title: exam?.title,
            accessibleFrom: exam?.accessibleFrom,
            accessibleTo: exam?.accessibleTo,
            timeLimit: exam?.timeLimit,
            assignmentIds: exam?.assignments.map(ass => ass.id),
            classroomIds: exam?.classrooms.map(cls => cls.id),
        },

        validate: {
            timeLimit: (value) => (value < 1 && value > 1440 ? 'Časový limit musí být v rozsahu 1 až 1440' : null),
        },
    });

    let submit = (input: UpdateExamInput) => {
        updateExam({
            variables: {
                input: input
            }
        })
            .then(assignment => {
                showNotification({
                    title: "Aktualizace proběhla úspěšně",
                    message: `Zkouška "${assignment.data?.updateExam?.title}"`,
                    color: "green",
                    icon: <IconCheck/>,
                })
                router.push(`/exams`)
            })
            .catch(err => showNotification({
                title: "Aktualizace se nezdařila",
                message: err.message,
                color: "red",
                icon: <IconX/>,
                autoClose: false
            }));
    }

    if (error)
        return <Alert icon={<IconAlertCircle size={16}/>} title="Chyba!" color="red">{error.message}</Alert>

    return (
        <div>
            <Head>
                <title>{exam?.title} | Gamajun</title>
            </Head>
            <Stack>
                <form onSubmit={formo.onSubmit((values) => submit(values))}>
                    <Grid align={"center"}>
                        <Grid.Col span={6}>
                            <h1>Zkouška</h1>
                            <Text>V této sekci můžete vytvořit novou zkoušku.</Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Group position={"right"}>
                                <Button type={"submit"} leftIcon={<IconDeviceFloppy/>} color="green"
                                        loading={loading}>Uložit</Button>
                                <DeleteExamButton exam={exam}/>
                            </Group>
                        </Grid.Col>
                    </Grid>
                    <Paper shadow="xs" p="md" my={"md"} withBorder>
                        <Stack>
                            <TextInput label={"Id"} readOnly={true} disabled={true} {...formo.getInputProps('id')}/>
                            <TextInput label={"Název"} {...formo.getInputProps('title')}/>
                            <DateTimePicker label={"Platné od"}
                                            value={new Date(formo.values?.accessibleFrom)}
                                            locale="cs"
                                            onChange={(date) => date ? formo.setFieldValue('accessibleFrom', date.toISOString()) : null}/>

                            <DateTimePicker label={"Platné od"}
                                            value={new Date(formo.values?.accessibleTo)}
                                            locale="cs"
                                            onChange={(date) => date ? formo.setFieldValue('accessibleTo', date.toISOString()) : null}/>
                            <NumberInput
                                {...formo.getInputProps('timeLimit')}
                                label={"Časový limit"}
                                description="V minutách od 0 do 1440"/>
                            <ExamAssignmentPicker value={formo.values?.assignmentIds}
                                                  onChange={(data) => formo.setFieldValue("assignmentIds", data)}/>
                            <ExamClassroomPicker value={formo.values?.classroomIds}
                                                 onChange={(data) => formo.setFieldValue("classroomIds", data)}/>
                        </Stack>
                    </Paper>
                </form>
            </Stack>
        </div>
    );
}

export default ExamEditor