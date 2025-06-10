import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {
  Task,
  loadTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} from './src/data/TaskStorage';
import TaskItem from './src/components/TaskItem';
import AddEditTaskModal from './src/components/AddEditTaskModal';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Carregar tarefas ao iniciar o app
  useEffect(() => {
    loadTasksFromStorage();
  }, []);

  const loadTasksFromStorage = async () => {
    try {
      const loadedTasks = await loadTasks();
      setTasks(loadedTasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadTasksFromStorage();
    setRefreshing(false);
  }, []);

  const handleAddTask = () => {
    setEditingTask(null);
    setModalVisible(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  const handleSaveTask = async (text: string) => {
    try {
      if (editingTask) {
        // Editando tarefa existente
        await updateTask(editingTask.id, { text });
      } else {
        // Adicionando nova tarefa
        await addTask(text);
      }
      await loadTasksFromStorage();
      setModalVisible(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };

  const handleToggleComplete = async (taskId: string) => {
    try {
      await toggleTaskCompletion(taskId);
      await loadTasksFromStorage();
    } catch (error) {
      console.error('Erro ao alterar status da tarefa:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      await loadTasksFromStorage();
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const handleCancelModal = () => {
    setModalVisible(false);
    setEditingTask(null);
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  const renderTaskItem = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onToggleComplete={handleToggleComplete}
      onEdit={handleEditTask}
      onDelete={handleDeleteTask}
    />
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>📝</Text>
      <Text style={styles.emptyTitle}>Nenhuma tarefa ainda</Text>
      <Text style={styles.emptySubtitle}>
        Toque no botão + para adicionar sua primeira tarefa
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DailyDo</Text>
        <Text style={styles.headerSubtitle}>
          {pendingTasks.length} pendente{pendingTasks.length !== 1 ? 's' : ''} • {completedTasks.length} concluída{completedTasks.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
        contentContainerStyle={tasks.length === 0 ? styles.emptyListContainer : undefined}
        ListEmptyComponent={renderEmptyList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddTask}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <AddEditTaskModal
        visible={modalVisible}
        task={editingTask}
        onSave={handleSaveTask}
        onCancel={handleCancelModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  taskList: {
    flex: 1,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;

