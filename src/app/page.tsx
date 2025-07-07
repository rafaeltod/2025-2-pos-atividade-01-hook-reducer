import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Gerenciador de Tarefas
          </h1>
          <p className="text-lg text-muted-foreground">
            Atividade 1 do 2º bimestre com hook reducer e shadcn/ui
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Sobre o Aplicativo</CardTitle>
              <CardDescription>
                Sistema de gerenciamento de tarefas desenvolvido com Next.js
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Este aplicativo foi desenvolvido como parte da Atividade 1 do 2º bimestre, 
                utilizando React hooks (useReducer) para gerenciamento de estado e 
                componentes do shadcn/ui para interface moderna e responsiva.
              </p>
              <ul className="text-sm space-y-2">
                <li>• Criar novas tarefas</li>
                <li>• Editar tarefas existentes</li>
                <li>• Marcar tarefas como concluídas</li>
                <li>• Remover tarefas</li>
                <li>• Persistência local dos dados</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tecnologias Utilizadas</CardTitle>
              <CardDescription>
                Stack moderna para desenvolvimento web
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li>• <strong>Next.js 15</strong> - Framework React</li>
                <li>• <strong>TypeScript</strong> - Tipagem estática</li>
                <li>• <strong>Tailwind CSS</strong> - Estilização</li>
                <li>• <strong>shadcn/ui</strong> - Componentes UI</li>
                <li>• <strong>useReducer</strong> - Gerenciamento de estado</li>
                <li>• <strong>Context API</strong> - Compartilhamento de estado</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/tarefas">
                Ver Tarefas
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/tarefas/nova">
                Criar Nova Tarefa
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
