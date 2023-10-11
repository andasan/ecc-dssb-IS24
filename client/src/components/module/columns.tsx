import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

import { Product } from "@/data/schema"
import { DataTableColumnHeader } from "@/components/module/data-table-column-header"
import { DataTableRowActions } from "@/components/module/data-table-row-actions"
import { CustomFilter } from "@/components/elements/custom-filter"

export const columns: ColumnDef<Product>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "productId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product ID" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("productId")}</div>,
        enableColumnFilter: false,
        enableSorting: true,
        enableHiding: false,
    },
    {
        accessorKey: "productName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product Name" />
        ),
        cell: ({ row }) => <div className="max-w-[500px] capitalize">{row.getValue("productName")}</div>,
        enableColumnFilter: false,
    },
    {
        accessorKey: "productOwnerName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product Owner" />
        ),
        cell: ({ row }) => <div className="w-[100px]">{row.getValue("productOwnerName")}</div>,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
        enableColumnFilter: false,
    },
    {
        accessorKey: "developers",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Developers" />
        ),
        cell: ({ row }) => {
            const developers = (row.getValue("developers") as { text: string }[]).map((dev) => dev.text).join(", ")
            const developersAsArray = developers.split(",").join(", ")
            return(
                <div>{developersAsArray}</div>
            )
        },
        filterFn: (row, id, value) => {
            const developersArray: Array<{id: string, text: string}> = row.getValue(id)
            const developersNames = developersArray.map((dev) => dev.text)
            return developersNames.includes(value)
        },
        enableSorting: false,
    },
    {
        accessorKey: "scrumMasterName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Scrum Master" />
        ),
        cell: ({ row }) => <div>{row.getValue("scrumMasterName")}</div>,
        meta: {
          filterComponent: CustomFilter
        }
    },
    {
        accessorKey: "startDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Start Date" />
        ),
        cell: ({ row }) => <div>{row.getValue("startDate")}</div>,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
        enableColumnFilter: false,
    },
    {
        accessorKey: "methodology",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Methodology" />
        ),
        cell: ({ row }) => <div>{row.getValue("methodology")}</div>,
        filterFn: (row, id, value) => {
            const rowVal = row.getValue(id) as string
            return value.includes(rowVal.toLowerCase())
        },
        enableColumnFilter: false,
        enableSorting: false,
    },
    {
        accessorKey: "location",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Location" />
        ),
        cell: ({ row }) => <div className="min-x-[443px] max-w-[445px]">{row.getValue("location")}</div>,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
        enableColumnFilter: false,
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]