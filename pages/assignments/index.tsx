import {NextPage} from "next";
import dynamic from "next/dynamic";
import {Loader, Stack, Tabs, TextInput, Text, Button, Grid, Center, Container} from "@mantine/core";
import {useForm} from "@mantine/form";
import RichTextEditor from '../../components/input/RichTextEditor';
import {IconAdjustmentsAlt, IconDeviceFloppy, IconPaint, IconSettings} from "@tabler/icons";
import {useSession} from "next-auth/react";
import {log} from "util";

const BpmnModeler = dynamic(() => import("../../components/bpmn/modeler/BpmnModeler"), {
    loading: () => <Loader variant="bars"/>,
    ssr: false
});

const Index: NextPage = () => {
    const { data: sessionData } = useSession()


    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            xml: undefined,
        },
        validate: {
            title: (value) => (value.length < 5 ? 'Název musí být alespoň 5 znaků dlouhý' : null),
            description: (value) => (value.length < 20 ? 'Popis musí být alespoň 20 znaků dlouhý' : null),
            xml: (value) => (value == undefined ? 'Diagram nesmí být prázdný.' : null),
        },
    });

    let createCall = (values:any) => {

        fetch("http://localhost:8080/assignments", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sessionData.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then(res => console.log(res))
            .catch(err => console.log(err))
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <div>
            <form onSubmit={form.onSubmit((values) => createCall(values))}>
            <Grid align={"center"}>
                <Grid.Col span={6}>
                    <h1>Zadání</h1>
                    <Text>V této sekci můžete vytvořit nové zadání. To je dáno textovým popisem a referenčním diagramem
                        (řešením). Jednotlivá zadání můžete následně přiřadit zkouškovým termínům.</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                        <Center>
                            <Button type={"submit"} leftIcon={<IconDeviceFloppy />} color="green">Uložit</Button>
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
                                     onXmlChange={(newXml) => form.setFieldValue<string>('xml', newXml) }/>
                    </Tabs.Panel>
                    <Tabs.Panel value="settings" pt="xs">
                        <Text>TBA</Text>
                    </Tabs.Panel>
                </Tabs>
            </form>
        </div>
    )


}

export default Index