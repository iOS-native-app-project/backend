import { CoreEntity } from "src/common/entity/core.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { Meeting } from "./meeting.entity";

@Entity({ name: 'meeting_user' })
export class MeetingUser extends CoreEntity {
  @Column('int', { name: 'meeting_id' })
  meeting_id: string;

  @Column('int', { name: 'user_id' })
  user_id: number;

  @Column('int', { name: 'recommand', comment: '추천수' })
  recommand: string;

  @Column('int', { name: 'report', comment: '신고수' })
  report: number;


  @OneToMany(
    () => Meeting,
    (tbMeeting) => tbMeeting.meetingUser,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'meeting_id' }])
  meeting: Meeting;

  @OneToMany(
    () => User,
    (tbUser) => tbUser.id,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'user_id' }])
  user: User;
}