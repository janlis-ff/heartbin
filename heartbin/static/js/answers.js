$(document).ready(function(){

    // Get URL segments elements
    const urlSegments = window.location.pathname.split('/');
    if (urlSegments[urlSegments.length - 1] === '') {
        urlSegments.pop();
    }
    const inbox_uuid = urlSegments[urlSegments.length - 3];
    const inbox_key = urlSegments[urlSegments.length - 1];

    // Attempt to retrieve inbox answers, pass key as a header
    $.ajax({
        method: "GET",
        url: API_URL + "inboxes/" + inbox_uuid + "/answers/?key=" + inbox_key,
        contentType: "application/json",
        success: (response) => {
            handle_inbox_retrieve_success(response);
        },
    });

});


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
