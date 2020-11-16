$(document).ready(function() {
    $(".navbar li").removeClass('active');
    $(".navbar .movies").addClass('active');
});

function deletefav(id){
    movieid = id
    $.ajax(
        {
            type:"GET",
            url: "deletemovie",
            data:{
                movieid: id,
            },
            success: function( data ) 
            {
                location.reload();
            },
            error: function(result) {
                alert(result['Error']);
            }
         }) 
}