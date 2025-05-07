
const API_URL = "http://127.0.0.1:8000/api/"


function handle_api_error(error) {
    if(error.responseJSON){
        let json = error.responseJSON;
        if(json.detail) {
            alert(json.detail);
            return;
        }else{
            for(let key in json) {
                if(json[key].length > 0){
                    let msg = key + ": " + json[key][0];
                    alert(msg);
                    return;
                }
            }
        }
    }
    console.error(error);
    alert("An error occurred. Please try again.");
}

function copyText(id) {
    var copyText = document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
}

// Handle all ajax errors with handle_api_error
$(document).ajaxError((event, jqxhr, settings, thrownError) => {
    if (settings.error) {
        return;
    }
    handle_api_error(jqxhr);
});

// Include CSRF token in ajax requests
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        const csrfToken = $('meta[name="csrf-token"]').attr('content');
        if (!(/^GET|HEAD|OPTIONS|TRACE$/i.test(settings.type))) {
            xhr.setRequestHeader("X-CSRFToken", csrfToken);
        }
    }
});

// Handle heartbin creation form
$(document).on("submit", "#createForm", (e) => {
    e.preventDefault();
    const form = $(e.currentTarget);
    const data = {
        question: form.find("[name=question]").val(),
        signature: form.find("[name=signature]").val(),
        allow_anonymous: form.find("[name=allowAnonymous]").is(":checked"),
        expires_at: form.find("[name=expiresAt]").val(),
    }

    $.ajax({
        method: "POST",
        url: API_URL + "inboxes/",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: (response) => {
            console.log(response);
            handle_inbox_creation_success(response);
        },
    });

});

// Handle heartbin creation success
function handle_inbox_creation_success(response) {

    // Clear the form
    const form = $("#createForm");
    form.find("input[type=text]").val("");
    form.find("input[type=checkbox]").prop("checked", false);

    // Show a popup with the inbox URL and access link
    const modal = $("#heartbinCreatedModal");
    modal.find("#publicLink").text(response.reply_url);
    modal.find("#privateLink").text(response.access_url);
    modal.modal("show");

}
