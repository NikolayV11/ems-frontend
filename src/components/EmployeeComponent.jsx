import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService";

export function EmployeeComponent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          const data = response.data;
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }, [id]);

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return "Update Employee";
    } else {
      return "Add Employee";
    }
  }

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = {
        firstName: firstName,
        lastName: lastName,
        email: email,
      };

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            alert(error.message);
          });
      } else {
        createEmployee(employee)
          .then((res) => {
            alert(`Сотрудник: ${res.data.firstName} добавлен!`);
            navigator("/");
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    }
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">{pageTitle()}</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label ">First Name</label>
                <input
                  className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={firstName}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>
              <div className="form-group mb-2">
                <label className="form-label ">Last Name</label>
                <input
                  className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>
              <div className="form-group mb-2">
                <label className="form-label ">Email</label>
                <input
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  type="text"
                  placeholder="Enter Employee Email"
                  name="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />{" "}
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <button type="submit" className="btn btn-success" onClick={saveOrUpdateEmployee}>
                {id ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
