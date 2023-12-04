# 스크래핑 - 지마켓 상품 목록

import requests
from bs4 import BeautifulSoup

def fn_soup(text):
    soup = BeautifulSoup(text, 'lxml')

    items = soup.find_all('div', attrs={'class':'box__item-container'}) # 모든 아이템을 가져오는 작업
    # print(len(items))

    print('-' * 80)
    seq = 0
    for i, item in enumerate(items): # 인덱스 값 추가 -> enumerate
        name = item.find('span', attrs={'class':'text__item'})['title']
        price = item.find('strong', attrs={'class':'text text__value'}).get_text()
        rate = item.find('span', attrs={'class':'image__awards-points'})
        if rate:
            rate = rate['style']
            index = rate.find(":") + 1
            rate = rate[index:-1]
        else:
            continue
        count = item.find('li', attrs={'class':'list-item list-item__feedback-count'})
        if count:
            count = count.find('span', attrs={'class':'text'}).get_text()
            count = count.replace('(','').replace(')','').replace(',','')
        else:
            continue

        if int(rate)>=90 and int(count)>=300:
            seq += 1
            print(f'{seq} : {name}')
            print(f'평점 : {rate}점, 리뷰 : {count}개')
            print(f'가격 : {price}원')
            print('-' * 80)

for i in range(1,6):
    print('=' * 80, i, 'page')
    url = 'https://browse.gmarket.co.kr/search?keyword={}&k=29&p={}'.format('키보드', i)
    res = requests.get(url)
    res.raise_for_status()
    fn_soup(res.text)