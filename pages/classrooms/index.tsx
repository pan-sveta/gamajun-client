import {NextPage} from "next";
import ClassroomsOverview from "../../components/classrooms/ClassroomsOverview";
import Head from "next/head";

const Classrooms: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Třídy | Gamajun</title>
            </Head>
            <ClassroomsOverview/>
        </div>
    );
}
export default Classrooms