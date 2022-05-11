import { Meeting } from '../entities/meeting.entity';

export class MeetingHomeOutput {
  meeting: Meeting;
  memberRate: MemberRate[];
  meetingDate: MeetingDate;
}

export class MemberRate {
  userId: number;
  rate: number;
}

export class MeetingDate {
  startDate: string;
  endDate: string;
}
