import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const AddressModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  region: z.string().nullish(),
  regionCode: z.string().nullish(),
  address: z.string().nullish(),
  isDefault: z.boolean(),
  userId: z.string().nullish(),
})

export class AddressDto extends createZodDto(AddressModel) {
}
