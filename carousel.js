

$("#checkbox").change(function () {
    setInterval(function () {
        goNext();
    }, 500);
});

let slideCount = $("#carousle ul li").length;
const slideWidth = $("#carousle ul li").width();
const slideHeight = $("#carousle ul li").height();
const carousleUlWidth = slideCount * slideWidth;

$("#carousle").css({ width: slideWidth, height: slideHeight });

$("#carousle ul").css({ width: carousleUlWidth, marginLeft: - slideWidth });

$("#carousle ul li:last-child").prependTo("#carousle ul");

function goPrevious() {
    $("#carousle ul").animate({
        left: + slideWidth
    }, 200, function () {
        $("#carousle ul li:last-child").prependTo("#carousle ul");
        $("#carousle ul").css("left", "");
    });
};

function goNext() {
    $("#carousle ul").animate({
        left: - slideWidth
    }, 200, function () {
        $("#carousle ul li:first-child").appendTo("#carousle ul");
        $("#carousle ul").css("left", "");
    });
};

$("a.prev_slide").click(function () {
    goPrevious();
});

$("a.next_slide").click(function () {
    goNext();
});

function hidecarousle() {
    $("#carousle").hide()
};

function showCarousle() {
    $("#carousle").show()
};

function clearCarousle() {
    $("#carousle ul").html("")

}
//append info to the carousle
function createCarousle(data, _capital) {
    if ($("#carousle ul").children().length === 0) {
        const slide = $("<li></li>")
        $("#carousle ul").append(slide);
    }
    const flag = $("<li></li>").append($("<img></img>").attr("src", data.flag));
    $("#carousle ul").append(flag);
    if (_capital) {
        flag.append($("<span></span>").html(data.capital).attr("class", "capital"));
        $("img").css({ "height": "80%" });
    }
};

