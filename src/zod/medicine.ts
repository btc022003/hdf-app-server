import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const MedicineModel = z.object({
  id: z.string(),
  name: z.string(),
  desc: z.string(),
  tags: z.string(),
  image: z.string(),
  content: z.string(),
  isStanding: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  medicineCategoryId: z.string().nullish(),
  price: z.number(),
  amount: z.number().int(),
})

export class MedicineDto extends createZodDto(MedicineModel) {
}
