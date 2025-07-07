'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskFormData } from '@/types/task';

interface TaskFormProps {
  initialData?: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
  submitText: string;
  title: string;
  description: string;
  isReadOnly?: boolean;
}

export default function TaskForm({ 
  initialData, 
  onSubmit, 
  submitText, 
  title, 
  description,
  isReadOnly = false 
}: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>(
    initialData || { title: '', description: '' }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof TaskFormData, value: string | boolean) => {
    if (isReadOnly) return;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              disabled={isReadOnly}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              disabled={isReadOnly}
              rows={4}
            />
          </div>
          
          {initialData?.completed !== undefined && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="completed"
                checked={formData.completed || false}
                onChange={(e) => handleChange('completed', e.target.checked)}
                disabled={isReadOnly}
              />
              <Label htmlFor="completed">Concluída</Label>
            </div>
          )}
          
          <div className="flex space-x-2">
            {!isReadOnly && (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : submitText}
              </Button>
            )}
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.back()}
            >
              Voltar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
