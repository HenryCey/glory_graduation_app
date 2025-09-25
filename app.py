from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

# Placeholder routes for navigation (replace with real templates later)
@app.route('/journey')
def journey():
    return render_template('journey.html')

@app.route("/gallery")
def gallery():
    return render_template("gallery.html")

@app.route("/tribute")
def tribute():
    return render_template("tribute.html")  # Tribute page

@app.route("/celebration")
def celebration():
    return render_template("celebration.html")

@app.route("/videos")
def videos():
    return render_template("videos.html")

@app.route("/poem")
def poem():
    return render_template("poem.html")

@app.route("/future")
def future():
    return render_template("future.html")

@app.route("/dedication")
def dedication():
    return render_template("dedication.html")

@app.route("/letter")
def letter():
    return render_template("letter.html")

if __name__ == "__main__":
    app.run(debug=False)
