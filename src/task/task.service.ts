import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private taskNModel: Model<Task>,
    private readonly userService: UserService,
  ) {}
  async create(createTaskDto: CreateTaskDto, id: string): Promise<Task> {
    //check if user exit
    const user: User = await this.userService.findOne(id);
    if (!user) throw new BadRequestException('User does not exit');
    const newTask = new this.taskNModel(createTaskDto);
    newTask.user = user;
    const Task = await newTask.save();
    return Task;
  }
  async findOne(id: string): Promise<Task> {
    return await this.taskNModel.findById(id);
  }
  async findAll(id: string, param: QueryDto): Promise<Task[]> {
    const user: User = await this.userService.findOne(id);
    param.user = user;
    return await this.taskNModel.find(param);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = this.taskNModel.findByIdAndUpdate(id, updateTaskDto, {
      new: true,
    });

    if (task === null)
      throw new BadRequestException('Task not updated try again later');
    return task;
  }

  async remove(id: string): Promise<void> {
    return await this.taskNModel.findByIdAndDelete(id);
  }
}
