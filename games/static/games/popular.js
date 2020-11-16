$(document).ready(function() {
    $(".navbar li").removeClass('active');
    $(".navbar .games").addClass('active');

    $.ajax({
        type: "GET",
        url: "https://api.rawg.io/api/games",
        success: function(result) {
            var count = result['count']
            c = Math.ceil(parseInt(count) / 20)
            $('#pagination-demo').twbsPagination({
                totalPages: ''+c+'',
                startPage: result['page'],
                visiblePages: 10,
                pageVariable: result['page'],
                onPageClick: function (event, page) {
                    for (let i = 0; i < 20; i++){
                        $("#title-"+i+"").html("");
                        $("#title-"+i+"").attr("class", "");
                        $("#year-"+i+"").html("");
                        $("#year-"+i+"").attr("class", "");
                        $("#img-"+i+"").attr("src","");
                        $("#img-"+i+"").attr("class", "");
                        $("#details-"+i+"").attr("href","");
                        $("#rate-"+i+"").html('');
                        $("#items-"+i+"").html('');
                    }
                    $.ajax({
                        type: "GET",
                        url: "https://api.rawg.io/api/games?page="+page+"",
                        success: function(result) {
                            if(result['results']){
                                results = result['results']
                                for (let i = 0; i < results.length; i++) {
                                    var gameid = results[i]["id"]
                                    var title = results[i]["name"]
                                    var year = results[i]["released"]
                                    var poster = results[i]["background_image"]
                                    var rate = results[i]["rating"]
                                    
                                    $("#title-"+i+"").html(title);
                                    $("#title-"+i+"").attr("class", ""+gameid+"1");
                                    $("#year-"+i+"").html(year);
                                    $("#year-"+i+"").attr("class", ""+gameid+"2");
                                    $("#img-"+i+"").attr("src",""+poster+"");
                                    $("#img-"+i+"").attr("class", ""+gameid+"3");
                                    $("#details-"+i+"").attr("href",gameid);
                                    $("#rate-"+i+"").html('<i class="fas fa-star" height="20" width="20"></i>&nbsp;' + rate);
                                    $("#rate-"+i+"").attr("class", ""+gameid+"4");
                                    $("#items-"+i+"").html('<a type="button" id='+gameid+' onClick="send(this.id)" aria-hidden="true" class="btn-rounded px-3"></a>');
                                    checkfav(gameid);
                                }
                                window.scrollTo(0,0)
                                for (let i = 0; i < 20; i++){
                                    if($("#title-"+i+"").html().length == 0){
                                        
                                        $("#img-"+i+"").hide();
                                        $("#rate-"+i+"").hide();
                                        $("#details-"+i+"").hide();
                                        $("#year-"+i+"").hide();
                                        $("#items-"+i+"").hide();
                                        $("#movie-"+i+"").hide();
                                    }
                                }
                            }else{
                                $( "#result" ).val( result['Error'] )
                            }
                        }
                    });
                    
                }
                });
        },
        error: function(result) {
            alert('error');
        }
    });
});

function send(id){
    if($("#"+id+"").html() == '<i class="far fa-heart"></i>'){
        var title = $("."+id+"1").map(function() {
            return this.innerHTML;
        }).get();
        var year = $("."+id+"2").map(function() {
            return this.innerHTML;
        }).get();
        var poster = $("."+id+"3").map(function() {
            return this.src;
        }).get();
        var rate = $("."+id+"4").map(function() {
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
    gameid = id
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