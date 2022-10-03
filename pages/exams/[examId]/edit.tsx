import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import ExamEditor from "../../../components/exams/ExamEditor";
import {useRouter} from "next/router";
import {useAssignmentByIdQuery, useExamByIdQuery} from "../../../client/generated/generated-types";
import GamajunLoader from "../../../components/common/GamajunLoader";

const AllExams: NextPage = () => {

    const router = useRouter();
    const {examId} = router.query

    const {data, loading, error} = useExamByIdQuery({
        variables: {
            id: typeof examId === 'string' ? examId : "NO ID"
        }
    })

    if (loading)
        return <GamajunLoader/>

    let exam = data?.examById;

    if (!exam)
        return <div>{error?.message}</div>
    else
        return <ExamEditor exam={exam}/>;
}

export default AllExams