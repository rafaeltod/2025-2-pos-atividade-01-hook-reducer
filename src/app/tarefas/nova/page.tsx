'use client';

import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import TaskForm from '@/components/TaskForm';
import { useTask } from '@/lib/taskContext';
import { createTask } from '@/lib/taskReducer';
import { TaskFormData } from '@/types/task';

export default function NewTaskPage() {
  const { dispatch } = useTask();
  const router = useRouter();

  const handleSubmit = async (data: TaskFormData) => {
    const newTask = createTask(data);
    dispatch({ type: 'ADD_TASK', payload: newTask });
    router.push('/tarefas');
  };

  return (
    <Layout>
      <TaskForm
        onSubmit={handleSubmit}
        submitText="Criar Tarefa"
        title="Nova Tarefa"
        description="Preencha os campos abaixo para criar uma nova tarefa."
      />
    </Layout>
  );
}
