import {NextPage} from "next";
import dynamic from "next/dynamic";
import {Loader, Stack} from "@mantine/core";

const BpmnModeler = dynamic(() => import("../../components/bpmn/modeler/BpmnModeler"),{
    loading: () => <Loader variant="bars" />,
    ssr: false
});

const Index: NextPage = () => {
    return (
        <Stack>
            <h1>Zadání</h1>
            <BpmnModeler/>
        </Stack>
    )
}

export default Index