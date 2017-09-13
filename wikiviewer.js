var apiUrl = "https://en.wikipedia.org/w/api.php?";
var parameters = {
    action: "opensearch",
    format: "json",
    limit: "100"
};

function searchAPI() {
    var input = encodeURI($("#input").val());
    parameters.search = input;

    apiUrl += $.param(parameters);

    $.ajax({
        type:"GET",
        url: apiUrl,
        dataType: "jsonp",
        success: function(data) {
            displayResults(data);
        },
        cache: false
    });
}

function displayResults(data) {
    $("#results").html("");
    var length = data[1].length;
    for (var i = 0; i < length; i++) {
        $("#results").append('<div class="article"><h2>' + data[1][i] + '</h2>' + data[2][i] + '<br><a href="' + data[3][i] + '" target="_blank">Link to wiki</a></div>');
    }
}

$(document).ready(function() {
    $("#search").on("click", function() {
        searchAPI();
    });

    $("#input").on("keyup", function(e) {
        if (e.keyCode === 13) {
            searchAPI();
        }
    });

    $("#random").on("click", function() {
        var url = "https://en.wikipedia.org/wiki/Special:Random";
        var win = window.open(url, "_blank");
        win.focus();
    });
});