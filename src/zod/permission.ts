import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const PermissionModel = z.object({
  id: z.string(),
  name: z.string(),
  desc: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  permissionId: z.string().nullish(),
})

export class PermissionDto extends createZodDto(PermissionModel) {
}
