import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { Stream } from '../stream/stream.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Stream)
    private readonly streamRepository: Repository<Stream>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { first_name, last_name, email, password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException('Error creating user');
      }
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching users');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async updateUser(id: number, updateUserDto: Partial<User>): Promise<User> {
    try {
      await this.userRepository.update(id, updateUserDto);
      const updatedUser = await this.userRepository.findOne({ where: { id } });
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException('Error updating user');
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      await this.userRepository.delete(id);
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting user');
    }
  }

  async getUserStreams(userId: number): Promise<Stream[]> {
    const user = await this.userRepository.findOne({
      relations: ['streams'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user.streams;
  }

  async getUserStream(userId: number, streamId: number): Promise<Stream> {
    const stream = await this.streamRepository.findOne({
      where: { id: streamId, user: { id: userId } },
      relations: ['user'],
    });
    if (!stream) {
      throw new NotFoundException(
        `Stream with ID ${streamId} not found for User with ID ${userId}`,
      );
    }
    return stream;
  }

  async deleteUserStream(userId: number, streamId: number): Promise<void> {
    const stream = await this.streamRepository.findOne({
      where: { id: streamId, user: { id: userId } },
    });
    if (!stream) {
      throw new NotFoundException(
        `Stream with ID ${streamId} not found for User with ID ${userId}`,
      );
    }
    await this.streamRepository.remove(stream);
  }
}
