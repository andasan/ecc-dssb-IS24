import { z } from "zod"

export const productSchema = z.object({
  productId: z.number(),
  productName: z.string(),
  productOwnerName: z.string(),
  developers: z.array(z.string()),
  scrumMasterName: z.string(),
  startDate: z.string(),
  methodology: z.string(),
  location: z.string(),
})

export type Product = z.infer<typeof productSchema>