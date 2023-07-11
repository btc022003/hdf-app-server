import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const ServiceCategoryModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  desc: z.string(),
  image: z.string(),
})

export class ServiceCategoryDto extends createZodDto(ServiceCategoryModel) {
}
