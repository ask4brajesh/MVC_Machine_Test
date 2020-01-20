function AppendRow(row, ProductId, ProductName, categoryName) {
    //Bind CategoryrId.
    $(".ProductId", row).find("span").html(ProductId);

    //Bind CategoryName.
    $(".ProductName", row).find("span").html(ProductName);
    $(".ProductName", row).find("input").val(ProductName);

    $(".CategoryId", row).find("span").html(categoryName);
    $(".CategoryId", row).find("input").val(categoryName);

    row.find(".Edit").show();
    row.find(".Delete").show();
    $("#tblProduct").append(row);
};

var selectedDDL = null;
var selectedDDLName = null;
$('.ddlCategory').change(function () {
    selectedDDL = $(this).val();
    selectedDDLName = $(this).find("option:selected").text()
    console.log(selectedDDLName); 
})
function saveProduct() {
    var Product = {
        ProductName: $("#txtProductName").val(),
        CategoryId: $("#ddlCategoryId option:selected").val()
    };

    $.ajax({
        type: "POST",
        url: "/Product/SaveProduct",
        data: JSON.stringify(
            {
                product: Product
            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            var row = $("#tblProduct tr:last-child");
            if ($("#tblProduct tr:last-child span").eq(0).html() != "&nbsp;") {
                row = row.clone();
            }
            AppendRow(row, r.product.ProductId, r.product.ProductName, r.categoryName);
            $("#txtProductName").val("");
        },
        error: function (r) {
            var error = r;
            console.log("saveProduct : " + error);
        }
    });

}



$(function () {

    $("body").on("click", "#tblProduct .Edit", function () {
        var row = $(this).closest("tr");
        $("td", row).each(function () {
            if ($(this).find("input").length > 0) {
                $(this).find("input").show();
                $(this).find("span").hide();
            }
        });
        row.find(".CategoryId").hide();
        row.find(".ddlCategory3").show();
        row.find(".Update").show();
        row.find(".Cancel").show();
        row.find(".Delete").hide();
        $(this).hide();
    });


    $("body").on("click", "#tblProduct .Cancel", function () {
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
        row.find(".CategoryId").show();
        row.find(".ddlCategory3").hide();
        row.find(".Edit").show();
        row.find(".Delete").show();
        row.find(".Update").hide();
        $(this).hide();
    });

  

    

    $("body").on("click", "#tblProduct .Update", function () {
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
        row.find(".CategoryId").show();
        row.find(".ddlCategory3").hide();
        row.find(".Edit").show();
        row.find(".Delete").show();
        row.find(".Cancel").hide();
        row.find(".spacCategory").text(selectedDDLName);
        $(this).hide();        
        var Product = {};
        Product.ProductId = row.find(".ProductId").find("span").html();
        Product.ProductName = row.find(".ProductName").find("span").html();
        Product.CategoryId = selectedDDL;
        $.ajax({
            type: "POST",
            url: "/Product/UpdateProduct",
            data: '{product:' + JSON.stringify(Product) + '}',
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



    $("body").on("click", "#tblProduct .Delete", function () {
        if (confirm("Do you want to delete this row?")) {
            var row = $(this).closest("tr");
            var ProductId = row.find("span").html();
            $.ajax({
                type: "POST",
                url: "/Product/DeleteProduct",
                data: '{ProductId: ' + ProductId + '}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if ($("#tblProduct tr").length > 2) {
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
