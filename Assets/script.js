//Preloader disappear when screen loading is complete

function myfunction(){
    setTimeout(function(){
        $('.loader').css('display', 'none');
    }, 2000)
}

//Displaying different html page according to screen size
window.onresize = function (event) {
    document.location.reload(true);
}

var href = window.location.href.split("/")
var html_location = href[href.length - 1]

// if (window.innerWidth > 540 && html_location !== "index.html") {
//     window.location = "index.html";
// }

// if (window.innerWidth <= 540 && html_location !== "index2.html") {
//     window.location = "index2.html";
// }


// Fetching data from api
fetch('http://localhost:5050/')
.then(response => response.json())
.then(json => {

    //Placing data on webpage
    $('#name').html(json.Name)
    $('#title').html(json.Title)
    $('#amount').html(json.Amount)
    $('#workout').html(json.Workouts)
    $('#distance').html(json.Distance)
    $('#curr_streak').html(json.Curr_Streak)
    $('#max_streak').html(json.Max_Streak)
    $('.profile').attr('src', json.Profile_Pic)
})


