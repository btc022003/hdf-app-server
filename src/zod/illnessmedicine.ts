import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const IllnessMedicineModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  illnessId: z.string(),
  medicineId: z.string(),
})

export class IllnessMedicineDto extends createZodDto(IllnessMedicineModel) {
}
