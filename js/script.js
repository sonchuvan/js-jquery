var data;
var currentId = null;
var flag;
$(document).ready(function () {
    //read file json
    var dataFromFile;
    $.getJSON("../json/student.json", dataFromFile,
        function (dataFromFile, textStatus, jqXHR) {
            data = dataFromFile;
            generateTable(data, 0)
        });
    //function generate table
    function generateTable(data, i) {
        data.forEach(element => {
            $("table").append('<tr>' +
                '<td class="check">' +
                '<input type="checkbox" name="' + i + '" id="' + i + '"/>' +
                '</td>' +
                '<td>' + element.name + '</td>' +
                '<td>' + element.birthday + '</td>' +
                '<td>' + element.phone + '</td>' +
                '<td>' + element.hometown + '</td>' +
                '</tr>")');
            i++;
        });
    };

    //reset click
    $("#reset").click(function () {
        clearForm();
    });

    //save click
    $("#save").click(function () {
        validateData();
        if (currentId == null && flag == true) {
            $("table").append('<tr>' +
                '<td class="check">' +
                '<input type="checkbox" name="checkbox" id="checkbox"/>' +
                '</td>' +
                '<td>' + $("#name").val() + '</td>' +
                '<td>' + $("#birthday").val() + '</td>' +
                '<td>' + $("#phone").val() + '</td>' +
                '<td>' + $("#hometown").val() + '</td>' +
                '</tr>")')
            var student = { "name": $("#name").val(), "birthday": $("#birthday").val(), "phone": $("#phone").val(), "hometown": $("#hometown").val() }
            data.push(student);
            clearForm();
        }
        else {
            var row = $("input[type=checkbox]:checked").closest("tr")[0];
            row.cells[1].innerHTML = $("#name").val();
            row.cells[2].innerHTML = $("#birthday").val();
            row.cells[3].innerHTML = $("#phone").val();
            row.cells[4].innerHTML = $("#hometown").val();
            $("input[type=checkbox]:checked").prop("checked", false);
            alert("đã sửa sinh viên")
            var student = { "name": $("#name").val(), "birthday": $("#birthday").val(), "phone": $("#phone").val(), "hometown": $("#hometown").val() }
            data[currentId] = student;
            console.log(data.toString);
            currentId = null;
            clearForm();
        }

    });
});

//clearForm
function clearForm() {
    $("#name").val("");
    $("#birthday").val("");
    $("#phone").val("");
    $("#hometown").val("");
};

//validate data
function validateData() {
    flag = true;
    var nameRegex = /^[\w|\W]{1,50}$/i;
    var symbolRegex = /^[^`~!@#$%^&*\(\)\\\/<>,.'+=-_?;:"\{\}\[\]]$/;
    var phoneRegex = /^[0-9]{10}$/;
    var hometownRegex = /^[\w,\W,]{1,100}$/i;
    dob = new Date($("#birthday").val());
    var today = new Date();
    var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
    if (nameRegex.test($("#name").val()) == false || symbolRegex.test($("#name").val()) == false) {
        flag = false;
        $("#validName").html("Name values is not valid");
    }
    else {
        $("#validName").html("");
    }
    if (age < 0 || age > 20 || $("#birthday").val()=="") {
        flag = false;
        $("#validBirthday").html("birthday values is not valid");
    }
    else {
        flag = true;
        $("#validBirthday").html("");
    }
    if (phoneRegex.test($("#phone").val()) == false) {
        flag = false;
        $("#validPhone").html("phone values is not valid");
    }
    else {
        $("#validPhone").html("");
    }
    if (hometownRegex.test($("#hometown").val()) == false) {
        flag = false;
        $("#validHometown").html("hometown values is not valid");
    }
    else {
        $("#validHometown").html("");
    }
    console.log(flag)
}

$(document).ready(function () {

    $("table").change(function () {
        let count = countChecked();
        if (count === 0) {
            $("#edit").prop('disabled', true);
            $("#delete").prop('disabled', true);
        } else {
            $("#edit").prop('disabled', false);
            $("#delete").prop('disabled', false);
        }
    });

    const countChecked = () => {
        let count = 0;
        for (const checkbox of document.querySelectorAll('input[type="checkbox"]')) {
            if (checkbox.checked === true) {
                count++;
            }
        }
        return count;
    }

    $("#edit").click(function () {
        let count = countChecked();
        if (count > 1) {
            alert("bạn chỉ được chọn 1 học sinh để sửa")
        } else {
            $("Table input[type=checkbox]:checked").each(function () {
                var row = $(this).closest("tr")[0];
                currentId = $(this).attr("id");
                console.log(currentId)
                $("#name").val(row.cells[1].innerHTML);
                $("#birthday").val(row.cells[2].innerHTML);
                $("#phone").val(row.cells[3].innerHTML);
                $("#hometown").val(row.cells[4].innerHTML);
            });
        }
    });

    $("#delete").click(function () {
        confirm("Bạn có muốn xóa các sinh viên đã chọn không?");
        $("Table input[type=checkbox]:checked").each(function () {
            data.splice($(this).get(0).id, 1);
        });
        $("Table tr:has(input[type=checkbox]:checked)").remove();
        console.log(data.toString());
    });
});