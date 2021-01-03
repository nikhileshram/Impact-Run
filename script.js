window.onresize = function (event) {
    document.location.reload(true);
}

var href = window.location.href.split("/")
var html_location = href[href.length - 1]

if (window.innerWidth > 540 && html_location !== "index.html") {
    window.location = "index.html";
}

if (window.innerWidth <= 540 && html_location !== "index2.html") {
    window.location = "index2.html";
}

fetch('https://impact-run-api.herokuapp.com/')
.then(response => response.json())
.then(json => {
    $('#name').html(json.Name)
    $('#title').html(json.Title)
    $('#amount').html(json.Amount)
    $('#workout').html(json.Workouts)
    $('#distance').html(json.Distance)
    $('#curr_streak').html(json.Curr_Streak)
    $('#max_streak').html(json.Max_Streak)
    $('.profile').attr('src', json.Profile_Pic)
})
