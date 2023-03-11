import {NextPage} from "next";
import AssignmentCreator from "../../components/assignments/AssignmentCreator";
import Head from "next/head";
import React from "react";


const New: NextPage = () => {

    return (
        <div>
            <Head>
                <title>Nové zadání | Gamajun</title>
            </Head>
            <AssignmentCreator/>
        </div>
    )

}

export default New