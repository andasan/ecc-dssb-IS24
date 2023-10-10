import React from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useDeleteProduct } from "@/hooks/useDeleteProduct"

interface AreYouSureDialogProps {
    open: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    productId: number
}

export const AreYouSureDialog = ({
    open,
    setIsOpen,
    productId,
}: AreYouSureDialogProps) => {
    const deleteProductMutation = useDeleteProduct();

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        deleteProductMutation.mutateAsync(productId);
        setIsOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure ? </DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you sure you want to permanently
                        delete this product?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter >
                    <Button type="submit" onClick={handleSubmit}> Confirm </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}