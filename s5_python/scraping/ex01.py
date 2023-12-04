# 스크래핑 - cgv 영화 목록

import requests
from bs4 import BeautifulSoup
import json
import streamlit as st

url = 'http://www.cgv.co.kr/movies/?lt=1&ft=0'
res = requests.get(url)
res.raise_for_status()
# print(res.text)

soup = BeautifulSoup(res.text, 'lxml')
title = soup.title.get_text()

# print(title)
# print(soup.a)
# print(soup.a.attrs)
# print(soup.a['href'])

chart = soup.find('div', attrs={'class': 'sect-movie-chart'})
movies = chart.find_all('li') # 모든 아이템을 가져오는 작업

# print(len(movies))

# print('-' * 50)
json_movies = []
for movie in movies:
    # 예약 사이트
    link = 'http://www.cgv.co.kr/'
    link += movie.find('a', attrs={'class':'link-reservation'})['href']
    # 예매율
    percent = movie.find('strong', attrs={'class': 'percent'})
    percent = percent.span.get_text()
    # 포스터
    image = movie.find('img')['src']
    # 랭킹
    rank = movie.find('strong', attrs={'class': 'rank'}).get_text()
    # 영화제목
    title = movie.find('strong', attrs={'class': 'title'}).get_text()

    # print(f'{rank} : {title}')
    # print(f'예매율 : {percent}')
    # print(f'포스터 : {image}')
    # print(f'예약사이트 : {link}')

    json_movie = {'rank': rank, 'title': title, 'image': image, 'percent': percent, 'link': link}
    json_movies.append(json_movie)

# print(json_movies)

# with open('movie.json', 'w', encoding='utf-8') as file:
#     json.dump(json_movies, file, indent='\t', ensure_ascii=False)

# print(len(json_movies))

st.set_page_config(layout='wide')
st.header('CGV 무비차트')

idx = 0
for row in range(0, 5):
    cols=st.columns(4)
    for col in cols:
        if idx >= 19:
            break
        else:
            movie = json_movies[idx]
            col.image(movie['image'])
            col.write(movie['title'])
            idx += 1