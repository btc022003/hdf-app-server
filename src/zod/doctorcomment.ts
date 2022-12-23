import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const DoctorCommentModel = z.object({
  id: z.string(),
  level: z.number(),
  content: z.string(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().nullish(),
  doctorId: z.string().nullish(),
})

export class DoctorCommentDto extends createZodDto(DoctorCommentModel) {
}
