$( window ).on ("load", function () {
    // Set the autocomplete for user query
    $( "#user_query" ).autocomplete({
        source: function(request, response){
            var availableWords = [];

            var input_word = request.term.toLowerCase(); //This is the user input

            $.getJSON( "/autocomp/query" + "?word=" + input_word, function(wordDict) {

                firstLetter = input_word[0];
                wordList = wordDict[firstLetter];
                
                _.forEach(wordList, function(word){

                    // Only add to suggestion list if it starts with the input word
                    if (word.startsWith(input_word)) {
                        availableWords.push({label: word, value: word});
                    }
                });

                response(availableWords);

            }).done(function(){
                //
            }).fail(function(){
                alert("Failed to autosuggest");
            }).always(function(){
                //
            });
        },
        minLength: 1 //Number of characters after which the autosuggest should start...
    });
});
