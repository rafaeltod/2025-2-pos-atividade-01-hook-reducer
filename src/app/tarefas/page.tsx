'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import TaskCard from '@/components/TaskCard';
import { useTask } from '@/lib/taskContext';

export default function TasksPage() {
  const { state } = useTask();
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const filteredTasks = state.tasks.filter(task => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      default:
        return true;
    }
  });

  const stats = {
    total: state.tasks.length,
    completed: state.tasks.filter(t => t.completed).length,
    pending: state.tasks.filter(t => !t.completed).length,
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Minhas Tarefas</h1>
            <p className="text-muted-foreground">
              {stats.total} tarefas • {stats.completed} concluídas • {stats.pending} pendentes
            </p>
          </div>
          <Button asChild>
            <Link href="/tarefas/nova">
              Nova Tarefa
            </Link>
          </Button>
        </div>

        <div className="flex space-x-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            Todas ({stats.total})
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilter('pending')}
          >
            Pendentes ({stats.pending})
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilter('completed')}
          >
            Concluídas ({stats.completed})
          </Button>
        </div>

        {filteredTasks.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Nenhuma tarefa encontrada</CardTitle>
              <CardDescription>
                {filter === 'all' 
                  ? 'Você ainda não criou nenhuma tarefa.'
                  : `Nenhuma tarefa ${filter === 'completed' ? 'concluída' : 'pendente'} encontrada.`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/tarefas/nova">
                  Criar primeira tarefa
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
