import json
import pickle
import nltk
from pathlib import Path
from busy.settings import STATIC_ROOT
from busy.settings import BASE_DIR


class Graph:
    '''Models the graph data structure.'''

    def __init__(self):
        self.__vertices = {}

    def setVertex(self, v):
        if not v in self.getVertices():
            # create a vertex key with empty adjacency dict
            self.__vertices[v] = {}
        else:
            # Error, vertex v already exists.
            return -1

    def setEdge(self, v1, v2, cost=None):
        # adds 1 or more bidirectional connections with corresponding cost.
        if cost is None:  # Default cost is 0.
            cost = [0 for _ in range(0, len(v2))]
        for c, v in enumerate(v2):
            if v not in self.__vertices[v1]:
                self.__vertices[v1][v] = int(cost[c])
                self.__vertices[v][v1] = int(cost[c])

    def getEdge(self, v1, v2):
        return self.__vertices[v1][v2]

    def getNeighbours(self, x):
        return self.__vertices[x]

    def getVertices(self):
        return self.__vertices.keys()

    def __str__(self):
        returnStr = ""
        for v in self.__vertices.keys():
            returnStr = "\n".join([returnStr, ''.join([v, "->", str(self.__vertices[v])])])
        return returnStr


def buildWordsGraph():
    knownWords = Path(BASE_DIR + '/static' + '/knownWords')
    words = knownWords / 'wordsGraph'  # Using the special ' / ' path notation from Pathlib

    wordsGraph = Graph()

    for i in "abcdefghij":
        wordsGraph.setVertex(i)

    wordsGraph.setVertex("what")
    wordsGraph.setVertex("'s")
    wordsGraph.setVertex("up")
    wordsGraph.setVertex("?")
    wordsGraph.setEdge("what", ["'s"], [1])
    wordsGraph.setEdge("'s", ["up"], [1])
    wordsGraph.setEdge("up", ["?"], [1])

    #Branching converstation
    wordsGraph.setVertex("i")
    wordsGraph.setVertex("you")

    wordsGraph.setVertex("alive")

    wordsGraph.setEdge("alive", ["i", "you"], [0, 1])

    wordsGraph.setVertex("Yes you are. :)")
    wordsGraph.setVertex("I'm not, I'm just software. :'(")

    wordsGraph.setEdge("alive", ["Yes you are. :)", "I'm not, I'm just software. :'("], [10, 11])


    with open(words, 'wb') as wordsFile:
        pickle.dump(wordsGraph, wordsFile)

    return 0

#buildWordsGraph()


def generateDict():
    with open('../static/knownWords/words.json', 'w') as wordsFile:
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

#generateDict()

#__init__.py has extra nltk initilization
def processInputText(text):
    tokens = nltk.word_tokenize(text)
    return tokens

#print(processInputText("I haven't decided yet if you're the right, or if the dog gets his. What's up?"))

def analyzeSentiment(text):
    # FEED INTO MACHINE LEARNING MODEL TO DISCERN THE SENTIMENT OF THE SENTENCE
    # sentimentAnalyzer = getSentimentModel(text)
    sentimentAnalyzer = None

    if sentimentAnalyzer is None:  # Model could not be retrieved
        sentimentScore = 0
        return sentimentScore
    else:  # call the machine learning function & parse query
        # sentimentScore = sentimentAnalyzer(text=text)
        sentimentScore = 0  # 0 == neutral, i.e. no sentiment
        return sentimentScore

def generateResponse(tokens, sentiment = 0):
    response = ''
    debug = {'tokens': tokens}

    #knownWords = Path(STATIC_ROOT + '/knownWords') #FOR PRODUCTION !!!! UNCOMMENT BEFORE PUSHING TO HEROKU !!!!
    knownWords = Path(BASE_DIR + '/static' + '/knownWords') #FOR DEVELOPMENT !!!! COMMENT OUT BEFORE PUSHING TO HEROKU !!!!

    words = knownWords / 'wordsGraph'  # Using the special ' / ' path notation from Pathlib
    wordsGraph = {}
    with open(words, 'rb') as wordsFile:
        wordsGraph = pickle.load(wordsFile)

    #TESTING
    knownWordsSet = set()
    for index, currentToken in enumerate(tokens):
        if index == 0:
            previousToken = currentToken
            continue

        if currentToken in wordsGraph.getNeighbours(previousToken):
            previousEdgeCost = wordsGraph.getEdge(previousToken, currentToken)

            if isEscapeWord(currentToken): #Prepare the response
                debug['escape_token'] = currentToken
                for neighbour in wordsGraph.getNeighbours(currentToken):
                    if wordsGraph.getEdge(currentToken, neighbour) == previousEdgeCost + 10: #response found
                        response = neighbour
                        break

    if response == '': #No answer was found anywhere
        response = "I have trouble understanding, could you please rephrase for me."

    return response, debug

def isEscapeWord(token):
    if token in ['alive', 'find', 'make']:
        return True