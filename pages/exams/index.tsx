import {NextPage} from "next";
import Link from "next/link";
import {Button, Group, Stack, Title} from "@mantine/core";
import {IconPlus} from "@tabler/icons";
import ExamsTable from "../../components/exams/ExamsTable";
import Head from "next/head";

const Exams: NextPage = () => {
    return (
       <div>
           <Head>
               <title>Zkoušky | Gamajun</title>
           </Head>
           <Stack>
               <Group position="apart">
                   <Title order={1}>Zkoušky</Title>
                   <Link href={"/exams/new"}>
                       <Button leftIcon={<IconPlus/>} color={"green"}>Nová zkouška</Button>
                   </Link>
               </Group>
               <ExamsTable/>
           </Stack>
       </div>
    );
}
export default Exams