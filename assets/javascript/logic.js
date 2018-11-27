var topics = ["animals", 'sports', 'people', 'cities'];



function renderButtons() {

    $("#btn-container").empty();

    for (var i = 0; i < topics.length; i++) {
        var btn = $('<button>');
        btn.addClass("btn-topic");
        btn.text(topics[i])
        btn.attr("data-topic", topics[i])
        $('#btn-container').append(btn);


    }

    $('#btn-container').on("click", ".btn-topic", topicAPI);


}

function topicAPI(event) {
    event.preventDefault();
    var query = $(this).attr("data-topic");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        query + "&api_key=dc6zaTOxFJmzC&limit=10"

    // console.log($(this).text())
    var btnTopic = $(this).text;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#results").empty()
        console.log(response)

        var results = response.data;
        console.log(results)

        //for loop to create div
        // create <p> for rating
        for (let i = 0; i < results.length; i++) {
            var imageDiv = $("<div>");

            var image = $("<img>");

            image.attr("src", results[i].images.original.url);
            console.log(results[i].images.original.url)

            // still and animate gif


            // imageDiv.append(p);
            imageDiv.append(image);
            $("#results").append(imageDiv);
        }


        // for (var i = 0; i < results.length; i++) {






        // }


    })
}



$(".submit").on("click", function (event) {
    event.preventDefault();

    var newTopic = $("#buttonInput").val().trim();

    // Adding the movie from the textbox to our array
    topics.push(newTopic);
    console.log(topics);
    renderButtons();
    $('#buttonInput').val('')

});

renderButtons();



