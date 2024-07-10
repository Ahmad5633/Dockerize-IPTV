import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ForgetPasswordService } from './forget-password.service';
import { UpdatePasswordService } from './update-password.service';

@Controller('password')
export class ForgetPasswordController {
  constructor(
    private readonly forgetPasswordService: ForgetPasswordService,
    private readonly updatePasswordService: UpdatePasswordService,
  ) {}

  @Post('forget')
  async sendOtp(@Body() body: { email: string }): Promise<string> {
    const otp = this.forgetPasswordService.generateOtp();
    this.forgetPasswordService.storeOtp(body.email, otp);

    try {
      const retrievedOtp = await this.forgetPasswordService.retrieveOtp(
        body.email,
      );
      if (retrievedOtp) {
        // Use the OTP
        console.log('Retrieved OTP:', retrievedOtp);
      } else {
        console.log('No OTP found for the provided email.');
      }

      await this.forgetPasswordService.sendOtp(body.email, otp);
      return 'OTP sent successfully';
    } catch (error) {
      throw new HttpException(
        'Failed to send OTP',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('update')
  async updatePassword(
    @Body()
    {
      email,
      otp,
      newPassword,
    }: {
      email: string;
      otp: string;
      newPassword: string;
    },
  ): Promise<void> {
    await this.updatePasswordService.updatePassword(email, otp, newPassword);
  }
}
