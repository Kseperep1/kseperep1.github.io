// Will launch when document is ready

// const activeNav = () => {
    // let hrefLocation = location.href;
    // const navBar = document.querySelectorAll('a');
    // const len = navBar.length;
    // for (let i = 0; i < len; i++){
    //     if (navBar[i].href === hrefLocation){
    //         navBar[i].className = "active"
    //     }   
    // }

    // for (let i = 0; i < navBar.length; i++){
    //     links[i].addEventListener('click', () => {
    //         let activeNav = document.getElementsByClassName('active');
    //         activeNav[0].className = activeNav[0].className.replace("active");
    //         this.className += "active"
    //     })
// }

$(document).ready(function () {

    $('#nav-menu').click(function () {
        $(this).toggleClass('fa-times');
        $('header').toggleClass('header-on');
    });

    $('#nav-menu').on('load scroll', function () {
        $(this).removeClass('fa-times')
        $('header').removeClass('header-on')
    });
    
    $('#nav-bar a').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
    })

});



// $(document).on('click','#nav-bar ul li a', function () {
//     $(this).addClass('active').siblings().removeClass('active')
// });
