from flask import Blueprint, render_template, send_file

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from io import BytesIO

from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

score = Blueprint('score', __name__)

@score.route('/page4')
def page4():
    return render_template("page4.html")

def sigmoid(reg, X):
    m = reg.coef_ # 기울기
    b = reg.intercept_ # y절편
    y = m * X + b
    P = 1 / (1 + (np.exp(-y)))
    P = P.reshape(-1)
    return P

# 로지스틱회귀 모델링
def logistic():
    df = pd.read_csv('./data/LogisticRegressionData.csv')
    X = df.iloc[:, :-1].values
    y = df.iloc[:, -1].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
    reg = LogisticRegression()
    reg.fit(X_train, y_train)
    
    return reg, X_train, y_train

# 로지스틱회귀 그래프
@score.route('/logistic/graph')
def logistic_graph():
    reg = logistic()[0]
    X = logistic()[1]
    y = logistic()[2]

    X_range = np.arange(min(X), max(X), 0.1)

    plt.figure(figsize=(8, 5), dpi=70)
    plt.scatter(X, y, color='grey')
    plt.plot(X_range, np.full(len(X_range), 0.5), color="red")
    plt.plot(X_range, sigmoid(reg, X_range), color="black")
    
    img = BytesIO()
    plt.savefig(img, format="png", dpi=100)
    img.seek(0)
    return send_file(img, mimetype="image/png")

# 로지스틱회귀 합격률
@score.route("/logistic/<hour>")
def logistic_prob(hour):
    hour = float(hour)
    reg = logistic()[0]
    pred = reg.predict_proba([[hour]])
    return str(pred[0, 1])