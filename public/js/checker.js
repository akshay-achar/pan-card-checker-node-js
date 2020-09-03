var loadFile = function(event) { 
  document.getElementById('uploadedImage').style.display = 'none'
  document.getElementById('message').style.display = 'none'
  var image = document.getElementById('output');
  if (event.target.files[0].type.includes('image')) {
    image.src = URL.createObjectURL(event.target.files[0]);
    document.getElementById('uploadedImage').style.display = ''
  } else {
    alert('Please upload a Image File')
  }
  
}

$("#panCardValidationForm").on('submit', (e) => {
  $.LoadingOverlay("show")
  e.preventDefault()
  document.getElementById('message').style.display = 'none'
  if ($('#file')[0].files[0].type.includes('image')) {
    var fd = new FormData()
    fd.append('fileUpload', $('#file')[0].files[0])
    $.ajax({
      type: "POST",
      url: $("#panCardValidationForm").attr('action'),
      data: fd,
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      success: function (result) {
        $('#message').text('Result : ' + result)
        document.getElementById('message').style.display = ''
        $.LoadingOverlay('hide')
    }
    });
  } else {
    alert('Please upload a Image File')
  }
})