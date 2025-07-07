# Notas de aula (Atividade) - React - Introdução a hook reducer

## Informações gerais
- **Objetivo**: praticar o uso de [hook reducer](https://react.dev/reference/react/useReducer) e de construção de UI com componente [shadcnui](https://ui.shadcn.com/)
- **Público alvo**: alunos da disciplina de POS (Programação Orientada a Serviços) do curso de Infoweb (Técnico Integrado em Informática para Internet) no CNAT-IFRN (Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Norte - Campus Natal-Central)
- **Professor**: [L A Minora](https://github.com/leonardo-minora/)
- **Aluno**: [Rafael Ricco](https://github.com/rafaeltod/)

---
## Sumário

1. Links
2. Descrição da atividade

---
## 1. Links
- [react.dev](https://react.dev/)
  - [hook reducer](https://react.dev/reference/react/useReducer)
- [shadcnui](https://ui.shadcn.com/)
- [exemplo de código de sala do hook reducer](https://github.com/infoweb-pos/2025-pos-exemplo-react-reducer)

---
# 2. Descrição da atividade
1. Fork desse repositório
   - O repositório já esta com um projeto react configurado
   - Precisa instalar as bibliotecas `npm i`
   - Para executar `npm run dev` 
2. Para as páginas na pasta `/src/app`. Componentize para reaproveitar partes iguais das páginas.
   1. Home url `/` : contendo informação do aplicativo.
   2. Lista de tarefas `/tarefas` : contendo a lista de tarefas.
   3. Nova tarefa `/tarefas/nova` : contedo o formulário para edição da nova tarefa.
   4. Modificação de tarefa `/tarefas/[id]` : contendo o formulário para modificação da tarefa existente.
   5. Apagar tarefa `/tarefas/[id]/apagar` : contendo o formulário sem modo de edição preenchido com os dados da tarefa e solicitando confirmação para apagar atividade.
3. Os tipos devem ficar dentro da pasta `/src/types/`
4. O `reducer` deverá ficar na pasta `/src/lib/` e deverá conter as ações para o CRUD de tarefas.

**Observações**:
1. O reducer deverá fazer as operações CRUD apenas localmente.
2. Fica como desafio usar recurso de armazenamento como o `localStorage` ou `IndexedDB`
   - links para `localStorage`
     - [Usando localStorage no NextJs](https://dev.to/andpeicunha/usando-localstorage-no-nextjs-1319)
     - Mozilla dev [Window: localStorage property](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
   - links para `IndexedDB`
     - Mozilla dev network [Usando IndexedDB](https://developer.mozilla.org/pt-BR/docs/Web/API/IndexedDB_API/Using_IndexedDB)
     - [Trabalhar com IndexedDB](https://web.dev/articles/indexeddb?hl=pt-br)
