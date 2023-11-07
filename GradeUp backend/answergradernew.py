import re
from scipy.spatial.distance import cosine
from sentence_transformers import SentenceTransformer
from nltk.corpus import wordnet
import csv
import nltk
nltk.download('wordnet')

model = SentenceTransformer('pritamdeka/BioBERT-mnli-snli-scinli-scitail-mednli-stsb')
def is_substring(substring, string):
    return substring in string
def write_list_to_csv(filename, data,student_enroll):
    # Open the CSV file in append mode
    with open(filename, 'a', newline='') as file:
        writer = csv.writer(file)
        # Write the list as a new row in the CSV file
        writer.writerow([student_enroll]+data+[sum(data)])
def get_bert_embedding(sentence):
    return(model.encode(sentence))

def cosine_similarity(sentence1, sentence2):
    embedding1 = get_bert_embedding(sentence1)
    embedding2 = get_bert_embedding(sentence2)
    similarity = 1 - cosine(embedding1, embedding2)
    return similarity

def get_synonyms(word):
    synonyms=[]
    for syn in wordnet.synsets(word):
        for lemma in syn.lemmas():
            synonyms.append(lemma.name())
    return synonyms
def get_antonyms(word):
    antonyms=[]
    for syn in wordnet.synsets(word):
        for lemma in syn.lemmas():
            if lemma.antonyms():
                antonyms.append(lemma.antonyms()[0].name())
    return antonyms
def dist_marks(sim):
    if(sim>=0.85): return 1
    elif(sim>=0.65): return 0.75
    elif(sim>=0.5): return 0.5
    elif(sim>=0.3): return 0.25
    else: return 0

def split_answer_into_paragraphs(answer_text):
    paragraphs = re.split(r'--', answer_text)
    # Remove leading/trailing whitespace and empty paragraphs
    paragraphs = [paragraph.strip() for paragraph in paragraphs if paragraph.strip()]

    return paragraphs

def evaluate_marks_for_paragraph(paragraph_type, paragraph_text, paragraph_marks, keywords_expected,ans_text):
    # Evaluate marks for a paragraph based on its type and expected keywords
    marks_obtained=0
    if paragraph_type == "keywords":
        sim=cosine_similarity(paragraph_text,ans_text)
        count=0
        for keyword in keywords_expected:
             not_req="not "+keyword.casefold()
             if(keyword.casefold() in ans_text.casefold() and not not_req in ans_text.casefold()):
               count=count+1
             else:
                synonyms=get_synonyms(keyword.casefold())
                for syno in synonyms:
                     not_syno= "not " + syno.casefold()
                     if(syno in ans_text.casefold() and not not_syno in ans_text.casefold()):
                        count=count+1
                        break
                antonyms=get_antonyms(keyword.casefold())
                for anto in antonyms:
                    not_anto="not "+anto.casefold()
                    if(not_anto in ans_text.casefold()):
                        count=count+1
                        break


        keyword_score=count/len(keywords_expected)
        total_score=round(paragraph_marks*(keyword_score/2+dist_marks(sim)/2),3)
        return total_score
    elif paragraph_type == "meaning":
        sim=cosine_similarity(paragraph_text,ans_text)
        marks_alloted=round(dist_marks(sim)*paragraph_marks,2);
        return marks_alloted
    elif paragraph_type == "FIB":
        if is_substring(paragraph_text.casefold(),ans_text.casefold() ):
            marks_obtained = paragraph_marks
            return round(marks_obtained,2)
        else:
            return 0  # Default case, no specific type
    return 0
def calculate_answer_marks(answer_data,student_answers):
    total_answer_marks = []
    current_ans=0
    for answer in answer_data:
        paragraphs = split_answer_into_paragraphs(answer['answer_text'])
        answer_marks = 0
        keywords_expected = []
        current_ans=answer['number']
        for paragraph in paragraphs:
            # Split the paragraph by the period and newline character to separate the paragraph text
            # from the type and marks.
            paragraph_parts = paragraph.split('Type')

            # Now, you have the paragraph text, type, and marks as separate elements in the list.
            paragraph_text = paragraph_parts[0].strip()  # Contains the paragraph text
            type_and_marks = paragraph_parts[1].strip()  # Contains the type and marks

            # Split the type and marks by the colon and extract them.
            type_parts = type_and_marks.split(':')
            paragraph_type = type_parts[1].split('-')
            keywords_expected = []

            if len(paragraph_type) > 1:
                paragraph_type_val = paragraph_type[0].strip()
                keywords = paragraph_type[1].split('[')[0].strip()
                keywords_list = [keyword.strip() for keyword in keywords.split(',')]
                keywords_expected.extend(keywords_list)
            else:
                paragraph_type_val = paragraph_type[0].split('[')[0].strip()

            marks_part = type_parts[-1].split('[')[1].strip(']').strip()
            paragraph_marks = int(marks_part)
            for ans_no,ans_text in student_answers:
                if(ans_no==current_ans):
                    marks = evaluate_marks_for_paragraph(paragraph_type_val, paragraph_text, paragraph_marks,
                                                         keywords_expected,ans_text)
                    answer_marks += marks


        total_answer_marks.append(answer_marks)
    return total_answer_marks

def extract_answers(text):
    # Extract answers from the text and store them in a list
    answer_pattern = r'Answer (\d+) :\n([\s\S]*?)(?=(?:Answer \d+ :)|End of answer|$)'
    answer_matches = re.findall(answer_pattern, text)

    answer_data = []
    for match in answer_matches:
        answer_number = int(match[0])
        answer_text = match[1].strip()
        answer_data.append({'number': answer_number, 'answer_text': answer_text})

    return answer_data
def get_students_answer(student_text):
    pattern = r'Ans (\d+)\n(.*?)(?=(?:Ans \d+)|\Z)'

    # Use re.findall to extract answers and their numbers
    answers = re.findall(pattern, student_text, re.DOTALL)

    # Create a list of pairs (answer number, answer text)
    answer_list = [(int(answer[0]), answer[1].strip()) for answer in answers]

    # Sort the list by answer number
    sorted_answers = sorted(answer_list, key=lambda x: x[0])

    return sorted_answers


def main():
    # with open(r"results.csv", 'w', newline='') as file:
    #     pass

    with open("Model_answer_key.txt", 'r') as file:
       text=file.read()

    total_marks_match = re.search(r'Total marks=(\d+)', text)
    total_marks = int(total_marks_match.group(1)) if total_marks_match else 0
    print("Total marks in this paper: ", total_marks)

    total_questions_match = re.search(r'Total Questions=(\d+)', text)
    total_questions = int(total_questions_match.group(1)) if total_questions_match else 0
    print("Total number of questions: ", total_questions)

    question_pattern = r'Question \d+: (\d+) marks'
    question_marks = [int(match.group(1)) for match in re.finditer(question_pattern, text)]
    answer_data = extract_answers(text)


    # header_list=[]
    # header_list = [f"Q{i}" for i in range(1, total_questions + 1)]

    # with open(r"results.csv", 'a', newline='') as file:
    #     writer = csv.writer(file)
    #     # Write the list as a new row in the CSV file
    #     writer.writerow(["Enrollment number"]+header_list+["Total"])

    name_pattern = r"Student name:\s+(.*)"
    enrollment_pattern = r"Enrollment number:\s+(\d+)"

    # Search for the patterns in the text


    with open("student1.txt", 'r') as file:
        student_text = file.read()
        name_match = re.search(name_pattern, student_text)
        enrollment_match = re.search(enrollment_pattern, student_text)

        # Extract the matched values
        student_name = name_match.group(1) if name_match else "Name not found"
        student_enroll = enrollment_match.group(1) if enrollment_match else "Enrollment number not found"
        student_answers=get_students_answer(student_text)

        answer_marks = calculate_answer_marks(answer_data,student_answers)
        print(answer_marks)
        print("Your marks ",sum(answer_marks))
        # print("Question Marks:", question_marks)
        # csv_filename=r"results.csv"
        csv_filename = "C:\\Users\\dell\\Desktop\\ooad\\src\\components\\results.csv"
        write_list_to_csv(csv_filename,answer_marks,student_enroll)

csv_filename = r"C:\\Users\\dell\\Desktop\\ooad\\src\\components\\results.csv"  # Update with the path to your CSV file
csv_data = []

