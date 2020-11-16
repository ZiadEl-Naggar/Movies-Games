$(document).ready(function() {
    $(".navbar li").removeClass('active');
    $(".navbar .games").addClass('active');
    
    var pageURL = $(location).attr("href");
    console.log(pageURL);
    var str = pageURL;
    gameid = str.split("/")[4]
    $.ajax({
        type: "GET",
        url: "https://api.rawg.io/api/games/"+gameid+"",
        success: function(result) {
            var id = result['id']
            var name = result['name']
            var description = result['description_raw']
            var released = result['released']
            var bimg = result['background_image']
            var rate = result['rating']

            var platforms = result['platforms']
            var allplatforms = ''
            for(let i = 0; i < platforms.length; i++){
                allplatforms += platforms[i]['platform']['name'] + ',&nbsp;'
            }
            var l = allplatforms.length
            allplatforms = allplatforms.substr(0, l-7)
            
            var genres = result['genres']
            var allgenres = ''
            for(let i = 0; i < genres.length; i++){
                allgenres += genres[i]['name'] + ',&nbsp;'
            }
            var l = allgenres.length
            allgenres = allgenres.substr(0, l-7)
            
            $("#genres").html(allgenres);
            $("#platforms").html(allplatforms);
            $("#title").html(name);
            $("#story").html(description);
            $("#image").attr("src", ""+bimg+"");
            $("#date").html(released);
            $("#rate").html('<i class="fas fa-star"></i>&nbsp;' + rate);
            $("#fav").html('<a type="button" id='+id+' onClick="send(this.id)" aria-hidden="true" class="btn-rounded px-3"></a>');
            checkfav(id)
        },
        error: function(result) {
            $("#content").append("<li class=>This Game doesn't exist!</li><br>");
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
                url: "addgame",
                data:{
                    gameid: id,
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
                url: "deletegame",
                data:{
                    gameid: id,
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
                gameid: id,
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