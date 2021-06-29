import { CategoryState } from '@type/Category';

export type TodoType = {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  categories: {
    id: number;
    category: string;
  }[];
};

export interface TodoInputState {
  title: string;
  description: string;
  deadline: Date;
  categories: CategoryState[];
}
