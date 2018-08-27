$( window ).on( "load", function() {
    $( "#oracle_form" ).on('submit', function(event){
        event.preventDefault();
        createResponseToQuery();
    });

    function createResponseToQuery(){
        $.ajax({
            url: "/oracle/formdata",
            type: "GET",
            data: { query_var : $('#user_query').val() },

            success: function(response) {
                document.getElementById('response').innerHTML = response; //more efficient than using jQuery equivalent...
                document.getElementById('response').scrollIntoView();

                //Extra stuff
                //Make the feedback disappear when Yes or No button pressed
                $('#yesBtn').click(function () {
                    $('#feedback').hide();
                });

                $('#noBtn').click(function () {
                    $('#feedback').hide();
                });
            },

            error: function(xhr, errmsg, err) {
                alert(xhr + " " + errmsg + " " + err);
            }
        });
    }
});