import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"
import { Decimal } from "decimal.js"

// Helper schema for Decimal fields
z
  .instanceof(Decimal)
  .or(z.string())
  .or(z.number())
  .refine((value) => {
    try {
      return new Decimal(value)
    } catch (error) {
      return false
    }
  })
  .transform((value) => new Decimal(value))

export const IllnessModel = z.object({
  id: z.string(),
  name: z.string(),
  desc: z.string(),
  tags: z.string(),
  image: z.string(),
  content: z.string(),
  isStanding: z.boolean(),
  views: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  illnessCategoryId: z.string().nullish(),
})

export class IllnessDto extends createZodDto(IllnessModel) {
}
