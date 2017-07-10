(function($){
    $("#activate").click(function (e){
        e.preventDefault();

        if (!($("#username-warning").hasClass("hidden")))
            $("#username-warning").addClass("hidden");
        if (!($("#password-warning").hasClass("hidden")))
            $("#password-warning").addClass("hidden");
        if (!($("#server-error").hasClass("hidden")))
            $("#server-error").addClass("hidden");

        var username = $("#username").val();
        var password = $("#password").val();
        if (username.length == 0){
            $("#username-warning").removeClass("hidden");
            return;
        }
        if (password.length == 0){
            $("#password-warning").removeClass("hidden");
            return;
        }

        post_data = {};
        post_data["username"] = username;
        post_data["password"] = password;

        $.ajax({
            url: "/",
            method: "post",
            data: post_data,
            statusCode: {
                200: function () {
                    alert("Voila, it works as expected!")
                },
                401: function(){
                    $("#server-error").removeClass("hidden");
                }
            }
        });
    });
})(jQuery);