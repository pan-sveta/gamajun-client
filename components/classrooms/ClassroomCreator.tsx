import {Button, Grid, Group, Paper, Stack, Text, TextInput} from "@mantine/core";
import {IconCheck, IconDeviceFloppy, IconX} from "@tabler/icons-react";
import {useForm} from "@mantine/form";
import {useRouter} from "next/router";
import {showNotification} from "@mantine/notifications";
import {
    CreateClassroomInput,
    refetchClassroomsQuery,
    useCreateClassroomMutation
} from "../../client/generated/generated-types";
import React from "react";

const ClassroomCreator = () => {
    const router = useRouter();

    const [createClassroom, {loading, error}] = useCreateClassroomMutation({
        refetchQueries: [refetchClassroomsQuery()],
    });

    const form = useForm<CreateClassroomInput>({
        initialValues: {
            name:"",
            inviteCode: ""
        },
        validate: {
            name: (value: string) => (value.length < 5 ? 'Název musí být alespoň 5 znaků dlouhý' : null),
            inviteCode: (value: string) => (value.length < 5 ? 'Kód pozvánky musí být alespoň 5 znaků dlouhý' : null),
        },
    });

    let submit = (input: CreateClassroomInput) => {
        createClassroom({
            variables: {
                input: input
            }
        })
            .then(classroom => {
                showNotification({
                    title: "Třída úspěšně vytvořena",
                    message: `Třída "${classroom.data?.createClassroom.name}"`,
                    color: "green",
                    icon: <IconCheck/>
                });
                router.push(`/classrooms/${classroom?.data?.createClassroom?.id}`)
            })
            .catch(err => showNotification({
                title: "Nepodařilo se vytvořit třídu",
                message: err.message,
                color: "red",
                icon: <IconX/>,
                autoClose: false
            }));

    }

    return (
        <div>
            <form onSubmit={form.onSubmit((values) => submit(values))}>
                <Grid align={"center"}>
                    <Grid.Col span={6}>
                        <h1>Zadání</h1>
                        <Text>V této sekci můžete vytvořit novou třídu.</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Group position={"right"}>
                            <Button type={"submit"} leftIcon={<IconDeviceFloppy/>} color="green"
                                    loading={loading}>Uložit</Button>
                        </Group>
                    </Grid.Col>
                </Grid>
                <Paper shadow="xs" p="md" my={"md"} withBorder>
                    <Stack>
                        <TextInput label={"Název"}
                                   placeholder="Zimní semestr 2023 skupina B" {...form.getInputProps('name')} />

                        <TextInput label={"Kód pozvánky"}
                                   placeholder="leto2023B" {...form.getInputProps('inviteCode')} />

                    </Stack>
                </Paper>
            </form>
        </div>);
}

export default ClassroomCreator