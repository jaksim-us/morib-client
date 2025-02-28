import { atomWithStorage } from 'jotai/utils';

import { TaskType } from '@/shared/types/tasks';

export const todayTodoAtom = atomWithStorage<Omit<TaskType, 'isComplete'>[]>('todayTodos', []);
