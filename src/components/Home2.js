import React from "react";
import "./Home.2.css";
import logo from "./hero-img.png";
import features from "./features.svg";
import member from "./member1.png";
import meet from "./meet.png";
import nayan from "./nayan.png";
import haaziq from "./haaziq.png";
import aditya from "./aditya.png";
import Hariharan from "./hariharan.png";

export default function Home2() {
  const clickLogin = () => {
    const currentURL = window.location.href;
    const loginURL = `${currentURL}login`;
    window.location.href = loginURL;
  }
  return (
    <>
      {" "}
      <section id="hero" class="d-flex align-items-center">
        {/* <div class="container1">
          <div class="row">
            <div
              // class="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1 aos-init aos-animate"
              // data-aos="fade-up"
            >
              <div>
                <h1>GradeUp</h1>
                <h2>Your Grading Companion</h2>
                <p>Now save your valuable time using our advanced grading AI</p>
              </div>
            </div>
            <div
              class="col-lg-6 d-lg-flex flex-lg-column align-items-stretch order-1 order-lg-2 hero-img aos-init aos-animate"
              data-aos="fade-up"
            >
              <img src="hero-img.png" class="img-fluid" alt="" />
            </div>
          </div>
        </div> */}
        <div class="container23">
          <div class="textfirst">
            <h1>GradeUp</h1>
            <h2>Your Grading Companion</h2>
            <p>Revolutionizing Grading with AI: A Smarter Way to Evaluate</p>
            <button onClick={clickLogin} type="button" class="btn btn-primary" id="getStarted">Get Started</button>
          </div>
          <div class="imagefirst">
            <img src={logo} alt="Right Part - Image" />
          </div>
        </div>
      </section>
      <section id="features" class="features">
        <div class="container1">
          <div class="section-title">
            <h2>App Features</h2>
            <p>
              Our aim is to deliver an intelligent grading system with an
              intuitive design
            </p>
          </div>

          <div class="row no-gutters">
            <div class="col-xl-7 d-flex align-items-stretch order-2 order-lg-1">
              <div class="content d-flex flex-column justify-content-center">
                <div class="row">
                  <div
                    class="col-md-6 icon-box aos-init aos-animate"
                    data-aos="fade-up"
                  >
                    <i class="bx bx-receipt"></i>
                    <h4>AI/ML based algorithms</h4>
                    <p>
                      Our application uses verified algorithms to grade textual
                      responses
                    </p>
                  </div>
                  <div
                    class="col-md-6 icon-box aos-init aos-animate"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <i class="bx bx-cube-alt"></i>
                    <h4>Accurate Evaluation</h4>
                    <p>
                      By multiple iterations, evaluation is more accurate than
                      ever
                    </p>
                  </div>
                  <div
                    class="col-md-6 icon-box aos-init aos-animate"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <i class="bx bx-images"></i>
                    <h4>Database</h4>
                    <p>
                      Now you will store performances of students without need
                      of hard copies
                    </p>
                  </div>
                  <div
                    class="col-md-6 icon-box aos-init aos-animate"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <i class="bx bx-shield"></i>
                    <h4>Secure Login</h4>
                    <p>Our encryption secures your passwords and details</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="image col-xl-5 d-flex align-items-stretch justify-content-center order-1 order-lg-2 aos-init aos-animate"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <img src={features} class="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>
      <div className="footer">
        <header>
          <h1 className="team">Our Team</h1>
        </header>
        <div class="image-container">
          <div class="profile1">
            <img src={meet} alt="Member 1" />
            <h2>Meet Sindhav</h2>
            <p>22114053</p>
            <p className="email-class">meet_js@cs.iitr.ac.in</p>
            <p>Backend Developer</p>
          </div>

          <div class="profile1">
            <img src={haaziq} alt="Member 2" />
            <h2>Haaziq Jamal</h2>
            <p>22114055</p>
            <p className="email-class">mohammed_hj@cs.iitr.ac.in</p>
            <p>Backend Developer</p>
          </div>

          <div class="profile1">
            <img src={aditya} alt="Member 3" />
            <h2> Aditya Mundada</h2>
            <p>22114058</p>
            <p className="email-class">mundada_am@cs.iitr.ac.in</p>
            <p>AI Developer</p>
          </div>

          <div class="profile1">
            <img src={nayan} alt="Member 4" />
            <h2>Nayan Kakade</h2>
            <p>22114060</p>
            <p className="email-class">nayan_rk@cs.iitr.ac.in</p>
            <p>Frontend Developer</p>
          </div>
        
          <div class="profile1">
            <img src={Hariharan} alt="Member 5" />
            <h2>Hariharan Polasa</h2>
            <p>22114068</p>
            <p className="email-class">polasa_h@cs.iitr.ac.in</p>
            <p>Frontend Developer</p>
          </div>
        </div>
      </div>
    </>
  );
}
