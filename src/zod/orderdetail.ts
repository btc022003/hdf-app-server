import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const OrderDetailModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  price: z.number().nullish(),
  medicineId: z.string().nullish(),
  amount: z.number().int(),
  orderId: z.string().nullish(),
})

export class OrderDetailDto extends createZodDto(OrderDetailModel) {
}
