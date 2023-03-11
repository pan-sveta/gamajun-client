import {NextPage} from "next";
import Link from "next/link";
import {Button, Group, Stack, Title} from "@mantine/core";
import {IconPlus} from "@tabler/icons";
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