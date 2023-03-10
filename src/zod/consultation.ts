import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const ConsultationModel = z.object({
  id: z.string(),
  content: z.string(),
  reply: z.string(),
  isPayed: z.boolean(),
  isReply: z.boolean(),
  userId: z.string(),
  doctorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export class ConsultationDto extends createZodDto(ConsultationModel) {
}
