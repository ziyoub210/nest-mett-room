import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '用户名',
  })
  username: string;

  @Column({
    length: 50,
    comment: '密码',
  })
  password: string;

  @Column({
    name: 'nick_name',
    length: 50,
    comment: '昵称',
  })
  nickName: string;

  @Column({
    name: 'head_pic',
    length: 100,
    nullable: true,
    comment: '头像',
  })
  headPic: string;

  @Column({
    name: 'phone_number',
    comment: '手机号',
    length: 20,
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    name: 'email',
    comment: '邮箱',
    length: 25,
  })
  email: string;

  @Column({
    name: 'is_frozen',
    comment: '是否冻结',
    default: false,
  })
  isFrozen: boolean;

  @Column({
    name: 'is_admin',
    comment: '是否是管理员',
    default: false,
  })
  isAdmin: boolean;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
