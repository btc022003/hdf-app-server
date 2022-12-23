import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const PermissionsOnRolesModel = z.object({
  id: z.string(),
  roleId: z.string().nullish(),
  permissionId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export class PermissionsOnRolesDto extends createZodDto(PermissionsOnRolesModel) {
}
