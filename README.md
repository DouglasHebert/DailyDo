# DailyDo - Aplicativo de Lista de Tarefas

## Descrição

DailyDo é um aplicativo React Native simples e eficiente para gerenciamento de tarefas diárias. Desenvolvido como projeto acadêmico, o aplicativo permite aos usuários criar, editar, marcar como concluídas e excluir tarefas, com armazenamento local usando AsyncStorage.

## Funcionalidades

### ✅ Funcionalidades Principais
- **Adicionar Tarefas**: Crie novas tarefas com descrição personalizada
- **Editar Tarefas**: Modifique o texto de tarefas existentes
- **Marcar como Concluída**: Toggle para marcar/desmarcar tarefas como concluídas
- **Excluir Tarefas**: Remova tarefas com confirmação de segurança
- **Persistência Local**: Todas as tarefas são salvas localmente usando AsyncStorage
- **Interface Intuitiva**: Design limpo e responsivo com feedback visual

### 📱 Características da Interface
- Lista organizada com tarefas pendentes e concluídas
- Contador de tarefas no cabeçalho
- Botão flutuante para adicionar novas tarefas
- Modal para adicionar/editar tarefas
- Confirmação antes de excluir tarefas
- Pull-to-refresh para atualizar a lista

## Estrutura do Projeto

```
DailyDo/
├── src/
│   ├── components/
│   │   ├── TaskItem.tsx          # Componente individual de tarefa
│   │   └── AddEditTaskModal.tsx  # Modal para adicionar/editar tarefas
│   └── data/
│       └── TaskStorage.ts        # Gerenciamento de dados com AsyncStorage
├── App.tsx                       # Componente principal do aplicativo
├── package.json                  # Dependências e scripts
└── README.md                     # Este arquivo
```

## Tecnologias Utilizadas

- **React Native 0.79.3**: Framework principal para desenvolvimento mobile
- **TypeScript**: Linguagem de programação com tipagem estática
- **AsyncStorage**: Biblioteca para armazenamento local de dados
- **React Hooks**: useState, useEffect, useCallback para gerenciamento de estado

## Modelo de Dados

### Interface Task
```typescript
interface Task {
  id: string;          // Identificador único da tarefa
  text: string;        // Texto/descrição da tarefa
  completed: boolean;  // Status de conclusão
  createdAt: Date;     // Data de criação
}
```

## Funcionalidades do AsyncStorage

O módulo `TaskStorage.ts` fornece as seguintes funções:

- `loadTasks()`: Carrega todas as tarefas do armazenamento local
- `saveTasks(tasks)`: Salva array de tarefas no armazenamento local
- `addTask(text)`: Adiciona uma nova tarefa
- `updateTask(taskId, updates)`: Atualiza uma tarefa existente
- `deleteTask(taskId)`: Remove uma tarefa
- `toggleTaskCompletion(taskId)`: Alterna o status de conclusão
- `clearAllTasks()`: Remove todas as tarefas (útil para testes)

## Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 14 ou superior)
- React Native CLI
- Android Studio (para Android) ou Xcode (para iOS)
- Emulador Android ou dispositivo físico

### Passos para Execução

1. **Clone ou baixe o projeto**
   ```bash
   # Se usando git
   git clone [url-do-repositorio]
   cd DailyDo
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o aplicativo**
   
   Para Android:
   ```bash
   npx react-native run-android
   ```
   
   Para iOS:
   ```bash
   npx react-native run-ios
   ```

### Solução de Problemas Comuns

1. **Erro de JAVA_HOME**: Certifique-se de ter o Java JDK instalado e configurado
2. **Emulador não encontrado**: Inicie um emulador Android ou conecte um dispositivo físico
3. **Dependências**: Execute `npm install` para garantir que todas as dependências estão instaladas

## Arquitetura e Padrões

### Componentes Principais

1. **App.tsx**: Componente raiz que gerencia o estado global das tarefas
2. **TaskItem.tsx**: Componente reutilizável para exibir cada tarefa individual
3. **AddEditTaskModal.tsx**: Modal para adicionar novas tarefas ou editar existentes
4. **TaskStorage.ts**: Módulo de persistência de dados

### Padrões Utilizados

- **Hooks Pattern**: Uso de useState, useEffect e useCallback
- **Component Composition**: Divisão em componentes reutilizáveis
- **Separation of Concerns**: Lógica de dados separada da interface
- **TypeScript Interfaces**: Tipagem forte para melhor manutenibilidade

## Melhorias Futuras

### Funcionalidades Adicionais
- [ ] Categorias de tarefas
- [ ] Data de vencimento
- [ ] Notificações push
- [ ] Sincronização em nuvem
- [ ] Temas personalizáveis
- [ ] Filtros e busca
- [ ] Estatísticas de produtividade

### Melhorias Técnicas
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Otimização de performance
- [ ] Acessibilidade
- [ ] Internacionalização

## Considerações de Desenvolvimento

Este projeto foi desenvolvido com foco na simplicidade e funcionalidade essencial, priorizando:

1. **Rapidez de desenvolvimento**: Uso de tecnologias familiares e padrões simples
2. **Funcionalidade core**: Implementação das funcionalidades essenciais de uma lista de tarefas
3. **Persistência local**: AsyncStorage para armazenamento simples e eficiente
4. **Interface limpa**: Design minimalista focado na usabilidade

## Autor

Desenvolvido como projeto acadêmico para demonstrar conhecimentos em:
- Desenvolvimento React Native
- Gerenciamento de estado
- Persistência de dados local
- Interface de usuário mobile
- TypeScript

## Licença

Este projeto é desenvolvido para fins educacionais.

