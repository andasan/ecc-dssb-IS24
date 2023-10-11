import { Column, Table } from '@tanstack/react-table';
import { useMemo } from 'react';

import { DebouncedInput } from '@/components/elements/debounced-input'

import { deCamelCase, getUniqueNestedValues } from '@/lib/utils';

export const CustomFilter = ({ column, table }: { column: Column<any, unknown>; table: Table<any> }) => {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id);

    const columnFilterValue = column.getFilterValue();

    const sortedUniqueValues = useMemo(
        () =>
            typeof firstValue === "number"
                ? []
                : Array.from(column.getFacetedUniqueValues().keys()).sort(),
        [column.getFacetedUniqueValues()]
    );

    return Array.isArray(firstValue) ? (
        <>
            <datalist id={column.id + "list"}>
                {getUniqueNestedValues(sortedUniqueValues.slice(0, 5000)).reverse().map((value) => (
                    <option value={value} key={value} />
                ))}
            </datalist>
            <DebouncedInput
                type="text"
                value={columnFilterValue as unknown as string ?? ""}
                onChange={(value) => column.setFilterValue(value)}
                placeholder={`Search ${deCamelCase(column.id)} `}
                list={column.id + "list"}
            />
        </>
    ) : (
        <>
            <datalist id={column.id + "list"}>
                {sortedUniqueValues.slice(0, 5000).map((value) => (
                    <option value={value} key={value} />
                ))}
            </datalist>
            <DebouncedInput
                type="text"
                value={columnFilterValue as unknown as string ?? ""}
                onChange={(value) => column.setFilterValue(value)}
                placeholder={`Search ${deCamelCase(column.id)} `}
                list={column.id + "list"}
            />
        </>
    );
}
