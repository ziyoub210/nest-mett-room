import { Injectable, Inject, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @Inject(RedisService)
  private readonly redisService: RedisService;
  /** 用户注册 */
  async register(user: RegisterUserDto) {
    await this.redisService.set(`captcha_${user.email}`, 'aaa');
    const captcha = await this.redisService.get(`captcha_${user.email}`);

    if (!captcha) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }

    if (user.captcha !== captcha) {
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }

    const foundUser = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });
    if (foundUser) {
      throw new HttpException('用户已经存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = user.password;
    newUser.email = user.email;
    newUser.nickName = user.nickName;

    try {
      await this.userRepository.save(newUser);
      return {
        statusCode: HttpStatus.OK,
        message: '注册成功',
      };
    } catch (error) {
      this.logger.error(error, UserService);
      return new HttpException('注册失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
