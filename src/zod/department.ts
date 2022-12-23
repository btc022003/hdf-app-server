import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const DepartmentModel = z.object({
  id: z.string(),
  name: z.string(),
  desc: z.string(),
  content: z.string(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export class DepartmentDto extends createZodDto(DepartmentModel) {
}
