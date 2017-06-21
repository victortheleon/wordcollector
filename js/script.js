/**
 * Created by kumanish on 6/20/17.
 */

var div = document.createElement("div");
div.id = "draggable-ui";
// div.className = "ui-widget-content";
div.innerHTML = '<div class="container" style="width: 100%; text-align: center;"><div class="row" style="border-bottom: solid 0.5px #666666;">' +
    '<div class="col-6" ><button class="ui-button ui-widget ui-corner-all" id="copy-content">Copy</button></div>' +
    '<div class="col-6" ><button class="ui-button ui-widget ui-corner-all" onclick={$(".single-record").remove();}>Clear</button></div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col-12"><div style="overflow-y: scroll; height: 60%; background: white;"><table id="copy-table"></table></div></div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col-12"><a href="http://mydigiseller.ru/" target="_blank"><img src="http://mydigiseller.ru/app.png" style="max-width: 100%; height: auto; width: auto;"></a></div>' +
    '</div></div>';
// div.style.display = "none";
div.style = "width: 16vw; height:70vh; padding: 0.5em; position:absolute; top:10px; right:20px; background: #ededed;";

$("#fancybox-loading").attrchange({
    trackValues: true,
    callback: function (event) {
        if (event.oldValue == "display: block;" && event.newValue == "display: none;") {

            $("#flt_ID_D").parent().parent().parent().children(':first-child')
                .html("<p id='all-word-helper' style='font-size: x-large; cursor: hand;'>+</p>");
            var counter = 0;
            while (counter >= 0) {
                if ($("#tr_in" + counter)[0]) {
                    $("#tr_in" + counter).prepend("<td><p class='word-helper' style='cursor: hand'>+</p></td>")
                    counter++;
                } else {
                    counter = -1;
                }
            }

            $('.word-helper').click(function (e) {
                e.preventDefault();
                var tr = document.createElement("tr");
                tr.className = "single-record";
                tr.innerHTML = "<td style='border-bottom: solid 0.5px #666666' class='single-content'>" + $(e.target).parent().parent().children(':nth-child(3)').html()
                    + "\n</td><td><p class='clear-record' onclick='{$(this).parent().parent().remove();}' style='cursor: hand; color: red'>x</p></td>";
                // tr.style.borderBottom = "solid 0.5px #666666;";
                $("#copy-table").append(tr);
                e.stopPropagation();
            });
        }
    }
});


$("#fancybox-content").attrchange({
    trackValues: true,
    callback: function (event) {
        if (event.target.childNodes.length && $("#tr_in0")[0]) {
            $("#fancybox-content").children(':first-child').append(div);
            // document.body.appendChild(div);
            $("#draggable-ui").draggable();
            document.getElementById("copy-content").onclick = function () {
                var result = $(".single-content").text();
                chrome.runtime.sendMessage({"content_value": result});
            };
            document.getElementById("all-word-helper").onclick = function () {
                $(".word-helper").trigger("click");
            };
        }
    }
});



