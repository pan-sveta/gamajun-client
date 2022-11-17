import {Button, Grid, Group, Loader, Stack, Switch, Tabs, Text, TextInput} from "@mantine/core";
import {IconAdjustmentsAlt, IconCheck, IconDeviceFloppy, IconPaint, IconSettings, IconX} from "@tabler/icons";
import GamajunRichTextEditor from "../input/GamajunRichTextEditor";
import dynamic from "next/dynamic";
import {useForm} from "@mantine/form";
import {useRouter} from "next/router";
import {showNotification} from "@mantine/notifications";
import {
    CreateAssignmentInput,
    refetchAssignmentsQuery,
    useCreateAssignmentMutation
} from "../../client/generated/generated-types";

// @ts-ignore
const BpmnModeler = dynamic(() => {
    return import("../../components/bpmn/modeler/BpmnModeler");
}, {
    loading: () => <Loader variant="bars"/>,
    ssr: false
});

const AssignmentCreator = () => {
    const router = useRouter();

    const [createAssignment, {loading, error}] = useCreateAssignmentMutation({
        refetchQueries: [refetchAssignmentsQuery()],
    });

    const form = useForm<CreateAssignmentInput>({
        initialValues: {
            title: "",
            description: "",
            xml: "",
            sandbox: false
        },
        validate: {
            title: (value: string) => (value.length < 5 ? 'Název musí být alespoň 5 znaků dlouhý' : null),
            description: (value: string) => (value.length < 20 ? 'Popis musí být alespoň 20 znaků dlouhý' : null),
            xml: (value: string) => (value == undefined ? 'Diagram nesmí být prázdný.' : null),
        },
    });

    let submit = (input: CreateAssignmentInput) => {
        createAssignment({
            variables: {
                input: input
            }
        })
            .then(assignment => {
                showNotification({
                    title: "Zadání úspěšně vytvořeno",
                    message: `Zadání "${assignment?.data?.createAssignment?.title}"`,
                    color: "green",
                    icon: <IconCheck/>
                });
                router.push(`/assignments/${assignment?.data?.createAssignment?.id}`)
            })
            .catch(err => showNotification({
                title: "Nepodařilo se vytvořit zadání",
                message: err.message,
                color: "red",
                icon: <IconX/>,
                autoClose: false
            }));

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
                            <Button type={"submit"} leftIcon={<IconDeviceFloppy/>} color="green" loading={loading}>Uložit</Button>
                        </Group>
                    </Grid.Col>
                </Grid>
                <Tabs defaultValue="properties">
                    <Tabs.List>
                        <Tabs.Tab value="properties" icon={<IconAdjustmentsAlt size={14}/>}>Vlastnosti</Tabs.Tab>
                        <Tabs.Tab value="diagram" icon={<IconPaint size={14}/>}>Referenční řešení</Tabs.Tab>
                        <Tabs.Tab value="settings" icon={<IconSettings size={14}/>}>Nastavení</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="properties" pt="xs">
                        <Stack>
                            <TextInput label={"Název"}
                                       placeholder="Stavba mostu" {...form.getInputProps('title')} />
                            <Text>Popis</Text>
                            <GamajunRichTextEditor title={"Hello"} {...form.getInputProps('description')} />
                        </Stack>
                    </Tabs.Panel>
                    <Tabs.Panel value="diagram" pt="xs">
                        <BpmnModeler xml={form.values.xml}
                                     onXmlChange={(newXml) => form.setFieldValue<string>('xml', newXml)}/>
                        <div>{JSON.stringify(form.values.xml)}</div>
                    </Tabs.Panel>
                    <Tabs.Panel value="settings" pt="xs">
                        <Switch
                            label="Sandbox zadání"
                            description="Zadání bude dostupné v cvičné sekci"
                            size="md"
                            onChange={(event) => form.setFieldValue('sandbox', event.currentTarget.checked)}
                        />
                    </Tabs.Panel>
                </Tabs>
            </form>
        </div>);
}

export default AssignmentCreator