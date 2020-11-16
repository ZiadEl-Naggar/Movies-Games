$(document).ready(function() {
    $(".navbar li").removeClass('active');
    $(".navbar .movies").addClass('active');

    for (let i = 0; i < 20; i++){
        $("#img-"+i+"").hide();
        $("#rate-"+i+"").hide();
        $("#details-"+i+"").hide();
        $("#year-"+i+"").hide();
        $("#items-"+i+"").hide();
        $("#movie-"+i+"").hide();
    }

    $("#search").click(function(e) {
        for (let i = 0; i < 20; i++){
            $("#img-"+i+"").show();
            $("#rate-"+i+"").show();
            $("#details-"+i+"").show();
            $("#year-"+i+"").show();
            $("#items-"+i+"").show();
            $("#movie-"+i+"").show();
        }
        var query = $('#query').val()
        $.ajax({
            type: "GET",
            url: "https://api.themoviedb.org/3/search/movie?api_key=24353efaf70a8c49a5e90e90c601c8ab&language=en-US&query="+query+"",
            success: function(result) {
                $("#result").val( "Number of Results = " + result['total_results'] )
                $('#pagination-demo').removeData("twbs-pagination");
                $('#pagination-demo').twbsPagination({
                    totalPages: result['total_pages'],
                    startPage: result['page'],
                    visiblePages: result['total_pages'],
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

                        var query = $('#query').val()
                        $.ajax({
                            type: "GET",
                            url: "https://api.themoviedb.org/3/search/movie?api_key=24353efaf70a8c49a5e90e90c601c8ab&language=en-US&query="+query+"&page="+page+"",
                            success: function(result) {
                                if(result['results']){
                                    results = result['results']
                                    for (let i = 0; i < results.length; i++) {
                                        var movieid = results[i]["id"]
                                    var title = results[i]["title"]
                                    var year = results[i]["release_date"]
                                    var poster = results[i]["poster_path"]
                                    var rate = results[i]["vote_average"]
                                    
                                    $("#title-"+i+"").html(title);
                                    $("#title-"+i+"").attr("class", ""+movieid+"1");
                                    $("#year-"+i+"").html(year);
                                    $("#year-"+i+"").attr("class", ""+movieid+"2");
                                    $("#img-"+i+"").attr("src","http://image.tmdb.org/t/p/w500/"+poster+"");
                                    $("#img-"+i+"").attr("class", ""+movieid+"3");
                                    $("#details-"+i+"").attr("href",movieid);
                                    $("#rate-"+i+"").html('<i class="fas fa-star" height="20" width="20"></i>&nbsp;' + rate);
                                    $("#rate-"+i+"").attr("class", ""+movieid+"4");
                                    $("#items-"+i+"").html('<a type="button" id='+movieid+' onClick="send(this.id)" aria-hidden="true" class="btn-rounded px-3"></a>');
                                    checkfav(movieid);
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
    movieid = id
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