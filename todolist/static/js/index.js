$(document).ready(function () {
  sel_status = $("#select_status");
  sel_is_done = $("#select_is_done");
  let row_id;
  let row_title;
  let row_text;
  let row_date;
  let row_is_done;
  let create_edit_mode;

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
      { data: "link_to_file" },
      { data: "files", visible: false },
      { data: "is_done", visible: false },
    ],
    DisplayLength: 10,
    processing: true,
    lengthMenu: [
      [10, 15, 20, -1],
      [10, 15, 20, "Все"],
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
      row_id = data["id"];
      row_title = data["title"];
      row_text = data["text"];
      row_date = data["stop_date"];
      row_is_done = data["is_done"];
    }
  });

  function fill_done() {
    sel_is_done.empty();
    sel_is_done.append(`<option value="false">Ещё нет</option>`);
    sel_is_done.append(`<option value="true">Да!</option>`);
  }

  $("#CreateTaskButton").on("click", function () {
    create_edit_mode = "create";
    fill_done();
    $("#edit-create-norm-title").html("Создание новой задачи");
    $("#CreateTaskOkButton").html("Создать");
    $("#name_input_file").html("Новый файл");
    console.log("CREATE");
    $("#CreatEditTaskModal").fadeIn();
  });

  $("#EditTaskButton").on("click", function () {
    create_edit_mode = "edit";
    fill_done();
    $("#edit-create-norm-title").html("Редактирование задачи");
    $("#CreateTaskOkButton").html("Редактировать");
    $("#name_input_file").html("Заменить файл");
    console.log("EDIT");
    $("#CreatEditTaskModal").fadeIn();
    $("#input_title").val(row_title);
    $("#input_text").val(row_text);
    $("#input_date").val(row_date.slice(0, 10));
    $("#select_is_done").val(row_is_done.toString());
  });

  $("#CeateTaskClose1").on("click", function () {
    $("#CreatEditTaskModal").fadeOut();
  });

  $("#CeateTaskClose2").on("click", function () {
    $("#CreatEditTaskModal").fadeOut();
  });

  $("#CreateTaskOkButton").on("click", function () {
    let errors = 0;

    const selectedFile = document.getElementById("input_file").files[0];
    console.log(selectedFile);
    console.log($("#input_file").val());

    if (create_edit_mode == "create") {
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

      var data = new FormData();
      data.append("file", selectedFile);
      console.log("datA", data);

      $.ajax({
        type: "POST",
        url: "api/files/",
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
          console.log(JSON.stringify(data));
          let last_file_id = data["id"];
          let is_done;
          if (sel_is_done.val() == "true") {
            is_done = true;
          } else {
            is_done = false;
          }
          let new_task = {
            title: $("#input_title").val(),
            text: $("#input_text").val(),
            stop_date: $("#input_date").val(),
            files: last_file_id,
            is_done: is_done,
          };
          console.log(new_task);
          $.ajax({
            type: "POST",
            url: "api/tasks/",
            data: JSON.stringify(new_task),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
              console.log(JSON.stringify(data));
              sel_status.change();
              $("#CreatEditTaskModal").fadeOut();
            },
            error: function (errMsg) {
              alert(`Ошибка при создании задачи\n${JSON.stringify(errMsg)}`);
              console.log(JSON.stringify(errMsg));
            },
          });
        },
        error: function (errMsg) {
          alert(`Ошибка при создании файла\n${JSON.stringify(errMsg)}`);
          console.log(JSON.stringify(errMsg));
        },
      });
    } else {
      let is_done;
      if (sel_is_done.val() == "true") {
        is_done = true;
      } else {
        is_done = false;
      }
      let new_task = {
        title: $("#input_title").val(),
        text: $("#input_text").val(),
        stop_date: $("#input_date").val(),
        is_done: is_done,
      };
      console.log(new_task);
      $.ajax({
        type: "PATCH",
        url: "api/tasks/" + row_id + "/",
        data: JSON.stringify(new_task),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
          console.log(JSON.stringify(data));
          sel_status.change();
          $("#CreatEditTaskModal").fadeOut();
        },
        error: function (errMsg) {
          alert(`Ошибка при измении задачи задачи\n${JSON.stringify(errMsg)}`);
          console.log(JSON.stringify(errMsg));
        },
      });
    }
  });

  $("#DeleteTaskButton").on("click", function () {
    $.ajax({
      type: "DELETE",
      url: "api/tasks/" + row_id + "/",
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        console.log(JSON.stringify(data));
        sel_status.change();
      },
      error: function (errMsg) {
        alert(`Ошибка при удалении задачи\n${JSON.stringify(errMsg)}`);
        console.log(JSON.stringify(errMsg));
      },
    });
  });
});
