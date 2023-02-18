import { NextPage } from "next";
import {useRouter} from "next/router";
import {useClassroomByIdQuery} from "../../../client/generated/generated-types";
import GamajunLoader from "../../../components/common/GamajunLoader";
import ClassroomsOverview from "../../../components/classrooms/ClassroomsOverview";
import ClassroomViewer from "../../../components/classrooms/ClassroomViewer";


const ClassroomPage: NextPage = () => {
    const router = useRouter();
    const {classroomId} = router.query;

    const {data, loading, error} = useClassroomByIdQuery({
        variables: {
            id: typeof classroomId === 'string' ? classroomId : "NO ID"
        }
    });

    if (error)
        return <div>{error.message}</div>

    if (!data?.classroomById || loading)
        return <GamajunLoader/>;


    return <ClassroomViewer classroom={data.classroomById}/>;
}

export default ClassroomPage;

