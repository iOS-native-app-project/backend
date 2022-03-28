import { CoreEntity } from "src/common/core.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { MeetingUser } from "./meeting-user.entity";

@Entity()
export class MeetingUserDetail extends CoreEntity {
  @Column('varchar', { name: 'meeting_user_id', length: 100, default: 'NULL' })
  meeting_user_id: string;

  @Column('date', { name: 'date', default: '1970-01-01 00:00:00' })
  date: number;

  @Column('int', { name: 'value', default: 0 })
  value: string;

  @Column('varchar', { name: 'image', length: 100, default: 'NULL' })
  image: string;

  @Column('varchar', { name: 'descript', length: 200, default: 'NULL' })
  descript: string;

  @ManyToOne(
    () => MeetingUser,
    (tbMeetingUser) => tbMeetingUser.id,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'meeting_user_id' }])
  meetingUser: MeetingUser;
}