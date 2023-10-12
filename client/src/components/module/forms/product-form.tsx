import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Tag, TagInput } from "@/components/ui/tag-input"

import { productFormSchema, ProductFormSchemaType } from "@/data/schema"
import { dialogClose, DialogFooter } from "@/components/ui/dialog"
import { useCreateProduct } from "@/hooks/useCreateProduct"
import { useUpdateProduct } from "@/hooks/useUpdateProduct";

interface ProductFormProps {
    data?: any & { productId?: string }
    editMode?: boolean
    productId?: string
}

export function ProductForm({ data, editMode, productId }: ProductFormProps) {
    const createProductMutation = useCreateProduct();
    const updateProductMutation = useUpdateProduct();

    const editData = data as unknown as ProductFormSchemaType;
    const defaultDevelopers = editData?.developers;

    const defaultData = editMode ? ({
        productName: editData?.productName ?? "",
        productOwnerName: editData?.productOwnerName ?? "",
        scrumMasterName: editData?.scrumMasterName ?? "",
        developers: defaultDevelopers as unknown as [Tag, ...Tag[]] ?? [],
        methodology: editData?.methodology ?? undefined,
        location: editData?.location ?? "",
    }) : ({
        productName: "",
        productOwnerName: "",
        scrumMasterName: "",
        developers: [],
        methodology: undefined,
        location: "",
    });

    const form = useForm<ProductFormSchemaType>({
        resolver: zodResolver(productFormSchema),
        defaultValues: { ...defaultData },
    })

    const [tags, setTags] = React.useState<Tag[]>(editMode ? defaultDevelopers as unknown as Tag[] : []);

    const { setValue } = form;

    async function onSubmit(data: ProductFormSchemaType) {
        if (editMode) {
            const updateProduct = {
                id: productId,
                product: { ...data }
            }
            await updateProductMutation.mutateAsync(updateProduct, {
                onSuccess: () => {
                    form.reset();
                    toast({ title: "Product Updated", type: "foreground" });
                    dialogClose();
                },
            });
        } else {
            await createProductMutation.mutateAsync(data, {
                onSuccess: () => {
                    form.reset();
                    toast({ title: "Product Created", type: "foreground" });
                    dialogClose();
                },
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter a product name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="productOwnerName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Owner Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter a product owner name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="scrumMasterName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Scrum Master Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter a Scrum Master Name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="developers"
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-start">
                            <FormLabel className="text-left">Developers</FormLabel>
                            <FormControl>
                                <TagInput
                                    {...field}
                                    placeholder="Enter developers' name(s)"
                                    tags={tags}
                                    className='sm:min-w-[450px]'
                                    setTags={(newTags) => {
                                        setTags(newTags);
                                        setValue("developers", newTags as [Tag, ...Tag[]]);
                                    }}
                                    maxTags={5}
                                    showCount
                                    placeholderWhenFull="You can only add up to 5 developers"
                                />
                            </FormControl>
                            <FormDescription>
                                Enter up to five developer names, separated by commas.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="methodology"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Methodology</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a methodology" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Agile">Agile</SelectItem>
                                    <SelectItem value="Waterfall">Waterfall</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter a Location"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Github repository link which can be any project under `github.com/bcgov` organization
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter>
                    <Button type="submit">Submit</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
