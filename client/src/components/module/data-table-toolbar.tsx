import { Cross2Icon } from "@radix-ui/react-icons"
import { PlusIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { DataTableFacetedFilter } from "@/components/module/data-table-faceted-filter"
import { DataTableViewOptions } from "@/components/module/data-table-view-options"
import { DebouncedInput } from "@/components/module/data-table-debounced-input"
import { DataTableDialog } from "@/components/module/data-table-dialog"

import { methodology } from "@/data/data"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DebouncedInput
          placeholder="Search products"
          value={(table.getColumn("productName")?.getFilterValue() as string) ?? ""}
          onChange={(value) =>
            table.getColumn("productName")?.setFilterValue(value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("methodology") && (
          <DataTableFacetedFilter
            column={table.getColumn("methodology")}
            title="Methodology"
            options={methodology}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <p className="font-bold">
          Showing {table.getRowModel().rows.length} results
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="h-8 px-2 lg:px-3">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          </DialogTrigger>
          <DataTableDialog
            title="Add New Product"
            description="Add a new product to the ECC list. Click save when you're done."
          />
        </Dialog>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}