from flask import render_template, Blueprint, send_file, request
from io import BytesIO
import pandas as pd
import matplotlib.pyplot as plt

plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['font.size'] = 10
plt.rcParams['axes.unicode_minus'] = False

score = Blueprint('score', __name__)

@score.route('/page1')
def score_page1():
    df = pd.read_csv('score.csv', index_col='지원번호')
    df2 = df[['이름', '학교', '키', 'SW특기']]
    df3 = df[['이름', '국어', '영어', '수학']]
    return render_template('page1.html',
                            table2=df2.to_html(classes='table table-striped', table_id='tbl2'),
                            table3=df3.to_html(classes='table table-striped', table_id='tbl3'))

@score.route('/graph')
def score_graph():
    return render_template('graph.html')

@score.route('/chart/<subject>')
def score_chart(subject):
    plt.figure(figsize=(10,5), dpi=50)
    df = pd.read_csv('score.csv', index_col='지원번호')
    x=df['이름'].values
    y=df[subject].values
    plt.bar(x, y, color='#C6C491')
    # plt.show()
    img = BytesIO()
    plt.savefig(img, format='png', dpi=100)
    img.seek(0)
    return send_file(img, mimetype='image/png')

@score.route('/list.json')
def score_json():
    query = request.args['query']
    df =pd.read_csv('score.csv', index_col='지원번호')
    filter = df['이름'].str.contains(query)
    df = df[filter]
    json = df.to_json(orient='records')
    return json

@score.route('/page3')
def score_page3():
    return render_template('page3.html')