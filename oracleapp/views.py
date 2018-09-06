from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import requests
import numpy as np
import os
import datetime
import pytz
import csv
#import googlemaps
import json
import urllib
from pathlib import Path
from . import word_processing

from .forms import OnTheGoForm, PlannerForm, TouristForm, OracleForm
from .ml import predictor_ann_improved
from .ml import getWeather
from .ml import getDayOfYear
from .ml import secondsSinceMidnight
from .ml import getWeekDayBinaryArray
from .ml import getWeather
from .ml import getModelAndProgNum

from busy.settings import STATIC_ROOT

# Create dictionary object for events from csv file

#model_info_events18_file = Path('model_info/events18.csv')
#with open(STATIC_ROOT + 'model_info/events18.csv', mode='r') as infile:
#    reader = csv.reader(infile)
#    events = {rows[0]:[rows[1],rows[2],rows[3],rows[4],rows[5],rows[6]] for rows in reader}

# Create your views here.
def oracleIndex(request):
    return render(request, 'index.html')


knownWords = Path(STATIC_ROOT+'/knownWords')
words = knownWords / 'wordsAutosuggest.json' #Using the special ' / ' path notation from Pathlib
def queryAutosuggest(request):
    #return JsonResponse({ 'words': ['word1', 'word2', 'word3'] })
    #params = request.GET
    #firstLetter = params['word'][0]
    with open(words, 'r') as wordsFile:
        #wordsDict = json.load(wordsFile)
        #if firstLetter in wordsDict:
        #    pass

        return HttpResponse(wordsFile.read())


def oracleResponse(request):
    params = request.GET
    text = params['text']

    # Do some clean up
    text = text.lower()
    sentiment = word_processing.analyzeSentiment(text)
    tokensArray = word_processing.processInputText(text)

    # Construct the response
    response, debug = word_processing.generateResponse(tokensArray, sentiment)
    responseObject = {'text' : response, 'debug': debug}

    return JsonResponse(responseObject)









# Function to retrieve bus stops for frontend
def busStops(request):
    r = requests.get("https://data.dublinked.ie/cgi-bin/rtpi/busstopinformation?format=json&operator=bac")
    if r.status_code == requests.codes.ok:
        return HttpResponse(r.text)

    #if the above API fails, try another...
    r = requests.get("https://data.smartdublin.ie/cgi-bin/rtpi/busstopinformation?format=json&operator=bac")
    if r.status_code == requests.codes.ok:
        return HttpResponse(r.text)
    else: #If all APIs fail, use local file
        with open(STATIC_ROOT+'/bus_data/busstopinformation.json', 'r', encoding="utf8") as file:
            return HttpResponse(file.read())


#function to return Google Directions API query results for the map
def directions(request):
    params = request.GET;
    r = requests.get("https://maps.googleapis.com/maps/api/directions/json",
                     params={'origin': params['origin'],
                             'destination': params['destination'],
                             'mode': params['mode'],
                             'transit_mode': params['transit_mode'],
                             'key': os.environ.get('DIRECTIONS_API')})
    if r.status_code == requests.codes.ok:
        return HttpResponse(r.text)
    else:
        return HttpResponse('fail...')


#Function for RTPI querying for Route Number Autosuggests.
def routeNumberAutosuggest(request):
    r = requests.get("https://data.dublinked.ie/cgi-bin/rtpi/routelistinformation")
    if r.status_code == requests.codes.ok:
        return HttpResponse(r.text)


def loadTest(request):
    with open(STATIC_ROOT+'/load_testing/loaderio-66417165d8f4c651a7a4a33b4dd4c867.txt', 'r', encoding="utf8") as file:
        return HttpResponse(file.read())
