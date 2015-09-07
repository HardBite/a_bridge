// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require_tree .

$(document).ready(function () {

  var moveRow = function (checkbox) {
    var target_url = $(checkbox).attr('id')
    var new_status = ""
    var old_status = $(checkbox).closest('table').attr('id')
    if (old_status == 'completed')
    	{new_status = 'pending'}
    else {new_status = 'completed'}
    
    $.ajax({
      type: "PUT",
      url: target_url,
      dataType: "json",
      data: {"task": {"status": new_status}},
      success: function(response) {
        if ($(checkbox).is(":checked")) {
          $(checkbox).closest("tr").remove().clone().prependTo("#completed tbody");
        } else {
          $(checkbox).closest("tr").remove().clone().prependTo("#pending tbody");
        }
        grabCompletedCheckboxes()
      },
      error: function(request, status, error) {
        console.log(request.responseText)
        if (request.responseText.includes('due_date')){

          $(checkbox).before('<div class="due-date-error"> <div class="alert alert-danger" role="alert"><span class="alert"> Due date have passed! </span></div></div>');

          $(".due-date-error").delay(800).fadeOut(1000).destroy;}

        $(checkbox).prop('checked', 'checked');
        grabCompletedCheckboxes()

      }
    })
  }
  
  var grabCompletedCheckboxes = function () {
    $("input.chkboxCompleted").off().on('click', function () {
      moveRow($(this))
    })
  }
  
  grabCompletedCheckboxes();
});
