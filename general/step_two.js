$(document).on("click", "#submit_two", function() {
    $("#step_two .container small:eq(0)").text("");
    $("#step_two .container small:eq(1)").text("");
    $("#step_three .container").empty();
    $("#step_four .container").empty();
    $("#step_three").addClass("hide");
    $("#step_four").addClass("hide");

    var inner_one = null;
    var inner_two = null;

    var select_length = $("#step_two .btn-group").length;
    if (select_length >= 1)
    {
        var thisOne = $("#step_two .btn-group .selected").first();
        var inner_select_length = $(thisOne).length;
        if (inner_select_length == 1)
        {
            var parent_index = $(thisOne).parent().attr("course_index");
            var course_index = $(thisOne).attr("array_index");


            if (parent_index == 1)
            {
                inner_one = one[course_index];
                if (select_length == 1)
                    inner_two = two;
            }
            else if (parent_index == 2)
            {
                inner_two = two[course_index];
                if (select_length == 1)
                    inner_one = one;
            }
        }
        else
        {
            $("#step_two .container small:eq(0)").text("Vänligen välj ett utav eventen.");
        }
    }
    if (select_length == 2)
    {
        var thisOne = $("#step_two .btn-group:eq(1) .selected");
        var inner_select_length = $(thisOne).length;
        if (inner_select_length == 1)
        {
            var course_index = $(thisOne).attr("array_index");
            inner_two = two[course_index];
        }
        else
        {
            $("#step_two .container small:eq(1)").text("Vänligen välj ett utav eventen.");
        }
    }

    if (select_length == 1 && (inner_one === null && inner_two === null))
    {
        // Fel
    }
    else if (select_length == 2 && (inner_one === null || inner_two === null))
    {
        // Fel
    }
    else
    {
        if (inner_one !== null)
            one = inner_one;
        if (inner_two !== null)
            two = inner_two;

        step_three();
    }
});

function showStepTwoMultiple(events1, events2, course1, course2)
{
    printCourseChooseInfo();

    printCourseChoose(events1, course1, 1);
    printCourseChoose(events2, course2, 2, true);

    printSubmitButton();
}

function printSubmitButton()
{
    $("#step_two .container").append('<button type="submit" class="btn btn-primary" id="submit_two">Submit</button>');
}

function showStepTwoSingle(events, course, index)
{
    printCourseChooseInfo();
    printCourseChoose(events, course, index);
    printSubmitButton();
}

function printCourseChooseInfo()
{
    $("#step_two").removeClass("hide");
    $("#step_two .container").append("<h4>För en eller flera utav kurserna hittade vi flertalet händelser.</h4>");
    $("#step_two .container").append("<h5>Vänligen välj en schemahändelse för respektive kurs nedan.</h5>");
}

function printCourseChoose(events, course, index, group_index)
{
    $("#step_two .container").append("<h6>Kurs: " + course + "</h6>");
    $("#step_two .container").append('<small class="text-danger"></small>');
    $("#step_two .container").append('<div class="btn-group btn-group-lg" role="group" course_index="' + index + '"></div>');

    var selector;
    if (typeof group_index === "undefined")
        selector = $("#step_two .container .btn-group").first();
    else
        selector = $("#step_two .container .btn-group").next().next().next();

    jQuery.each(events, function(i, val) {
        $(selector).append('\
            <div class="select_event" array_index="' + i + '">\
            ' + val["title"] + '<hr>\
            ' + val["start"] + '<hr>\
            ' + val["end"] + '\
            </div>\
            ');
    });
}

$(document).ready(function(){
    $(document).on("click", ".select_event", function() {
        $(this).addClass('selected').siblings().removeClass('selected')
    });
});