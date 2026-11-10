
function EmployeeTable(props) {

    return (
        <div>
            <h2>Employee Details</h2>

            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {props.employees.map((employee, index) => (
                        <tr key={employee.id}>
                            <td>{index + 1}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.role}</td>

                            <td>
                                <div className="action-buttons">

                                    <button onClick={() => props.onEditEmployee(employee)}>
                                        Edit
                                    </button>

                                    <button onClick={() => props.onDeleteEmployee(employee.id)}>
                                        Delete
                                    </button>

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeTable;
