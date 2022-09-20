import {openConfirmModal} from "@mantine/modals";
import {Button, Text} from "@mantine/core";
import {deleteExam} from "../../api/GamajunAPI";
import {showNotification} from "@mantine/notifications";
import {IconCheck, IconTrash, IconX} from "@tabler/icons";
import {Exam} from "../../types/gamajun.ts";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";

interface DeleteExamButtonProps {
    exam?: Exam
}

const DeleteExamButton = ({exam}: DeleteExamButtonProps) => {
    const router = useRouter();

    const {data: sessionData} = useSession();
    const token = String(sessionData?.accessToken);

    const openDeleteModal = () => openConfirmModal({
        title: 'Odstranit',
        children: (
            <Text size="sm">
                Opravdu si přejete odstranit zkoušku &apos;{exam?.title}&apos;?
            </Text>
        ),
        labels: {confirm: 'Potvrdit', cancel: 'Zrušit'},
        confirmProps: {color: 'red'},
        onCancel: () => console.log('Cancel'),
        onConfirm: () => handleDeleteExam(),
    });

    const handleDeleteExam = () => {
        const id = exam?.id;
        if (id) {
            deleteExam(id, token)
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

    if (!exam?.id)
        return null;

    return (
        <Button onClick={() => openDeleteModal()} leftIcon={<IconTrash/>} color="red">Odstranit</Button>
    )

}

export default DeleteExamButton