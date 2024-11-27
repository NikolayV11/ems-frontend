import { useEffect, useState } from "react";
import { listEmployees, deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

function ListEmployeeComponent() {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function removeEmployee(id, firstName) {
    deleteEmployee(id)
      .then((response) => {
        alert(`Пользователь: ${firstName} удален!.`);
        getAllEmployees();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center">List of Employee</h2>
      <button
        className="btn btn-primary mb-2"
        type="button"
        onClick={() => navigator("/add-employee")}>
        Add employees
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            return (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td className="">
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      updateEmployee(employee.id);
                    }}>
                    Update
                  </button>
                  <button
                    style={{ marginLeft: "13px" }}
                    className="btn btn-danger"
                    onClick={() => {
                      removeEmployee(employee.id, employee.firstName);
                    }}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListEmployeeComponent;
