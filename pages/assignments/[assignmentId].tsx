import {NextPage} from "next";
import AssignmentEditor from "../../components/assignments/AssignmentEditor";
import {useAssignmentByIdQuery} from "../../client/generated/generated-types";
import {useRouter} from "next/router";
import GamajunLoader from "../../components/common/GamajunLoader";

const AllAssignments: NextPage = () => {
    const router = useRouter();
    const {assignmentId} = router.query

    const {data, loading, error} = useAssignmentByIdQuery({
        variables: {
            id: typeof assignmentId === 'string' ? assignmentId : "NO ID"
        }
    })

    if (loading)
        return <GamajunLoader/>

    let assignment = data?.assignmentById;

    if (!assignment)
        return <div>ERROR</div>

    return (
        <AssignmentEditor assignment={assignment}/>
    );
}

export default AllAssignments