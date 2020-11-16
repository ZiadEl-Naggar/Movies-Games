$(document).ready(function(){
    $(".navbar li").removeClass('active');
    $(".navbar .movies").addClass('active');

    // duration of scroll animation
    var scrollDuration = 300;
    // paddles
    var leftPaddle = document.getElementsByClassName('left-paddle');
    var rightPaddle = document.getElementsByClassName('right-paddle');
    // get items dimensions
    var itemsLength = $('.item').length;
    var itemSize = $('.item').outerWidth(true);
    // get some relevant size for the paddle triggering point
    var paddleMargin = 20;

    // get wrapper width
    var getmenuitemWrapperSize = function() {
        return $('.menu').outerWidth();
    }
    var menuitemWrapperSize = getmenuitemWrapperSize();
    
    // the wrapper is responsive
    // $(window).on('resize', function() {
    //     menuitemWrapperSize = getmenuitemWrapperSize();
    // });

    // size of the visible part of the menuitem is equal as the wrapper size 
    var menuitemVisibleSize = menuitemWrapperSize;

    // get total width of all menuitem items
    var getmenuitemSize = function() {
        return itemsLength * itemSize;
    };
    var menuitemSize = getmenuitemSize();
    // get how much of menuitem is invisible
    var menuitemInvisibleSize = menuitemSize - menuitemWrapperSize;

    // get how much have we scrolled to the left
    var getmenuitemPosition = function() {
        return $('.menuitem').scrollLeft();
    };

    // finally, what happens when we are actually scrolling the menuitem
    $('.menuitem').on('scroll', function() {

        // get how much of menuitem is invisible
        menuitemInvisibleSize = menuitemSize - menuitemWrapperSize;
        // get how much have we scrolled so far
        var menuitemPosition = getmenuitemPosition();

        var menuitemEndOffset = menuitemInvisibleSize - paddleMargin;

        // show & hide the paddles 
        // depending on scroll position
        if (menuitemPosition <= paddleMargin) {
            // $(leftPaddle).addClass('hidden');
            $(rightPaddle).removeClass('hidden');
        } else if (menuitemPosition < menuitemEndOffset) {
            // show both paddles in the middle
            $(leftPaddle).removeClass('hidden');
            $(rightPaddle).removeClass('hidden');
        } else if (menuitemPosition >= menuitemEndOffset) {
            $(leftPaddle).removeClass('hidden');
            // $(rightPaddle).addClass('hidden');
    }

        // print important values
        $('#print-wrapper-size span').text(menuitemWrapperSize);
        $('#print-menuitem-size span').text(menuitemSize);
        $('#print-menuitem-invisible-size span').text(menuitemInvisibleSize);
        $('#print-menuitem-position span').text(menuitemPosition);

    });

    // scroll to left
    $(rightPaddle).on('click', function() {
        var leftPos = $('.menuitem').scrollLeft();
        console.log($('.menuitem').offset().top)
        $('.menuitem').animate( { scrollLeft: leftPos+menuitemWrapperSize/2}, scrollDuration);
    });

    // scroll to right
    $(leftPaddle).on('click', function() {
        var leftPos = $('.menuitem').scrollLeft();
        $('.menuitem').animate( { scrollLeft: leftPos-menuitemWrapperSize/2 }, scrollDuration);
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
    console.log(id)
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