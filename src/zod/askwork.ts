import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const AskWorkModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  mobile: z.string(),
  avatar: z.string(),
  idCardFront: z.string(),
  idCardBack: z.string(),
  desc: z.string(),
  serviceCategoryId: z.string(),
})

export class AskWorkDto extends createZodDto(AskWorkModel) {
}
