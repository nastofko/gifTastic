var topics = ["animals", 'sports', 'people', 'cities'];

function renderButtons() {
    $("#btn-container").empty();
    for (var i = 0; i < topics.length; i++) {
        var btn = $('<button>');
        btn.addClass("btn-topic");
        btn.text(topics[i]);
        btn.attr("data-topic", topics[i]);
        $('#btn-container').append(btn);
    };
    $('#btn-container').on("click", ".btn-topic", getGifImages);
};

function pauseAndAnimateGif() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    };
};

function generateGifDivs(response) {
    $("#results").empty()
    var results = response.data;
    for (let i = 0; i < results.length; i++) {
        var imageDiv = $("<div>");
        var rating = results[i].rating;
        var pOne = $("<p>").text("Rating: " + rating).css('color', 'red');
        var image = $("<img>");
        image.attr("src", results[i].images.fixed_width_still.url);
        imageDiv.append(image);
        $("#results").append(imageDiv, pOne);
        image.attr("data-still", results[i].images.fixed_width_still.url);
        image.attr("data-animate", results[i].images.fixed_width.url);
        image.attr("data-state", 'still');
        image.addClass('gifs');
    };
    $(".gifs").on("click", pauseAndAnimateGif);
};

function callGifyApi(gifyURL) {
    $.ajax({
        url: gifyURL,
        method: "GET"
    }).then(function (response) {
        generateGifDivs(response);
    })
};

function getGifImages(event) {
    event.preventDefault();
    var query = $(this).attr("data-topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        query + "&api_key=dc6zaTOxFJmzC&limit=10"
    callGifyApi(queryURL);
};

function validateForm(formData) {
    if (!formData) {
        return;
    } else {
        topics.push(formData);
        renderButtons();
        $('#buttonInput').val('');
    };
};

function handleSubmit(event) {
    event.preventDefault();
    var newTopic = $("#buttonInput").val().trim();
    validateForm(newTopic);
};

$(".submit").on("click", handleSubmit);

renderButtons();
