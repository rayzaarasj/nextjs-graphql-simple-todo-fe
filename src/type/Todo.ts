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
