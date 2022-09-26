import {openConfirmModal} from "@mantine/modals";
import {Button, Text} from "@mantine/core";
import {deleteAssignment} from "../../api/GamajunAPIClient";
import {showNotification} from "@mantine/notifications";
import {IconCheck, IconTrash, IconX} from "@tabler/icons";
import {Assignment} from "../../types/gamajun.ts";
import {useRouter} from "next/router";

interface DeleteAssignmentButtonProps{
    assignment?: Assignment
}

const DeleteAssignmentButton = ({assignment}:DeleteAssignmentButtonProps) => {
    const router = useRouter();

    const openDeleteModal = () => openConfirmModal({
        title: 'Odstranit',
        children: (
            <Text size="sm">
                Opravdu si přejete odstranit zadání &apos;{assignment?.title}&apos;?
            </Text>
        ),
        labels: {confirm: 'Potvrdit', cancel: 'Zrušit'},
        confirmProps: {color: 'red'},
        onConfirm: () => handleDeleteAssignment(),
    });

    const handleDeleteAssignment = () => {
        const id = assignment?.id;
        if (id) {
            deleteAssignment(id)
                .then(() => {
                    showNotification({
                        title: "Odstranění proběhlo úspěšně",
                        message: `Zadání "${assignment?.title}"`,
                        color: "green",
                        icon: <IconCheck/>,
                    });
                    router.push(`/assignments`);
                })
                .catch(err => {
                    console.log(err)
                    showNotification({
                        title: "Odstranění se nezdařilo",
                        message: err.message,
                        color: "red",
                        icon: <IconX/>,
                        autoClose: false
                    })
                });
        }
    };

    if (!assignment?.id)
        return null;

    return (
        <Button onClick={() => openDeleteModal()} leftIcon={<IconTrash/>} color="red">Odstranit</Button>
    );
}

export default DeleteAssignmentButton