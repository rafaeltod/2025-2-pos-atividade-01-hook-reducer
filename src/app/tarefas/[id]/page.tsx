'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import TaskForm from '@/components/TaskForm';
import { useTask } from '@/lib/taskContext';
import { updateTask } from '@/lib/taskReducer';
import { Task, TaskFormData } from '@/types/task';

interface EditTaskPageProps {
  params: {
    id: string;
  };
}

export default function EditTaskPage({ params }: EditTaskPageProps) {
  const { state, dispatch } = useTask();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const foundTask = state.tasks.find(t => t.id === params.id);
    if (foundTask) {
      setTask(foundTask);
    } else if (state.tasks.length > 0) {
      // Se já carregou as tarefas e não encontrou, é 404
      notFound();
    }
  }, [params.id, state.tasks]);

  const handleSubmit = async (data: TaskFormData) => {
    if (!task) return;
    
    const updatedTask = updateTask(task, data);
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
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
      <TaskForm
        initialData={{
          title: task.title,
          description: task.description,
          completed: task.completed,
        }}
        onSubmit={handleSubmit}
        submitText="Salvar Alterações"
        title="Editar Tarefa"
        description="Modifique os campos abaixo para atualizar a tarefa."
      />
    </Layout>
  );
}
