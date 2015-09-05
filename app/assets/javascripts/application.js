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
    var target_url = "tasks/" + $(checkbox).attr('id')
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
        console.log(response)
        if ($(checkbox).is(":checked")) {
          console.log('checked')
          $(checkbox).closest("tr").remove().clone().prependTo("#completed tbody");
        } else {
          console.log('unchecked')
          $(checkbox).closest("tr").remove().clone().prependTo("#pending tbody");
        }
        console.log('function must go on')
        grabCheckboxes()
      },
      error: function() {
        $(checkbox).closest('tr').before("<tr class='due-date-error'><td></td><td><p> You can not mark this task as incomplete because it was due to date wich passed. Change due date first.</p> </td> <td></td> </tr>");
        $(".due-date-error").fadeOut(2500).destroy;
        $(checkbox).prop('checked', 'checked');
        grabCheckboxes()

      }
    })
  }
  
  var grabCheckboxes = function () {
    $(".completed").off().on('click', function () {
      moveRow($(this))
    })
    console.log('event listeners attached')
  }
  
  grabCheckboxes();
});
