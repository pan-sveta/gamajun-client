import {NextPage} from "next";
import AssignmentCreator from "../../components/assignments/AssignmentCreator";
import ClassroomCreator from "../../components/classrooms/ClassroomCreator";
import Head from "next/head";


const NewClassroom: NextPage = () => {

    return (
        <div>
            <Head>
                <title>Nová třída | Gamajun</title>
            </Head>
            <ClassroomCreator/>
        </div>
    )

}

export default NewClassroom