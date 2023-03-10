import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const ShopCartModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  medicineId: z.string().nullish(),
  amount: z.number().int(),
  userId: z.string().nullish(),
  name: z.string().nullish(),
  price: z.number().nullish(),
})

export class ShopCartDto extends createZodDto(ShopCartModel) {
}
