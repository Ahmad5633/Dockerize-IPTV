import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForgetPasswordController } from './forget-password.controller';
import { ForgetPasswordService } from './forget-password.service';
import { UpdatePasswordService } from './update-password.service';
import { User } from 'src/user/user.entity';
import { EmailService } from './send-email.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ForgetPasswordController],
  providers: [ForgetPasswordService, UpdatePasswordService, EmailService],
  exports: [ForgetPasswordService, UpdatePasswordService],
})
export class ForgetPasswordModule {}
