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


def generateDict(setOfKnownWords):
    '''
    Generates a dictionary of known words optimized for the autosuggest for the front end text input.
    :return: status
    '''

    wordsDict = {}

    #Generate first letter keys
    for letter in 'abcdefghijklmnopqrstuvwxyz':
        wordsDict[letter] = []

    #pupulate from the known set
    for word in setOfKnownWords:
        firstLetter = word[0]
        wordsDict[firstLetter].append(word) #e.g. wordsDict['y'].append('you')

    #Write results to file
    knownWordsFolder = Path(BASE_DIR + '/static' + '/knownWords')
    knownWordsJSON = knownWordsFolder / 'wordsAutosuggest.json'  # Using the special ' / ' path notation from Pathlib

    with open(knownWordsJSON, 'w') as wordsJSON:
        json.dump(wordsDict, wordsJSON)

    return 0


def buildWordsGraph():
    '''
    Generates the graph of known words and a set of known words.

    :return: status
    '''

    wordsGraph = Graph()
    knownWordsSet = set()
    escapeWordsSet = set()

    #Branching converstation
    wordsGraph.setVertex("i")
    knownWordsSet.add("i")
    wordsGraph.setVertex("you")
    knownWordsSet.add("you")

    wordsGraph.setVertex("alive")
    knownWordsSet.add("alive")
    escapeWordsSet.add("alive")

    wordsGraph.setEdge("alive", ["i", "you"], [0, 1])

    wordsGraph.setVertex(" Yes you are alive :)")
    wordsGraph.setVertex(" No I'm not alive, I'm just software. :'(")

    wordsGraph.setEdge("alive", [" Yes you are alive :)", " No I'm not alive, I'm just software. :'("], [10, 11])

    # Write results to file
    knownWordsFolder = Path(BASE_DIR + '/static' + '/knownWords')
    wordsGraphFile = knownWordsFolder / 'wordsGraph'  # Using the special ' / ' path notation from Pathlib
    knownWordsSetFile = knownWordsFolder / 'knownWordsSet'  # Using the special ' / ' path notation from Pathlib
    escapeWordsSetFile = knownWordsFolder / 'escapeWordsSet'  # Using the special ' / ' path notation from Pathlib

    with open(wordsGraphFile, 'wb') as wordsGraphFileHandle:
        pickle.dump(wordsGraph, wordsGraphFileHandle)

    with open(knownWordsSetFile, 'wb') as knownWordsSetFileHandle:
        pickle.dump(knownWordsSet, knownWordsSetFileHandle)

    with open(escapeWordsSetFile, 'wb') as escapeWordsSetFileHandle:
        pickle.dump(escapeWordsSet, escapeWordsSetFileHandle)

    if generateDict(knownWordsSet) > 0: #Generate the autosuggest dictionary based on the words set above
        return 1

    return 0

if buildWordsGraph() == 0: #all good
    print("Words Graph finished building")



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
    global knownWordsSet
    response = ''
    debug = {'tokens': tokens}
    debug['skipped_tokens'] = []

    sentences = []
    sentence = []
    for token in tokens:
        if token in [".", "?", "!"]:
            sentences.append(sentence)
            sentence = []
        else:
            sentence.append(token)

    if sentences == []: #only sentense found with no full stop - . ? !
        sentences.append(sentence) #Put that sentence in

    debug['sentences'] = sentences


    #knownWordsFolder = Path(STATIC_ROOT + '/knownWords') #FOR PRODUCTION !!!! UNCOMMENT BEFORE PUSHING TO HEROKU !!!!
    knownWordsFolder = Path(BASE_DIR + '/static' + '/knownWords') #FOR DEVELOPMENT !!!! COMMENT OUT BEFORE PUSHING TO HEROKU !!!!

    wordsGraphFile = knownWordsFolder / 'wordsGraph'  # Using the special ' / ' path notation from Pathlib
    knownWordsSetFile = knownWordsFolder / 'knownWordsSet'  # Using the special ' / ' path notation from Pathlib
    escapeWordsSetFile = knownWordsFolder / 'escapeWordsSet' # Using the special ' / ' path notation from Pathlib

    wordsGraph = {}
    with open(wordsGraphFile, 'rb') as wordsGraphFileHandle:
        wordsGraph = pickle.load(wordsGraphFileHandle)

    knownWordsSet = set()
    with open(knownWordsSetFile, 'rb') as knownWordsSetFileHandle:
        knownWordsSet = pickle.load(knownWordsSetFileHandle)

    escapeWordsSet = set()
    with open(escapeWordsSetFile, 'rb') as escapeWordsSetFileHandle:
        escapeWordsSet = pickle.load(escapeWordsSetFileHandle)

    debug['escape_words_set'] = list(escapeWordsSet)
    debug['known_words_set'] = list(knownWordsSet)

    #TESTING
    debug['unknown_tokens'] = []
    for sentence in sentences:
        for index, currentToken in enumerate(sentence):
            if index == 0:
                previousToken = currentToken
                continue

            if previousToken not in knownWordsSet: #don't recognise the word, then skip it
                debug['unknown_tokens'].append(previousToken)
                previousToken = currentToken
                continue

            if currentToken in wordsGraph.getNeighbours(previousToken):
                previousEdgeCost = wordsGraph.getEdge(previousToken, currentToken)

                if currentToken in escapeWordsSet: #Prepare the response
                    debug['escape_token'] = currentToken
                    for neighbour in wordsGraph.getNeighbours(currentToken):
                        if wordsGraph.getEdge(currentToken, neighbour) == previousEdgeCost + 10: #response found
                            response += neighbour
                            break
            else:
                debug['skipped_tokens'].append(currentToken)
                continue

            previousToken = currentToken

    if response == '': #No answer was found anywhere
        response = "I have trouble understanding, could you please rephrase for me."

    return response, debug