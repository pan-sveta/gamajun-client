import {NextPage} from "next";
import {
    Anchor,
    Box,
    Button, Center,
    Checkbox,
    Container,
    Grid,
    Group, Paper,
    PasswordInput,
    Stack, Stepper,
    Switch,
    Tabs,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import {useForm} from "@mantine/form";
import React, {useState} from "react";
import Registration from "../../components/auth/Registration";

const Exams: NextPage = () => {
    return (
        <Registration/>
    );
}
export default Exams