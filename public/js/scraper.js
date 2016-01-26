$('#scraper-button').click(function() {
    console.log("scraper button clicked!")
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/scrape/topfree'
    });
});