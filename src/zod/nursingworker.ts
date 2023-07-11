import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const NursingWorkerModel = z.object({
  id: z.string(),
  name: z.string(),
  mobile: z.string(),
  password: z.string(),
  tags: z.string(),
  realName: z.string(),
  address: z.string(),
  desc: z.string(),
  content: z.string(),
  idNums: z.string(),
  idCardFront: z.string(),
  idCardBack: z.string(),
  avatar: z.string(),
  licencesImage: z.string(),
  price: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.number().int(),
  serviceCategoryId: z.string(),
})

export class NursingWorkerDto extends createZodDto(NursingWorkerModel) {
}
