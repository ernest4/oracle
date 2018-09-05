import json

with open('../../static/knownWords/words.json', 'w') as wordsFile:
    wordsDict = {}

    for letter in 'abcdefghijklmnopqrstuvwxyz':
        wordsDict[letter] = []

    wordsDict['y'].append('you')

    for number in range(10000):
        wordsDict['d'].append("d" + str(number))

    for number in range(1000):
        wordsDict['i'].append("i" + str(number))

    for number in range(100):
        wordsDict['h'].append("h" + str(number))

    for number in range(10):
        wordsDict['t'].append("t" + str(number))

    print(wordsDict)

    json.dump(wordsDict, wordsFile)