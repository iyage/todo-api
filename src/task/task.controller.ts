import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { ResponseEntity } from 'src/response/response.Entity';
import { QueryDto } from './dto/query.dto';
@ApiBearerAuth()
@Controller('task')
export class TaskController {
  private logger = new Logger(TaskController.name);
  constructor(private readonly taskService: TaskService) {}
  @HttpCode(HttpStatus.CREATED)
  @Post('/user/:userId')
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('userId') id: string,
  ) {
    try {
      const task: Task = await this.taskService.create(createTaskDto, id);
      return new ResponseEntity('Task created', 200, task);
    } catch (error) {
      console.log(error);
      this.logger.error(error.message);
      return new ResponseEntity(error?.message, error?.status || 500, null);
    }
  }
  @HttpCode(HttpStatus.OK)
  @Get('/user/:userId')
  async findAll(@Param('userId') userId: string, @Query() param: QueryDto) {
    try {
      const tasks: Task[] = await this.taskService.findAll(userId, param);
      return new ResponseEntity('User Tasks', 200, tasks);
    } catch (error) {
      console.log(error);
      this.logger.error(error.message);
      return new ResponseEntity(error?.message, error?.status || 500, null);
    }
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const task: Task = await this.taskService.findOne(id);
      return new ResponseEntity('Task created', 200, task);
    } catch (error) {
      this.logger.error(error.message);
      return new ResponseEntity(error?.message, error?.status || 500, null);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      const task: Task = await this.taskService.update(id, updateTaskDto);
      return new ResponseEntity('Task updated', 200, task);
    } catch (error) {
      this.logger.error(error.message);
      return new ResponseEntity(error?.message, error?.status || 500, null);
    }
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.taskService.remove(id);
      return;
    } catch (error) {
      this.logger.error(error.message);
      return new ResponseEntity(error?.message, error?.status || 500, null);
    }
  }
}
