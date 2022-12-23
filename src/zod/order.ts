import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const OrderModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  price: z.number().nullish(),
  isEnd: z.boolean(),
  status: z.number().int(),
  isPayed: z.boolean(),
  region: z.string().nullish(),
  regionCode: z.string().nullish(),
  address: z.string().nullish(),
  expressInfo: z.string().nullish(),
  userId: z.string().nullish(),
})

export class OrderDto extends createZodDto(OrderModel) {
}
