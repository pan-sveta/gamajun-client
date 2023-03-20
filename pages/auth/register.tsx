import {NextPage} from "next";
import React from "react";
import Registration from "../../components/auth/Registration";
import Head from "next/head";

const Exams: NextPage = () => {

    return (
        <div>
            <Head>
                <title>Registrace | Gamajun</title>
            </Head>
            <Registration/>
        </div>
    );
}
export default Exams