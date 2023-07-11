import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const ServiceOrderModel = z.object({
  id: z.string(),
  startTime: z.date().nullish(),
  endTime: z.date().nullish(),
  price: z.number().nullish(),
  isPayed: z.boolean(),
  payTime: z.date().nullish(),
  payType: z.number().int(),
  status: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  nursingWorkerId: z.string(),
  serviceCategoryId: z.string(),
})

export class ServiceOrderDto extends createZodDto(ServiceOrderModel) {
}
