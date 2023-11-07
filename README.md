# GradeUp
This is a platform where teaching faculty can grade student responses an using inbuilt AI algorithm, check feedback and students can view their individual scores

## Why GradeUp?
   * Intuitive Design
   * Fast and accurate grading
   * Easy communication of grades to students
   * Feedback based on performance

## Tech Stack
   * HTML
   * CSS
   * Bootstrap
   * Javascript
   * React.js
   * Python(libraries mentioned in requirements)
   * MongoDB
   * Flask

## Instructions to make the model answer key:
   * The model answer key.txt file must start with Total marks mentioning the total marks in the paper.
   * Then it must have the Total Questions mentioned in the paper.
   * Then it must show the question wise marks distribution.
   * Then it must have the answer in the following format:
	Answer 1(Replace with the answer number)  : 
	Subpoint 1[Content of subpoint]
	Type: Mention the type: meaning, keywords,FIB. If the type is keywords then write a hyphen and write all the 	keywords you expect in the answer separated by commas.
	* In the Type: end the line with maximum marks for that subpoint in square brackets.  [ ]
	* After each subpoint, in a new line write two hyphens(--)
	* Write other subpoints in the same format.
        * After each answer, write ‘End of answer’ signifying the end of that answer.

## Requirements
1. Make sure that you have react.js and mongodb installed on your system.
2.Run "pip install flask, pymongo, urlib.parse, bcrypt, flask_cors, flask_login, bson,pandas, re, io, werkzeug.utils,scipy,matplotlib" for python on Windows


## How to run this app?
1. Change the directory to the folder where you have cloned this repo.
2. Run "npm start" in terminal.
3. Run "python app.py" in another terminal..
