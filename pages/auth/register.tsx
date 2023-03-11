import {NextPage} from "next";
import React, {useState} from "react";
import Registration from "../../components/auth/Registration";
import {useRouter} from "next/router";
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