import { z } from "zod"

export const productSchema = z.object({
  productId: z.number(),
  productName: z.string(),
  productOwnerName: z.string(),
  developers: z.array(z.string()),
  scrumMasterName: z.string(),
  startDate: z.string(),
  methodology: z.enum(["Agile", "Waterfall"]),
  location: z.string(),
})

export type Product = z.infer<typeof productSchema>

export const productFormSchema = z.object({
  productName: z.string().min(2).max(50),
  productOwnerName: z.string().min(2).max(50),
  scrumMasterName: z.string().min(2).max(50),
  developers: z.array(z.object({
    id: z.string(),
    text: z.string()
  })),
  methodology: z.enum(["Agile", "Waterfall"]),
  location: z.string(),
})

export type ProductFormSchemaType = z.infer<typeof productFormSchema>