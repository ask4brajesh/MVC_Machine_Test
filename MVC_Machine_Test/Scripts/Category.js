
function AppendRow(row, CategoryId, CategoryName) {
    //Bind CategoryrId.
    $(".CategoryId", row).find("span").html(CategoryId);

    //Bind CategoryName.
    $(".CategoryName", row).find("span").html(CategoryName);
    $(".CategoryName", row).find("input").val(CategoryName);

    row.find(".Edit").show();
    row.find(".Delete").show();
    $("#tblCategory").append(row);
};

function saveCategory() {
    var Category = {
        CategoryName: $("#txtCategoryName").val()
    };

    $.ajax({
        type: "POST",
        url: "/Category/SaveCategory",
        data: JSON.stringify(
            {
                category: Category
            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            var row = $("#tblCategory tr:last-child");
            if ($("#tblCategory tr:last-child span").eq(0).html() != "&nbsp;") {
                row = row.clone();
            }
            var _id = r.category.CategoryId;
            var _name = r.category.CategoryName;
            AppendRow(row, _id, _name);
            $("#txtCategoryName").val("");
        },
        error: function (r) {
            var error = r;
            console.log("SaveCategory : " + error);
        }
    });

}

$(function () {
    $("body").on("click", "#tblCategory .Edit", function () {
        var row = $(this).closest("tr");
        $("td", row).each(function () {
            if ($(this).find("input").length > 0) {
                $(this).find("input").show();
                $(this).find("span").hide();
            }
        });
        row.find(".Update").show();
        row.find(".Cancel").show();
        row.find(".Delete").hide();
        $(this).hide();
    });

    $("body").on("click", "#tblCategory .Cancel", function () {
        var row = $(this).closest("tr");
        $("td", row).each(function () {
            if ($(this).find("input").length > 0) {
                var span = $(this).find("span");
                var input = $(this).find("input");
                input.val(span.html());
                span.show();
                input.hide();
            }
        });
        row.find(".Edit").show();
        row.find(".Delete").show();
        row.find(".Update").hide();
        $(this).hide();
    });

    $("body").on("click", "#tblCategory .Update", function () {
        var row = $(this).closest("tr");
        $("td", row).each(function () {
            if ($(this).find("input").length > 0) {
                var span = $(this).find("span");
                var input = $(this).find("input");
                span.html(input.val());
                span.show();
                input.hide();
            }
        });
        row.find(".Edit").show();
        row.find(".Delete").show();
        row.find(".Cancel").hide();
        $(this).hide();

        var Category = {};            
        Category.CategoryId = row.find(".CategoryId").find("span").html();
        Category.CategoryName = row.find(".CategoryName").find("span").html();
        $.ajax({
            type: "POST",
            url: "/Category/UpdateCategory",
            data: '{category:' + JSON.stringify(Category) + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                alert(r.msg);
            },
            error: function (e) {
                alert(e);
            }
        });
    });


    $("body").on("click", "#tblCategory .Delete", function () {
        if (confirm("Do you want to delete this row?")) {
            var row = $(this).closest("tr");
            var CategoryId = row.find("span").html();
            $.ajax({
                type: "POST",
                url: "/Category/DeleteCategory",
                data: '{CategoryId: ' + CategoryId + '}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if ($("#tblCategory tr").length > 2) {
                        row.remove();
                    } else {
                        row.find(".Edit").hide();
                        row.find(".Delete").hide();
                        row.find("span").html('&nbsp;');
                    }
                }
            });
        }
    });



});

