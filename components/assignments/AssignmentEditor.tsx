import {Button, Center, Grid, Group, Loader, Stack, Tabs, Text, TextInput} from "@mantine/core";
import {IconAdjustmentsAlt, IconDeviceFloppy, IconPaint, IconSettings, IconTrash} from "@tabler/icons";
import RichTextEditor from "../input/RichTextEditor";
import dynamic from "next/dynamic";
import {useSession} from "next-auth/react";
import {useForm} from "@mantine/form";
import {createAssignment, deleteAssignment, updateAssignment} from "../../api/GamajunAPI";
import {Assignment} from "../../types/gamajun.ts";
import {useRouter} from "next/router";

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
    const {data: sessionData} = useSession()
    const router = useRouter();

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
        if(assignment?.id)
            updateAssignment(values, String(sessionData?.accessToken)).then();
        else
            createAssignment(values, String(sessionData?.accessToken)).then(assignment => router.push(`/assignments/${assignment.id}`));
    };

    const handleDeleteAssignment = () => {
        deleteAssignment(assignment?.id,sessionData?.accessToken).then(res => router.push(`/assignments`));
    };

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
                            {assignment?.id ? <Button onClick={() => handleDeleteAssignment()} leftIcon={<IconTrash/>} color="red">Odstranit</Button> : null}
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
                            <TextInput label={"Název"} placeholder="Stavba mostu" {...form.getInputProps('title')} />
                            <Text>Popis</Text>
                            <RichTextEditor title={"Hello"} {...form.getInputProps('description')} />
                            <TextInput label={"Autor"} readOnly={true} disabled={true} {...form.getInputProps('author')} />
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