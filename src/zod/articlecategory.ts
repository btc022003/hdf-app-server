import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const ArticleCategoryModel = z.object({
  id: z.string(),
  name: z.string(),
  desc: z.string(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export class ArticleCategoryDto extends createZodDto(ArticleCategoryModel) {
}
