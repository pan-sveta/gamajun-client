import {
    ActionIcon,
    AppShell,
    Burger,
    Group,
    Header,
    MediaQuery,
    Navbar,
    useMantineColorScheme,
    useMantineTheme
} from "@mantine/core";
import {MainLinks} from "./MainLinks";

import {useState} from "react";
import User from "./User";
import Logo from "./Logo";
import {IconMoonStars, IconSun} from "@tabler/icons-react";

type Props = {
    children: JSX.Element,
};

export default function GamajunAppShell({children}: Props) {
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    return (
        <AppShell
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{sm: 200, lg: 300}}>
                    <Navbar.Section grow mt="xs">
                        <MainLinks/>
                    </Navbar.Section>
                    <Navbar.Section>
                        <User/>
                    </Navbar.Section>
                </Navbar>
            }
            header={
                <Header height={70} p="md">
                    <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                        <MediaQuery largerThan="sm" styles={{display: 'none'}}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>
                        <Group sx={{height: '100%'}} px={20} position="apart" style={{flexGrow: 4}}>
                            <Logo colorScheme={colorScheme}/>
                            <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                                {colorScheme === 'dark' ? <IconSun size={16}/> : <IconMoonStars size={16}/>}
                            </ActionIcon>
                        </Group>
                    </div>
                </Header>
            }
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            })}
        >
            {children}
        </AppShell>
    );

}