from bs4 import BeautifulSoup as BS
import requests
import json
import time

URLs = json.load(open('./itemList.json', 'r'))

headers = {
        'accept':
        '*/*',
        'accept-encoding':
        'gzip, deflate, br',
        'accept-language':
        'en-GB,en;q=0.9,en-US;q=0.8,hi;q=0.7,la;q=0.6',
        'cache-control':
        'no-cache',
        'dnt':
        '1',
        'pragma':
        'no-cache',
        'referer':
        'https',
        'sec-fetch-mode':
        'no-cors',
        'sec-fetch-site':
        'cross-site',
        "user-agent": "Lynx/2.8.8pre.4 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/2.12.23"
        }
        # Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML%2C like Gecko) Chrome/97.0.4692.99 Safari/537.36 OPR/83.0.4254.62


def trackAmazon(URL):
    page = requests.get(URL, headers=headers)
    soup = BS(page.content, 'html.parser')

    try:
        color = soup.find(id="inline-twister-expanded-dimension-text-color_name").get_text().strip()
    except:
        color=""
    try:
        price = soup.find("span",class_="a-price-whole").get_text().strip()[:-1]
    except:
        return {}
    try:
        size = soup.find(id="inline-twister-expanded-dimension-text-size_name").get_text().strip()
    except:
        size = ""
    try:
        image = soup.find(id="landingImage")["data-old-hires"]
    except:
        image=""
    colorSize = " ".join([color,size])

    item = {"colorSize":colorSize,"color":color, "size":size,  "image":image, "info":[{"link":URL, "site":"amazon", "price":price}]}
    return item

def trackFlipkart(URL):
    page = requests.get(URL, headers=headers)
    soup = BS(page.content, 'html.parser')

    try:
        temp1 = soup.find("span",class_="B_NuCI").get_text().strip()
        price = soup.find("div",class_="_30jeq3 _16Jk6d").get_text().strip()[1:]
        try:
            openIndex = temp1.find("(")
            commaIndex = temp1.find(",")
            color = temp1[openIndex+1:commaIndex].strip()
            size = temp1[commaIndex+1:-1].strip()
        except:
            color=""
            size=""
        colorSize = " ".join([color,size])
        try:
            image = soup.find("img",class_="_396cs4 _2amPTt _3qGmMb")["src"]
        except:
            image=""
    except:
        return {}

    item = {"colorSize":colorSize, "color":color, "size":size, "info":[{"link":URL, "site":"flipkart", "price":price}]}

    return item


def check(item_info):
    title = item_info["item"]
    obj = {"title":title, "itemList": []}

    for i in item_info["links"]:
        if "amazon" in i:
            item = trackAmazon(i)
        elif "flipkart" in i:
            item = trackFlipkart(i)
        else:
            continue
        if item == {}:
            continue
        found=0
        print("\n\n\n",i, item)
        for j in obj["itemList"]:
            if j["colorSize"]==item["colorSize"]:
                # print("found same colorSize",item["colorSize"], item["colorSize"]==j["colorSize"], item, j)
                found=1
                j["info"].append(item["info"][0])
                break
        if not found:
            obj["itemList"].append(item)
    print(obj)
    jsonFile = open("prices.json", "r")
    data1 = json.load(jsonFile)
    jsonFile.close()
    data = data1
    jsonFile = open("prices.json", "w+")
    found=0
    for t in data:
        if (t["title"] == obj["title"]):
            t["itemList"] = obj["itemList"]
            found=1
            break
    if not found:
        data.append(obj)
    # print(data)
    jsonString = json.dumps(data,indent=4)
    jsonFile.write(jsonString)
    jsonFile.close()



x = int(0)
while (True):
    print("running script\ninstance:", x)
    x = x + 1
    for i in URLs:
        check(i)
    print("sleeping for", 600, "seconds")
    time.sleep(600)
