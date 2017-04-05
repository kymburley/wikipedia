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
                var title = data[1][0];
                var description = data[2][0];
                var link = data[3][0];
                
                if (title === undefined){
                    $('.results').html("There are no articles on " + searchTerm + ". Please search for another.");
                    $('.results').css("color", "#fff");
                    $('#wikiSearch').val('');
                } else {
                    $('.results').html('');

                    /* Move .random and #wikiSearch to the top of the page */
                    $('.search').css("top", "8%");
                    $('#wikiSearch').val('');

                    /* Show the results */
                    for (i = 0; i < data[1].length; i++) {
                        title = data[1][i];
                        description = data[2][i];
                        link = data[3][i];
                        
                        $('.results').append("<li><a href=" + link + ">" + title + "<br><br><p>" + description + "</p></a></li>");
                    } 
                }
            },
            error: function(errorMsg) {
                console.log(errorMsg);
            }
        })
    });
});