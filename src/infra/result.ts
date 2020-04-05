import { Report } from './report';

export interface Result<T> {
  data: T;
  errors: Report[];
  success: boolean;
  message: string;
}
