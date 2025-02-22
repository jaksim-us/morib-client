import { useEffect, useState } from 'react';

import { TimerTodoType } from '@/shared/types/tasks';

export const useSelectedTodo = (todos: TimerTodoType[]) => {
	const [selectedTodo, setSelectedTodo] = useState<number | null>(() => (todos.length > 0 ? todos[0].id : null));

	useEffect(() => {
		if (todos.length > 0 && !selectedTodo) {
			setSelectedTodo(todos[0].id);
		}
	}, [todos, selectedTodo]);

	return [selectedTodo, setSelectedTodo] as const;
};
