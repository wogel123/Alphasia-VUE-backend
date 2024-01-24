


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
