

// Generic API error handler
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

// Function to copy text to clipboard
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
