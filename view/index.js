let myLastMsg;
let send = () => {

    let msg = $('#msgTextArea').val();
    myLastMsg = msg;
    $('#sentMsg').text("You Sent: " + msg);

    $.ajax({
        url: "http://localhost:3000/send_msg",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            msg: msg,
        }),
        contentType: "application/json",
        cache: false,
        timeout: 5000,
        complete: function () {
            console.log('process complete');
        },
        success: function (data) {
            console.log('process sucess');
            $('#msgTextArea').val("");
        },

        error: function () {
            console.log('process error');
        },
    });
}

function ajaxCall() {
    $.ajax({
        url: "http://localhost:3000/data", success: function (result) {

            if (result !== myLastMsg) {
                $('#recMsg').text(result);
            }
        }
    })
}
setInterval(ajaxCall, 3000)