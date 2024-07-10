import { Injectable, BadRequestException } from '@nestjs/common';
import { ForgetPasswordService } from './forget-password.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UpdatePasswordService {
  constructor(
    private readonly forgetPasswordService: ForgetPasswordService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async updatePassword(
    email: string,
    otp: string,
    newPassword: string,
  ): Promise<void> {
    const isValidOTP = await this.validateOTP(email, otp);

    if (!isValidOTP) {
      throw new BadRequestException('Invalid OTP');
    }

    await this.updatePasswordByEmail(email, newPassword);
  }

  async updatePasswordByEmail(
    email: string,
    newPassword: string,
  ): Promise<void> {
    const hashedPassword = await this.hashPassword(newPassword);
    await this.userRepository.update({ email }, { password: hashedPassword });
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async retrieveOtp(email: string): Promise<string | undefined> {
    return this.forgetPasswordService.retrieveOtp(email);
  }

  private async validateOTP(email: string, otp: string): Promise<boolean> {
    try {
      const storedOTP: string | undefined =
        await this.forgetPasswordService.retrieveOtp(email);
      if (storedOTP === undefined) {
        throw new Error('OTP not found');
      }
      return otp === storedOTP;
    } catch (error) {
      console.error('Error retrieving OTP:', error);
      return false;
    }
  }
}
