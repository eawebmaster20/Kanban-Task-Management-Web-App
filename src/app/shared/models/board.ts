export interface ISubtask {
  title: string;
  isCompleted: boolean;
}

export interface ITask {
  title: string;
  description: string;
  status: string;
  subtasks: ISubtask[];
}

export interface IColumn {
  id: string;
  name: string;
  tasks: ITask[];
}

export interface IBoard {
  id: string;
  name: string;
  columns: IColumn[];
}
