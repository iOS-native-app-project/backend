import { CoreEntity } from 'src/common/entity/core.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { MeetingUserDetail } from './meeting-user-detail.entity';
import { Meeting } from './meeting.entity';

@Entity({ name: 'meeting_user' })
export class MeetingUser extends CoreEntity {
  @Column('int', { name: 'meeting_id' })
  meeting_id: number;

  @Column('int', { name: 'user_id' })
  user_id: number;

  @Column('int', { name: 'recommand', comment: '추천수' })
  recommand: number;

  @Column('int', { name: 'report', comment: '신고수' })
  report: number;

  @ManyToOne(() => Meeting, (tbMeeting) => tbMeeting.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'meeting_id' }])
  meeting: Meeting;

  @OneToMany(
    () => MeetingUserDetail,
    (tbMeetingUserDetail) => tbMeetingUserDetail.meetingUser,
  )
  meetingUserDetails: MeetingUserDetail[];
}
