

const toggleTheme = () => {
    let isDarkMode = document.documentElement.classList.toggle('dark-mode');
    console.log( "check darkmode", isDarkMode);
    
    toggleBtn.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
};

const toggleBtn = document.createElement("button");
toggleBtn.textContent = "Dark Mode";
toggleBtn.classList.add("toggle-btn");

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-mode');
    toggleBtn.textContent = "Light Mode";
}


const darkStyle = document.createElement("style");
darkStyle.textContent = `
  .dark-mode {
    background-color: black;
    color: white;
  }
`;

document.head.appendChild(darkStyle)

toggleBtn.onclick = toggleTheme;

const header = document.querySelector(".header");
if (header) {
    header.appendChild(toggleBtn);
} else {
    console.error("Header element not found!");
}
