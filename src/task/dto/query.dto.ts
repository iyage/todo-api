import { User } from 'src/user/entities/user.entity';

export class QueryDto {
  status?: string;
  user?: User;
}
