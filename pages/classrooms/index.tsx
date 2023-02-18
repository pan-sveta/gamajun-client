import {NextPage} from "next";
import Link from "next/link";
import {Button, Group, Stack, Title} from "@mantine/core";
import {IconPlus} from "@tabler/icons";
import ClassroomsOverview from "../../components/classrooms/ClassroomsOverview";

const Classrooms: NextPage = () => {
    return (
        <ClassroomsOverview/>
    );
}
export default Classrooms