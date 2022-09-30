import {TransferList, TransferListData, TransferListItem} from "@mantine/core";
import {
    Assignment,
    AssignmentInput, AssignmentsPickerQuery, AssignmentsPickerQueryResult,
    InputMaybe,
    useAssignmentsPickerQuery,
    useAssignmentsQuery
} from "../../client/generated/generated-types";
import GamajunLoader from "../common/GamajunLoader";
import {useState} from "react";

interface ExamAssignmentPickerProps {
    value: Array<string>

    onChange?(data: Array<string>): void
}

const ExamAssignmentPicker = ({value, onChange}: ExamAssignmentPickerProps) => {

    const {data, loading, error} = useAssignmentsPickerQuery();


    if (loading)
        return <GamajunLoader/>

    if (!data?.assignments)
        return <GamajunLoader/>

    let assignments = data?.assignments;

    function TransferListItemFromAssignmentId(id: string): TransferListItem {
        console.log(id)
        let assignment = assignments?.find(x => x.id == id);
        return {
            value: assignment?.id || "N/A",
            label: assignment?.title || "N/A"
        }
    }


    function read(): TransferListData {
        const selectedTli: Array<TransferListItem> = [];
        value.forEach(id => selectedTli.push(TransferListItemFromAssignmentId(id)));

        const allTli: Array<TransferListItem> = assignments?.map(assignment => TransferListItemFromAssignmentId(assignment.id))
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