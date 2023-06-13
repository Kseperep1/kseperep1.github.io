// Will launch when document is ready

$(document).ready(function () {
  $("#nav-menu").click(function () {
    $(this).toggleClass("fa-times");
    $("header").toggleClass("header-on");
  });

  $("#nav-menu").on("load scroll", function () {
    $(this).removeClass("fa-times");
    $("header").removeClass("header-on");
  });

  $("#user").click(function () {
    $("#nav-menu").removeClass("fa-times");
    $("header").removeClass("header-on");
  });

  $("#aboutBtn").click(function () {
    $("#nav-menu").removeClass("fa-times");
    $("header").removeClass("header-on");
  });

  $("#careerBtn").click(function () {
    $("#nav-menu").removeClass("fa-times");
    $("header").removeClass("header-on");
  });

  $("#projectsBtn").click(function () {
    $("#nav-menu").removeClass("fa-times");
    $("header").removeClass("header-on");
  });

  $("#skillsBtn").click(function () {
    $("#nav-menu").removeClass("fa-times");
    $("header").removeClass("header-on");
  });

  $("#contactBtn").click(function () {
    $("#nav-menu").removeClass("fa-times");
    $("header").removeClass("header-on");
  });
});
