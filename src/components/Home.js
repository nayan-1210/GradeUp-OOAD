import React from 'react'
import "./Home.css";

export default function Home() {

    const clickLogin = () => {
        const currentURL = window.location.href;
        const loginURL = `${currentURL}login`;
        window.location.href = loginURL;
      }
  return (
    // <div>
        
        
    // </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6">
                <div class="text">
                    <h1>Welcome to GradeUp</h1>
                    <h2>Your Grading Companion</h2>
                    <p>Save your valuable time with our advanced AI</p>
                    <button onClick={clickLogin} type="button" class="btn btn-primary" id="getStarted">Get Started</button>
                </div>
            </div>
            <div class="col-md-6">
                <img src="https://api.deepai.org/job-view-file/48b50705-5b89-4b11-8144-0416617cda5c/outputs/output.jpg" alt=" Image" className="img-fluid"/>
            </div>
        </div>
    </div>
    
  )
}
