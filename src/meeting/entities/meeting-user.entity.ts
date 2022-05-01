import { CoreEntity } from 'src/common/entity/core.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { MeetingUserDetail } from './meeting-user-detail.entity';
import { Meeting } from './meeting.entity';

@Entity({ name: 'meeting_user' })
export class MeetingUser extends CoreEntity {
  @Column('int', { name: 'meeting_id' })
  meetingId: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('int', { name: 'recommand', comment: '추천수', default: 0 })
  recommand: number;

  @Column('int', { name: 'report', comment: '신고수', default: 0 })
  report: number;

  @ManyToOne(() => Meeting, (tbMeeting) => tbMeeting.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'meeting_id' }])
  meetings: Meeting;

  @ManyToOne(() => User, (tbUser) => tbUser.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id' }])
  users: User;

  @OneToMany(
    () => MeetingUserDetail,
    (tbMeetingUserDetail) => tbMeetingUserDetail.meetingUser,
  )
  meetingUserDetails: MeetingUserDetail[];
}
