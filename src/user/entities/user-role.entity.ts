import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({
  name: 'user_role',
})
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '用户ID',
  })
  userId: number;

  @Column({
    comment: '角色ID',
  })
  roleId: number;
}
