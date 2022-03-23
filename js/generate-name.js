function generateName() {

    var inputDescription = $('#description');
    var inputDate        = $('#date');
    var inputTime        = $('#time');

    var outputName         = $('#sql-name');
    var outputNameRollback = $('#sql-name-rollback');

    var date        = inputDate.val().replace(/-/g, '');
    var time        = inputTime.val().replace(/:/g, '');
    var description = inputDescription.val().replace(/[^\w\s]/gi, '').replace(/\s/g, '');

    var today = new Date();

    if (date.length == 0) {
        date = today.getFullYear() + '' + (today.getMonth() + 1).toString().padStart(2, '0') + '' + today.getDate().toString().padStart(2, '0');
    }

    if (time.length == 0) {
        time = today.getHours().toString().padStart(2, '0') + '' + today.getMinutes().toString().padStart(2, '0');
    }

    var name          = `V${date}.${time}__${description}.sql`;
    var rollback_name = `V${date}.${time}__ROLLBACK_${description}.sql`;

    outputName.text(name);
    outputNameRollback.text(rollback_name);
}

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}

$(function () {

    $('#description').keyup(function () {
        generateName();
    });

    $('#date').change(function () {
        generateName();
    });

    $('#time').change(function () {
        generateName();
    });

    $('#sql-name').click(function () {
        copyToClipboard('#sql-name');
    });

    $('#sql-name-rollback').click(function () {
        copyToClipboard('#sql-name-rollback');
    });

});