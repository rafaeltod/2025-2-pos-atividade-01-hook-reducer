import { Tarefa, TarefaAction, TarefaState, TarefaFormData } from '@/types';

const STORAGE_KEY = 'tarefas-app-data';

// Utility functions para localStorage
export const salvarTarefasNoStorage = (tarefas: Tarefa[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
    } catch (error) {
      console.error('Erro ao salvar tarefas no localStorage:', error);
    }
  }
};

export const carregarTarefasDoStorage = (): Tarefa[] => {
  if (typeof window !== 'undefined') {
    try {
      const dados = localStorage.getItem(STORAGE_KEY);
      if (dados) {
        const tarefas = JSON.parse(dados);
        // Converter strings de data de volta para objetos Date
        return tarefas.map((tarefa: any) => ({
          ...tarefa,
          criadaEm: new Date(tarefa.criadaEm),
          atualizadaEm: new Date(tarefa.atualizadaEm),
          dataVencimento: tarefa.dataVencimento ? new Date(tarefa.dataVencimento) : undefined,
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas do localStorage:', error);
    }
  }
  return [];
};

// Função para gerar ID único
const gerarId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Estado inicial
export const estadoInicial: TarefaState = {
  tarefas: [],
  loading: false,
  error: null,
};

// Reducer
export const tarefaReducer = (state: TarefaState, action: TarefaAction): TarefaState => {
  switch (action.type) {
    case 'CARREGAR_TAREFAS': {
      return {
        ...state,
        tarefas: action.payload,
        loading: false,
        error: null,
      };
    }

    case 'ADICIONAR_TAREFA': {
      const novaTarefa: Tarefa = {
        id: gerarId(),
        titulo: action.payload.titulo,
        descricao: action.payload.descricao,
        concluida: false,
        prioridade: action.payload.prioridade,
        categoria: action.payload.categoria,
        dataVencimento: action.payload.dataVencimento,
        criadaEm: new Date(),
        atualizadaEm: new Date(),
      };

      const novasTarefas = [...state.tarefas, novaTarefa];
      salvarTarefasNoStorage(novasTarefas);

      return {
        ...state,
        tarefas: novasTarefas,
        error: null,
      };
    }

    case 'ATUALIZAR_TAREFA': {
      const tarefasAtualizadas = state.tarefas.map(tarefa => 
        tarefa.id === action.payload.id 
          ? { 
              ...tarefa, 
              ...action.payload.dados,
              atualizadaEm: new Date(),
            }
          : tarefa
      );

      salvarTarefasNoStorage(tarefasAtualizadas);

      return {
        ...state,
        tarefas: tarefasAtualizadas,
        error: null,
      };
    }

    case 'ALTERNAR_CONCLUIDA': {
      const tarefasAtualizadas = state.tarefas.map(tarefa =>
        tarefa.id === action.payload
          ? { 
              ...tarefa, 
              concluida: !tarefa.concluida,
              atualizadaEm: new Date(),
            }
          : tarefa
      );

      salvarTarefasNoStorage(tarefasAtualizadas);

      return {
        ...state,
        tarefas: tarefasAtualizadas,
        error: null,
      };
    }

    case 'REMOVER_TAREFA': {
      const tarefasAtualizadas = state.tarefas.filter(tarefa => tarefa.id !== action.payload);
      salvarTarefasNoStorage(tarefasAtualizadas);

      return {
        ...state,
        tarefas: tarefasAtualizadas,
        error: null,
      };
    }

    case 'LIMPAR_TAREFAS': {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
      
      return {
        ...state,
        tarefas: [],
        error: null,
      };
    }

    default:
      return state;
  }
};
