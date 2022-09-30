import {Button, Group, Stack, Table, Title} from "@mantine/core";
import Link from "next/link";
import {IconPlus} from "@tabler/icons";
import {useExamsQuery} from "../../client/generated/generated-types";
import GamajunLoader from "../common/GamajunLoader";
import {JSXElement} from "@babel/types";
import {ReactNode} from "react";
import gamajunLoader from "../common/GamajunLoader";

const ExamsTable = () => {
    const {data, error, loading} = useExamsQuery();
    const exams = () : ReactNode => {
        if (!data?.exams)
            return <GamajunLoader/>


        return data?.exams.map((exams) => (
            <Link key={exams?.id} href={`/exams/${exams?.id}`}>
                <tr key={exams?.id}>
                    <td>{exams?.id}</td>
                    <td>{exams?.title}</td>
                    <td>{exams?.author}</td>
                    <td>{new Date(exams?.accessibleFrom ?? "N/A").toLocaleString()}</td>
                    <td>{new Date(exams?.accessibleTo ?? "N/A").toLocaleString()}</td>
                </tr>
            </Link>
        ));

    }

    if (loading)
        return <GamajunLoader/>

    return (
            <Table fontSize={"md"} striped highlightOnHover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Popis</th>
                    <th>Autor</th>
                    <th>Dostupné od</th>
                    <th>Dostupné do</th>
                </tr>
                </thead>
                <tbody>
                {exams()}
                </tbody>
            </Table>
    )
}

export default ExamsTable