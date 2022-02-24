import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('login')
  login(@Body() body: LoginDto) {
    return {
      token: '123',
      data: body,
    };
  }
}
