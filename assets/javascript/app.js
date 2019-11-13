$(document).ready(function () {

    var topics = ["pizza", "burgers"];
    
    


    for(var i = 0; i < topics.length; i++){
        $(".buttons").append(
            $("<button/>", {
                text: topics[i],
                click: getImages

            })
        )
    }


    function getImages(){
        $(".images").empty();
        searchVal = $(this).text();
        console.log(searchVal);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + 
            searchVal + "&api_key=Rti16DDOi8KwkyUPSv7rAJca8jFi3Uve&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response){
                var results = response.data;
                console.log(results);
                for(var i = 0; i < results.length; i++){
                    if (results[i].rating !== "r"){
                        var imgDiv = $("<div>");
                        imgDiv.addClass("float");
                        var rating = results[i].rating;
                        var p = $("<p>").text("Rating: " + rating);
                        var foodImg = $("<img>");
                        foodImg.attr("src", results[i].images.fixed_height_still.url);
                        imgDiv.append(p);
                        imgDiv.append(foodImg);
                        $(".images").append(imgDiv);
                    }
                }

            });
    }








});

