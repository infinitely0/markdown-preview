from flask import Flask, render_template, request
import subprocess

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = 1

def convert(filename):
    command = ["pandoc", filename, "-o", "templates/preview.html"]
    print(command)
    subprocess.run(command)

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/preview/", methods=['POST'])
def preview():
    filename = request.get_json()["filepath"]
    convert(filename)
    with open("templates/preview.html", "r") as file:
        html = file.read()
    return html
