import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Meeting } from './entities/meeting.entity';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
  ) { }

  // 카테고리로 검색 (필터) 
  // TODO : 카테고리 배열
  async getMeetingByCategory(
    pageNo = 1,
    pageSize = 20,
    category_id: number
  ) {
    const meetingInfo = await this.meetingRepository.find({
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
      where: {
        category_id
      }
    });

    if (meetingInfo.length === 0) {
      return '검색 결과가 없습니다.';
    }

    return meetingInfo;
  }

  // 검색어로 검색 (모임명,한줄소개)
  async getMeetingBySearch(
    pageNo = 1,
    pageSize = 20,
    search: string
  ) {
    const meetingInfo = await this.meetingRepository.createQueryBuilder("meeting")
      .where("meeting.name like :name", { name: '%' + search + '%' })
      .orWhere("meeting.descript like :descript", { descript: '%' + search + '%' })
      .skip(pageNo)
      .take(pageSize)
      .getMany();

    if (meetingInfo.length === 0) {
      return '검색 결과가 없습니다.';
    }

    return meetingInfo;
  }
}
