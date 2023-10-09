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

import { productSchema, ProductFormSchemaType } from "@/data/schema"
import { DialogFooter } from "@/components/ui/dialog"

export function ProductForm() {
    const form = useForm<ProductFormSchemaType>({
        resolver: zodResolver(productSchema),
    })

    const [tags, setTags] = React.useState<Tag[]>([]);

    function onSubmit(data: ProductFormSchemaType) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
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
                                        form.setValue("developers", newTags as [Tag, ...Tag[]]);
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                Enter up to five developer names
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
