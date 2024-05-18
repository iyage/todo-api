import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ResponseEntity } from 'src/response/response.Entity';
import { Public } from 'src/auth/custom.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}
  @Public()
  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    try {
      const user: User = await this.userService.create(createUserDto);
      return new ResponseEntity('User register succesfully', 201, user);
    } catch (error) {
      this.logger.error(error.message, error?.stackTrace);
      return new ResponseEntity(error?.message, error?.status || 500, null);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user: User = await this.userService.update(id, updateUserDto);
      return new ResponseEntity('User updated Successfully', 200, user);
    } catch (error) {
      this.logger.error(error.message, error?.stackTrace);
      return new ResponseEntity(error?.message, error?.status || 500, null);
    }
  }
}
