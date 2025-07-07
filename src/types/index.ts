export interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  concluida: boolean;
  prioridade: 'baixa' | 'media' | 'alta';
  categoria: string;
  dataVencimento?: Date;
  criadaEm: Date;
  atualizadaEm: Date;
}

export interface TarefaFormData {
  titulo: string;
  descricao: string;
  prioridade: 'baixa' | 'media' | 'alta';
  categoria: string;
  dataVencimento?: Date;
}

export type TarefaAction = 
  | { type: 'CARREGAR_TAREFAS'; payload: Tarefa[] }
  | { type: 'ADICIONAR_TAREFA'; payload: TarefaFormData }
  | { type: 'ATUALIZAR_TAREFA'; payload: { id: string; dados: Partial<TarefaFormData> } }
  | { type: 'ALTERNAR_CONCLUIDA'; payload: string }
  | { type: 'REMOVER_TAREFA'; payload: string }
  | { type: 'LIMPAR_TAREFAS' };

export interface TarefaState {
  tarefas: Tarefa[];
  loading: boolean;
  error: string | null;
}
