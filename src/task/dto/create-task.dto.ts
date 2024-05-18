import { IsNotEmpty } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty()
  name: string;
  status?: number;
  dateStarted?: Date;
  dateCompleted?: Date;
}
