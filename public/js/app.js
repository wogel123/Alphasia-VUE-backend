


$(document).ready(function () {
    "use strict";
    $('#register').click(function () {

        let email           = $('#email').val(),
            username        = $('#username').val(),
            password        = $('#password').val(),
            passwordConfirm = $('#passwordConfirm').val()
        
        if (username === '' || email === '' || password === '' || passwordConfirm === '') {
            $('#response').html("<div class='alert alert-danger mb-3 mt-3'>Veuillez completer tous les champs.</div>")
        } else {
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
                        $('#response').html("<div class='alert alert-success mb-3 mt-3'>Bravo !</div>")
                    } else {
                        $('#response').html("<div class='alert alert-danger mb-3 mt-3'>" + data.message + "</div>")
                    }
                },
                error: function (data) {
                    console.log(data)
                }
            })
        }
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


// $(document).ready(function () {
//     "use strict";
//     $("#loginSubmit").click(function () {
//         let username = $("#loginUsername").val(),
//             password = $("#loginPassword").val();
//         if ((username === "") || (password === "")) {
//             $("#loginMessage").fadeOut(0, function () {
//                 $(this).html("<div class=\"alert alert-danger\">Veuillez entrer un utilisateur et un mot de passe.</div>").fadeIn();
//             });
//
//         } else {
//             $.ajax({
//                 type: "POST",
//                 url: "/api/auth/checklogin",
//                 data: {"username": username, "password": password},
//                 dataType: 'JSON',
//                 success: function (html) {
//                     if (html.status === 'true') {
//                         let cookieName = 'alphasia_token';
//                         let cookieValue = html.token;
//                         let myDate = new Date();
//                         myDate.setMonth(myDate.getMonth() + 12);
//                         document.cookie = cookieName + "=" + cookieValue + ";expires=" + myDate
//                             + ";domain="+window.location.hostname+";path=/";
//
//                         window.location.reload()
//
//                         return html.message;
//                     } else {
//                         $("#message").fadeOut(0, function () {
//                             $(this).html("<div class=\"alert alert-danger\">" + html.message + "</div>").fadeIn();
//                         })
//                     }
//                 },
//                 error: function (textStatus, errorThrown) {
//                     console.log(textStatus);
//                     console.log(errorThrown);
//                     $("#message").fadeOut(0, function () {
//                         $(this).html("<div class=\"alert alert-danger\">" + textStatus.message + "</div>").fadeIn();
//                     })
//                 },
//                 beforeSend: function () {
//                     $("#message").fadeOut(0, function () {
//                         $(this).html("<p class='text-center'><img src='/assets/login/ajax-loader.gif'></p>").fadeIn();
//                     })
//                 }
//             });
//         }
//         return false;
//     });
//
//     $("#registerSubmit").click(function () {
//         let username        = $("#registerUsername").val(),
//             conditions      = $("#registerConditions").prop("checked"),
//             email           = $("#registerEmail").val(),
//             password        = $("#registerPassword").val(),
//             confirmPassword = $("#registerConfirmPassword").val();
//
//         if ((username === "") || (password === "")) {
//             $("#registerMessage").fadeOut(0, function () {
//                 $(this).html("<div class=\"alert alert-danger\">Veuillez completer tous les champs.</div>").fadeIn();
//             });
//         } else {
//             $.ajax({
//                 type: "POST",
//                 url: "/api/auth/createMember",
//                 data: {
//                     "username":         username,
//                     "email":            email,
//                     "password":         password,
//                     "confirmPassword":  confirmPassword,
//                     "conditions":       conditions
//                 },
//                 dataType: 'JSON',
//                 success: function (html) {
//                     if (html.error === 'false') {
//                         let cookieName = 'login_token';
//                         let cookieValue = html.token;
//                         let myDate = new Date();
//                         myDate.setMonth(myDate.getMonth() + 12);
//                         document.cookie = cookieName + "=" + cookieValue + ";expires=" + myDate
//                             + ";domain="+window.location.hostname+";path=/";
//                         window.location.reload()
//                         return html.message;
//                     } else {
//                         let message = "";
//                         $("#registerMessage").fadeOut(0, function () {
//                             for (const [key, value] of Object.entries(html.message)) {
//                                 message = message + value + "<br>"
//                             }
//                             $(this).html("<div class=\"alert alert-danger\">" + message + "</div>").fadeIn();
//                         })
//                     }
//                 },
//                 error: function (textStatus, errorThrown) {
//                     console.log(textStatus);
//                     console.log(errorThrown);
//                     let message = "Nom d'utilisateur ou email déjà utilisé";
//                     $("#registerMessage").fadeOut(0, function () {
//                         $(this).html("<div class=\"alert alert-danger\">" + message + "</div>").fadeIn();
//                     })
//                 },
//                 beforeSend: function () {
//                     $("#registerMessage").fadeOut(0, function () {
//                         $(this).html("<p class='text-center'><img src='/assets/login/ajax-loader.gif'></p>").fadeIn();
//                     })
//                 }
//             });
//         }
//         return false;
//     });
// });