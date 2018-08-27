import json

with open('../../static/knownWords/words.json', 'w') as wordsFile:
    wordsDict = {}

    wordsDict['h'] = []
    for word in range(100):
        wordsDict['h'].append("h" + str(word))

    wordsDict['t'] = []
    for word in range(10):
        wordsDict['t'].append("t" + str(word))

    print(wordsDict)

    json.dump(wordsDict, wordsFile)