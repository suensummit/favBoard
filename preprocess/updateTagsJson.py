#!/usr/bin/python
# -*- coding: utf-8 -*-

import os, sys, re, json, gzip, time
import urllib, urllib2
import requests
from datetime import date, datetime, timedelta

ITEM_FILENAME 		= 'item.json'
TAGS_FILENAME		= 'tags.json'

def getJSON(filename):
	with open(filename) as data_file:
		return json.load(data_file)

def putJSON(item, filename):
	with open(filename, 'w') as data_file:
		return json.dump(item, data_file, indent=4, sort_keys=True, separators=(',', ': '))

def toUTF8List(items):
	return [x.encode('utf-8') for x in items]

def updateItem():
	items = getJSON(os.path.join(os.path.dirname(os.path.abspath(__file__)), ITEM_FILENAME))
	tags = []

	for item in items:
		try:
			tags.append(item['item_hex'])
			tags.append(item['item_fgcolor'])
			tags.append(item['item_bgcolor'])
		except Exception, e:
			pass

		try:
			tags.extend(item['item_tags'])
		except Exception, e:
			pass

	tags = list(set(tags))
	putJSON(tags, os.path.join(os.path.dirname(os.path.abspath(__file__)), TAGS_FILENAME))

if __name__ == "__main__":
	updateItem()
