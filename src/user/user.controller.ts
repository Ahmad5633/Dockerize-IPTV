import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  @ApiResponse({ status: 404, description: 'Users not found.' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Get(':id/streams')
  @ApiOperation({ summary: 'Get all streams of a user by user id' })
  @ApiResponse({ status: 200, description: 'Return all streams of the user.' })
  @ApiResponse({ status: 404, description: 'User or streams not found.' })
  async findStreamsByUserId(@Param('id') id: number) {
    return await this.userService.findStreamsByUserId(id);
  }

  @Get(':id/streams/:streamId')
  @ApiOperation({ summary: 'Get a stream of a user by user id and stream id' })
  @ApiResponse({ status: 200, description: 'Return the stream of the user.' })
  @ApiResponse({ status: 404, description: 'User or stream not found.' })
  async findStreamByUserIdAndStreamId(
    @Param('id') id: number,
    @Param('streamId') streamId: number,
  ) {
    return await this.userService.findStreamByUserIdAndStreamId(id, streamId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by id' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by id' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async remove(@Param('id') id: number) {
    return await this.userService.remove(id);
  }

  @Delete(':id/streams/:streamId')
  @ApiOperation({
    summary: 'Delete a stream of a user by user id and stream id',
  })
  @ApiResponse({
    status: 200,
    description: 'The stream has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User or stream not found.' })
  async removeStream(
    @Param('id') id: number,
    @Param('streamId') streamId: number,
  ) {
    return await this.userService.removeUserStream(id, streamId);
  }
}
