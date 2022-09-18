import {Button, Center, Grid, Loader, Stack, Tabs, Text, TextInput} from "@mantine/core";
import {IconAdjustmentsAlt, IconDeviceFloppy, IconPaint, IconSettings} from "@tabler/icons";
import RichTextEditor from "../input/RichTextEditor";
import dynamic from "next/dynamic";
import {useSession} from "next-auth/react";
import {useForm} from "@mantine/form";
import {CreateAssignment} from "../../api/GamajunAPI";

// @ts-ignore
const BpmnModeler = dynamic(() => {
    return import("../../components/bpmn/modeler/BpmnModeler");
}, {
    loading: () => <Loader variant="bars"/>,
    ssr: false
});

interface AssignmentEditorProps {
    assignemnt: Array<any>,
    isNew: boolean
}

const AssignmentEditor = ({assignemnt,isNew}:AssignmentEditorProps) => {
    const {data: sessionData} = useSession()


    const form = useForm({
        initialValues: {
            title: assignemnt?.title,
            description: assignemnt?.description,
            xml: assignemnt?.xml,
        },
        validate: {
            title: (value) => (value.length < 5 ? 'Název musí být alespoň 5 znaků dlouhý' : null),
            description: (value) => (value.length < 20 ? 'Popis musí být alespoň 20 znaků dlouhý' : null),
            xml: (value) => (value == undefined ? 'Diagram nesmí být prázdný.' : null),
        },
    });

    let createCall = (values: any) => {
        CreateAssignment(values, String(sessionData?.accessToken)).then(r => console.log("CREATED"));
    };

    return (<div>
        <form onSubmit={form.onSubmit((values) => createCall(values))}>
            <Grid align={"center"}>
                <Grid.Col span={6}>
                    <h1>Zadání</h1>
                    <Text>V této sekci můžete vytvořit nové zadání. To je dáno textovým popisem a referenčním diagramem
                        (řešením). Jednotlivá zadání můžete následně přiřadit zkouškovým termínům.</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Center>
                        <Button type={"submit"} leftIcon={<IconDeviceFloppy/>} color="green">Uložit</Button>
                    </Center>
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
                        <Text>Název</Text>
                        <TextInput placeholder="Stavba mostu" {...form.getInputProps('title')} />
                        <Text>Popis</Text>
                        <RichTextEditor title={"Hello"} {...form.getInputProps('description')} />
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