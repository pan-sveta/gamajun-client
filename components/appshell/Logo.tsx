import React from 'react';
import {ColorScheme} from '@mantine/core';
import Image from "next/image";

export default function Logo({ colorScheme }: { colorScheme: ColorScheme }) {
    return (
        <Image alt={"Gamajun logo"} src={"/logo.png"} height={"37px"} width={"133px"} quality={100}/>
    );
}