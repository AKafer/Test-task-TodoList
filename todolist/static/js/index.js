$(document).ready(function () {
  sel_status = $("#select_status");

  sel_status.empty();
  sel_status.append(`<option value="Все">Все</option>`);
  sel_status.append(`<option value="В процессе">В процессе</option>`);
  sel_status.append(`<option value="Просрочена">Просроченные</option>`);
  sel_status.append(`<option value="Выполнена">Выполненные</option>`);

  sel_status.change(function () {
    const url = `api/tasks/?status=${sel_status.val()}`;
    console.log(url);
    table.ajax.url(url).load();
  });

  console.log("***Table***");
  const url = "api/tasks/";
  console.log(url);
  table = $("#SP_Table").DataTable({
    ajax: {
      url: url,
      dataSrc: "",
    },
    columns: [
      { data: "id", visible: false },
      { data: "status" },
      { data: "title" },
      { data: "text" },
      { data: "start_date" },
      { data: "stop_date" },
      { data: "files" },
      { data: "is_done", visible: false },
    ],
    DisplayLength: 10,
    processing: true,
    lengthMenu: [
      [5, 10, 20, -1],
      [5, 10, 20, "Все"],
    ],
    createdRow: function (row, data) {
      if (data.status == "В процессе") {
        $("td", row).eq(0).addClass("orangecode pulse");
      }
      if (data.status == "Просрочена") {
        $("td", row).eq(0).addClass("redcode pulse");
      }
      if (data.status == "Выполнена") {
        $("td", row).eq(0).addClass("greencode pulse");
      }
    },
  });

  $("#SP_Table tbody").on("click", "tr", function () {
    if ($(this).hasClass("selected")) {
      $(this).removeClass("selected");
    } else {
      table.$("tr.selected").removeClass("selected");
      $(this).addClass("selected");
      var data = table.row(table.$("tr.selected")).data();
      console.log(data);
    }
  });

  $("#CreateTaskButton").on("click", function () {
    console.log("CREATE");
    $("#CreatEditTaskModal").fadeIn();
  });

  $("#CeateTaskClose1").on("click", function () {
    $("#CreatEditTaskModal").fadeOut();
  });

  $("#CeateTaskClose2").on("click", function () {
    $("#CreatEditTaskModal").fadeOut();
  });

  $("#CreateTaskOkButton").on("click", function () {
    let errors = 0;

    if (errors == 0) {
      let new_task = {
        title: $("#input_title").val(),
        text: $("#input_text").val(),
        stop_date: $("#input_date").val(),
        files: $("#input_file").val(),
      };

      csrftoken = window.CSRF_TOKEN;
      function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
      }
      $.ajaxSetup({
        beforeSend: function (xhr, settings) {
          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }
        },
      });

      $.ajax({
        type: "POST",
        url: "api/tasks/",
        data: JSON.stringify(new_task),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
          console.log(JSON.stringify(data));
          $("#CreatEditTaskModal").fadeOut();
        },
        error: function (errMsg) {
          alert(`Ошибка при создании задачи\n${JSON.stringify(errMsg)}`);
        },
      });
    }
  });
});
