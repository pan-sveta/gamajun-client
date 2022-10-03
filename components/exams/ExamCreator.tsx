import {Button, Grid, Group, Stack, Text, TextInput,} from "@mantine/core";
import {DatePicker, TimeInput} from "@mantine/dates";
import {useForm} from "@mantine/form";
import {IconCheck, IconDeviceFloppy, IconX} from "@tabler/icons";
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


const ExamCreator = () => {
    const router = useRouter();

    const [createExam, {loading, error}] = useCreateExamMutation({
        refetchQueries: [refetchExamsQuery(), refetchOpenedExamsQuery(), refetchMySubmissionsQuery()],
    });

    const formo = useForm<CreateExamInput>({
        initialValues: {
            title: "",
            accessibleFrom: new Date().toISOString(),
            accessibleTo: new Date().toISOString(),
            assignmentIds: []
        },
        validate: {},
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
                            <Button type={"submit"} leftIcon={<IconDeviceFloppy/>} color="green" loading={loading}>Vytvořit</Button>
                        </Group>
                    </Grid.Col>
                </Grid>
                <TextInput label={"Název"} {...formo.getInputProps('title')}/>
                <DatePicker label={"Platné od"} value={new Date(formo.values?.accessibleFrom)}
                            onChange={(date) => date ? formo.setFieldValue('accessibleFrom', date.toISOString()) : null}
                            locale="cs"/>
                <TimeInput value={new Date(formo.values?.accessibleFrom)}
                           onChange={(date) => formo.setFieldValue('accessibleFrom', date.toISOString())}/>
                <DatePicker label={"Platné do"} value={new Date(formo.values?.accessibleTo)}
                            onChange={(date) => date ? formo.setFieldValue('accessibleTo', date.toISOString()) : null}
                            locale="cs"/>
                <TimeInput value={new Date(formo.values?.accessibleTo)}
                           onChange={(date) => formo.setFieldValue('accessibleTo', date.toISOString())}/>
                <ExamAssignmentPicker value={formo.values?.assignmentIds}
                                      onChange={(data) => formo.setFieldValue("assignmentIds", data)}/>
                <p>{JSON.stringify(formo.values)}</p>
            </form>
        </Stack>
    );
}

export default ExamCreator