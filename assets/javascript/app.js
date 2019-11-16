//TODO 

//style nicely
//readme.md
//do bonus content

$(document).ready(function () {

    var topics = ["pizza", "burgers", "ice cream", "cake", "cupcakes", "muffins", "cereal", "pasta", "cookies", "steak", "oranges", "fries", "fried chicken"];


    for (var i = 0; i < topics.length; i++) {
        $(".buttons").append(
            $("<button/>", {
                text: topics[i],
                val: topics[i],
                click: function() {
                    $(".image-display").empty();
                    var searchVal = $(this).val();
                    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
                        searchVal + "&api_key=Rti16DDOi8KwkyUPSv7rAJca8jFi3Uve&limit=10";
            
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    })
                        .then(function (response) {
                            displayImages(response)
                        });
                }
            })
        );
    }

    function displayImages(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r") {
                var imgDiv = $("<div>");
                imgDiv.addClass("float");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var foodImg = $("<img>");
                foodImg.attr({
                    src: results[i].images.fixed_height_still.url,
                    alt: "food image",
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-state": "still",
                    "data-animate": results[i].images.fixed_height.url
                });
                foodImg.addClass("gif");
                imgDiv.append(p, foodImg);
                $(".image-display").append(imgDiv);
            }
        }
    }

    $("body").on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr({
                src: $(this).attr("data-animate"),
                "data-state": "animate"
            });
        } else {
            $(this).attr({
                src: $(this).attr("data-still"),
                "data-state": "still"
            });
        }
    });

    $(".btn").on("click", function (e) {
        e.preventDefault();
        $(".image-display").empty();
        var searchVal = $("#user-request").val();
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            searchVal + "&api_key=Rti16DDOi8KwkyUPSv7rAJca8jFi3Uve&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                displayImages(response)

            });
    });


});

