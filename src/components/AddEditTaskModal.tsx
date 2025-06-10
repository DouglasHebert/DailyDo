import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import { Task } from '../data/TaskStorage';

interface AddEditTaskModalProps {
  visible: boolean;
  task?: Task | null;
  onSave: (text: string) => void;
  onCancel: () => void;
}

const AddEditTaskModal: React.FC<AddEditTaskModalProps> = ({
  visible,
  task,
  onSave,
  onCancel,
}) => {
  const [text, setText] = useState(task?.text || '');

  React.useEffect(() => {
    setText(task?.text || '');
  }, [task]);

  const handleSave = () => {
    if (text.trim().length === 0) {
      Alert.alert('Erro', 'Por favor, digite o texto da tarefa.');
      return;
    }

    onSave(text.trim());
    setText('');
  };

  const handleCancel = () => {
    setText('');
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {task ? 'Editar Tarefa' : 'Nova Tarefa'}
          </Text>

          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="Digite sua tarefa..."
            multiline={true}
            numberOfLines={3}
            autoFocus={true}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>
                {task ? 'Salvar' : 'Adicionar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    width: '90%',
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  saveButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddEditTaskModal;

