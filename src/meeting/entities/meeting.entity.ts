import { CoreEntity } from "src/common/entity/core.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./category.entity";
import { MeetingUser } from "./meeting-user.entity";

@Entity({ name: 'meeting' })
export class Meeting extends CoreEntity {
  @Column('varchar', { name: 'name', length: 100, comment: '모임 이름' })
  name: string;

  @Column('varchar', { name: 'image', length: 150, comment: '모임 이미지' })
  image: string;

  @Column('int', { name: 'category_id', default: 1 })
  category_id: number;

  @Column('varchar', { name: 'descript', length: 200, default: 'NULL', comment: '모임 설명' })
  descript: string;

  @Column('int', { name: 'limit', comment: '인원수 제한', default: 10 })
  limit: number;

  @Column('int', { name: 'owner_id', comment: '방장' })
  owner_id: number;

  @Column('varchar', { name: 'password', length: 100, default: 'NULL' })
  password: string;

  @Column('int', { name: 'cycle', comment: '주기 (0:하루,1:일주일,2:한달)', default: 0 })
  cycle: number;

  @Column('varchar', { name: 'unit', length: 100, default: '횟수', comment: '단위 (횟수,거리,시간)' })
  unit: string;

  @Column('int', { name: 'value', comment: '상세달성수치' })
  value: number;

  @OneToMany(
    () => Category,
    (tbCategory) => tbCategory.id,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'category_id' }])
  category: Category;

  @ManyToOne(
    () => MeetingUser,
    (tbMeetingUser) => tbMeetingUser.meeting,
  )
  meetingUser: MeetingUser[];
}