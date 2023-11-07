import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutProf from "./AboutProf"; // Assuming this is the correct import
import Grading from "./Grading"; // Make sure you import the correct component
import { useNavigate } from "react-router-dom";
import "./Prof1.css";
import histogram from "./hist.png";
import pie from "./pie_chart.png";
// import pie_chart from "../../pie_chart.png"

export default function Prof1() {
  const [action, setAction] = useState("About");
  const navigate = useNavigate();
  //backend

  const location = useLocation();
  console.log("hello");
  const url = location.pathname.split("/");
  const user_id = url[url.length - 1];
  const [name, setName] = useState("");
  const [regnumber, setRegnumber] = useState("");
  const [profession, setProfession] = useState("");

  const [pdfFile, setPdfFile] = useState(null);
  const [text, setText] = useState("");

  const handlePDFChange = (event) => {
    setPdfFile(event.target.files[0]);
  };
  const downloadResult = async () => {
    try {
      const link = document.createElement("a");
      link.href = "http://localhost:6969/profresult";
      link.download = "Result.csv";
      link.click();
    } catch (error) {
      // Handle network errors or other exceptions here
      console.error("An error occurred: " + error.message);
    }
  };

  const viewResult = async () => {
    fetch(`http://localhost:6969/login/profProfile/${user_id}/grade`, {
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
        throw new Error("Failed to start grading");
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error to grade:", error);
      });
  };

  const fetchProfile = (user_id) => {
    fetch(`http://localhost:6969/login/profProfile/${user_id}`, {
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
        throw new Error("Failed to fetch prof profile");
      })
      .then((data) => {
        console.log(data);
        setName(data["name"]);
        setRegnumber(data["regnumber"]);
        setProfession(data["profession"]);
      })
      .catch((error) => {
        console.error("Error fetching prof profile:", error);
      });
  };

  fetchProfile(user_id);

  // Helper function to submit the PDF file to the backend for text extraction
  const submitPDF = async (event) => {
    event.preventDefault();

    // const formData = new FormData();
    // formData.append("file", pdfFile);
    const formData = new FormData();

    const text = "This is the content of the text file.";
    const textBlob = new Blob([text], { type: "text/plain" });

    // Append the text file to the FormData object
    formData.append("file", textBlob);
    console.log("hello");

    await fetch("http://localhost:6969/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log("PDF file sent successfully");
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setText(data);
        console.log(data.text);
      });
  };

  //frontend
  let about_active = "active";
  let grade_active = "active";
  if (action === "About") {
    about_active = "active";
    grade_active = "";
  } else if (action === "Grade") {
    about_active = "";
    grade_active = "active";
  }
  const setGrade = () => {
    setAction("Grade");
  };
  const setAbout = () => {
    setAction("About");
  };
  const renderAboutandGradeSection = () => {
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
                  <label>Courses</label>
                </div>
                <div className="col-md-6">
                  <p>CSN 291</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Profession</label>
                </div>
                <div className="col-md-6">
                  <p>{profession}, IIT Roorkee</p>
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
    } else if (action === "Grade") {
      return (
        <>
          {/* <div className="col-md-8">
            

            <div className="whole">
              <button
                type="button"
                class="btn btn-primary mx-3 mt-3"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Upload Files
              </button>

              <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-xl">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="staticBackdropLabel">
                        Instructions
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <b>
                        Instructions to make the model answer key: <br></br>1.
                        The model answer key.txt file must start with Total
                        marks mentioning the total marks in the paper. <br></br>
                        2. Then it must have the Total Questions mentioned in
                        the paper. <br></br>3. Then it must show the question
                        wise marks distribution.<br></br>4. Then it must have
                        the answer in the following format <br></br> Answer
                        1(Replace with the answer number) :<br></br> Subpoint
                        1[Content of subpoint] <br></br>Type: Mention the type:
                        meaning, keywords,FIB. If the type is keywords then
                        write a hyphen and write all the keywords you expect in
                        the answer separated by commas. In the Type: end the
                        line with maximum marks for that subpoint in square
                        brackets. [ ] <br></br> After each subpoint, in a new
                        line write two hyphens(--) <br></br> Write other
                        subpoints in the same format.<br></br> After each
                        answer, write ‘End of answer’ signifying the end of that
                        answer.
                      </b>
                      <div className="card card-body">
                        <form
                          action="http://localhost:6969/upload"
                          method="POST"
                          encType="multipart/form-data"
                        >
                          <div id="choseFileFrame">
                            <div className="upload-box">
                              <img
                                src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"
                                alt="Upload Icon"
                              />
                              <input
                                type="file"
                                name="answer_key"
                                
                                accept=".txt"
                                onChange={handlePDFChange}
                              />
                            </div>
                            <div className="upload-box">
                              <img
                                src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"
                                alt="Upload Icon"
                              />
                              <input
                                type="file"
                                name="student_response"
                                
                                accept=".txt"
                                onChange={handlePDFChange}
                                multiple
                                required
                              />
                            </div>

                            <input
                              type="submit"
                              value="Submit"
                              className="submitfile"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="whole">
              <button
                className="btn btn-primary mx-3 mt-3"
                type="button"
                onClick={viewResult}
              >
                Grade
              </button>
            </div>
            <div className="whole">
              <button
                className="btn btn-primary mx-3 mt-3"
                type="button"
                onClick={downloadResult}
              >
                Download Result
              </button>
            </div>
            <div className="whole">
              <button
                type="button"
                class="btn btn-primary mx-3 mt-3"
                data-bs-toggle="modal"
                data-bs-target="#analysisBackdrop"
              >
                Result Analysis
              </button>
            </div>
            <div
              class="modal fade"
              id="analysisBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="analysisBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="analysisBackdropLabel">
                      Result Analysis
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="resultanalysis">
                    <div className="analysisresult">
                      <img src={pie} alt="" />
                    </div>
                    
                    <div className="analysisresult">
                      <img src={histogram} alt="" />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className="col-md-8" id="resultshow">
            <div className="row" id="showresult">
              <div id="profWrapper">
                <div className="col-6 col-md-3 btn-common grid-item">
                  <div className="uploadfiles">
                    <img
                      src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_960_720.png"
                      alt=""
                      className="insideimage"
                    />
                    <button
                      type="button"
                      class="btn btn-primary mx-3 mt-3"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      Upload Files
                    </button>
                  </div>
                  <div
                    class="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-xl">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="staticBackdropLabel">
                            Instructions
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <b>
                            Instructions to make the model answer key: <br></br>
                            1. The model answer key.txt file must start with
                            Total marks mentioning the total marks in the paper.{" "}
                            <br></br>
                            2. Then it must have the Total Questions mentioned
                            in the paper. <br></br>3. Then it must show the
                            question wise marks distribution.<br></br>4. Then it
                            must have the answer in the following format{" "}
                            <br></br> Answer 1(Replace with the answer number) :
                            <br></br> Subpoint 1[Content of subpoint] <br></br>
                            Type: Mention the type: meaning, keywords,FIB. If
                            the type is keywords then write a hyphen and write
                            all the keywords you expect in the answer separated
                            by commas. In the Type: end the line with maximum
                            marks for that subpoint in square brackets. [ ]{" "}
                            <br></br> After each subpoint, in a new line write
                            two hyphens(--) <br></br> Write other subpoints in
                            the same format.<br></br> After each answer, write
                            ‘End of answer’ signifying the end of that answer.
                          </b>
                          <div className="card card-body">
                            <form
                              action="http://localhost:6969/upload"
                              method="POST"
                              encType="multipart/form-data"
                            >
                              <div id="choseFileFrame">
                                <div className="upload-box">
                                  <img
                                    src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"
                                    alt="Upload Icon"
                                  />
                                  <input
                                    type="file"
                                    name="answer_key"
                                    accept=".txt"
                                    onChange={handlePDFChange}
                                  />
                                </div>
                                <div className="upload-box">
                                  <img
                                    src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"
                                    alt="Upload Icon"
                                  />
                                  <input
                                    type="file"
                                    name="student_response"
                                    accept=".txt"
                                    onChange={handlePDFChange}
                                    multiple
                                    required
                                  />
                                </div>

                                <input
                                  type="submit"
                                  value="Submit"
                                  className="submitfile"
                                />
                              </div>
                            </form>
                          </div>
                        </div>

                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3 btn-common grid-item">
                  <div className="uploadfiles">
                    <img
                      src="data:image/png;base64,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"
                      alt=""
                      className="insideimage"
                    />
                    <button
                      className="btn btn-primary mx-3 mt-3"
                      type="button"
                      onClick={viewResult}
                    >
                      Grade
                    </button>
                  </div>
                </div>

                <div className="col-6 col-md-3 btn-common grid-item">
                  <div className="uploadfiles">
                    <img
                      src="https://cdn.pixabay.com/photo/2016/12/18/13/45/download-1915753_1280.png"
                      alt=""
                      className="insideimage"
                    />
                    <button
                      className="btn btn-primary mx-3 mt-3"
                      type="button"
                      onClick={downloadResult}
                    >
                      Download Result
                    </button>
                  </div>
                </div>

                <div className="col-6 col-md-3 btn-common grid-item">
                  <div className="uploadfiles">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/9466/9466946.png"
                      alt=""
                      className="insideimage"
                    />
                    <button
                      type="button"
                      class="btn btn-primary mx-3 mt-3"
                      data-bs-toggle="modal"
                      data-bs-target="#analysisBackdrop"
                    >
                      Result Analysis
                    </button>
                    <div
                class="modal fade"
                id="analysisBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="analysisBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-xl">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="analysisBackdropLabel">
                        Result Analysis
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="resultanalysis">
                      <div className="analysisresult">
                        <img src={pie} alt="" />
                      </div>

                      <div className="analysisresult">
                        <img src={histogram} alt="" />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
                  </div>
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
      {/* <form method="post"> */}
      <div className="row">
        <div className="col-md-4 mt-4">
          <div className="profile-img">
            <img
              src="https://pgmse.github.io/LECTURENOTESV1.0/second.png"
              alt=""
            />
          </div>
        </div>
        <div className="col-md-6 ms-4 mt-4">
          <div className="profile-head">
            <h5>{name}</h5>
            <h6>{profession}</h6>
            <p className="proile-rating">
              {/* RANKINGS : <span>8/10</span> */}
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
                  className={`nav-link ${grade_active}`}
                  id="profile-tab"
                  data-toggle="tab"
                  style={{ cursor: "pointer" }}
                  onClick={setGrade}
                  role="tab"
                  aria-controls="profile"
                  aria-selected="true"
                >
                  Grade
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        {/* <div className="col-md-4"> */}
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
        {/* </div> */}

        {renderAboutandGradeSection()}
      </div>
      {/* </form> */}
    </div>
  );
}
