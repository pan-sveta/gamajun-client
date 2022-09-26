import {Button, Container, createStyles, Group, Text, Title} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 120,

    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 220,
        lineHeight: 1,
        marginBottom: theme.spacing.xl * 1.5,
        color: theme.colors[theme.primaryColor][4],

        [theme.fn.smallerThan('sm')]: {
            fontSize: 120,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 38,
        color: theme.colors.dark[3],

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 540,
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl * 1.5,
        color: theme.colors.dark[2],
    },
}));

export function ServerError() {
    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <Container>
                <div className={classes.label}>500</div>
                <Title className={classes.title}>Něco se pokazilo...</Title>
                <Text size="lg" align="center" className={classes.description}>
                    Server nemůže zpracovat příchozí požadavek. Zkuste obnovit stránku.
                </Text>
                <Group position="center">
                    <Button size="md">
                        Obnovit
                    </Button>
                </Group>
            </Container>
        </div>
    );
}

export default ServerError