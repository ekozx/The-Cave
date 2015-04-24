(function() {
  console.log("dashboardUpload ...");
  $('#file_input').change = function() {
    var files = $('#file_input').files;
    var file = files[0];
    if(file == null) {
      console.log("no files");
    } else {
      get_signed_request(file);
    }
  }
})();

function get_signed_request(file) {
  url = "/sign_s3?file_name=" + file.name + "&file_type=" + file.type;
  $.get(url, function(data) {
    console.log(data);
  });
}