'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { TarefaState, TarefaAction, Tarefa } from '@/types';
import { tarefaReducer, estadoInicial, carregarTarefasDoStorage } from '@/lib/tarefaReducer';

interface TarefaContextType {
  state: TarefaState;
  dispatch: React.Dispatch<TarefaAction>;
  obterTarefaPorId: (id: string) => Tarefa | undefined;
  obterTarefasPorCategoria: (categoria: string) => Tarefa[];
  obterEstatisticas: () => {
    total: number;
    concluidas: number;
    pendentes: number;
    porPrioridade: Record<string, number>;
  };
}

const TarefaContext = createContext<TarefaContextType | undefined>(undefined);

export const useTarefa = () => {
  const context = useContext(TarefaContext);
  if (!context) {
    throw new Error('useTarefa deve ser usado dentro de TarefaProvider');
  }
  return context;
};

interface TarefaProviderProps {
  children: ReactNode;
}

export const TarefaProvider = ({ children }: TarefaProviderProps) => {
  const [state, dispatch] = useReducer(tarefaReducer, estadoInicial);

  // Carregar tarefas do localStorage na inicialização
  useEffect(() => {
    const tarefasSalvas = carregarTarefasDoStorage();
    dispatch({ type: 'CARREGAR_TAREFAS', payload: tarefasSalvas });
  }, []);

  // Funções utilitárias
  const obterTarefaPorId = (id: string): Tarefa | undefined => {
    return state.tarefas.find(tarefa => tarefa.id === id);
  };

  const obterTarefasPorCategoria = (categoria: string): Tarefa[] => {
    return state.tarefas.filter(tarefa => tarefa.categoria === categoria);
  };

  const obterEstatisticas = () => {
    const total = state.tarefas.length;
    const concluidas = state.tarefas.filter(t => t.concluida).length;
    const pendentes = total - concluidas;
    
    const porPrioridade = state.tarefas.reduce((acc, tarefa) => {
      acc[tarefa.prioridade] = (acc[tarefa.prioridade] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      concluidas,
      pendentes,
      porPrioridade,
    };
  };

  const value: TarefaContextType = {
    state,
    dispatch,
    obterTarefaPorId,
    obterTarefasPorCategoria,
    obterEstatisticas,
  };

  return (
    <TarefaContext.Provider value={value}>
      {children}
    </TarefaContext.Provider>
  );
};
