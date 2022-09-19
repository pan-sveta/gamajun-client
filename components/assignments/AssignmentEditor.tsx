import {Button, Center, Grid, Group, Loader, Stack, Tabs, Text, TextInput} from "@mantine/core";
import {
    IconAdjustmentsAlt, IconCheck, IconCircleCheck,
    IconCross,
    IconDeviceFloppy,
    IconPaint,
    IconSettings,
    IconTrash,
    IconX
} from "@tabler/icons";
import RichTextEditor from "../input/RichTextEditor";
import dynamic from "next/dynamic";
import {useSession} from "next-auth/react";
import {useForm} from "@mantine/form";
import {createAssignment, deleteAssignment, updateAssignment} from "../../api/GamajunAPI";
import {Assignment} from "../../types/gamajun.ts";
import {useRouter} from "next/router";
import {openConfirmModal} from "@mantine/modals";
import {showNotification} from "@mantine/notifications";

// @ts-ignore
const BpmnModeler = dynamic(() => {
    return import("../../components/bpmn/modeler/BpmnModeler");
}, {
    loading: () => <Loader variant="bars"/>,
    ssr: false
});

interface AssignmentEditorProps {
    assignment?: Assignment,
}

const AssignmentEditor = ({assignment}: AssignmentEditorProps) => {
    const {data: sessionData} = useSession();
    const token = String(sessionData?.accessToken);
    const router = useRouter();

    const openDeleteModal = () => openConfirmModal({
        title: 'Odstranit',
        children: (
            <Text size="sm">
                Opravdu si přejete odstranit zadání &apos;{assignment?.title}&apos;?
            </Text>
        ),
        labels: {confirm: 'Potvrdit', cancel: 'Zrušit'},
        confirmProps: {color: 'red'},
        onCancel: () => console.log('Cancel'),
        onConfirm: () => handleDeleteAssignment(),
    });

    const handleDeleteAssignment = () => {
        const id = assignment?.id;
        if (id) {
            deleteAssignment(id, token)
                .then(() => {
                    showNotification({
                        title: "Odstranění proběhlo úspěšně",
                        message: `Zadání "${assignment?.title}"`,
                        color: "green",
                        icon: <IconCheck/>,
                    });
                    router.push(`/assignments`);
                })
                .catch(err => {
                    console.log(err)
                    showNotification({
                        title: "Odstranění se nezdařilo",
                        message: err.message,
                        color: "red",
                        icon: <IconX/>,
                        autoClose: false
                    })
                });
        }
    };

    const form = useForm<Assignment>({
        initialValues: {
            id: assignment?.id,
            author: assignment?.author,
            title: assignment?.title,
            description: assignment?.description,
            xml: assignment?.xml,
        },
        validate: {
            title: (value: string) => (value.length < 5 ? 'Název musí být alespoň 5 znaků dlouhý' : null),
            description: (value: string) => (value.length < 20 ? 'Popis musí být alespoň 20 znaků dlouhý' : null),
            xml: (value: string) => (value == undefined ? 'Diagram nesmí být prázdný.' : null),
        },
    });

    let submit = (values: any) => {
        if (assignment?.id)
            updateAssignment(values, token)
                .then(assignment => {
                    showNotification({
                        title: "Aktualizace proběhla úspěšně",
                        message: `Zadání "${assignment?.title}"`,
                        color: "green",
                        icon: <IconCheck/>,
                    })
                    router.push(`/assignments`)
                })
                .catch(err => showNotification({
                    title: "Aktualizace se nezdařila",
                    message: err.message,
                    color: "red",
                    icon: <IconX/>,
                    autoClose: false
                }));
        else {
            createAssignment(values, token)
                .then(assignment => {
                    showNotification({
                        title: "Zadání úspěšně vytvořeno",
                        message: `Zadání "${assignment?.title}"`,
                        color: "green",
                        icon: <IconCheck/>
                    });
                    router.push(`/assignments/${assignment.id}`)
                })
                .catch(err => showNotification({
                    title: "Nepodařilo se vytvořit zadání",
                    message: err.message,
                    color: "red",
                    icon: <IconX/>,
                    autoClose: false
                }));
        }
    }

    return (
        <div>
            <form onSubmit={form.onSubmit((values) => submit(values))}>
                <Grid align={"center"}>
                    <Grid.Col span={6}>
                        <h1>Zadání</h1>
                        <Text>V této sekci můžete vytvořit nové zadání. To je dáno textovým popisem a referenčním
                            diagramem
                            (řešením). Jednotlivá zadání můžete následně přiřadit zkouškovým termínům.</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Group position={"right"}>
                            <Button type={"submit"} leftIcon={<IconDeviceFloppy/>} color="green">Uložit</Button>
                            {assignment?.id ? <Button onClick={() => openDeleteModal()} leftIcon={<IconTrash/>}
                                                      color="red">Odstranit</Button> : null}
                        </Group>
                    </Grid.Col>
                </Grid>
                <Tabs defaultValue="properties">
                    <Tabs.List>
                        <Tabs.Tab value="properties" icon={<IconAdjustmentsAlt size={14}/>}>Vlasnosti</Tabs.Tab>
                        <Tabs.Tab value="diagram" icon={<IconPaint size={14}/>}>Referenční řešení</Tabs.Tab>
                        <Tabs.Tab value="settings" icon={<IconSettings size={14}/>}>Nastavení</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="properties" pt="xs">
                        <Stack>
                            <TextInput label={"Id"} readOnly={true} disabled={true} {...form.getInputProps('id')} />
                            <TextInput label={"Název"}
                                       placeholder="Stavba mostu" {...form.getInputProps('title')} />
                            <Text>Popis</Text>
                            <RichTextEditor title={"Hello"} {...form.getInputProps('description')} />
                            <TextInput label={"Autor"} readOnly={true}
                                       disabled={true} {...form.getInputProps('author')} />
                        </Stack>
                    </Tabs.Panel>
                    <Tabs.Panel value="diagram" pt="xs">
                        <BpmnModeler xml={form.values.xml}
                                     onXmlChange={(newXml) => form.setFieldValue<string>('xml', newXml)}/>
                        <div>{JSON.stringify(form.values.xml)}</div>
                    </Tabs.Panel>
                    <Tabs.Panel value="settings" pt="xs">
                        <Text>TBA</Text>
                    </Tabs.Panel>
                </Tabs>
            </form>
        </div>);
}

export default AssignmentEditor