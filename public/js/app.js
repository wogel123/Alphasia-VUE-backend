$(document).ready(function () {
    "use strict";
    $('#registerSubmit').click(function () {

        let email           = $('#registerEmail').val(),
            username        = $('#registerUsername').val(),
            password        = $('#registerPassword').val(),
            passwordConfirm = $('#registerConfirmPassword').val()

        $.ajax({
            type: "POST",
            url: "/api/user/create",
            data: JSON.stringify({
                "email":            email,
                "username":         username,
                "password":         password,
                "passwordConfirm":  passwordConfirm
            }),
            contentType: "application/json",
            dataType: "JSON",
            success: function (data) {
                if (data.error === false) {
                    $("#registerMessage").fadeOut(0, function () {
                        $(this).html("<div class='alert alert-success mb-3 mt-3'>Bravo !</div>").fadeIn();
                    })
                } else {
                    $("#registerMessage").fadeOut(0, function () {
                        $(this).html("<div class='alert alert-danger mb-3 mt-3'>" + data.message + "</div>").fadeIn();
                    })
                }
            },
            error: function (data) {
                console.log(data)
            },
            beforeSend: function () {
                $("#registerMessage").fadeOut(0, function () {
                    $(this).html("<p class='text-center'><img src='https://alphasia.net/assets/login/ajax-loader.gif'></p>").fadeIn();
                })
            }
        })
        return false;
    })

    $('#loginSubmit').click(function () {
        let username = $('#loginUsername').val(),
            password = $('#loginPassword').val()

        $.ajax({
            type: "POST",
            url: "/api/user/login",
            data: JSON.stringify({
                "username": username,
                "password": password
            }),
            contentType: "application/json",
            dataType: "JSON",
            success: function (data) {
                if (data.error) {
                    $('#loginMessage').fadeOut(0, function () {
                        $(this).html("<div class='alert alert-danger mb-3 mt-3'>" + data.message + "</div>").fadeIn();
                    })
                } else {
                    $('#loginMessage').fadeOut(0, function () {
                        $(this).html("<div class='alert alert-success mb-3 mt-3'>Bravo !</div>").fadeIn();
                    })
                }
            },
            error: function (data) {
                console.log(data)
            },
            beforeSend: function () {
                $("#loginMessage").fadeOut(0, function () {
                    $(this).html("<p class='text-center'><img src='https://alphasia.net/assets/login/ajax-loader.gif'></p>").fadeIn();
                })
            }
        })
        return false;
    })
})


$(".signupModal").click(function () {
    $(".signinForm").css("display", "none");
    $(".signupForm").css("display", "block");
});
$(".signinModal").click(function () {
    $(".signupForm").css("display", "none");
    $(".signinForm").css("display", "block");
});
$(".signupForm").css("display", "none");
$(".signBtn").click(function () {
    $("form").animate({height: "toggle", opacity: "toggle"}, "slow");
});
