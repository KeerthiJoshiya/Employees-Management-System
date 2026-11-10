
import { useState, useEffect } from 'react';

function EmployeeForm(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    // Fill the form when an employee is selected for editing
    useEffect(() => {
        if (props.employeeToEdit) {
            setName(props.employeeToEdit.name);
            setEmail(props.employeeToEdit.email);
            setRole(props.employeeToEdit.role);
        } else {
            setName("");
            setEmail("");
            setRole("");
        }
    }, [props.employeeToEdit]);

    function handleSubmit(event) {
        event.preventDefault();

        if (!name.trim() || !email.trim() || !role.trim()) {
            alert("Please fill in all fields");
            return;
        }

        if (props.employeeToEdit) {
            const updatedEmployee = {
                id: props.employeeToEdit.id,
                name: name,
                email: email,
                role: role
            };

            props.onUpdateEmployee(updatedEmployee);

        } else {
            const newEmployee = {
                name: name,
                email: email,
                role: role
            };

            props.onAddEmployee(newEmployee);
        }

        setName("");
        setEmail("");
        setRole("");
    }

    return (
        <div>
            <h2>
                {props.employeeToEdit ? "Edit Employee" : "Add Employee"}
            </h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Enter Role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    required
                />

                <button type="submit">
                    {props.employeeToEdit ? "Update Employee" : "Add Employee"}
                </button>

                {props.employeeToEdit && (
                    <button type="button" onClick={props.onCancelEdit}>
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
}

export default EmployeeForm;
