#!/usr/bin/python
# -*- coding: utf-8 -*-

import os, sys, re, json, gzip, time
import urllib, urllib2
import requests
from datetime import date, datetime, timedelta

FILENAME 			= 'item.json'
AZURE_CV_HOST		= 'https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze'
AZURE_CV_ACCESS_KEY	= '5d491fbce1f44f63bbd560ccd93383e3';

def getJSON(filename):
	with open(filename) as data_file:
		return json.load(data_file)

def putJSON(item, filename):
	with open(filename, 'w') as data_file:
		return json.dump(item, data_file, indent=4, sort_keys=True, separators=(',', ': '))

def getCV(url, feature):	
	url = url.strip()
	headers = {
		'content-type'				: 'application/json',
		'Ocp-Apim-Subscription-Key'	: AZURE_CV_ACCESS_KEY
	}
	params = { 'visualFeatures': feature }
	image  = { 'url': url }

	r = requests.post(AZURE_CV_HOST, data=json.dumps(image), headers=headers, params=params)
	return r.json()

def toUTF8List(items):
	return [x.encode('utf-8') for x in items]

def updateItem():
	items = getJSON(os.path.join(os.path.dirname(os.path.abspath(__file__)), FILENAME))

	for item in items:
		time.sleep(2)
		try:
			colorInfo = getCV(item['item_photo'], 'Color')['color']
			print colorInfo
			item['item_hex'] = '#' + colorInfo['accentColor']
			item['item_fgcolor'] = colorInfo['dominantColorForeground']
			item['item_bgcolor'] = colorInfo['dominantColorBackground']
		except Exception, e:
			pass

		try:
			tagInfo   = getCV(item['item_photo'], 'Tags')['tags']
			print tagInfo
			for tag in tagInfo:
				item['item_tags'].append(tag['name'])
		except Exception, e:
			pass

	putJSON(items, os.path.join(os.path.dirname(os.path.abspath(__file__)), FILENAME))

if __name__ == "__main__":
	updateItem()
