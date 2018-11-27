var topics = ["animals", 'sports', 'people', 'cities'];



function renderButtons() {

    $("#btn-container").empty();

    for (var i = 0; i < topics.length; i++) {
        var btn = $('<button>').css('background-color', 'white','color', 'red' );
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

        for (let i = 0; i < results.length; i++) {
            var imageDiv = $("<div>");

            
            //NEEDS WORK
            var rating = results.Rated;
            var pOne = $("<p>").text("Rating: " + rating).css('color', 'red');
            var image = $("<img>");
            imageDiv.append(pOne);

            image.attr("src", results[i].images.original.url);
            console.log(results[i].images.original.url)

            
            
            // imageDiv.append(p);
            imageDiv.append(image);
            $("#results").append(imageDiv);
        }
        // still and animate gif
        
        $(".gifs").on("click", function () {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });



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



// need to fix ratings
// fix still gifs
//fix all button colors
// no empty boxes
//different random gif everytime