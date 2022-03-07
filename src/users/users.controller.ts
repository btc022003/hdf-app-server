import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from 'src/admin/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from './users.service';

@ApiTags('登录注册')
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true })
    response: Response,
  ) {
    const data = await this.usersService.userLogin(
      body.userName,
      body.password,
    );
    // 写用户id到cookie中，调用接口的时候直接传递cookie就好
    data.success ? response.cookie('token', data.data, { httpOnly: true }) : '';
    return data;
  }

  @Post('reg')
  async reg(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true })
    response: Response,
  ) {
    const data = await this.usersService.userReg(body);
    response.cookie('token', data.id);
    return data;
  }

  @Post('admin_login')
  async adminLogin(
    @Body() body: LoginDto,
    @Res({ passthrough: true })
    response: Response,
  ) {
    const data = await this.usersService.adminLogin(
      body.userName,
      body.password,
    );
    // 写用户id到cookie中，调用接口的时候直接传递cookie就好
    data.success ? response.cookie('token', data.data, { httpOnly: true }) : '';
    return data;
  }
}
