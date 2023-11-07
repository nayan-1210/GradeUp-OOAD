import React, { useState, useEffect } from "react";
import { Params } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AboutProf from "./AboutProf"; // Assuming this is the correct import
import Grading from "./Grading"; // Make sure you import the correct component
import axios from "axios";
import "./Student.css";
import computer from "./comouter.jpg";
import computer2 from "./computer.jpg";


export default function Student() {
  const [modal, setModal] = useState("");
  const [action, setAction] = useState("About");
  let about_active = "active";
  let results_active = "active";
  var sum = 0;
  const location = useLocation();
  console.log("hello");
  const url = location.pathname.split("/");
  const user_id = url[url.length - 1];

  const [name, setName] = useState("");
  const [regnumber, setRegnumber] = useState("");
  const [profession, setProfession] = useState("");
  const [marksData, setMarksData] = useState(null);


  const Close = () => {
    setModal("");
  };

  const ClickModal = () => {
    // const MarksDict = {
    //   q1: 1.5,
    //   q2: 1.25,
    //   q3: 2,
    //   // Add more key-value pairs as needed
    // };
  };

  const downloadResult = () => {
    fetch(`http://localhost:6969/login/studentProfile/result/${regnumber}`, {
      method: "GET",
      headers: {
        //header
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("response");
          console.log(response);
          return response.json();
        }
        throw new Error("Failed to fetch student profile");
      })
      .then((data) => {
        console.log(data);
        setModal("Active");
        setMarksData(data);
        let MarksDict = {};
        window.scrollBy(0, 300);
        console.log(typeof data);
        console.log(data);
        for (var key in data) {
          let key1 = key.toString();
          let value = data[key].toString();
          MarksDict[key1] = value;
          console.log(typeof key1);
          console.log(key1);
          console.log(typeof value);
          console.log(value);
        }

        // for(const key1 in data){
        //   if(key1!="Enrollment Number"){
        //     // console.log(key1);
        //     MarksDict[key1]=data[key1];
        //   }
        // }
        console.log("hello world");
        console.log(MarksDict);
        // for(const key in MarksDict){
        //   sum=sum+MarksDict[key];
        // }
        console.log("hello world hi");
        console.log(MarksDict);
        document.addEventListener("DOMContentLoaded", function () {
          let tableBody = document.getElementById("resultTable");

          // Loop through the dictionary and create a row for each key-value pair
          for (let key in MarksDict) {
            let value = MarksDict[key];

            // Create a new table row
            let newRow = document.createElement("tr");

            // Create two table data cells for the question and marks obtained
            let questionCell = document.createElement("td");
            let marksCell = document.createElement("td");

            // Set the text content for the cells
            questionCell.textContent = key;
            marksCell.textContent = value;

            // Append the cells to the row
            newRow.appendChild(questionCell);
            newRow.appendChild(marksCell);

            // Append the row to the table body
            tableBody.appendChild(newRow);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching student profile:", error);
      });
  };

  const fetchProfile = (user_id) => {
    fetch(`http://localhost:6969/login/studentProfile/${user_id}`, {
      method: "GET",
      headers: {
        //header
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("response");
          console.log(response);
          return response.json();
        }
        throw new Error("Failed to fetch student profile");
      })
      .then((data) => {
        console.log(data);
        setName(data["name"]);
        setRegnumber(data["regnumber"]);
        setProfession(data["profession"]);
      })
      .catch((error) => {
        console.error("Error fetching student profile:", error);
      });
  };

  fetchProfile(user_id);

  if (action === "About") {
    about_active = "active";
    results_active = "";
  } else if (action === "Results") {
    about_active = "";
    results_active = "active";
  }
  const setResults = () => {
    setAction("Results");
  };
  const setAbout = () => {
    setAction("About");
  };
  const renderAboutandResultsSection = () => {
    if (action === "About") {
      return (
        <div className="col-md-8">
          <div className="tab-content profile-tab ms-4" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className="row">
                <div className="col-md-6">
                  <label>Name</label>
                </div>
                <div className="col-md-6">
                  <p>{name}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Registration Number</label>
                </div>
                <div className="col-md-6">
                  <p>{regnumber}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Profession</label>
                </div>
                <div className="col-md-6">
                  <p>{profession}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Department</label>
                </div>
                <div className="col-md-6">
                  <p>Computer Science and Engineering</p>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="row">
                <div className="col-md-6">
                  <label>Experience</label>
                </div>
                <div className="col-md-6">
                  <p>Expert</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Hourly Rate</label>
                </div>
                <div className="col-md-6">
                  <p>10$/hr</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Total Projects</label>
                </div>
                <div className="col-md-6">
                  <p>230</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>English Level</label>
                </div>
                <div className="col-md-6">
                  <p>Expert</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Availability</label>
                </div>
                <div className="col-md-6">
                  <p>6 months</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label>Your Bio</label>
                  <br />
                  <p>Your detail description</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (action === "Results") {
      return (
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="text-center card-box">
                  <div className="member-card pt-2 pb-2">
                    <div className="thumb-lg member-thumb mx-auto">
                      <img
                        src={computer}
                        className="rounded-circle img-thumbnail"
                        alt="profile-image"
                      />
                    </div>
                    <div className="mt-3">
                      <h4>CSN 291</h4>
                    </div>
                    <button
                      className="btn btn-success mt-3 btn-rounded waves-effect w-md waves-light mx-1"
                      type="button"
                      
                      onClick={downloadResult}
                    >
                      View Score
                    </button>
                    
                    <button
                      type="button"
                      className="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light mx-1"
                    >
                      Download Model Answer
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="text-center card-box">
                  <div className="member-card pt-2 pb-2">
                    <div className="thumb-lg member-thumb mx-auto">
                      <img
                        src={computer2}
                        className="rounded-circle img-thumbnail"
                        alt="profile-image"
                      />
                    </div>
                    <div className="mt-3">
                      <h4>CSN 261</h4>
                    </div>
                    <button
                      className="btn btn-success mt-3 btn-rounded waves-effect w-md waves-light mx-1"
                      type="button"
                      
                      onClick={downloadResult}
                    >
                      View Score
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light mx-1"
                    >
                      Download Model Answer
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="text-center card-box">
                  <div className="member-card pt-2 pb-2">
                    <div className="thumb-lg member-thumb mx-auto">
                      <img
                        src={computer}
                        className="rounded-circle img-thumbnail"
                        alt="profile-image"
                      />
                    </div>
                    <div className="mt-3">
                      <h4>CSN 221</h4>
                    </div>
                    <button
                      className="btn btn-success mt-3 btn-rounded waves-effect w-md waves-light mx-1"
                      type="button"
                      
                      onClick={downloadResult}
                    >
                      View Score
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light mx-1"
                    >
                      Download Model Answer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderModal = () => {
    if (modal === "Active") {
      console.log("nayan marks");
      console.log(marksData);
      return (
        <>
          <div class="container">
            <div class="height d-flex justify-content-center align-items-center">
              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={ClickModal}
              >
                Click here to view Your Result
              </button>
            </div>
          </div>

          <div
            class="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header float-right">
                  <h5>Question Wise Score</h5>
                  <div class="text-right">
                    <i
                      data-dismiss="modal"
                      aria-label="Close"
                      class="fa fa-close"
                    ></i>
                  </div>
                </div>
                <div class="modal-header float-right">
                  <h5>Enrollment Number: {regnumber}</h5>
                
                  
                </div>
                <div class="modal-body">
                  <div>
                    <table class="table table-bordered" id="resultTable">
                      <thead>
                        <tr>
                          <th scope="col">Question</th>
                          <th scope="col">Marks Obtained</th>
                        </tr>
                      </thead>
                      <tbody>
                        {marksData &&
                          Object.keys(marksData)
                            .filter(
                              (question) => question !== "Enrollment Number"
                            )
                            .map((question) => (
                              <tr key={question}>
                                <td>{question}</td>
                                <td>{marksData[question]}</td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="modal-header float-right">
                  <h5>Maximum Score: 15</h5>
                
                  <h5>Score Obtained: {marksData["Total"]}</h5>
                </div>

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={Close}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="container emp-profile">
      <div className="row">
        <div className="col-md-4 mt-4">
          <div className="profile-img">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQq6gaTf6N93kzolH98ominWZELW881HqCgw&usqp=CAU"
              alt=""
            />
          </div>
        </div>
        <div className="col-md-6 ms-4 mt-4">
          <div className="profile-head">
            <h5>{name}</h5>
            <h6>{profession}</h6>
            <p className="proile-rating">
              
            </p>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className={`nav-link ${about_active}`}
                  id="home-tab"
                  data-toggle="tab"
                  style={{ cursor: "pointer" }}
                  onClick={setAbout}
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${results_active}`}
                  id="profile-tab"
                  data-toggle="tab"
                  style={{ cursor: "pointer" }}
                  onClick={setResults}
                  role="tab"
                  aria-controls="profile"
                  aria-selected="true"
                >
                  View Result
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          {/* <div className="profile-work">
                    <p>WORK LINK</p>
                    <a href="">Website Link</a><br/>
                    <a href="">Bootsnipp Profile</a><br/>
                    <a href="">Bootply Profile</a>
                    <p>SKILLS</p>
                    <a href="">Web Designer</a><br/>
                    <a href="">Web Developer</a><br/>
                    <a href="">WordPress</a><br/>
                    <a href="">WooCommerce</a><br/>
                    <a href="">PHP, .Net</a><br/>
                </div> */}
        </div>
        {renderAboutandResultsSection()}
        {renderModal()}
      </div>
    </div>
  );
}
