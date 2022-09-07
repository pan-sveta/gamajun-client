import {NextPage} from "next";
import dynamic from "next/dynamic";
import {Loader, Stack} from "@mantine/core";
import {useState} from "react";

const BpmnModeler = dynamic(() => import("../../components/bpmn/modeler/BpmnModeler"),{
    loading: () => <Loader variant="bars" />,
    ssr: false
});

const Index: NextPage = () => {
    const [xml, setXml] = useState<string>();

    return (
        <Stack>
            <h1>Zadání</h1>
            <BpmnModeler xml={xml} onXmlChange={setXml} />
            <div>{xml}</div>
        </Stack>
    )
}

export default Index