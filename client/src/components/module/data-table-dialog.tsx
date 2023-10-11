import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ProductForm } from "@/components/module/forms/product-form"

interface DataTableDialogProps<TData> {
    title: string
    description: string
    data?: TData
    editMode?: boolean
}

export function DataTableDialog<TData>({
    title,
    description,
    data,
    editMode = false,
}: DataTableDialogProps<TData>) {
    return (
        <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    {description}
                </DialogDescription>
            </DialogHeader>
            <ProductForm data={data} editMode={editMode} productId={ data ? (data as unknown as { productId?: string }).productId : undefined } />
        </DialogContent>
    )
}
