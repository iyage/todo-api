import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
export interface authresp {
  token: string;
  userInfo: UserInfo;
}
export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(authDto: AuthDto): Promise<authresp> {
    const user: any = await this.usersService.findUserByEmail(authDto.email);
    if (!user) throw new UnauthorizedException('Unknow email address');
    const isMatch = bcrypt.compare(authDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    const { firstName, lastName, email, id } = user;
    const userInfo = { firstName, lastName, email, id: id };
    const token = this.jwtService.sign({ firstName, lastName, email, id });
    return { token: token, userInfo };
  }
}
