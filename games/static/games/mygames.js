$(document).ready(function() {
    $(".navbar li").removeClass('active');
    $(".navbar .games").addClass('active');
});

function deletefav(id){
    gameid = id
    $.ajax(
        {
            type:"GET",
            url: "deletegame",
            data:{
                gameid: id,
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