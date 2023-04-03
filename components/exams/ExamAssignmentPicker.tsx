import {
    Avatar, Checkbox,
    Group,
    TransferList,
    TransferListData,
    TransferListItem,
    TransferListItemComponent,
    TransferListItemComponentProps,
    Text, Box
} from "@mantine/core";
import {useAssignmentsPickerQuery} from "../../client/generated/generated-types";
import GamajunLoader from "../common/GamajunLoader";
import {IconBeach} from "@tabler/icons";
import React from "react";

interface ExamAssignmentPickerProps {
    value: Array<string>

    onChange?(data: Array<string>): void
}

const ItemComponent: TransferListItemComponent = ({
                                                      data,
                                                      selected,
                                                  }: TransferListItemComponentProps) => (
    <Group noWrap>
        <Checkbox checked={selected} onChange={() => {}} tabIndex={-1} sx={{ pointerEvents: 'none' }} />
        <div style={{ display: "flex" }}>
            <Text size="sm" weight={500}>
                {data.label}
            </Text>
            {data.sandbox && <Box ml={"5px"}><IconBeach size={20} color={"rgb(255, 212, 59)"}/></Box>}
        </div>
    </Group>
);

const ExamAssignmentPicker = ({value, onChange}: ExamAssignmentPickerProps) => {

    const {data, loading, error} = useAssignmentsPickerQuery();


    if (loading)
        return <GamajunLoader/>

    if (!data?.assignments)
        return <GamajunLoader/>

    let assignments = data?.assignments;

    function TransferListItemFromAssignmentId(id: string): TransferListItem {
        let assignment = assignments?.find(x => x.id == id);
        return {
            value: assignment?.id || "N/A",
            label: assignment?.title || "N/A",
            sandbox: assignment?.sandbox || false
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
            itemComponent={ItemComponent}
            searchPlaceholder="Hledat..."
            nothingFound="Žádné zadání"
            titles={['Dostupné', 'Přidělené']}
            breakpoint="sm"
        />
    );
}

export default ExamAssignmentPicker