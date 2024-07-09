import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service'; // Adjust path as necessary
import { UserModule } from '../user/user.module'; // Adjust path as necessary

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // Adjust path as necessary
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Retrieve JWT_SECRET from environment
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    UserModule, // Import UserModule if UserService is provided there
  ],
  providers: [JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
