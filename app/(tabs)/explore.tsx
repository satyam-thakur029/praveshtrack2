import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Modal, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type Employee = {
  name: string;
  avatar: string;
  details?: string; // Add details about the employee
  workingHours?: string; // Add working hours
  isPresent?: boolean; // Add presence status
};

export default function TabTwoScreen() {
  const [employees, setEmployees] = useState<Employee[]>([
    { name: 'Employee Name 1', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', details: 'Details about Employee 1', workingHours: '9 AM - 5 PM', isPresent: true },
    { name: 'Employee Name 2', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', details: 'Details about Employee 2', workingHours: '10 AM - 6 PM', isPresent: false },
    { name: 'Employee Name 3', avatar: 'https://randomuser.me/api/portraits/men/3.jpg',details: 'Details about Employee 1', workingHours: '10 AM - 6 PM', isPresent: true },
    { name: 'Employee Name 4', avatar: 'https://randomuser.me/api/portraits/women/4.jpg',details: 'Details about Employee 1', workingHours: '9 AM - 4 PM', isPresent: false },
    { name: 'Employee Name 5', avatar: 'https://randomuser.me/api/portraits/men/5.jpg',details: 'Details about Employee 1', workingHours: '9 AM - 3 PM', isPresent: true },
    { name: 'Employee Name 6', avatar: 'https://randomuser.me/api/portraits/women/6.jpg',details: 'Details about Employee 1', workingHours: '10 AM - 5 PM', isPresent: false },
    { name: 'Employee Name 7', avatar: 'https://randomuser.me/api/portraits/men/7.jpg',details: 'Details about Employee 1', workingHours: '11 AM - 6 PM', isPresent: false },
    { name: 'Employee Name 8', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' ,details: 'Details about Employee 1', workingHours: '11 AM - 7 PM', isPresent: true},
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEmployeeName, setNewEmployeeName] = useState('');

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

  const handleAddEmployee = async () => {
    if (newEmployeeName) {
      try {
        // Generate a unique avatar URL based on the employee's name
        const avatarUrl = `https://api.multiavatar.com/${encodeURIComponent(newEmployeeName)}.png`;

        const newEmployee: Employee = { 
          name: newEmployeeName, 
          avatar: avatarUrl 
        };

        setEmployees([...employees, newEmployee]);
        setIsModalVisible(false);
        setNewEmployeeName('');
      } catch (error) {
        Alert.alert('Error', 'Failed to add employee. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please enter an employee name.');
    }
  };

  const handleEmployeeDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDetailsModalVisible(true);
  };

  const handleDeleteEmployee = () => {
    if (selectedEmployee) {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this employee?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              setEmployees(employees.filter(emp => emp !== selectedEmployee));
              setIsDetailsModalVisible(false);
              setSelectedEmployee(null);
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  const renderItem = ({ item }: { item: Employee }) => (
    <View style={styles.employeeContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={styles.employeeName}>{item.name}</Text>
      <TouchableOpacity 
        style={styles.detailsButton} 
        onPress={() => handleEmployeeDetails(item)}
      >
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Employee List</Text>
      <FlatList
        data={employees}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()}
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => setIsModalVisible(true)}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Modal for adding a new employee */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Employee</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Employee Name"
              value={newEmployeeName}
              onChangeText={setNewEmployeeName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddEmployee}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for displaying employee details */}
      <Modal
        visible={isDetailsModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsDetailsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedEmployee && (
              <>
                <Text style={styles.modalTitle}>Employee Details</Text>
                <Image source={{ uri: selectedEmployee.avatar }} style={styles.avatar} />
                <Text style={styles.employeeName}>{selectedEmployee.name}</Text>
                <Text>Details: {selectedEmployee.details}</Text>
                <Text>Working Hours: {selectedEmployee.workingHours}</Text>
                <Text>Status: {selectedEmployee.isPresent ? 'Present' : 'Not Present'}</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={styles.deleteButton} 
                    onPress={handleDeleteEmployee}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.closeButton} 
                    onPress={() => setIsDetailsModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 16,
    marginTop:-12
  },
  employeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    marginHorizontal: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  employeeName: {
    flex: 1,
    fontSize: 16,
  },
  detailsButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#4287f5'
  },
  detailsButtonText: {
    color: '#FFF',
    fontSize: 14,
    
    
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 5,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
