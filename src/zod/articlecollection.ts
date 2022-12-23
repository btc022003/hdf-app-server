import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const ArticleCollectionModel = z.object({
  id: z.string(),
  userId: z.string().nullish(),
  doctorId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  articleId: z.string().nullish(),
})

export class ArticleCollectionDto extends createZodDto(ArticleCollectionModel) {
}
