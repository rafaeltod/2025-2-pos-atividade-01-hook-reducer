'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useTask } from '@/lib/taskContext';
import { Task } from '@/types/task';

interface DeleteTaskPageProps {
  params: {
    id: string;
  };
}

export default function DeleteTaskPage({ params }: DeleteTaskPageProps) {
  const { state, dispatch } = useTask();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const foundTask = state.tasks.find(t => t.id === params.id);
    if (foundTask) {
      setTask(foundTask);
    } else if (state.tasks.length > 0) {
      // Se já carregou as tarefas e não encontrou, é 404
      notFound();
    }
  }, [params.id, state.tasks]);

  const handleDelete = async () => {
    if (!task) return;
    
    setIsDeleting(true);
    dispatch({ type: 'DELETE_TASK', payload: task.id });
    router.push('/tarefas');
  };

  if (!task) {
    return (
      <Layout>
        <div className="text-center">
          <p>Carregando tarefa...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Apagar Tarefa</CardTitle>
            <CardDescription>
              Você tem certeza que deseja apagar esta tarefa? Esta ação não pode ser desfeita.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">{task.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Criada: {task.createdAt.toLocaleDateString()}</span>
                <span>Status: {task.completed ? 'Concluída' : 'Pendente'}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={isDeleting}>
                    {isDeleting ? 'Apagando...' : 'Confirmar Exclusão'}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. A tarefa "{task.title}" será permanentemente removida.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Apagar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              <Button variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
