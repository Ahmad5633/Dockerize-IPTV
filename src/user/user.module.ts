import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt'; // Import JwtModule and JwtService

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}), // Register JwtModule if JwtService is used in this module
  ],
  controllers: [UserController],
  providers: [UserService, JwtService], // Include JwtService as a provider if used in this module
  exports: [UserService], // Export UserService if needed elsewhere
})
export class UserModule {}
