import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'role_permission',
})

//角色
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '角色id',
  })
  roleId: string;

  @Column({
    comment: '权限id',
  })
  permission: string;
}
