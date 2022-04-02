// Will launch when document is ready

$(document).ready(function () {

    $('#nav-menu').click(function () {
        $(this).toggleClass('fa-times');
        $('header').toggleClass('header-on');
    });

    $('#nav-menu').on('load scroll', function () {
        $(this).removeClass('fa-times')
        $('header').removeClass('header-on')
    });
    

});