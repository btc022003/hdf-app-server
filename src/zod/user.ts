import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const UserModel = z.object({
  id: z.string(),
  userName: z.string(),
  password: z.string(),
  avatar: z.string(),
  nickName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  address: z.string(),
  mobile: z.string(),
})

export class UserDto extends createZodDto(UserModel) {
}
