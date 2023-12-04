# 스크래핑과 크롤링 차이 - 이미지 검색

import requests
from bs4 import BeautifulSoup

url = 'https://www.google.com/search?q=%EC%86%A1%EC%A4%91%EA%B8%B0&sca_esv=587611622&tbm=isch&sxsrf=AM9HkKmXyQyk7CmKcPWQM3VLT5HzsfxSdw:1701677484196&source=lnms&sa=X&sqi=2&ved=2ahUKEwizxt7PqvWCAxWNslYBHYnGBMMQ_AUoAnoECAIQBA&biw=1397&bih=784&dpr=1'

# user agent : https://m.avalon.co.kr/check.html
header = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'}

res = requests.get(url, headers=header)
res.raise_for_status()

soup = BeautifulSoup(res.text, 'lxml')
images = soup.find_all('div', attrs={'class': 'isv-r PNCib ViTmJb BUooTd'})
# print(len(images))

for idx, image in enumerate(images):
    title = image.find('div', attrs={'class':'zbRPDe M2qv4b P4HtKe'}).get_text()
    print(idx + 1, ':', title)