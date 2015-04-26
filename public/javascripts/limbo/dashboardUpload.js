(function() {
  console.log("dashboardUpload ...");
  $('#file_input').change(function() {
    file = $('#file_input').val();
    if(file == null) {
      console.log("no files");
    } else {
      console.log(file);
      get_signed_request(file);
    }
  });
})();

function get_signed_request(file) {
  url = "/sign_s3?file_name=" + file.name + "&file_type=" + file.type;
  $.get(url, function(data) {
    console.log(data);
  });
}