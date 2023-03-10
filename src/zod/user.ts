import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

export const UserModel = z.object({
  id: z.string().optional(),
  userName: z.string().min(3),
  password: z.string().min(6),
  avatar: z.string().url().optional(),
  nickName: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  address: z.string().optional(),
  mobile: z.string().optional(),
});
// .refine((data) => data.mobile.length < 10, {
//   message: '手机号码格式错误',
// });

export class UserDto extends createZodDto(UserModel) {}
