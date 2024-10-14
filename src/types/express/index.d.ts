import { IStudent } from '../student';
import { IUser } from '../user';

declare global {
  namespace Express {
    interface Request {
      user?:  IUser;
      content?: any;
      students?: IStudent[]
    }
  }
}
//Can be done in other ways.