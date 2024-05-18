import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TaskStatus } from 'src/enums/taskStatus.enum';
import { User } from 'src/user/entities/user.entity';

export type CatDocument = HydratedDocument<Task>;
@Schema({ timestamps: true })
export class Task {
  @Prop()
  name: string;
  @Prop({
    type: String,
    enum: TaskStatus,
    default: TaskStatus.NONSTARTED,
  })
  status: number;
  @Prop({ default: null })
  dateStarted: Date;
  @Prop({ default: null })
  dateCompleted: Date;
  @Prop({
    type: mongoose.Schema.ObjectId,
    required: true,
  })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
