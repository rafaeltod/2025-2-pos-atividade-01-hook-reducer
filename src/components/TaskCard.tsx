'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/task';
import { useTask } from '@/lib/taskContext';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { dispatch } = useTask();

  const handleToggleComplete = () => {
    dispatch({ type: 'TOGGLE_TASK', payload: task.id });
  };

  return (
    <Card className={`${task.completed ? 'opacity-70' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className={`text-lg ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
            {task.title}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleComplete}
            >
              {task.completed ? 'Reabrir' : 'Concluir'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className={`text-sm mb-4 ${task.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
          {task.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Criada: {task.createdAt.toLocaleDateString()}</span>
          <span>Atualizada: {task.updatedAt.toLocaleDateString()}</span>
        </div>
        
        <div className="flex space-x-2 mt-4">
          <Button asChild variant="outline" size="sm">
            <Link href={`/tarefas/${task.id}`}>
              Editar
            </Link>
          </Button>
          <Button asChild variant="destructive" size="sm">
            <Link href={`/tarefas/${task.id}/apagar`}>
              Apagar
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
