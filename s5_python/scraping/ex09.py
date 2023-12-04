# 네이버 오늘 날씨

import requests
from bs4 import BeautifulSoup

url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query={}+날씨'.format('영등포')
res = requests.get(url)
res.raise_for_status

soup = BeautifulSoup(res.text, 'lxml')
weather = soup.find('div', attrs={'class': 'api_subject_bx'})

title = weather.find('h2', attrs={'class': 'title'}).get_text()
summary = weather.find('p', attrs={'class': 'summary'}).get_text()
sum_lst = weather.find('dl', attrs={'class': 'summary_list'}).get_text()
print("[오늘의 날씨]", title)
print('-' * 50)
print(summary, '\n', sum_lst)