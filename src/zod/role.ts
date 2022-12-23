import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const RoleModel = z.object({
  id: z.string(),
  name: z.string(),
  desc: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export class RoleDto extends createZodDto(RoleModel) {
}
