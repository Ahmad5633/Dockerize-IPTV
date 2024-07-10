import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Stream } from '../stream/stream.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginUserDto.email);
    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('findbyemail/:email')
  async findUserByEmail(@Param('email') email: string): Promise<User | null> {
    return await this.userService.findByEmail(email);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: Partial<User>,
  ): Promise<User> {
    try {
      return await this.userService.updateUser(id, updateUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<User> {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id/streams')
  async getUserStreams(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<Stream[]> {
    return this.userService.getUserStreams(userId);
  }

  @Get(':id/streams/:streamId')
  async getUserStream(
    @Param('id', ParseIntPipe) userId: number,
    @Param('streamId', ParseIntPipe) streamId: number,
  ): Promise<Stream> {
    return this.userService.getUserStream(userId, streamId);
  }

  @Delete(':id/streams/:streamId')
  async deleteUserStream(
    @Param('id', ParseIntPipe) userId: number,
    @Param('streamId', ParseIntPipe) streamId: number,
  ): Promise<void> {
    await this.userService.deleteUserStream(userId, streamId);
  }
}
