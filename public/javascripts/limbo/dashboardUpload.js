$(function() {
  $('#file_input').change(function() {
    var file = this.files[0];
    name = file.name;
    size = file.size;
    type = file.type;

    if(file == null) {
      alert("No files detected.");
    } else {
      if(file_test(file)) {
        getSignedRequest(file);
      }
    }
  });
});
function file_test(file) {
  result = true;

  if(file.name.length < 1) {
    result = false;
    alert("File needs a name.");
  } else if(file.type != 'image/png' && 
            file.type != 'image/jpg' && 
            file.type != 'image/gif' && 
            file.type != 'image/jpeg' ) {
    result = false;
    alert("File is not an acceptable type. Please use png, jpg, gif or jpeg extensions.");
  }

  return result;
}
function getSignedRequest(file) {
  type = file.split(".")[1];
  url = "/sign_s3?file_name=" + file + "&file_type=" + type;
  $.get(url, function(data) {
    console.log(data);
  });
}