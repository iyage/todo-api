import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService, authresp } from './auth.service';
import { ResponseEntity } from 'src/response/response.Entity';
import { AuthDto } from './dto/auth.dto';
import { Public } from './custom.decorator';
@Public()
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}
  @Post()
  async signIn(@Body() authDto: AuthDto) {
    try {
      const resp: authresp = await this.authService.signIn(authDto);
      return new ResponseEntity('Successfully login', 200, resp);
    } catch (error) {
      console.log(error);
      this.logger.verbose(error);
      return new ResponseEntity(error?.message, error?.status || 500, null);
    }
  }
}
