$( window ).on ("load", function () {
    // Set the autocomplete for user query
    $( "#user_query" ).autocomplete({
        source: function(request, response){
            var availableWords = [];

            var input_word = request.term; //This is the user input

            $.getJSON( "/autocomp/query", function(data) {

                _.forEach(data, function(word){

                    // Only add to suggestion list if it starts with the input word
                    if (word.startsWith(input_word)) {
                        availableWords.push({label: word, value: word});
                    }
                });
                response(availableWords);

            }).done(function(){
                //
            }).fail(function(){
                alert("failed autosuggest");
            }).always(function(){
                //
            });
        },
        minLength: 1 //Number of characters after which the autosuggest should start...
    });

    //==================================================================================================================

    // Set the autocomplete for start stop form input
    $( "#location_from" ).autocomplete({
        source: function(request, response){
            var busNumberInput = $("#bus_number").val().toUpperCase();  // Bus route input determines stop to suggest

            var availableTags = [];

            var to_input = request.term; //This is the user input

            var routeList = [];  // To store all routes of a stop in loop below

            var routeCheck = -1; // To check if input route is in routeList using indexing

            $.getJSON( "/autocomp" + "?format=json&operator=bac&stopname="+to_input, function(data) {

                _.forEach(data.results, function(busStops){

                    routeList = busStops.operators[0].routes;
                    routeCheck = routeList.indexOf(busNumberInput);

                    if ( busNumberInput === "" ) {
                        availableTags.push({label: busStops.fullname + " " + busStops.stopid, value: busStops.stopid});

                    } else if ( routeCheck !== -1 ) {
                        availableTags.push({label: busStops.fullname + " " + busStops.stopid, value: busStops.stopid});
                    }
                });
                response(availableTags);

            }).done(function(){
                //
            }).fail(function(){
                alert("failed autosuggest");
            }).always(function(){
                //
            });
        },
        minLength: 1 //Number of characters after which the autosuggest should start...
    });

    //==================================================================================================================

    // Set the autocomplete for destination stop form input
    $( "#location_to" ).autocomplete({
        source: function(request, response){
            var busNumberInput = $("#bus_number").val().toUpperCase();  // Bus route input determines stop to suggest

            var availableTags = [];

            var to_input = request.term; //This is the user input

            var routeList = [];  // To store all routes of a stop in loop below

            var routeCheck = -1; // To check if input route is in routeList using indexing

            $.getJSON( "/autocomp" + "?format=json&operator=bac&stopname="+to_input, function(data) {

                _.forEach(data.results, function(busStops){

                    routeList = busStops.operators[0].routes;
                    routeCheck = routeList.indexOf(busNumberInput);

                    if ( busNumberInput === "" ) {
                        availableTags.push({label: busStops.fullname + " " + busStops.stopid, value: busStops.stopid});

                    } else if ( routeCheck !== -1 ) {
                        availableTags.push({label: busStops.fullname + " " + busStops.stopid, value: busStops.stopid});
                    }
                });
                response(availableTags);

            }).done(function(){
                //
            }).fail(function(){
                alert("failed autosuggest");
            }).always(function(){
                //
            });
        },
        minLength: 1 //Number of characters after which the autosuggest should start...
    });

});
