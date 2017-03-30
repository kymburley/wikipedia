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
                    $('#results').html("There are no articles. Please search for another.");
                } else {
                    $('#results').html('');
                    for (i = 0; i < data[1].length; i++) {
                        $('#results').append("<li><a href= " + data[3][i] + ">" + data[1][i] + "</a><p>" + data[2][i] + "</p></li>");
                    }
                }
            },
            error: function(errorMsg) {
                alert("Error");
            }
        })
    });
});