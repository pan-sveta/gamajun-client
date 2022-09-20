import {useSession} from "next-auth/react";
import {Assignment, Exam} from "../../types/gamajun.ts";
import {Button, Grid, Group, Stack, Text, TextInput, TransferList, TransferListData, TransferListItem} from "@mantine/core";
import {DatePicker, TimeInput} from "@mantine/dates";
import 'dayjs/locale/cs';
import {useForm} from "@mantine/form";
import {IconCheck, IconDeviceFloppy, IconX} from "@tabler/icons";
import {createExam, updateExam} from "../../api/GamajunAPI";
import {showNotification} from "@mantine/notifications";
import {useRouter} from "next/router";
import DeleteExamButton from "./DeleteExamButton";

interface ExamEditorProps {
    exam?: Exam,
    assignments: Array<Assignment>
}

const ExamEditor = ({exam, assignments}: ExamEditorProps) => {
    const {data: sessionData} = useSession();
    const token = String(sessionData?.accessToken);
    const router = useRouter();

    const formo = useForm<Exam>({
        initialValues: {
            id: exam?.id,
            author: exam?.author,
            title: exam?.title,
            accessibleFrom: exam?.accessibleFrom,
            accessibleTo: exam?.accessibleTo,
            assignments: exam?.assignments,
        },

        validate: {},
    });

    function TransferListItemFromAssignment(assignment: Assignment): TransferListItem {
        return {
            value: assignment.id || "ERROR",
            label: assignment.title || "ERROR"
        }
    }

    function AssignmentFromTransferListItem(tli: TransferListItem): Assignment {
        let assignment = assignments.find(x => x.id == tli.value);

        if (!assignment)
            throw new Error("SOMETHING IS REALLY BAD");

        return assignment;
    }

    function read(): TransferListData {
        const selectedTli: Array<TransferListItem> = [];
        formo.values.assignments?.forEach(tli => selectedTli.push(TransferListItemFromAssignment(tli)))

        const allTli: Array<TransferListItem> = assignments
            .map(assignment => TransferListItemFromAssignment(assignment))
            .filter(tli => !selectedTli.map(y => y.value).includes(tli.value)) as Array<TransferListItem>;

        return [allTli, selectedTli];
    }

    function write(value: TransferListData): void {
        console.log(value[1])
        const assignments = value[1].map(tli => AssignmentFromTransferListItem(tli));
        let x = new Set<Assignment>(assignments);
        console.log(x)
        formo.setFieldValue('assignments', assignments)
    }

    let submit = (values: any) => {
        if (exam?.id)
            updateExam(values, token)
                .then(assignment => {
                    showNotification({
                        title: "Aktualizace proběhla úspěšně",
                        message: `Zkouška "${assignment?.title}"`,
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
        else {
            createExam(values, token)
                .then(exam => {
                    showNotification({
                        title: "Zkouška úspěšně vytvořena",
                        message: `Zkouška "${exam?.title}"`,
                        color: "green",
                        icon: <IconCheck/>
                    });
                    router.push(`/exams/${exam.id}`)
                })
                .catch(err => showNotification({
                    title: "Nepodařilo se vytvořit zkoušku",
                    message: err.message,
                    color: "red",
                    icon: <IconX/>,
                    autoClose: false
                }));
        }
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
                            <Button type={"submit"} leftIcon={<IconDeviceFloppy/>} color="green">Uložit</Button>
                            <DeleteExamButton exam={exam} />
                        </Group>
                    </Grid.Col>
                </Grid>
                <TextInput label={"Id"} readOnly={true} disabled={true} {...formo.getInputProps('id')}/>
                <TextInput label={"Název"} {...formo.getInputProps('title')}/>
                <DatePicker label={"Platné od"} value={formo.values?.accessibleFrom}
                            onChange={(date) => date ? formo.setFieldValue('accessibleFrom', date) : null} locale="cs"/>
                <TimeInput value={formo.values?.accessibleFrom}
                           onChange={(date) => formo.setFieldValue('accessibleFrom', date)}/>
                <DatePicker label={"Platné do"} value={formo.values?.accessibleTo}
                            onChange={(date) => date ? formo.setFieldValue('accessibleTo', date) : null} locale="cs"/>
                <TimeInput value={formo.values?.accessibleTo}
                           onChange={(date) => formo.setFieldValue('accessibleTo', date)}/>
                <TransferList
                    value={read()}
                    onChange={(value) => write(value)}
                    searchPlaceholder="Hledat..."
                    nothingFound="Zde nic není"
                    titles={['Dostupné', 'Přidělené']}
                    breakpoint="sm"
                />
                <p>{JSON.stringify(formo.values)}</p>
            </form>
        </Stack>
    );
}

export default ExamEditor