import pandas as pd
import matplotlib.pyplot as plt


def main():
        csv_file = r"C:\\Users\\dell\\Desktop\\ooad\\src\\components\\results.csv"  # Replace with the path to your CSV file
        data = pd.read_csv(csv_file)

        total_marks = data["Total"]
        avg = total_marks.mean()
        std = total_marks.std()
        print(avg)
        print(std)

        # Create a histogram
        plt.hist(total_marks, bins=10, color='lightblue', edgecolor='black')
        plt.xlabel("Total Marks")
        plt.ylabel("Number of Students")
        plt.title("Histogram of Total Marks")
        plt.grid(axis='y', alpha=0.75)

        # Save the histogram image before displaying it
        plt.savefig("C:\\Users\\dell\\Desktop\\ooad\\src\\components\\hist.png")

        # Display the histogram
        # plt.show()

        score_ranges = [-1, 0.33 * 15, 1.00 * 15]
        labels = ["Fail", "Pass"]
        data['Score Range'] = pd.cut(data['Total'], bins=score_ranges, labels=labels)

        # Calculate the number of students in each range
        score_counts = data['Score Range'].value_counts()

        # Create a pie chart
        fig = plt.figure(figsize=(8, 8))
        label_props = {'fontsize': 12}
        explode = (0.1, 0)

        plt.pie(score_counts, labels=score_counts.index, autopct='%1.1f%%', startangle=90,
                colors=['#0bd552', "#Ff4848"], labeldistance=0.7, textprops=label_props, explode=explode)
        plt.axis('equal')  # Equal aspect ratio ensures that the pie is drawn as a circle.
        plt.title('''% of students that pass the exam\n\n''')

        # Save the pie chart image before displaying it
        plt.savefig("C:\\Users\\dell\\Desktop\\ooad\\src\\components\\pie_chart.png")

        # Display the pie chart
        # plt.show()
