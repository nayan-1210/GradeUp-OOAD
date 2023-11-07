import "./Login.css";
import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import login from "./computer.jpg";

export default function Login() {
  const [regnumber, setRegnumber] = useState("");
  const [password, setPassword] = useState("");
  const [profession, setProfession] = useState("");
  

  const navigate = useNavigate();

  const logInUser = () => {
    if (regnumber.length === 0) {
      alert("Registration number has left Blank!");
    } else if (password.length === 0) {
      alert("password has left Blank!");
    } else if (profession.length === 0) {
      alert("profession has left Blank!");
    } else {
      axios
        .post("http://localhost:6969/login", {
          regnumber: regnumber,
          password: password,
          profession: profession,
        })
        .then(function (response) {
          console.log(response.data);
          var objectId = response.data; // Assuming response.data contains the ObjectID

          if (profession === "Student") {
            // Construct the URL with the ObjectID
            navigate(`/login/studentProfile/${objectId}`);
          } else {
            navigate(`/login/profProfile/${objectId}`);
          }
        })
        .catch(function (error) {
          console.log(error, "error");
          // if (error.response.status === 401) {
          //     alert("Invalid credentials");
          // }
        });
    }
  };

  return (
    <>
      <section className="vh-99">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <h3
                className="fw-normal mb-3 pb-3 my-3"
                style={{ letterSpacing: "1px", textAlign: "center" }}
              >
                Sign in
              </h3>

              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="form1Example13"
                  placeholder="Enter your Registration number"
                  className="form-control form-control-lg"
                  value={regnumber}
                  onChange={(e) => setRegnumber(e.target.value)}
                  required
                />
              </div>
              <select
                className="custom-select custom-select-lg mb-4"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                required
              >
                <option value="" disabled>
                  Profession
                </option>
                <option value="Professor">Professor</option>
                <option value="Student">Student</option>
              </select>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form1Example23"
                  placeholder="Enter your Password"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div
                className="text-center text-lg-start mt-4 pt-2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  type="submit"
                  className="btn btn-primary btn-lg mx-4 custom-button"
                  onClick={logInUser}
                >
                  Sign in
                </button>
                <Link
                  to="/register"
                  className="btn btn-secondary btn-lg  mx-4 custom-button"
                >
                  Sign up
                </Link>
              </div>

              {/* </form> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
