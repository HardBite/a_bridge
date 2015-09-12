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

          $(".due-date-error").delay(800).fadeOut(1000).remove();}

        $(checkbox).prop('checked', 'checked');
        grabCompletedCheckboxes()

      }
    })
  };

  var deleteTask = function (href) {
    var target_url = href.prop("href")
    console.log(target_url);

      $.ajax({
      type: "DELETE",
      url: target_url,
      dataType: "json",
      data: {},
      success: function(response) {
        href.closest("tr").fadeOut(1000).remove()
      },
      error: function(request, status, error) {
        console.log(request.responseText)}
    
    })
  }
  
  var grabCompletedCheckboxes = function () {
    $("input.chkboxCompleted").off().on('click', function () {
      moveRow($(this))
    })
  };

  var grabDeleteCheckboxes = function(table) {
    return table.find("input#tasks_")
  };

  var deleteCheckedRows = function() {
    $("input#tasks_").each(function() {
      if ($(this).is(":checked")) {
        console.log($(this))
          $(this).closest("tr").fadeOut(500).remove()}
    });
    grabDeleteButton;
    };

  

  var selectAll = function(link) {
    var table = link.closest("table")
    var chkboxes = grabDeleteCheckboxes(table)
    console.log(chkboxes)
    chkboxes.each(function() {
      $(this).prop("checked", true)
    })
  }

  var selectNone = function(link) {
    var table = link.closest("table")
    var chkboxes = grabDeleteCheckboxes(table)
    console.log(chkboxes)
    chkboxes.each(function() {
      $(this).prop("checked", false)
    })
  }
  

  var grabSelectAllLink = function () {
    $("a.select-all").off().on('click', function(e) {
      e.preventDefault();
      selectAll($(this));
      
    })
  };

  var grabSelectNoneLink = function () {
    $("a.select-none").off().on('click', function(e) {
      e.preventDefault();
      selectNone($(this));
    })
  };

  var grabDeleteLink = function () {
    $("a[data-method='delete']").on('click', function() {
      deleteTask($(this));
      return false;
    })
  };



  var grabDeleteButton = function(){
    $("input[value='Delete']").off().on('click', function(event){
      event.preventDefault();
      var params = event.target.closest("form");
      params = $(params).serializeArray();
      var target_url = event.target.closest("form").getAttribute('action');

      console.log(params)

      $.ajax({
        type: "DELETE",
        url: target_url,
        dataType: "json",
        data: params,
        success: function(response) {
          console.log('OK')
          deleteCheckedRows()
        },
        error: function(request, status, error) {
          console.log(error)}
    
    });
      params = undefined

    })
  };

/*http://blog.niklasottosson.com/?p=1914 */


  function sortTable(table, order){
    var rows = $(table).find('tbody').find('tr');
    console.log(rows)

    rows.sort(function(a, b) {

    var A = $(a).children('td').eq(1).text().toUpperCase();
    var B = $(b).children('td').eq(1).text().toUpperCase();

    if(A < B) {
      return (-1*order);
    }

    if(A > B) {
      return (1*order);
    }

    return (0*order);

    });

    $.each(rows, function(index, row) {
      $(table).children('tbody').append(row);
    });
  }



  var grabSortLink = function() {
    $("a.title-sort-link").on("click", function(e) {
      e.preventDefault();
      var table = $(this).closest('table');
      if ($(this).hasClass('reverse')) {
        order = -1
        sortTable(table, order);
        $(this).removeClass('reverse')
        $(this).addClass('direct')
        $(this).next().removeClass('glyphicon glyphicon-arrow-down')
        $(this).next().addClass('glyphicon glyphicon-arrow-up')

      }
      else {
        order = 1
        sortTable(table, order);
        $(this).removeClass('direct')
        $(this).addClass('reverse')
        $(this).next().removeClass('glyphicon glyphicon-arrow-up')
        $(this).next().addClass('glyphicon glyphicon-arrow-down')

      };
    });
  };

  var formValidate = function (form) {
    var isValid = true

    var title = form.find("input#task_title")[0]
    if (title.value.length == 0)
      {markErroneous(title, "Can't be blank");
      isValid=false;}

    var priority = form.find("input#task_priority")[0]
    if (!$.isNumeric(priority.value))
      {markErroneous(priority, "Should be a number");
      isValid=false}

    var year = form.find("select#task_due_date_1i")[0]
    var month = form.find("select#task_due_date_2i")[0]
    var day = form.find("select#task_due_date_3i")[0]
    var selectedDate = new Date($(year).val(), $(month).val()-1, $(day).val(), 0, 0, 0)
    var now = new Date()
    console.log(selectedDate - now)
    if ((selectedDate - now) < 0)
      {markErroneous(year, "Should be a future date");
      isValid=false}
  return isValid




    
  };

  var markErroneous = function (field, errorText) {
    var divField = $(field).closest("div.form-group")
    divField.addClass("field-error")
    divField.append('<p class="error-text">' + errorText + '</p>')

 };

  var grabNewTaskSubmit = function () {
    $('input[value="Create Task"]').on('click', function(event) {
      var form = $(this).closest('form')
      form.find('p.error-text').remove()
      $('div.field-error').removeClass("field-error")
      if (!formValidate($(this).closest('form')))
        {event.preventDefault()};
    })
  }

  grabNewTaskSubmit();
  grabSortLink();
  grabCompletedCheckboxes();
  grabSelectAllLink();
  grabSelectNoneLink();
  grabDeleteLink();
  grabDeleteButton();
});
