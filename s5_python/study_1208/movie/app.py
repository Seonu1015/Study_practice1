from flask import Flask, render_template
import pickle
from tmdbv3api import Movie, TMDb

app = Flask(__name__)

movie = Movie()
tmdb = TMDb()
tmdb.api_key = 'c668cda4cf75bf267ef2aeffa2da0341'
tmdb.language = 'ko-KR'

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/page1')
def page1():
    return render_template("/movie/page1.html")

@app.route('/movie1.json')
def movie1():
    movies = pickle.load(open('./data/movies1.pickle', 'rb'))
    json = []
    for i in range(10):
        etitle = movies['title'].iloc[i]
        score = round(movies['score'].iloc[i], 2)
        id = movies['id'].iloc[i]
        details = movie.details(id)
        
        title = details['title']
        image = details['poster_path']
        if image:
            image = "https://image.tmdb.org/t/p/w500" + image
        else:
            image = "http://via.placeholder.com/100x120"
        data = {'title': title, 'etitle':etitle, 'id': str(id), 'score':str(score), 'image':image,}
        json.append(data)
    return json

@app.route('/page2')
def page2():
    return render_template("/movie/page2.html")

# 전체 영화 제목
@app.route('/movies.json')
def movies():
    movies = pickle.load(open('./data/movies.pickle', 'rb'))
    json = movies.to_json(orient='records')
    return json

# 줄거리 기반 추천영화
@app.route('/movies2.json/<title>')
def movies2(title):
    sim = pickle.load(open('./data/sim.pickle', 'rb'))
    movies = pickle.load(open('./data/movies.pickle', 'rb'))

    # 1. 제목에 대한 인덱스값 확인
    filter = movies['title'] == title
    idx = movies[filter].index[0]

    # 2. 유사도 테이블에서 인덱스번째 유사도 데이터를 추출
    sim_scores = sim[idx]

    # 3. 영화 인덱스, 유사도값 배열로 생성
    sim_scores = list(enumerate(sim_scores))

    # 4. 유사도가 높은 순으로 정렬
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # 5. 상위 10개의 영화 데이터를 추출
    sim_scores = sim_scores[1:13]

    # 6. 영화 아이디만 추출하여 배열 생성
    sim_movies = [i[0] for i in sim_scores]

    json = []
    for i in range(12):
        etitle = movies['title'].iloc[sim_movies[i]]

        id = movies['id'].iloc[sim_movies[i]]
        details = movie.details(id)
        title = details['title']
        image = details['poster_path']
        if image:
            image = "https://image.tmdb.org/t/p/w500" + image
        else:
            image = "http://via.placeholder.com/100x120"

        data = {'etitle':etitle, 'title':title, 'image':image}
        json.append(data)

    return json

@app.route('/page3')
def page3():
    return render_template("/movie/page3.html")

# 줄거리 기반 추천영화
@app.route('/movies3.json/<title>')
def movies3(title):
    sim = pickle.load(open('./data/sim2.pickle', 'rb'))
    movies = pickle.load(open('./data/movies.pickle', 'rb'))

    # 1. 제목에 대한 인덱스값 확인
    filter = movies['title'] == title
    idx = movies[filter].index[0]

    # 2. 유사도 테이블에서 인덱스번째 유사도 데이터를 추출
    sim_scores = sim[idx]

    # 3. 영화 인덱스, 유사도값 배열로 생성
    sim_scores = list(enumerate(sim_scores))

    # 4. 유사도가 높은 순으로 정렬
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # 5. 상위 10개의 영화 데이터를 추출
    sim_scores = sim_scores[1:13]

    # 6. 영화 아이디만 추출하여 배열 생성
    sim_movies = [i[0] for i in sim_scores]

    json = []
    for i in range(12):
        etitle = movies['title'].iloc[sim_movies[i]]

        id = movies['id'].iloc[sim_movies[i]]
        details = movie.details(id)
        title = details['title']
        image = details['poster_path']
        if image:
            image = "https://image.tmdb.org/t/p/w500" + image
        else:
            image = "http://via.placeholder.com/100x120"

        data = {'etitle':etitle, 'title':title, 'image':image}
        json.append(data)

    return json

if __name__ == "__main__":
    app.run(port=5000, debug=True)