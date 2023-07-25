
document.addEventListener('DOMContentLoaded',()=>{
    const taskArray = [];

    document.getElementById('newtask').addEventListener('click', () => {
      const menuDiv = document.getElementById('task-prompt');
      const maindiv = document.getElementById('main-div');
  
      const computedStyle = getComputedStyle(menuDiv);
      const currentDisplay = computedStyle.getPropertyValue('display');
  
      if (currentDisplay === 'none') {
        menuDiv.setAttribute('style', 'display: block;');
        maindiv.style.opacity = 0.3;
      } else {
        menuDiv.setAttribute('style', 'display: none;');
        maindiv.style.opacity = 1;
      }
    });

    document.getElementById('cancel').addEventListener('click', function() {
        const menuDiv = document.getElementById('task-prompt');
        const maindiv = document.getElementById('main-div');
        menuDiv.setAttribute('style', 'display: none;');
        maindiv.style.opacity = 1;
    })

  
    document.getElementById('confirm').addEventListener('click', function() {
      const menuDiv = document.getElementById('task-prompt');
      const maindiv = document.getElementById('main-div');
      const taskName = document.getElementById('task-name');
      const taskDesc = document.getElementById('task-desc').value;
      const promptDate = document.getElementById('prompt-date').value;
      const promptTime = document.getElementById('prompt-time').value;
      const category = document.getElementById('category').value;
      if (!taskName || !taskName.value.trim()) {
        if (!taskName) {
          return; // Exit the function if taskName is not found
        }
        // Update style for the textarea element
        taskName.classList.add('error');
        taskName.placeholder = 'Title is required!';
        return;
      }
    
      menuDiv.setAttribute('style', 'display: none;');
      maindiv.style.opacity = 1;
    
      // Create an object with the retrieved values
      const taskObj = {
        name: taskName.value,
        description: taskDesc,
        date: promptDate,
        time: promptTime,
        category: category,
      };
    
      // Add the object to the taskArray
      taskArray.push(taskObj);
    
      // Clear the input fields after adding the task
      taskName.value = '';
      document.getElementById('task-desc').value = '';
      document.getElementById('prompt-date').value = '';
      document.getElementById('prompt-time').value = '';
    
      // Create and append the new task div
      createAndAppendTaskDiv(taskObj);
    });
  
    function createAndAppendTaskDiv(task) {
      if (!task.name) {
        // If the title is not provided, do not create a new task div
        return;
      }
      displayupcoming();
      const taskListDiv = document.getElementById('task-list');
      updateTodayCount()
      // Get today's date in the format YYYY-MM-DD
      const today = new Date().toISOString().split('T')[0];
    
      if (task.date === today || task.date === '' || !task.date) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-card';
    
        const titleDescDiv = document.createElement('div');
        const titleElem = document.createElement('h3');
        const descElem = document.createElement('p');
        titleElem.textContent = task.name;
        descElem.textContent = task.description;
        titleDescDiv.appendChild(titleElem);
        titleDescDiv.appendChild(descElem);
        taskDiv.appendChild(titleDescDiv);
    
        const dateTimeElem = document.createElement('p');
        dateTimeElem.textContent = `${task.date} ${task.time}`;
        taskDiv.appendChild(dateTimeElem);
    
        if (task.category !== 'Select Category') {
          const categoryElem = document.createElement('p');
          categoryElem.textContent = `Category: ${task.category}`;
          taskDiv.appendChild(categoryElem);
        }
    
        const taskCompletedBtn = document.createElement('button');
        taskCompletedBtn.textContent = 'Task Completed';
        taskCompletedBtn.addEventListener('click', () => removeTask(task, taskDiv));
        taskDiv.appendChild(taskCompletedBtn);
    
        const createTaskDiv = document.getElementById('create-task');
        taskListDiv.insertBefore(taskDiv, createTaskDiv);
        updateTodayCount();
      }
    }
  
    function removeTask(task,taskDiv) {
      const index = taskArray.indexOf(task);
      if (index !== -1) {
        taskArray.splice(index, 1);
        taskDiv.remove();
      }

      updateTodayCount();
      displayupcoming();

    }
  
     document.getElementById('create-task').addEventListener('click', () => {
      const menuDiv = document.getElementById('task-prompt');
      const maindiv = document.getElementById('main-div');
  
      const computedStyle = getComputedStyle(menuDiv);
      const currentDisplay = computedStyle.getPropertyValue('display');
  
      if (currentDisplay === 'none') {
        menuDiv.setAttribute('style', 'display: block;');
        maindiv.style.opacity = 0.3;
      } else {
        menuDiv.setAttribute('style', 'display: none;');
        maindiv.style.opacity = 1;
      }
    });
    
    function updateTodayCount() {
      const today = new Date().toISOString().split('T')[0];
      const todayTasks = taskArray.filter(task => task.date === today );
      const todayCount = todayTasks.length;
      
      const futureTasks = taskArray.filter(task => task.date >= today);
      const futureCount = futureTasks.length;
      
      // Update the innerHTML of elements with the class "today-count"
      const todayCountElements = document.querySelectorAll('.today-count');
      todayCountElements.forEach(element => {
        element.innerHTML = todayCount;
      });
      
      // Update the innerHTML of elements with the class "up-count"
      const upCountElement = document.querySelector('.up-count');
      upCountElement.innerHTML = futureCount;
    }

    async function fetchTasks() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const apiData = await response.json();
    
        // Process the API data and convert it into objects
        const tasks = apiData.map(item => ({
          name: item.title,
          description: "",
          date: "", // Set the date and time to empty strings as they are not provided by the API
          time: "",
          category: "Api Data",
        }));
    
        // Add the processed tasks to the taskArray
        taskArray.push(...tasks);
    
        for (var i=0; i<10; i++){
          createAndAppendTaskDiv(tasks[i]);
        }
        // Update today's and future task count
        updateTodayCount();
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    updateTodayCount()
    fetchTasks()

  const todayBtn = document.getElementById('today-btn');
  const upBtn = document.getElementById('up-btn');
  const todayDiv = document.getElementById('today-div');
  const upDiv = document.getElementById('up-div');
  const filDiv = document.getElementById('filter-div')
  const filbtn = document.getElementById('fil-btn')

  todayBtn.addEventListener('click', () => {
    todayDiv.style.display = 'flex';
    upDiv.style.display = 'none';
    filDiv.style.display = 'none';
  });

  upBtn.addEventListener('click', () => {
    todayDiv.style.display = 'none';
    upDiv.style.display = 'flex';
    filDiv.style.display = 'none';
    displayupcoming();
  });

  filbtn.addEventListener('click', () => {
    todayDiv.style.display = 'none';
    upDiv.style.display = 'none';
    filDiv.style.display = 'flex';
  });

  var upcomingpage = document.getElementById('up-div')

  function displayupcoming(){
    upcomingpage.innerHTML = ' '
    // Sort tasks based on the date, putting tasks without dates at the end
      taskArray.sort((task1, task2) => {
  // Check if both tasks have dates
  if (task1.date && task2.date) {
    // Convert the date strings to Date objects for comparison
    const date1 = new Date(task1.date);
    const date2 = new Date(task2.date);
    return date1 - date2;
  } else if (!task1.date && task2.date) {
    // If task1 has no date, move it to the end
    return 1;
  } else if (task1.date && !task2.date) {
    // If task2 has no date, move it to the end
    return -1;
  } else {
    // If both tasks have no dates, keep their order unchanged
    return 0;
  }
        });
      
        const today = new Date().toISOString().slice(0, 10); // Get the current date in 'YYYY-MM-DD' format

        const noTasksDueToday = taskArray.filter((task) => {
          // Check if the task has a date
          if (task.date != today) {
            // If the task's date is not equal to today's date, keep it in the filtered array
            return task;
          } else {
            // If the task has no date, exclude it from the filtered array
            return false;
          }
        });
        const separatedTasks = noTasksDueToday.reduce(
          (acc, task) => {
            if (task.date === "") {
              // If the task has no date, add it to the tasksWithNoDates array
              acc.tasksWithNoDates.push(task);
            } else if (task.date < today) {
              // If the task's date is before today, add it to the tasksDatePassed array
              acc.tasksDatePassed.push(task);
            } else {
              // For all other tasks, create an entry in the date-wise tasks object
              const date = task.date;
              if (!acc.dateWiseTasks[date]) {
                acc.dateWiseTasks[date] = [];
              }
              acc.dateWiseTasks[date].push(task);
            }
            return acc;
          },
          {
            tasksWithNoDates: [],
            tasksDatePassed: [],
            dateWiseTasks: {} // This will hold tasks divided by dates in the form { 'YYYY-MM-DD': [tasks], ... }
          }
        );
        
        // Extract the individual arrays from the separatedTasks object
        const tasksWithNoDates = separatedTasks.tasksWithNoDates;
        const tasksDatePassed = separatedTasks.tasksDatePassed;
        const dateWiseTasks = separatedTasks.dateWiseTasks;
        for (const date in dateWiseTasks) {
          const tasksForDate = dateWiseTasks[date];
          // Convert date string to Date object
          const dateObject = new Date(date);
          // Format the date as "Month Day, Year" (e.g., "August 1, 2023")
          const formattedDate = dateObject.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });
        
          upDiv.appendChild(createDivWithHeading(tasksForDate, formattedDate));
        }
        if (tasksDatePassed.length !== 0) {
          upDiv.appendChild(createDivWithHeading(tasksDatePassed, "Missed : "));
        }
        
        if (tasksWithNoDates.length !== 0) {
          upDiv.appendChild(createDivWithHeading(tasksWithNoDates, "No Due Date :"));
        }

  }

  function createDivWithHeading(array, headingString) {
    console.log(array,headingString)
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('date-div');
  
    // Apply styles to the main div
    mainDiv.style.width = '90%';
    mainDiv.style.height = '100%';
    mainDiv.style.gap = "30px";
    mainDiv.style.display = 'flex';
    mainDiv.style.flexDirection = 'column';
  
    // Create the div containing the h1 element
    const headingDiv = document.createElement('div');
  
    // Create the h1 element and add the headingString as its text content
    const h1Element = document.createElement('h2');
    h1Element.textContent = headingString;
    h1Element.style.boxShadow = "box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);"
  
    // Append the h1 element to the headingDiv
    headingDiv.appendChild(h1Element);
  
    // Append the headingDiv to the main div
    mainDiv.appendChild(headingDiv);
  
    var tasks = document.createElement('div');
    tasks.id = "task-list";

    array.forEach(task=>{

      const taskDiv = document.createElement('div');
      taskDiv.className = 'task-card';
  
      const titleDescDiv = document.createElement('div');
      const titleElem = document.createElement('h3');
      const descElem = document.createElement('p');
      titleElem.textContent = task.name;
      descElem.textContent = task.description;
      titleDescDiv.appendChild(titleElem);
      titleDescDiv.appendChild(descElem);
      taskDiv.appendChild(titleDescDiv);
  
      const dateTimeElem = document.createElement('p');
      dateTimeElem.textContent = `${task.date} ${task.time}`;
      taskDiv.appendChild(dateTimeElem);
  
      if (task.category !== 'Select Category') {
        const categoryElem = document.createElement('p');
        categoryElem.textContent = `Category: ${task.category}`;
        taskDiv.appendChild(categoryElem);
      }
  
      const taskCompletedBtn = document.createElement('button');
      taskCompletedBtn.textContent = 'Task Completed';
      taskCompletedBtn.addEventListener('click', () => removeTask(task, taskDiv));
      taskDiv.appendChild(taskCompletedBtn);
      tasks.appendChild(taskDiv)
    })

    mainDiv.appendChild(tasks);
  
    return mainDiv;
  }
  
  function filterTasks() {
    const filterTitle = document.getElementById("filter-title").value;
    const filterDate = document.getElementById("filter-date").value;
    const filterTime = document.getElementById("filter-time").value;
    const filterCategory = document.getElementById("filter-category").value;
  
    // Use filter method to get the matching tasks from the taskArray
    const filteredTasks = taskArray.filter((task) => {
      return (
        (filterTitle === "" || task.name.toLowerCase().includes(filterTitle.toLowerCase())) &&
        (filterDate === "" || task.date === filterDate) &&
        (filterTime === "" || task.time === filterTime) &&
        (filterCategory === "Select Category" || task.category === filterCategory)
      );
    });

  
    // Create a new div with class "task-card" for each filtered task and append them to "task-list" div
    const taskListDiv = document.getElementById("more-tasks");
    taskListDiv.innerHTML = " "; // Clear previous contents

    if (filteredTasks.length == 0) {
      taskListDiv.innerHTML = `<h2 style="color: red;">No data found</h2>`;
    }
  
    filteredTasks.forEach((task) => {
      const taskCardDiv = document.createElement("div");
      taskCardDiv.className = "task-card";
  
      const titleElem = document.createElement("h3");
      titleElem.textContent = task.name;
      taskCardDiv.appendChild(titleElem);
  
      const descElem = document.createElement("p");
      descElem.textContent = task.description;
      taskCardDiv.appendChild(descElem);
  
      const dateTimeElem = document.createElement("p");
      dateTimeElem.textContent = `${task.date} ${task.time}`;
      taskCardDiv.appendChild(dateTimeElem);
  
      if (task.category !== "Select Category") {
        const categoryElem = document.createElement("p");
        categoryElem.textContent = `Category: ${task.category}`;
        taskCardDiv.appendChild(categoryElem);
      }
  
      const taskCompletedBtn = document.createElement("button");
      taskCompletedBtn.textContent = "Task Completed";
      taskCompletedBtn.addEventListener("click", () => removeTask(task, taskCardDiv));
      taskCardDiv.appendChild(taskCompletedBtn);
  
      taskListDiv.appendChild(taskCardDiv);
      

    });
  }

    document.getElementById('filter').addEventListener('click',filterTasks)
})
