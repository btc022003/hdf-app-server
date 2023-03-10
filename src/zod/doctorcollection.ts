import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const DoctorCollectionModel = z.object({
  id: z.string(),
  userId: z.string().nullish(),
  doctorId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export class DoctorCollectionDto extends createZodDto(DoctorCollectionModel) {
}
