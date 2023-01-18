import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDTO) {
    console.log(dto);
    return this.authService.signup(dto);
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
