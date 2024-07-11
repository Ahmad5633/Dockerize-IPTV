import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Stream } from '../stream/stream.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Stream)
    private readonly streamRepository: Repository<Stream>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // Unique violation
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('Could not register user');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findStreamsByUserId(userid: number): Promise<Stream[]> {
    const user = await this.userRepository.findOne({
      where: { id: userid },
      relations: ['streams'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.streams;
  }

  async findStreamByUserIdAndStreamId(
    id: number,
    streamId: number,
  ): Promise<Stream> {
    const stream = await this.streamRepository.findOne({
      where: { id: streamId, user: { id } },
    });
    if (!stream) {
      throw new NotFoundException('Stream not found');
    }
    return stream;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(id);
  }

  async removeUserStream(id: number, streamId: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const stream = await this.findStreamByUserIdAndStreamId(id, streamId);
    if (!stream) {
      throw new NotFoundException('Stream not found');
    }
    await this.streamRepository.delete({ id: streamId, user: { id } });
  }
}
