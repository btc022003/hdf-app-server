import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const HospitalModel = z.object({
  id: z.string(),
  name: z.string(),
  desc: z.string(),
  image: z.string(),
  content: z.string(),
  address: z.string(),
  phone: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export class HospitalDto extends createZodDto(HospitalModel) {
}
