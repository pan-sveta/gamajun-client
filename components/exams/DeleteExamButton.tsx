import {openConfirmModal} from "@mantine/modals";
import {Button, Text} from "@mantine/core";
import {showNotification} from "@mantine/notifications";
import {IconCheck, IconTrash, IconX} from "@tabler/icons";
import {useRouter} from "next/router";
import {ExamByIdQuery, refetchExamsQuery, useDeleteExamMutation} from "../../client/generated/generated-types";

interface DeleteExamButtonProps {
    exam: ExamByIdQuery['examById']
}

const DeleteExamButton = ({exam}: DeleteExamButtonProps) => {
    const router = useRouter();
    const [deleteExam, {loading, error}] = useDeleteExamMutation({
        variables: {
            id: exam.id
        },
        refetchQueries: [refetchExamsQuery()]
    });

    const openDeleteModal = () => openConfirmModal({
        title: 'Odstranit',
        children: (
            <Text size="sm">
                Opravdu si přejete odstranit zkoušku &apos;{exam?.title}&apos;?
            </Text>
        ),
        labels: {confirm: 'Potvrdit', cancel: 'Zrušit'},
        confirmProps: {color: 'red'},
        onConfirm: () => handleDeleteExam(),
    });

    const handleDeleteExam = () => {
        const id = exam?.id;
        if (id) {
            deleteExam()
                .then(() => {
                    showNotification({
                        title: "Odstranění proběhlo úspěšně",
                        message: `Zkouška "${exam?.title}"`,
                        color: "green",
                        icon: <IconCheck/>,
                    });
                    router.push(`/exams`);
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

    if (!exam?.id)
        return null;

    return (
        <Button onClick={() => openDeleteModal()} leftIcon={<IconTrash/>} color="red">Odstranit</Button>
    )

}

export default DeleteExamButton