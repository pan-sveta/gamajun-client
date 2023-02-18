import React, {useState} from 'react';
import {Button, Container, Stack, Stepper, Text} from "@mantine/core";
import RegistrationForm from "./RegistrationForm";
import ValidateInviteCode from "./ValidateInviteCode";
import {useRouter} from "next/router";
import {IconCircleCheck, IconLogin} from '@tabler/icons';

const Registration = () => {
    const [active, setActive] = useState<number>(0);
    const [inviteCode, setInviteCode] = useState<string>("");
    const router = useRouter();
    const validationSuccessful = (code: string) => {
        setInviteCode(code);
        setActive(1);
    };

    const registrationSuccessful = () => {
        setActive(2);
    };

    return (
        <Container py={"xl"}>
            <Stepper active={active} breakpoint="sm">
                <Stepper.Step label="Verifikace kódu" description="Zadejte přidělený kód">
                    <ValidateInviteCode validationSuccessful={validationSuccessful}/>
                </Stepper.Step>
                <Stepper.Step label="Registrace" description="Vyplnění osobních údajů">
                    <RegistrationForm inviteCode={inviteCode} registrationSuccessful={registrationSuccessful}/>
                </Stepper.Step>
                <Stepper.Completed>
                    <Stack align={"center"}>
                        <IconCircleCheck color="green" size={"10vh"}/>
                        <Text fz={"xl"}>Registrace byla úspěšná!</Text>
                        <Button onClick={() => {router.push("/auth/signin")}} leftIcon={<IconLogin/>}>Přejít na přihlášení</Button>
                    </Stack>

                </Stepper.Completed>
            </Stepper>
        </Container>
    );
};

export default Registration;