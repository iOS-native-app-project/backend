import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { CreateUserRequestDto } from './dto/create-user.requset.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async createUser(createUserRequestDto: CreateUserRequestDto) {
    const { authType, token, nickName } = createUserRequestDto;
    const { socialId, email } = await this.authService.getCertified(
      createUserRequestDto,
    );

    await this.isDuplicated(socialId, authType);

    const user = new User();
    user.authType = authType;
    user.email = email;
    user.nickName = nickName;
    user.socialId = socialId;

    await this.userRepository.save(user);

    const loginRequestDto = new LoginRequestDto();
    loginRequestDto.authType = authType;
    loginRequestDto.token = token;

    return await this.authService.login(loginRequestDto);
  }

  async findById(id: number, select = false) {
    const user = await this.userRepository.findById(id, select);

    if (!user) throw new NotFoundException('There is no matching information.');

    return user;
  }

  async findBySocialId(socialId: number, authType: string, select = false) {
    const user = await this.userRepository.findBySocialId(
      socialId,
      authType,
      select,
    );

    if (!user) throw new NotFoundException('There is no matching information.');

    return user;
  }

  async isDuplicated(socialId: number, authType: string, select = false) {
    const user = await this.userRepository.findBySocialId(
      socialId,
      authType,
      select,
    );

    if (user) throw new ForbiddenException("It's duplicated.");

    return true;
  }
}
