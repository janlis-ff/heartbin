$(document).ready(function(){

    const url_segments = window.location.pathname.split("/");
    const reply_uuid = url_segments[url_segments.length - 1] || url_segments[url_segments.length - 2];

    $.ajax({
        method: "GET",
        url: API_URL + "inboxes/" + reply_uuid + "/",
        contentType: "application/json",
        success: (response) => {
            handle_inbox_retrieve_success(response);
        },
        error: (error) => {
            $("#inboxLoading").remove();
            if(error.status == 404) {
                alert("Heartbin not found. Make sure the URL is correct.");
                return false;
            }
            handle_api_error(error);
        },
    });

});


function handle_inbox_retrieve_success(response) {
    const form = $("#replyForm");

    // Populate the form with the response data
    form.find("#replyTo").text(response.owner_name);
    form.find(".inboxQuestion").text(response.question);

    form.data("inbox", response);

    // Show the reply form
    $("#inboxLoading").remove();
    form.slideDown(200);
}

$(document).ready(function(){
    handle_inbox_retrieve_success({
        "question": "What do you like about me?",
        "owner_name": "John Doe",
        "anonymous_allowed": true,
    });
});

// Handle reply submit
$(document).on("submit", "#replyForm", (e) => {
    e.preventDefault();
    const form = $(e.currentTarget);
    const inbox = form.data("inbox");
    const data = {
        text: form.find("[name=replyText]").val(),
        signature: form.find("[name=replySignature]").val(),
    };
    if(!data.signature && !inbox.anonymous_allowed) {
        alert("This inbox does not allow anonymous replies. Please provide a signature.");
        return;
    }
    $.ajax({
        method: "POST",
        url: API_URL + "inboxes/" + inbox.uuid + "/replies/",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: (response) => {
            alert("You reply has been sent. Thank you!");
            form.find("input[type=text]").val("");
        },
    });
});
