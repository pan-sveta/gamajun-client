import {TransferList, TransferListData, TransferListItem} from "@mantine/core";
import {useAssignmentsPickerQuery, useClassroomsQuery} from "../../client/generated/generated-types";
import GamajunLoader from "../common/GamajunLoader";

interface ExamAssignmentPickerProps {
    value: Array<string>

    onChange?(data: Array<string>): void
}

const ExamAssignmentPicker = ({value, onChange}: ExamAssignmentPickerProps) => {

    const {data, loading, error} = useClassroomsQuery();


    if (loading)
        return <GamajunLoader/>

    if (!data?.classrooms)
        return <GamajunLoader/>

    let classrooms = data?.classrooms;

    function TransferListItemFromAssignmentId(id: string): TransferListItem {
        let assignment = classrooms?.find(x => x.id == id);
        return {
            value: assignment?.id || "N/A",
            label: assignment?.name || "N/A"
        }
    }


    function read(): TransferListData {
        const selectedTli: Array<TransferListItem> = [];
        value.forEach(id => selectedTli.push(TransferListItemFromAssignmentId(id)));

        const allTli: Array<TransferListItem> = classrooms?.map(assignment => TransferListItemFromAssignmentId(assignment.id))
            .filter(tli => !selectedTli.map(y => y.value).includes(tli.value)) as Array<TransferListItem>;

        return [allTli, selectedTli];
    }

    function write(value: TransferListData): void {
        const assignments = value[1].map(tli => tli.value);

        if (onChange)
            onChange(assignments)
    }

    return (
        <TransferList
            value={read()}
            onChange={(value) => write(value)}
            searchPlaceholder="Hledat..."
            nothingFound="Zde nic není"
            titles={['Dostupné', 'Přidělené']}
            breakpoint="sm"
        />
    );
}

export default ExamAssignmentPicker