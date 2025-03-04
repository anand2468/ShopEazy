from flask import Flask, request, jsonify, render_template, url_for
from flask_cors import CORS
app = Flask(__name__)
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
import re
import time
from urllib.parse import quote_plus
import pyperclip
import time
CORS(app)
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run without GUI
chrome_options.add_argument("--disable-gpu")  # Recommended for headless mode
chrome_options.add_argument("--no-sandbox")  # Bypass OS security model (useful for Linux)


def flipkart_search(product):
    try:
        query = quote_plus(product)
        url = f'https://www.flipkart.com/search?q={query}'

        driver = webdriver.Chrome(options=chrome_options)
        driver.get(url)

        time.sleep(3)

        products = driver.find_elements(By.XPATH, "//div[@class='cPHDOP col-12-12']")
        price_pattern = '<div class="Nx9bqj _4b5DiR">₹([\d,]*)</div>'
        product_name_pattern = '<div class="KzDlHZ">(.*?)</div>'
        link_pattern = 'href="([a-zA-Z-0-9\/]*)'
        image_url = 'src="(https:\/\/rukminim2\.flixcart\.com\/image\/[^"]+)"'


        details = []
        print(len(products))
        for i in products[3:-5]:
            data = i.get_attribute("outerHTML")
            res = {
                "name": re.findall(product_name_pattern, data)[0],
                "price": re.findall(price_pattern, data)[0],
                "url": re.findall(link_pattern, data)[0],
                "website": "flipkart",
                'image_url':re.findall(image_url, data)[0]
            }
            details.append(res)

        driver.quit()
        return details

    except Exception as e:
        print(f"Error scraping Flipkart: {e}")
        return None

def aggrigate(item):
    dr = webdriver.Chrome(options=chrome_options)
    # dr.maximize_window()
    # dr.minimize_window()
    # item = 'https://www.amazon.in/Apple-iPhone-15-128-GB/dp/B0CHX1W1XY/ref=sr_1_1_sspa?crid=1HKU2S5MZREGE&dib=eyJ2IjoiMSJ9.428qLnKRufzxkqZiMxKyG9zL9MuuPhaJpH4zH7PoPTOQfLsK-PdckFcaFrkxGOZvGi-fDl2NSHuhkZ8Pd_YoeOgNurVifuz6gfU09oPS06amIzDiP7_adEAJUfWd8awl6IaSOav6dgf5ImPBYz87-2dt8CE7enNPwf9Y1O0YQYtVkjvfNMVet3K45Y0tX506pzcAl9s1Lb1JFrKdlqWTP79-X4HLDLoY6yoEJKH5t9I.GArtoXT9nH4el0bpJJ0UHoomVqivFTUPz_GPc17MQ1Y&dib_tag=se&keywords=iphone&qid=1739592151&sprefix=ipho%2Caps%2C235&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1'
    dr.get('https://buyhatke.com')
    pyperclip.copy(item)
    inp = dr.find_element(By.XPATH, "//input[@id='product-search-bar']")
    
    inp.send_keys(Keys.COMMAND, 'v')
    time.sleep(5)
    try:
        dr.find_element(By.XPATH, '/html/body/div/div[1]/div[1]/main/section/div[2]/section[1]/button').click()
    except Exception as e:
        print(f'none {e}')
    dr.implicitly_wait(5)
    # mainxpath = "/html/body/div/div[1]/div[1]/main"
    # main_element = dr.find_element(By.XPATH, mainxpath)
    # data = main_element.get_attribute('outerHTML')
    itms = dr.find_element(By.XPATH, '/html/body/div/div[1]/div[1]/main/section/div[2]/section[1]')
    data = itms.get_attribute('outerHTML')
    prod = dr.find_element(By.XPATH, '/html/body/div/div[1]/div[1]/main/section/div[1]')
    prodata = prod.get_attribute('outerHTML')
    dr.close()
    return {"data":data, "productData":prodata}


@app.route('/')
def index():
    return render_template('index2.html')

@app.route('/getproducts')
def get_products():
    item = request.args.get('item')
    products = flipkart_search(item)
    return jsonify(products)

@app.route('/getSuggestions', methods=['post'])
def get_suggestion():
    data = request.form
    print(data)

    if data['item'].startswith('https'):
        details = aggrigate(data['item'])
        return render_template( 'aggrigate.html', content = details['data'], product = details['productData'] )
    else:
        items = flipkart_search(data['item'])
        if items == None:
            return "try again <a href='/'>go back <a>"
        return render_template('temp.html', items = items)
    


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=80)


#https://www.amazon.in/Apple-iPhone-15-128-GB/
#https://www.flipkart.com/apple-iphone-13-midnight-128-gb/

#https://www.amazon.in/apple-iphone-13