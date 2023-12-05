# 네이버 로그인

from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = 'https://www.naver.com/'
browser = webdriver.Chrome()
browser.get(url)
time.sleep(1)

login = browser.find_element(By.CLASS_NAME, 'MyView-module__link_login___HpHMW')
login.click()
time.sleep(1)

id = browser.find_element(By.ID, 'id')
id.send_keys('hd9536')
time.sleep(1)

pw = browser.find_element(By.ID, 'pw')
pw.send_keys('pass')
time.sleep(1)

login = browser.find_element(By.ID, 'log.login')
login.click()
time.sleep(10)