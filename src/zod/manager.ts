import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const ManagerModel = z.object({
  id: z.string(),
  userName: z.string(),
  password: z.string(),
  avatar: z.string(),
  nickName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  roleId: z.string().nullish(),
})

export class ManagerDto extends createZodDto(ManagerModel) {
}
