from flask import Blueprint, render_template, send_file
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.discriminant_analysis import StandardScaler


from io import BytesIO
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

score = Blueprint('score', __name__)

# 로시스틱회귀 페이지
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

# K-평균 페이지
@score.route('/page5')
def page5():
    return render_template("page5.html")

# K-평균 그래프
@score.route('/kmean/graph/<k>')
def kmean_grap(k):
    K= int(k)
    df = pd.read_csv('./data/KMeansData.csv')
    X = df.iloc[:, :].values
    
    sc = StandardScaler()
    X = sc.fit_transform(X)

    kmeans=KMeans(n_clusters=K, random_state=0, n_init=10)
    group = kmeans.fit_predict(X)
    centers = kmeans.cluster_centers_

    X_org = sc.inverse_transform(X)
    centers_org = sc.inverse_transform(centers)

    plt.figure(figsize=(8, 5), dpi=70)
    for cluster in range(K):
        plt.scatter(X_org[group==cluster, 0], X_org[group==cluster, 1], s=70,)
        plt.scatter(centers_org[cluster, 0], centers_org[cluster, 1], s=150, ec='black', color='yellow', marker='s')
        plt.text(centers_org[cluster, 0], centers_org[cluster, 1], cluster, va='center', ha='center')
    plt.xlabel('hours')
    plt.ylabel('score')
    
    img = BytesIO()
    plt.savefig(img, format="png", dpi=100)
    img.seek(0)
    return send_file(img, mimetype="image/png")