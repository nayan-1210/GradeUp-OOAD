from flask import (
    Flask,
    request,
    render_template,
    redirect,
    url_for,
    session,
    jsonify,
    send_from_directory,
    send_file,
    Response,
)
from pymongo import MongoClient
import urllib.parse
import bcrypt
from flask_cors import CORS, cross_origin

# import flask_login
from flask_login import (
    LoginManager,
    UserMixin,
    login_user,
    login_required,
    current_user,
    logout_user,
)
from bson import ObjectId
import pandas as pd
import answergradernew as grader
import graph as plotgraph
import re
import csv
from io import BytesIO, StringIO
from werkzeug.utils import secure_filename
import os
from bson.binary import Binary
import io


app = Flask(__name__)
CORS(app)
app.secret_key = "123456"
username = "haaziqjamal"
password = "Haaziq22@"

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"  # Define the login view for redirect
login_manager.login_message = "Please log in to access this page."

# Escape the username and password using urllib.parse.quote_plus
escaped_username = urllib.parse.quote_plus(username)
escaped_password = urllib.parse.quote_plus(password)

# Construct the MongoDB URI with escaped username and password
uri = f"mongodb+srv://{escaped_username}:{escaped_password}@ooad.mbzrkra.mongodb.net/"

client = MongoClient(uri)

db = client["mydb"]
db2 = client["Answer_Evaluation"]
users = db["users"]
collection = db2["trial_csv"]

# @app.route('/')
# def home():
#     if 'username' in session:
#         return 'Logged in as: ' + session['username']
#     return render_template('login.html')


# class User(UserMixin):
#      def _init_(self, id):
#           self.id=id


# @login_manager.user_loader
class User(UserMixin):
    def _init_(self, id, email, profession, name):
        self.id = id
        self.email = email
        self.profession = profession
        self.name = name


@login_manager.user_loader
def load_user(email):
    # Implement a method to load a user by ID from your database
    # Return a User object with the user's data
    # Example: user = users.find_one({'_id': ObjectId(user_id)})
    user = users.find_one({"email": email})
    return User(user["email"], user["profession"], user["name"])


@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        print("login")
        regnumber = request.json["regnumber"]
        password = request.json["password"]
        profession = request.json["profession"]
        print(regnumber, password, profession)

        user = users.find_one({"regnumber": regnumber})

        if user is None:
            return "No such user found. Please register.", 401
        if (
            not bcrypt.checkpw(password.encode("utf-8"), user["password"])
            or not profession == user["profession"]
        ):
            return "Invalid credentials.", 401
        # user_obj=User(str(user['_id']))
        # login_user(user_obj)
        # user_obj = User(str(user['_id']), user['email'], user['profession'], user['name'])
        # login_user(user_obj)
        # session['\email'] = email
        print(str(user["_id"]))
        return str(user["_id"])


# return render_template('login.html')

# @app.route('/logout')
# def logout():
#     session.pop('username', None)
#     return redirect(url_for('home'))

# @app.route('/',methods=['GET'])
# def Hello():
#     return "YO", 200
# @app.route('/register', methods=['GET'])
# def registerGet():
#     print("hello")
#     return "ehlllo",201


@app.route("/register", methods=["POST"])
def register():
    print("register")
    print(request)
    regnumber = request.json["regnumber"]
    password = request.json["password"]
    name = request.json["name"]
    profession = request.json["profession"]
    print(regnumber)
    existing_user = users.find_one({"regnumber": regnumber})
    if existing_user:
        return "email already exists. Choose a different one."

    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    users.insert_one(
        {
            "regnumber": regnumber,
            "password": hashed_password,
            "name": name,
            "profession": profession,
        }
    )
    session["regnumber"] = regnumber

    return jsonify({"regnumber": regnumber, "profession": profession})
    # return 'Registration successful! <a href="/login">Click here to log in</a>'
    # return "Register post"


# return render_template('register.html')


@app.route("/login/studentProfile/<user_id>", methods=["GET"])
def get_student_info(user_id):
    print("hello")
    try:
        # Convert the user_id to a MongoDB ObjectId
        user_id_object = ObjectId(user_id)

        # Use user_id_object in your database query to fetch the student profile
        user_data = users.find_one({"_id": user_id_object})

        if user_data:
            # Extract the relevant fields from user_data
            student_profile = {
                "user_id": str(user_data["_id"]),
                "name": user_data["name"],
                "regnumber": user_data["regnumber"],
                "profession": user_data["profession"],
                # Add other profile data here
            }
            print("hello nayan")
            print(student_profile["name"])
            print("------------------------------------------------------")
            print((student_profile))
            print("------------------------------------------------------")
            return student_profile
        else:
            return "Student profile not found", 404
    except Exception as e:
        return str(e), 400


@app.route("/login/profProfile/<user_id>", methods=["GET"])
def get_prof_info(user_id):
    print("hello")
    try:
        # Convert the user_id to a MongoDB ObjectId
        user_id_object = ObjectId(user_id)

        # Use user_id_object in your database query to fetch the student profile
        user_data = users.find_one({"_id": user_id_object})

        if user_data:
            # Extract the relevant fields from user_data
            prof_Profile = {
                "user_id": str(user_data["_id"]),
                "name": user_data["name"],
                "regnumber": user_data["regnumber"],
                "profession": user_data["profession"],
                # Add other profile data here
            }
            print("hello nayan")
            print(prof_Profile["name"])
            print("------------------------------------------------------")
            print((prof_Profile))
            print("------------------------------------------------------")
            return prof_Profile
        else:
            return "Prof profile not found", 404
    except Exception as e:
        return str(e), 400


@app.route("/login/profProfile/<user_id>/grade", methods=["GET"])
def grade(user_id):
    collection = db2["Answer_key"]
    document2 = collection.find_one()
    if document2 is None:
        return "Answer key not found", 404

    # Extract the file content from the document
    file_content2 = document2.get("answer_key")
    file_content2 = file_content2.decode("utf-8")
    if file_content2 is None:
        return "Answer key content not found", 404

    # Save the content to a file in the root directory
    # file_name = "student1.txt"
    # file_path = ".\\"

    with open("Model_answer_key.txt", "w") as file:
        file.write(file_content2)

    with open(r"C:\\Users\\dell\\Desktop\\ooad\\src\\components\\results.csv", "w", newline="") as file:
        pass
    with open("Model_answer_key.txt", "r") as file:
        text = file.read()

    total_questions_match = re.search(r"Total Questions=(\d+)", text)
    total_questions = (
        int(total_questions_match.group(1)) if total_questions_match else 0
    )

    header_list = []
    header_list = [f"Q{i}" for i in range(1, total_questions + 1)]

    with open(r"C:\\Users\\dell\\Desktop\\ooad\\src\\components\\results.csv", "a", newline="") as file:
        writer = csv.writer(file)
        # Write the list as a new row in the CSV file
        writer.writerow(["Enrollment number"] + header_list + ["Total"])

    collection = db2["Student_response"]
    for document in collection.find():
        # document=collection.find_one({"enrollment_number": "22114055"})
        if document is None:
            return "Responses not found", 404

        # Extract the file content from the document
        file_content = document.get("response")
        file_content = file_content.decode("utf-8")
        if file_content is None:
            return "Response content not found", 404

        # Save the content to a file in the root directory
        # file_name = "student1.txt"
        # file_path = ".\\"

        with open("student1.txt", "w") as file:
            file.write(file_content)

        grader.main()

    # file = "results.csv"
    file = "C:\\Users\\dell\\Desktop\\ooad\\src\\components\\results.csv"
    collection = db2["trial_csv"]
    if file:
        # Process and save the CSV file

        df = pd.read_csv(file)
        data = df.to_dict(orient="records")

        # Insert the data into MongoDB
        collection.insert_many(data)

    plotgraph.main()
    return "Done"


@app.route("/login/studentProfile/result/<string:regnumber>", methods=["GET"])
def download_csv(regnumber):
    collection = db2["trial_csv"]
    data = list(collection.find())  # Retrieve CSV data from the MongoDB collection
    print(regnumber)
    if not data:
        return "No data found in MongoDB."
    dict = {}
    enr = int(regnumber)
    # print(data)
    for i in data:
        if i["Enrollment number"] == enr:
            dict = i
            del dict["_id"]
            del dict["Enrollment number"]
            print(dict)
            break

    return dict


@app.route("/profresult", methods=["GET"])
def download_csv2():
    collection = db2["trial_csv"]
    data = list(collection.find())  # Retrieve CSV data from the MongoDB collection

    if not data:
        return "No data found in MongoDB."

    print(data)
    # Convert MongoDB documents to a pandas DataFrame
    df = pd.DataFrame(data)

    # Create a CSV file in memory
    csv_buffer = BytesIO()
    df.to_csv(csv_buffer, index=False)

    # Set the buffer position to the beginning
    csv_buffer.seek(0)

    # Send the CSV file as a downloadable attachment
    return send_file(
        csv_buffer, as_attachment=True, download_name="result.csv", mimetype="text/csv"
    )


class ResponseSchema:
    def init(self, name, enrollment_number, marks, response):
        self.name = name
        self.enrollment_number = enrollment_number
        self.marks = marks
        self.response = response


def is_valid_txt_filename(filename):
    return filename.lower().endswith(".txt")


# @app.route("/")
# def home():
#     return render_template("form.html")


@app.route("/upload", methods=["POST"])
def upload():
    print("helllllllo")
    print(request.files)
    if "answer_key" in request.files:
        print("Entered")
        answer_key_file = request.files["answer_key"]
        if is_valid_txt_filename(answer_key_file.filename) and answer_key_file:
            answer_key_text = answer_key_file.read()
            answer_key_document = {"answer_key": answer_key_text}
            collection = db2["Answer_key"]
            collection.insert_one(answer_key_document)
            print("Answer key uploaded successfully.")
            # print(collection.find_one()["answer_key"])
        else:
            return (
                "Invalid file format. Please upload a text file for the answer key.",
                400,
            )

    if "student_response" in request.files:
        student_response_files = request.files.getlist("student_response")
        collection = db2["Student_response"]

        for student_response_file in student_response_files:
            if (
                is_valid_txt_filename(student_response_file.filename)
                and student_response_file
            ):
                response_text = student_response_file.read()

                # Extract name and enrollment number from the file name
                filename_parts = os.path.splitext(student_response_file.filename)[
                    0
                ].split("_")
                if len(filename_parts) == 2:
                    name, enrollment_number = filename_parts
                    response_document = {
                        "name": name,
                        "enrollment_number": enrollment_number,
                        "marks": [],  # You can modify this as needed
                        "response": response_text,
                    }
                    collection.insert_one(response_document)
                #                    print(collection.find_one()["response"])
                else:
                    return (
                        "Invalid file name format. File names should be in the format '<name>_<enrollment number>.txt'.",
                        400,
                    )
            else:
                return (
                    "Invalid file format. Please upload text files for student responses.",
                    400,
                )
    else:
        return "ok", 400
    return (
        "Files uploaded successfully. You can upload more answer sheets or go for a different course.",
        201,
    )

if __name__ == "__main__":
    app.run(host="localhost", debug=True, port=6969)