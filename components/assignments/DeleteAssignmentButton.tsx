import {openConfirmModal} from "@mantine/modals";
import {Button, Text} from "@mantine/core";
import {showNotification} from "@mantine/notifications";
import {IconCheck, IconTrash, IconX} from "@tabler/icons";
import {useRouter} from "next/router";
import {
    Assignment,
    AssignmentByIdQuery,
    refetchAssignmentsQuery,
    useDeleteAssignmentMutation
} from "../../client/generated/generated-types";

interface DeleteAssignmentButtonProps {
    assignment: AssignmentByIdQuery['assignmentById']
}

const DeleteAssignmentButton = ({assignment}: DeleteAssignmentButtonProps) => {
    const router = useRouter();


    const [deleteAssignment, {loading, error}] = useDeleteAssignmentMutation({
        refetchQueries: [refetchAssignmentsQuery()],
    });



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
        const id = assignment.id;
        if (id) {
            deleteAssignment({
                variables: {
                    id: id
                }
            })
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
        <Button onClick={() => openDeleteModal()} leftIcon={<IconTrash/>} color="red" loading={loading} >Odstranit</Button>
    );
}

export default DeleteAssignmentButton