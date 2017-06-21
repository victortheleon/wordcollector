/**
 * Created by kumanish on 6/21/17.
 */
function copyTextToClipboard(text) {
    var copyFrom = $('<textarea/>');
    copyFrom.text(text);
    $('body').append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        copyTextToClipboard(request["content_value"]);
    });