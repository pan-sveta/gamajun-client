import {Alert, Button, Grid, Group, NumberInput, Paper, Stack, Text, TextInput,} from "@mantine/core";
import {DateTimePicker} from "@mantine/dates";
import {useForm} from "@mantine/form";
import {IconAlertCircle, IconCheck, IconDeviceFloppy, IconX} from "@tabler/icons";
import {showNotification} from "@mantine/notifications";
import {useRouter} from "next/router";
import {
    CreateExamInput,
    refetchExamsQuery,
    refetchMySubmissionsQuery,
    refetchOpenedExamsQuery,
    useCreateExamMutation
} from "../../client/generated/generated-types";
import ExamAssignmentPicker from "./ExamAssignmentPicker";
import ExamClassroomPicker from "./ExamClassroomPicker";
import React from "react";


const ExamCreator = () => {
    const router = useRouter();
    const defaultDate = new Date();
    defaultDate.setSeconds(0);
    defaultDate.setMilliseconds(0);

    const [createExam, {loading, error}] = useCreateExamMutation({
        refetchQueries: [refetchExamsQuery(), refetchOpenedExamsQuery(), refetchMySubmissionsQuery()],
    });

    const formo = useForm<CreateExamInput>({
        initialValues: {
            title: "",
            accessibleFrom: defaultDate.toISOString(),
            accessibleTo: defaultDate.toISOString(),
            timeLimit: 30,
            assignmentIds: [],
            classroomIds: []
        },
        validate: {
            title: (value) => (value.length < 1 ? "Zkouška musí mít název" : null),
            timeLimit: (value) => (value < 1 && value > 1440 ? 'Časový limit musí být v rozsahu 1 až 1440' : null),
            assignmentIds: (value) => (value.length < 1 ? "Musíte vybrat alespoň jedno zadání" : null),
            classroomIds: (value) => (value.length < 1 ? "Musíte vybrat alespoň jednu třídu" : null),
            accessibleFrom: (value) => (value == "" ? "Dostupné od nesmí být prázdné" : null),
            accessibleTo: (value) => (value == "" ? "Dostupné do nesmí být prázdné" : null),
        },
    });

    let submit = (input: CreateExamInput) => {
        createExam({
            variables: {
                input: input
            }
        })
            .then(assignment => {
                showNotification({
                    title: "Vytvoření proběhlo úspěšně",
                    message: `Zkouška "${assignment.data?.createExam?.title}"`,
                    color: "green",
                    icon: <IconCheck/>,
                })
                router.push(`/exams`)
            })
            .catch(err => showNotification({
                title: "Vytvoření se nezdařilo",
                message: err.message,
                color: "red",
                icon: <IconX/>,
                autoClose: false
            }));
    }

    if (error)
        return <Alert icon={<IconAlertCircle size={16}/>} title="Chyba!" color="red">{error.message}</Alert>

    return (
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
                                    loading={loading}>Vytvořit</Button>
                        </Group>
                    </Grid.Col>
                </Grid>
                <Paper shadow="xs" p="md" my={"md"} withBorder>
                    <Stack>
                        <TextInput label={"Název"} {...formo.getInputProps('title')}/>
                        <DateTimePicker label={"Platné od"}
                                        value={new Date(formo.values?.accessibleFrom)}
                                        locale="cs"
                                        onChange={(date) => date ? formo.setFieldValue('accessibleFrom', date.toISOString()) : null}/>

                        <DateTimePicker label={"Platné do"}
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
    );
}

export default ExamCreator