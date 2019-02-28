$(document).ready(function() {
    let searchBtn = $('#search-btn'),
        searchText = $('#search-text'),
        resultsRow = $('#results-row');

    searchBtn.click(function(e) {
        fetch('/searchVideo?video=' + searchText.val())
            .then(function(res) {
                return res.json()
            })
            .then(function(results) {
                results.forEach(function(video) {
                    let cardContainer = $('<div class="col-4 mb-3"></div>'),
                        card = $('<div class="card"></div>'),
                        thumbnail = $('<img class="card-img-top" src="' + video.thumbnail.url + '" alt="' + video.title + '">'),
                        cardBodyDesc = $('<div class="card-body"></div>'),
                        cardTitle = $('<h5 class="card-title">' + video.title + '</h5>'),
                        cardText = $('<p class="card-text">' + video.description + '</p>'),
                        cardBodyButton = $('<div class="card-body text-center"></div'),
                        cardButton = $('<button class="btn btn-primary">Visualize This</button>');

                    cardBodyDesc.append(cardTitle);
                    cardBodyDesc.append(cardText);
                    cardBodyButton.append(cardButton);
                    card.append(thumbnail);
                    card.append(cardBodyDesc);
                    card.append(cardBodyButton);
                    cardContainer.append(card);

                    cardButton.click(function(e) {
                        window.location.href = '/playAudio?videoId=' + video.videoId;
                    });

                    resultsRow.append(cardContainer);
                });
            });
    });
});