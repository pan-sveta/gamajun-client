import React from 'react';
import {Button, Paper, PasswordInput, Text, TextInput, Title} from "@mantine/core";
import {useForm} from "@mantine/form";
import {SignUpInput, useSignUpMutation} from "../../client/generated/generated-types";
import noAuthApolloClient from "../../apollo/noAuthApolloClient";
import {showNotification} from "@mantine/notifications";
import {IconX} from "@tabler/icons";

interface RegistrationFormInput {
    inviteCode: string
    registrationSuccessful: () => void
}

function RegistrationForm({inviteCode,registrationSuccessful}: RegistrationFormInput) {
    const [signUp, {loading, error}] = useSignUpMutation({client: noAuthApolloClient});

    const form = useForm<SignUpInput>({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            username: '',
            password: '',
            inviteCode: inviteCode
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    function submit(input: SignUpInput) {
        signUp({
            variables: {
                input: input
            }
        })
            .then(assignment => {
                registrationSuccessful();
            })
            .catch(err => showNotification({
                title: "Registrace se nezdařila",
                message: err.message,
                color: "red",
                icon: <IconX/>,
                autoClose: false
            }));

    }

    return (
        <div>
            <Title align="center">
                Verifikace kódu
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit((values) => submit(values))}>

                    <Text mb={"20px"} color={"gray"}>Pozvánka: {form.values.inviteCode}</Text>

                    <TextInput
                        withAsterisk
                        label="Jméno"
                        placeholder="Jan"
                        name={"name"}
                        {...form.getInputProps('name')}
                    />

                    <TextInput
                        withAsterisk
                        label="Příjmení"
                        placeholder="Novák"
                        name={"surname"}
                        {...form.getInputProps('surname')}
                    />

                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        name={"email"}
                        {...form.getInputProps('email')}
                    />

                    <TextInput
                        withAsterisk
                        label="Uživatelské jméno"
                        placeholder="novajan5"
                        name={"username"}
                        {...form.getInputProps('username')}
                    />

                    <PasswordInput
                        withAsterisk
                        label="Heslo"
                        placeholder="**********"
                        name={"password"}
                        {...form.getInputProps('password')}
                    />

                    <Button fullWidth mt="xl" type={"submit"} loading={loading}>
                        Zaregistrovat
                    </Button>
                </form>
            </Paper>
        </div>
    );
}

export default RegistrationForm;