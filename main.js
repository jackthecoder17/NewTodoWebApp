window.addEventListener("load", () => {
  window.localStorage.clear();
  const form = document.querySelector("#task-form");
  const input = document.querySelector("#task-input");
  const list = document.querySelector("#todos");
  const totaltasks = document.querySelector(".total-tasks span");
  const completedTasks = document.querySelector(".completed-tasks span");
  const remainingTasks = document.querySelector(".Remaining-tasks span");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  form.addEventListener("submit", (e) => {
    //Prevent Default
    e.preventDefault();

    const inputvalue = input.value;
    if (inputvalue == "") {
      alert("Please input your task");
      return;
    } else if (inputvalue != "") {
      const todo = {
        id: new Date().getTime(),
        name: inputvalue,
        isCompleted: false,
      };
      tasks.push(todo);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      form.reset();

      // let tasks = [];
      // tasks.push(todo);
      // console.log(tasks);

      const todo_el = document.createElement("div");
      todo_el.classList.add("todo");
      todo_el.setAttribute("id", todo.id);

      const todo_content_el = document.createElement("div");
      todo_content_el.classList.add("content");

      todo_el.appendChild(todo_content_el);

      const todo_input_el = document.createElement("input");
      todo_input_el.classList.add("text");
      todo_input_el.type = "text";
      todo_input_el.value = todo.name;
      todo_input_el.setAttribute("readonly", true);

      todo_content_el.appendChild(todo_input_el);
      countTasks();

      //FOR THE ACTION
      const todo_action_el = document.createElement("div");
      todo_action_el.classList.add("actions");

      // const todo_Done_el = `<button class="Done"><i class="fa fa-solid fa-check"></i></button>`;
      const todo_Done_el = document.createElement("button");
      todo_Done_el.setAttribute("class", "Done");
      todo_Done_el.insertAdjacentHTML(
        "afterbegin",
        `<i class="fa fa-solid fa-check"></i>`
      );

      const todo_edit_el = document.createElement("button");
      todo_edit_el.setAttribute("class", "edit");
      todo_edit_el.insertAdjacentHTML(
        "afterbegin",
        `<i class="fa fa-solid fa-pencil"></i>`
      );
      const todo_delete_el = document.createElement("button");
      todo_delete_el.setAttribute("class", "Delete");
      todo_delete_el.insertAdjacentHTML(
        "afterbegin",
        `<i class="fa fa-sharp fa-solid fa-trash"></i>`
      );
      // console.log(todo_Done_el);
      // console.log(todo_edit_el);
      // console.log(todo_delete_el);
      todo_action_el.appendChild(todo_Done_el);
      todo_action_el.appendChild(todo_edit_el);
      todo_action_el.appendChild(todo_delete_el);

      todo_el.appendChild(todo_action_el);
      list.appendChild(todo_el);

      input.value = "";

      //COunting TASKS
      function countTasks() {
        totaltasks.textContent = tasks.length;
        const completedTasksArray = tasks.filter(
          (todo) => todo.isCompleted === true
        );
        completedTasks.textContent = completedTasks.textContent =
          completedTasksArray.length;
        remainingTasks.textContent = tasks.length - completedTasksArray.length;
      }

      todo_edit_el.addEventListener("click", (e) => {
        if (todo_edit_el.className == "edit") {
          todo_edit_el.className = "save";
          todo_edit_el.innerHTML = "";
          todo_edit_el.insertAdjacentHTML(
            "afterbegin",
            `<i class="fa fa-thin fa-cloud"></i>`
          );
          todo_input_el.removeAttribute("readonly");
          todo_input_el.focus();
        } else {
          todo_edit_el.className = "edit";
          todo_edit_el.innerHTML = "";
          todo_edit_el.insertAdjacentHTML(
            "afterbegin",
            `<i class="fa fa-solid fa-pencil"></i>`
          );
          todo_input_el.setAttribute("readonly", "false");
        }
      });

      todo_delete_el.addEventListener("click", (e) => {
        const taskId = e.target.id;
        removeTask(taskId);
      });
      function removeTask(taskId) {
        tasks = tasks.filter((todo) => todo.id !== parseInt(taskId));
        localStorage.setItem("tasks", JSON.stringify(tasks));
        list.removeChild(todo_el);
      }

      todo_Done_el.addEventListener("click", () => {
        todo_input_el.style.textDecoration = " 2px black line-through";
        //   todo_input_el.style.color = "grey";
        //   todo_edit_el.style.visibility = "hidden";
        todo_input_el.style.opacity = 0.7;
        todo_edit_el.style.display = "none";
        todo_Done_el.style.display = "none";
        todo.isCompleted = true;
        countTasks();
      });
    }
    console.log(tasks);
  });
});
