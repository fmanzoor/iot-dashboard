(function($){
    $("#timezone-settings-apply").click(function (e) {
        if (!($("#timezone-settings-error").hasClass("hidden")))
            $("#timezone-settings-error").addClass("hidden");

        if (!($("#timezone-settings-success").hasClass("hidden")))
            $("#timezone-settings-success").addClass("hidden");

        e.preventDefault();
        post_data = {};
        tz_settings = $("#timezone-settings").serializeArray();
        tz_settings.forEach(function(item, index, array){
            if (item.value.length > 0)
                post_data[item.name] = item.value;
        });

        if (Object.keys(post_data).length < 2){
            $("#timezone-settings-warning").removeClass("hidden");
            return;
        } else {
            if (!($("#timezone-settings-warning").hasClass("hidden"))) {
                $("#timezone-settings-warning").addClass("hidden");
            }
        }
        console.log("This is not good");
        $.ajax({
            url: '/time/',
            method: 'post',
            data: post_data,
            statusCode:{
                202: function () {
                    console.log("Inside 202");
                    $("#timezone-settings-success").removeClass("hidden");
                },
                400: function(){
                    $("#timezone-settings-error").removeClass("hidden");
                }
                // Must add 50X support here as well in future TODO
            }
        });
    });

    $("#ip-settings-apply").click(function(e) {
        e.preventDefault();
        if (!($("#ip-settings-warning").hasClass("hidden")))
            $("#ip-settings-warning").addClass("hidden");

        if (!($("#ip-settings-error").hasClass("hidden")))
            $("#ip-settings-error").addClass("hidden");

        if (!($("#ip-settings-success").hasClass("hidden")))
            $("#ip-settings-success").addClass("hidden");

        post_data = {};
        ip_settings = $("#ip-settings").serializeArray();
        ip_settings.forEach(function (item, index, array) {
            post_data[item.name] = item.value;
        });
        if (!post_data["ip_settings_dhcp"])
            post_data["ip_settings_dhcp"] = 0;

        // Let's validate some addresses
        var validIPAddress = function (ip) {
            return_value = true;
            ip_array = ip.split('.');
            if (ip_array.length != 4)
                return false;
            ip_array.forEach(function (item, index, array) {
                if (item > 255 || item < 0 || item.length == 0)
                    return_value = false;
                return;
            });
            return return_value;
        };

        var postData = function(send_data){
            $.ajax({
                url: "/ip/",
                method: "post",
                data: send_data,
                statusCode:{
                    202: function(){
                        $("#ip-settings-success").removeClass("hidden");
                    },
                    400: function(){
                        $("#ip-settings-error").removeClass("hidden");
                    }
                }
            });
        };

        if ($("#ip-settings-dhcp").prop("checked") == true){
            console.log(post_data);
            postData(post_data);
        } else if (!(validIPAddress(post_data["ip_settings_ipaddress"]) && validIPAddress(post_data["ip_settings_gateway"]))){
            $("#ip-settings-warning").removeClass("hidden");
        } else {
            console.log(post_data);
            postData(post_data);
        }
    });

    $("#ip-settings-dhcp").click(function(e){
        //e.preventDefault();
        console.log($("#ip-settings-dhcp").prop('checked'));
        if (($("#ip-settings-dhcp").prop('checked') == true)){
            $("#ip-settings-ipaddress").attr("disabled", true);
            $("#ip-settings-subnet").attr("disabled", true);
            $("#ip-settings-gateway").attr("disabled", true);
        } else {
            $("#ip-settings-ipaddress").attr("disabled", false);
            $("#ip-settings-subnet").attr("disabled", false);
            $("#ip-settings-gateway").attr("disabled", false);
        }
        //e.default();
    });

    $("#system-restart-button").click(function(e){
        e.preventDefault();
    });
    $("#system-restart-button").confirmation({
        onConfirm: function(event){
            $.ajax({
                url: '/restart/',
                method: 'post',
                statusCode:{
                    202: function () {
                        alert("System will reset soon, please refresh");
                    }
                }
            });
        },
        onCancel: function(){
            console.log("Sensible choice");
        },
        singleton: true
    });

    $("#system-reset-button").click(function(e){
        e.preventDefault();
    });
    $("#system-reset-button").confirmation({
        onConfirm: function(event){
            $.ajax({
                url: '/reset/',
                method: 'post',
                statusCode:{
                    202: function () {
                        alert("System will reset soon, please refresh");
                    }
                }
            });
        },
        onCancel: function(){
            console.log("Sensible choice");
        },
        singleton: true
    });
})(jQuery);