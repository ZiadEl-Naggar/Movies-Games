$(document).ready(function() {
    $(".navbar li").removeClass('active');
    $(".navbar .movies").addClass('active');
    
    var pageURL = $(location).attr("href");
    console.log(pageURL);
    var str = pageURL;
    movieid = str.split("/")[4]
    $.ajax({
        type: "GET",
        url: "https://api.themoviedb.org/3/movie/"+movieid+"?api_key=24353efaf70a8c49a5e90e90c601c8ab",
        success: function(result) {
            var genres = result['genres']
            var allgenres = ''
            for(let i = 0; i < genres.length; i++){
                allgenres += genres[i]['name'] + ',&nbsp;'
            }
            var l = allgenres.length
            allgenres = allgenres.substr(0, l-7)

            var id = result['id']
            var lang = result['original_language']
            var title = result['original_title']
            var overview = result['overview']
            var poster = result['poster_path']
            var release_date = result['release_date']
            var runtime = result['runtime']
            var hour = Math.floor(runtime / 60)
            var minutes = Math.ceil(((runtime / 60) - hour) * 60)
            var status = result['status']
            var rate = result['vote_average']

            $("#genres").html(allgenres);
            $("#title").html(title);
            $("#story").html(overview);
            $("#image").attr("src","http://image.tmdb.org/t/p/w500/"+poster+"");
            $("#date").html(release_date);
            $("#duration").html(hour + 'h ' + minutes + 'm');
            $("#status").html(status);
            $("#rate").html('<i class="fas fa-star"></i>&nbsp;' + rate);
            $("#fav").html('<a type="button" id='+id+' onClick="send(this.id)" aria-hidden="true" class="btn-rounded px-3"></a>');
            checkfav(id)
        },
        error: function(result) {
            $("#content").append("<li class=>This movie doesn't exist!</li><br>");
        }
    });
});

function send(id){
    if($("#"+id+"").html() == '<i class="far fa-heart"></i>'){
        var title = $("#title").map(function() {
            return this.innerHTML;
        }).get();
        var year = $("#date").map(function() {
            return this.innerHTML;
        }).get();
        var poster = $("#image").map(function() {
            return this.src;
        }).get();
        var rate = $("#rate").map(function() {
            var str = this.innerHTML;
            str = str.split("&nbsp;", 2);
            str = str[1];
            return str
        }).get();
    
        $.ajax(
            {
                type:"GET",
                url: "addmovie",
                data:{
                    movieid: id,
                    title: title.join(),
                    year: year.join(),
                    poster: poster.join(),
                    rate: rate.join(),
                },
                success: function( data ) 
                {
                    $("#"+id+"").html('<i class="fas fa-heart"></i>')
                },
                error: function(result) {
                    alert(result['Error']);
                }
             })   
    } else if($("#"+id+"").html() == '<i class="fas fa-heart"></i>') {
        $.ajax(
            {
                type:"GET",
                url: "deletemovie",
                data:{
                    movieid: id,
                },
                success: function( data ) 
                {
                    $("#"+id+"").html('<i class="far fa-heart"></i>')
                },
                error: function(result) {
                    alert(result['Error']);
                }
             })
    }
}

function checkfav(id){
    checkid = id
    $.ajax(
        {
            type:"GET",
            url: "checkfav",
            data:{
                movieid: id,
            },
            success: function( data ) 
            {
                if(data == "Fav"){
                    $("#"+id+"").html('<i class="fas fa-heart"></i>')
                } else {
                    $("#"+id+"").html('<i class="far fa-heart"></i>')
                }
            },
            error: function(result) {
                alert(result['Error']);
            }
         })
}