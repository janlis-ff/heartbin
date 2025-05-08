
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
        url: API_URLS.inboxes(),
        data: JSON.stringify(data),
        contentType: "application/json",
        success: (response) => {
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
    modal.modal("show");
    modal.find("#publicLink").val(SITE_ROOT + "/inbox/" + response.uuid);
    modal.find("#answersLink").val(SITE_ROOT + "/inbox/" + response.uuid + "/answers");
    modal.find("#inboxSecret").val(response.secret);

}
