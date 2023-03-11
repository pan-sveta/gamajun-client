import {NextPage} from "next";
import ExamCreator from "../../components/exams/ExamCreator";
import Head from "next/head";
import React from "react";


const New: NextPage = () => {

    return (
        <div>
            <Head>
                <title>Nová zkouška | Gamajun</title>
            </Head>
            <ExamCreator/>
        </div>
    )
}

export default New