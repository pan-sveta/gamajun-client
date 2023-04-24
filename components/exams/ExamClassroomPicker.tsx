import {
    Checkbox,
    Group,
    Text,
    TransferList,
    TransferListData,
    TransferListItem,
    TransferListItemComponent,
    TransferListItemComponentProps
} from "@mantine/core";
import {useClassroomsQuery} from "../../client/generated/generated-types";
import GamajunLoader from "../common/GamajunLoader";
import {IconUsers} from "@tabler/icons";
import React from "react";

interface ExamAssignmentPickerProps {
    value: Array<string>

    onChange?(data: Array<string>): void
}

const ItemComponent: TransferListItemComponent = ({
                                                      data,
                                                      selected,
                                                  }: TransferListItemComponentProps) => (
    <Group noWrap >
        <Checkbox checked={selected} onChange={() => {}} tabIndex={-1} sx={{ pointerEvents: 'none' }} />
        <div style={{ display: "flex", alignItems: "center" }}>
            <IconUsers color={"purple"}/>
            <Text ml={"5px"} size="sm" weight={500} mr={"5px"}>
                {data.label}
            </Text>
        </div>
    </Group>
);

const ExamAssignmentPicker = ({value, onChange}: ExamAssignmentPickerProps) => {

    const {data, loading, error} = useClassroomsQuery();


    if (loading)
        return <GamajunLoader/>

    if (!data?.classrooms)
        return <GamajunLoader/>

    let classrooms = data?.classrooms;

    function TransferListItemFromAssignmentId(id: string): TransferListItem {
        let classroom = classrooms?.find(x => x.id == id);
        return {
            value: classroom?.id || "N/A",
            label: classroom?.name || "N/A"
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
            itemComponent={ItemComponent}
            searchPlaceholder="Hledat..."
            nothingFound="Žádná třída"
            titles={['Dostupné', 'Přidělené']}
            breakpoint="sm"
        />
    );
}

export default ExamAssignmentPicker