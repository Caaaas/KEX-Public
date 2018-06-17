$(document).on("click", "#submit_one", function() {
    $("#step_one .form-group").first().find("small").text("");
    $("#step_one .form-group").first().next().find("small").text("");
    $("#step_two .container").empty();
    $("#step_three .container").empty();
    $("#step_four .container").empty();
    $("#step_two").addClass("hide");
    $("#step_three").addClass("hide");
    $("#step_four").addClass("hide");
    $.ajax({
        url: "/step_one.php",
        type: "POST",
        dataType: "json",
        data: {
            one: $("#input_one").val(),
            two: $("#input_two").val()
        },
        success: function (response) {
            if (response[0] === true)
            {
                if (response[1] !== false && typeof response[1] === "string")
                {
                    $("#step_one .container .form-group").first().find("small").text(response[1]);
                }
                if (response[2] !== false && typeof response[2] === "string")
                {
                    $("#step_one .container .form-group").first().next().find("small").text(response[2]);
                }
            }
            else if(response[0] === 2)
            {
                if (response[1][0] === "events" && response[2] !== null && response[2][0] === "events")
                {
                    one = response[1][1];
                    two = response[2][1];
                    showStepTwoMultiple(response[1][1], response[2][1], $("#input_one").val(), $("#input_two").val());
                }
                else if (response[1][0] === "events")
                {
                    one = response[1][1];
                    if (response[2] !== null)
                        two = response[2][1];
                    showStepTwoSingle(response[1][1], $("#input_one").val(), 1);
                }
                else if (response[2] !== null && response[2][0] === "events")
                {
                    one = response[1][1];
                    two = response[2][1];
                    showStepTwoSingle(response[2][1], $("#input_two").val(), 2);
                }
                scrollTo("two");
            }
            else if(response[0] === 3)
            {
                step_three();
                scrollTo("three");
            }
            else if(response[0] === 4)
            {
                one = response[1][1];
                if (response[2] !== null)
                    two = response[2][1];
                step_four();
                scrollTo("four");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("ERROR: ");
            console.log(JSON.stringify(textStatus, null, 4));
            console.log(JSON.stringify(errorThrown, null, 4));
            console.log(JSON.stringify(jqXHR, null, 4));
        }
    });
});