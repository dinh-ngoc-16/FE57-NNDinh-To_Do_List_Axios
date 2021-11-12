import Task from "./Task.js";
import * as utils from "./TaskService.js";

let getEle = (id) => document.getElementById(id);

const taoBang = (arr) => {
  if (arr && arr.length > 0) {
    let content = "";
    arr.forEach(function (item) {
      console.log(item.status);
      let color = "";
      if (item.status == "toDo") {
        color = "";
      } else {
        color = "text-success";
      }
      content += `
        <li>
        <span>${item.textTask}</span>
        <div class="button">
        <button style="border:none; cursor:pointer;" onclick="deleteTask(${item.id})"><i class="fa fa-trash-alt"></i></button>
        <button style="border:none; cursor:pointer;" onclick="changeStatus(${item.id})"><i class="fa fa-check-circle ${color}"></i></button>
        </div>
        </li>`;
    });
    return content;
  }
  return "<li>Không có dữ liệu</li>";
};

let layDanhSachTask = () => {
  utils
    .callAPI("list", "GET", "")
    .then((result) => {
      const arr = result.data;
      const compele = [];
      const todo = [];
      arr.map((item) => {
        // console.log(item.status);
        if (item.status == "completed") {
          compele.push(item);
        } else {
          todo.push(item);
        }
      });
      const tcompele = taoBang(compele);
      getEle("completed").innerHTML = tcompele;
      const tTodo = taoBang(todo);
      getEle("todo").innerHTML = tTodo;
    })
    .catch((err) => {
      console.log(err);
    });
};

layDanhSachTask();

getEle("addItem").addEventListener("click", () => {
  const textTask = getEle("newTask").value;
  const status = "toDo";
  const task = new Task("", textTask, status);
  utils
    .callAPI("list", "POST", task)
    .then((result) => {
      alert("Thêm thành công");
      layDanhSachTask();
    })
    .catch((err) => {
      console.log(err);
    });
});

window.deleteTask = deleteTask;
function deleteTask(id) {
  utils
    .callAPI(`toDo/${id}`, `DELETE`, "")
    .then((result) => {
      alert("Xóa thành công");
      layDanhSachTask();
    })
    .catch((err) => {
      console.log(err);
    });
}

window.changeStatus = changeStatus;
console.log(window);
function changeStatus(id, textTask, status) {
  utils.callAPI(`list/${id}`, "GET", "").then((result) => {
    const duLieu = result.data;
    if (duLieu.status == "completed") {
      const task = new Task(id, textTask, "toDo");
      utils
        .callAPI(`toDo/${id}`, "PUT", task)
        .then((result) => {
          alert("Change status");
          layDanhSachTask();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const task = new Task(id, textTask, "completed");
      utils
        .callAPI(`toDo/${id}`, "PUT", task)
        .then((result) => {
          alert("Change status");
          layDanhSachTask();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}
