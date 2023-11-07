import React from "react";
import "./Navbar2.css";

export default function Navbar2() {
  return (
    <header id="header" class="fixed-top header-transparent header-scrolled">
      <div class="container d-flex align-items-center justify-content-between">
        <div class="logo">
          <h1>
            <a href="/">GradeUp</a>
          </h1>
        </div>

        <nav id="navbar" class="navbar">
          <ul>
            <li>
              <a class="nav-link scrollto" href="/">
                Home
              </a>
            </li>
            <li>
              <a class="nav-link scrollto" href="/">
                App Features
              </a>
            </li>

            <li>
              <a class="getstarted scrollto" href="/login">
                Get Started
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
