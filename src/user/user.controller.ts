import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;
  constructor() {}

  @Post('register')
  @HttpCode(200)
  register(@Body() RegisterUserDto: RegisterUserDto) {
    console.log(RegisterUserDto, 'registerregisterregisterregisterregisterregister');
    return this.userService.register(RegisterUserDto);
  }
}
