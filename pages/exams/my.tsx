import OpenedExams from "../../components/exams/OpenedExams";
import MyDraftSubmissions from "../../components/submissions/MyDraftSubmissions";
import MySubmissions from "../../components/submissions/MySubmittedSubmissions";
import Head from "next/head";
import React from "react";

const MyExams = () => {

    return (
        <div>
            <Head>
                <title>Mé zkoušky | Gamajun</title>
            </Head>
            <OpenedExams/>
            <MyDraftSubmissions/>
            <MySubmissions/>
        </div>
    );
}

export default MyExams