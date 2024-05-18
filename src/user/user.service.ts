import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    //check if email address exist
    const userExit: User = await this.findUserByEmail(createUserDto.email);
    if (userExit) throw new BadRequestException('Email address is taken');
    const hashpassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashpassword;
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    console.log(await this.userModel.findById('6647537f9e89c052bc775e6a'));
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,
      })
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
