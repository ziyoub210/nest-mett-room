import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entity';
import { Permission } from './user/entities/permission.entity';
import { UserRole } from './user/entities/user-role.entity';
import { RolePermission } from './user/entities/role-permission.entity';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '47.98.169.240',
      port: 3306,
      username: 'root',
      password: 'rootpwd',
      database: 'meet_room',
      synchronize: true,
      logger: 'advanced-console',
      entities: [User, Role, Permission, UserRole, RolePermission],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    UserModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
