
import Header from './Header.jsx';
import EmployeeTable from './EmployeeTable.jsx';
import EmployeeForm from './EmployeeForm.jsx';
import { useState } from 'react';
import './App.css';

function App() {

    // Employee data
    const [employees, setEmployees] = useState([
        { id: 1, name: "Arun", email: "arun@gmail.com", role: "Developer" },
        { id: 2, name: "Priya", email: "priya@gmail.com", role: "Designer" },
        { id: 3, name: "Rahul", email: "rahul@gmail.com", role: "Tester" }
    ]);

    // Controls form visibility
    const [showForm, setShowForm] = useState(false);

    // Stores the employee selected for editing
    const [editingEmployee, setEditingEmployee] = useState(null);


    // CREATE: Add a new employee
    function addEmployee(newEmployee) {

        const employeeWithId = {
            id: Date.now(),
            ...newEmployee
        };

        setEmployees([...employees, employeeWithId]);
        setShowForm(false);
    }


    // DELETE: Remove an employee
    function deleteEmployee(id) {

        setEmployees(
            employees.filter((employee) => employee.id !== id)
        );
    }


    // EDIT: Select an employee
    function editEmployee(employee) {

        setEditingEmployee(employee);
        setShowForm(true);
    }


    // UPDATE: Save modified employee details
    function updateEmployee(updatedEmployee) {

        setEmployees(
            employees.map((employee) =>
                employee.id === updatedEmployee.id
                    ? updatedEmployee
                    : employee
            )
        );

        setEditingEmployee(null);
        setShowForm(false);
    }


    // Opens an empty form for creating an employee
    function handleCreate() {

        setEditingEmployee(null);
        setShowForm(true);
    }


    return (
        <>
            <Header
                name="Employees Management System"
                subtitle="Manage your employees efficiently"
            />

            {/* Button to open the form */}
            <button onClick={handleCreate}>
                Create Employee
            </button>


            {/* Employee Table */}
            <EmployeeTable
                employees={employees}
                onDeleteEmployee={deleteEmployee}
                onEditEmployee={editEmployee}
            />


            {/* Conditional Rendering */}
            {showForm && (
                <EmployeeForm
                    employeeToEdit={editingEmployee}
                    onAddEmployee={addEmployee}
                    onUpdateEmployee={updateEmployee}
                    onCancelEdit={() => {
                        setEditingEmployee(null);
                        setShowForm(false);
                    }}
                />
            )}

        </>
    );
}

export default App;
