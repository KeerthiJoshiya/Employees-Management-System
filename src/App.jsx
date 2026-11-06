 
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Employee data
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem("employees");

    return savedEmployees
      ? JSON.parse(savedEmployees)
      : [
          { id: 1, name: "Arun", email: "arun@gmail.com", role: "Developer" },
          { id: 2, name: "Priya", email: "priya@gmail.com", role: "Designer" },
          { id: 3, name: "Rahul", email: "rahul@gmail.com", role: "Tester" }
        ];
  });

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Save data in localStorage
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  // Open form for creating an employee
  const handleCreate = () => {
    setName("");
    setEmail("");
    setRole("");
    setEditingId(null);
    setShowForm(true);
  };

  // Add or update employee
  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !role.trim()) {
      alert("Please fill in all fields");
      return;
    }

    if (editingId !== null) {
      const updatedEmployees = employees.map((employee) =>
        employee.id === editingId
          ? { ...employee, name, email, role }
          : employee
      );

      setEmployees(updatedEmployees);
    } else {
      const newEmployee = {
        id: Date.now(),
        name,
        email,
        role
      };

      setEmployees([...employees, newEmployee]);
    }

    setName("");
    setEmail("");
    setRole("");
    setEditingId(null);
    setShowForm(false);
  };

  // Open form with selected employee details
  const handleEdit = (employee) => {
    setName(employee.name);
    setEmail(employee.email);
    setRole(employee.role);
    setEditingId(employee.id);
    setShowForm(true);
  };

  // Delete employee
  const handleDelete = (id) => {
    const updatedEmployees = employees.filter(
      (employee) => employee.id !== id
    );

    setEmployees(updatedEmployees);
  };

  // Close form
  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setName("");
    setEmail("");
    setRole("");
  };

  return (
    <div className="app-container">

      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div>
          <p className="header-label">MANAGEMENT DASHBOARD</p>
          <h1>Employee Management System</h1>
          <p className="header-subtitle">
            Manage your employees and their details in one place.
          </p>
        </div>

        <div className="employee-count">
          <span>Total Employees</span>
          <strong>{employees.length}</strong>
        </div>
      </header>

      {/* Employee Section */}
      <main className="content-container">

        <div className="section-heading">
          <div>
            <h2>Employee List</h2>
            <p>View and manage all employee records.</p>
          </div>

          <button className="create-button" onClick={handleCreate}>
            + Create Employee
          </button>
        </div>

        {/* Form appears only when Create or Edit is clicked */}
        {showForm && (
          <div className="form-card">
            <h2>
              {editingId !== null ? "Edit Employee" : "Add New Employee"}
            </h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter employee name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <input
                  type="text"
                  placeholder="Enter employee role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

            </div>

            <div className="form-actions">
              <button className="submit-button" onClick={handleSubmit}>
                {editingId !== null ? "Update" : "Submit"}
              </button>

              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Employee Table */}
        <div className="table-card">
          <div className="table-wrapper">
            <table className="employee-table">

              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Employee Name</th>
                  <th>Email Address</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {employees.length > 0 ? (
                  employees.map((employee, index) => (
                    <tr key={employee.id}>
                      <td>{index + 1}</td>
                      <td className="employee-name">{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>
                        <span className="role-badge">{employee.role}</span>
                      </td>

                      <td>
                        <div className="action-buttons">
                          <button
                            className="edit-button"
                            onClick={() => handleEdit(employee)}
                          >
                            Edit
                          </button>

                          <button
                            className="delete-button"
                            onClick={() => handleDelete(employee.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-message">
                      No employees found. Click Create Employee to add one.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App
