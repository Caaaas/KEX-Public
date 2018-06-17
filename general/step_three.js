function step_three()
{
    $("#step_four").addClass("hide");
    if (one["locations"].length > 1 || (two !== null && two["locations"].length > 1))
    {
        $("#step_three").removeClass("hide");
        scrollTo("three");

        if (one["locations"].length > 1)
        {
            printHallChoice("one", one["locations"], 1)
        }

        if (two !== null && two["locations"].length > 1)
        {
            printHallChoice("two", two["locations"], 2)
        }

        $("#step_three .container").append('<button type="submit" class="btn btn-primary" id="submit_three">Submit</button>');
    }
    else
    {
        step_four();
    }
}

$(document).on("click", "#submit_three", function() {
    $("#step_three .form-group small").text("");

    var data_one = null;
    var data_two = null;
    if($("#step_three_input_one").length != 0)
    {
        if ($('#step_three_input_one').find(":selected").text() !== "Välj sal") {
            var data_one = $('#step_three_input_one').find(":selected").text();
            one["locations"] = [data_one];
        }
        else
            $("#step_three .form-group small:eq(0)").text("Vänligen välj en sal.");
    }

    if($("#step_three_input_two").length != 0)
    {
        if ($('#step_three_input_two').find(":selected").text() !== "Välj sal") {
            var data_two = $('#step_three_input_two').find(":selected").text();
            two["locations"] = [data_two];
        }
        else
        {
            if ($("#step_three_input_one").length == 0)
                $("#step_three .form-group small:eq(0)").text("Vänligen välj en sal.");
            else
                $("#step_three .form-group small:eq(1)").text("Vänligen välj en sal.");
        }
    }

    if($("#step_three_input_one").length != 0 && $("#step_three_input_two").length != 0 && data_one !== null && data_two !== null)
        step_four();
    else if($("#step_three_input_one").length != 0 && $("#step_three_input_two").length == 0 && data_one !== null)
        step_four();
    else if($("#step_three_input_one").length == 0 && $("#step_three_input_two").length != 0 && data_two !== null)
        step_four();
});

function printHallChoice(ordering, halls, index)
{
    $("#step_three .container").append('\
                        <div class="form-group" course_index="' + index + '">\
                            <label for="step_three_input_' + ordering + '">' + $("#input_" + ordering).val() + '</label>\
                            <small class="text-danger"></small>\
                            <select class="form-control" id="step_three_input_' + ordering + '">\
                                <option>Välj sal</option>\
                            </select>\
                        </div>');

    jQuery.each(halls, function(i, val) {
        $("#step_three .container .form-group .form-control").append("<option>" + val + "</option>");
    });
}