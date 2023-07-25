document.addEventListener('DOMContentLoaded', () => {
    const showMenuButton = document.getElementById('show-menu');
    console.log(showMenuButton)
    const menuDiv = document.getElementById('menu-div');
  
    showMenuButton.addEventListener('click', () => {
      const computedStyle = getComputedStyle(menuDiv);
      const currentDisplay = computedStyle.getPropertyValue('display');
  
      if (currentDisplay === 'none') {
        menuDiv.setAttribute('style', 'display: flex;');
      } else {
        menuDiv.setAttribute('style', 'display: none;');
      }
    });

    function getCurrentDateFormatted() {
      const months = [
        "January", "February", "March", "Apr", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
    
      const days = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
      ];
    
      const currentDate = new Date();
      const dayOfWeek = days[currentDate.getDay()];
      const dayOfMonth = currentDate.getDate();
      const month = months[currentDate.getMonth()];
    
      return `${dayOfWeek} ${dayOfMonth} ${month}`;
    }
  
    // Set the date to the element with ID "string-date"
    const dateString = getCurrentDateFormatted();
    const stringDateElement = document.getElementById("string-date");
    if (stringDateElement) {
      stringDateElement.textContent = dateString;
    }


    function getCurrentDateFormatted1() {
      const months = [
        "January", "February", "March", "Apr", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
    
      const days = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
      ];
    
      const currentDate = new Date();
      const dayOfWeek = days[currentDate.getDay()];
      const dayOfMonth = currentDate.getDate();
      const month = months[currentDate.getMonth()];
    
      return `${dayOfMonth} ${month} ‧ Today`;
    }
  
    // Set the date to the element with ID "string-date"
    const dateString1 = getCurrentDateFormatted1();
    const stringDateElement1 = document.getElementById("string-date-1");
    if (stringDateElement1) {
      stringDateElement1.textContent = dateString1;
    }

    
    




  });
  