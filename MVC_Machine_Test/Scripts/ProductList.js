

    $(document).ready(function () {
        $("#myTable").DataTable({
            "processing": true, // for show progress bar
            "serverSide": true, // for process server side
            "filter": false, // this is for disable filter (search box)
            "orderMulti": false, // for disable multiple column at once
            "ajax": {
                "url": "/home/LoadData",
                "type": "POST",
                "datatype": "json"
            },
            "columns": [
                { "data": "ProductId", "name": "ProductId", "autoWidth": true },
                { "data": "ProductName", "name": "ProductName", "autoWidth": true },
                { "data": "CategoryId", "name": "CategoryId", "autoWidth": true },
                { "data": "CategoryName", "name": "CategoryName", "autoWidth": true }
            ]
        });
    });
    

