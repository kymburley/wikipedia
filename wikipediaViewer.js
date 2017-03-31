$(document).ready(function() {
    $('#wikiButton').click(function(){
        var searchTerm = $('#wikiSearch').val();
        var base = "https://en.wikipedia.org/w/api.php";
        var action = "opensearch";
        var url = base + "?action=" + action + "&search=" + searchTerm + "&callback=?";
        
        $.ajax({
            type: "GET",
            url: url,
            async: false,
            dataType: "json",
            success: function(data){
                if (data[1][0] === undefined){
                    $('#results').html("There are no articles on " + searchTerm + ". Please search for another.");
                    $('#wikiSearch').val('');
                } else {
                    $('#results').html('');
                    /* Move .random and #wikiSearch to the top of the page */
                    $('.search').css("top", "8%");
                    $('#wikiSearch').val('');
                   /* $('ul').css("margin-top", "150px");*/

                    /* Show the results */
                    for (i = 0; i < data[1].length; i++) {
                        $('#results').append("<li><a href= " + data[3][i] + ">" + data[1][i] + "</a><p>" + data[2][i] + "</p></li>");
                    } 
                }
            },
            error: function(errorMsg) {
                console.log(errorMsg);
            }
        })
    });
});