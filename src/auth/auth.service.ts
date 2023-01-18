import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDTO) {
    try {
      // generate the password hash
      const hash = await argon.hash(dto.password);
      // save the new user to db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hashedPassword: hash,
        },
      });
      // return the newly created user
      delete user.hashedPassword;
      return { user };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw err;
    }
  }
  login() {
    // Find user by email
    // if not found throw an exception

    // Compare password
    // If does'nt ,match throw an exception

    // If all matches return user
    return { msg: 'I have signed in' };
  }
}
