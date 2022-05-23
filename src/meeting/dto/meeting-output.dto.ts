import { Meeting } from '../entities/meeting.entity';

export class MeetingHomeOutput {
  meeting: Meeting;
}

export class MeetingDate {
  startDate: string;
  endDate: string;
}

export class MemberRate {
  meetingDate: MeetingDate;
  memberRate: Rate[];
}

export class Rate {
  userId: number;
  nickname: string;
  recommand: number;
  report: number;
  rate: number;
}
