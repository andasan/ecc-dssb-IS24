import { z } from "zod"

export const productSchema = z.object({
  productId: z.number(),
  productName: z.string(),
  productOwnerName: z.string(),
  developers: z.array(z.object({
    id: z.string(),
    text: z.string()
  })),
  scrumMasterName: z.string(),
  startDate: z.string(),
  methodology: z.enum(["Agile", "Waterfall"]),
  location: z.string(),
})

export type Product = z.infer<typeof productSchema>

export const productFormSchema = z.object({
  productName: z
    .string({
      required_error: "Product name is required",
    })
    .min(2, { message: "Product name must be at least 2 characters long" })
    .max(150, { message: "Product name must be at most 150 characters long" }),

  productOwnerName: z
    .string({
      required_error: "Product owner name is required",
    })
    .min(2, { message: "Product owner name must be at least 2 characters long" })
    .max(50, { message: "Product owner name must be at most 50 characters long" }),

  scrumMasterName: z
    .string({
      required_error: "Scrum master name is required",
    })
    .min(2, { message: "Scrum master name must be at least 2 characters long" })
    .max(50, { message: "Scrum master name must be at most 50 characters long" }),

  developers: z
    .array(z.object({
      id: z.string(),
      text: z.string()
    }))
    .min(1, { message: "At least one developer is required" })
    .max(5),

  methodology: z
    .enum(["Agile", "Waterfall"], {
      required_error: "Methodology is required",
    }),

  location: z
    .string({
      required_error: "Location is required",
    })
    .url({
      message: "Location must be a valid URL",
    })
    .min(2)
    .max(100),
})

export type ProductFormSchemaType = z.infer<typeof productFormSchema>