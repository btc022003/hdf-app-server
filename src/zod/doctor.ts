import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const DoctorModel = z.object({
  id: z.string(),
  name: z.string(),
  desc: z.string(),
  tags: z.string(),
  content: z.string(),
  avatar: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  departmentId: z.string().nullish(),
  doctorTitleId: z.string().nullish(),
  hospitalId: z.string().nullish(),
})

export class DoctorDto extends createZodDto(DoctorModel) {
}
