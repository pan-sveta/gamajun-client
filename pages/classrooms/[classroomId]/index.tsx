import {NextPage} from "next";
import {useRouter} from "next/router";
import {useClassroomByIdQuery} from "../../../client/generated/generated-types";
import GamajunLoader from "../../../components/common/GamajunLoader";
import ClassroomViewer from "../../../components/classrooms/ClassroomViewer";
import {IconAlertCircle} from "@tabler/icons";
import React from "react";
import {Alert} from "@mantine/core";


const ClassroomPage: NextPage = () => {
    const router = useRouter();
    const {classroomId} = router.query;

    const {data, loading, error} = useClassroomByIdQuery({
        variables: {
            id: typeof classroomId === 'string' ? classroomId : "NO ID"
        }
    });

    if (error)
        return <Alert icon={<IconAlertCircle size={16}/>} title="Chyba!" color="red">{error.message}</Alert>

    if (!data?.classroomById || loading)
        return <GamajunLoader/>;


    return <ClassroomViewer classroom={data.classroomById}/>;
}

export default ClassroomPage;

