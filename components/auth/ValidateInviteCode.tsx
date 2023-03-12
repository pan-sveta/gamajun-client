import React from 'react';
import {Button, Paper, TextInput, Title} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useValidateCodeLazyQuery, useValidateCodeQuery} from "../../client/generated/generated-types";
import {showNotification} from "@mantine/notifications";
import {IconX} from "@tabler/icons";
import noAuthApolloClient from "../../noAuthApolloClient";

interface ValidateInviteCodeProps {
    validationSuccessful: (code: string) => void
}

function ValidateInviteCode({validationSuccessful}: ValidateInviteCodeProps) {
    const [validate, {loading, data, error}] = useValidateCodeLazyQuery({client: noAuthApolloClient});

    const form = useForm({
        initialValues: {
            inviteCode: "",
        },
    });


    function submitForm(values: ReturnType<(values: { inviteCode: string }) => { inviteCode: string }>) {
        validate({variables: {inviteCode: values.inviteCode}})
            .then((res) => {
                if (!res.error) {
                    if (res.data?.validateInviteCode) {
                        validationSuccessful(values.inviteCode);
                    } else {
                        form.setFieldError("inviteCode", "Neplatný kód pozvánky")
                    }
                }
                else {
                    showNotification({
                        title: "Ověření se nezdařilo",
                        message: res.error.message,
                        color: "red",
                        icon: <IconX/>,
                        autoClose: false
                    })
                }

            })
            .catch((err) => {
                showNotification({
                    title: "Ověření se nezdařilo",
                    message: err.message,
                    color: "red",
                    icon: <IconX/>,
                    autoClose: false
                })
            })
    }

    return (
        <div>
            <Title align="center">
                Verifikace kódu
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit((values) => submitForm(values))}>
                    <TextInput
                        label="Kód"
                        size={"xl"}
                        name={"inviteCode"}
                        {...form.getInputProps('inviteCode')}
                    />
                    <Button fullWidth mt="xl" type={"submit"} name={"submitButton"}>
                        Potvrdit
                    </Button>
                </form>
            </Paper>
        </div>
    );
}

export default ValidateInviteCode;