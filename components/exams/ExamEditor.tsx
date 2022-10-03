import {Assignment} from "../../types/gamajun.ts";
import {
    Button,
    Grid,
    Group,
    Stack,
    Text,
    TextInput,
} from "@mantine/core";
import {DatePicker, TimeInput} from "@mantine/dates";
import {useForm} from "@mantine/form";
import {IconCheck, IconDeviceFloppy, IconX} from "@tabler/icons";
import {showNotification} from "@mantine/notifications";
import {useRouter} from "next/router";
import DeleteExamButton from "./DeleteExamButton";
import {
    Exam, ExamByIdQuery,
    refetchAssignmentsQuery, refetchExamsQuery, refetchMySubmissionsQuery, refetchOpenedExamsQuery,
    UpdateExamInput,
    useUpdateExamMutation
} from "../../client/generated/generated-types";
import ExamAssignmentPicker from "./ExamAssignmentPicker";

interface ExamEditorProps {
    exam: ExamByIdQuery['examById'],
}

const ExamEditor = ({exam}: ExamEditorProps) => {
    const router = useRouter();

    const [updateExam, {loading,error}] = useUpdateExamMutation({
        refetchQueries: [refetchExamsQuery(), refetchOpenedExamsQuery(), refetchMySubmissionsQuery()],
    });

    const formo = useForm<UpdateExamInput>({
        initialValues: {
            id: exam?.id,
            title: exam?.title,
            accessibleFrom: exam?.accessibleFrom,
            accessibleTo: exam?.accessibleTo,
            assignmentIds: exam?.assignments.map(ass => ass.id),
        },

        validate: {},
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
                            <Button type={"submit"} leftIcon={<IconDeviceFloppy/>} color="green" loading={loading}>Uložit</Button>
                            <DeleteExamButton exam={exam} />
                        </Group>
                    </Grid.Col>
                </Grid>
                <TextInput label={"Id"} readOnly={true} disabled={true} {...formo.getInputProps('id')}/>
                <TextInput label={"Název"} {...formo.getInputProps('title')}/>
                <DatePicker label={"Platné od"} value={new Date(formo.values?.accessibleFrom)}
                            onChange={(date) => date ? formo.setFieldValue('accessibleFrom', date.toISOString()) : null} locale="cs"/>
                <TimeInput value={new Date(formo.values?.accessibleFrom)}
                           onChange={(date) => formo.setFieldValue('accessibleFrom', date.toISOString())}/>
                <DatePicker label={"Platné do"} value={new Date(formo.values?.accessibleTo)}
                            onChange={(date) => date ? formo.setFieldValue('accessibleTo', date.toISOString()) : null} locale="cs"/>
                <TimeInput value={new Date(formo.values?.accessibleTo)}
                           onChange={(date) => formo.setFieldValue('accessibleTo', date.toISOString())}/>
                <ExamAssignmentPicker value={formo.values?.assignmentIds} onChange={(data) => formo.setFieldValue("assignmentIds", data)}/>
                <p>{JSON.stringify(formo.values)}</p>
            </form>
        </Stack>
    );
}

export default ExamEditor