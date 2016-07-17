$(function() {
    attachEventListener();
});


function attachEventListener() {
    $('#fileInput').on('change', function(e) {
        var file = e.target.files[0];
        var textType = /text.*/;

        if (file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                parseText(reader.result);
            }

            reader.readAsText(file);    
        } else {
            alert('file not supported');
        }
    });
}