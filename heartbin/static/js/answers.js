
// Handle submitting inbox password
$(document).on("click", "#inboxPasswordSubmit", function(){

    // Retrieve inbox uuid from URL
    const urlSegments = window.location.pathname.split('/');
    if (urlSegments[urlSegments.length - 1] === '') {
        urlSegments.pop();
    }
    const inbox_uuid = urlSegments[urlSegments.length - 2];
    const inbox_secret = $("#inboxPassword").val();
    const button = $(this);

    button.prop("disabled", true);

});

function get_inbox_data(inbox_uuid){
    return $.ajax({
        method: "GET",
        url: API_URLS.inbox(inbox_uuid),
        contentType: "application/json",
    });
}

function get_inbox_replies(inbox_uuid, inbox_secret){
    return $.ajax({
        method: "GET",
        url: API_URLS.inboxReplies(inbox_uuid),
        contentType: "application/json",
    });
}

function handle_inbox_retrieve_success(response) {

    const container = $("#repliesList");
    let items = [];
    for(let i = 0; i < response.length; i++) {
        const item = response[i];
        const created_at = new Date(item.created_at).toLocaleString();
        let signature = item.signature || "<i class='text-muted'>anonymous</i>"
        items.push(`
            <li class="list-group-item">
                <div class="inboxAnswerText">${item.text}</div>
                <div class="inboxAnswerSignature">${signature}</div>
                <div class="inboxAnswerDate">${created_at}</div>
            </li>
        `);
    }
    $("#inboxLoading").remove();
    container.html(items.join('')).slideDown(300);

}
