let myLeads = [];
let textEl = document.getElementById("text-el");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });

});

deleteBtn.addEventListener("dblclick", () => {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

function render(leads) {
  let listItems = "";

  // Generate list items from the leads array
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li><a target='blank' href='${leads[i]}'>${leads[i]}</a></li>`;
  }

  // Update the ul element with the new list
  ulEl.innerHTML = listItems;
}
function pushLeads() {
  let inputValue = inputEl.value;
  if (inputValue) {
    // Only push to array if input is not empty
    myLeads.push(inputValue);
    inputEl.value = ""; // Clear input after adding
    localStorage.setItem("myLeads", JSON.stringify(myLeads)); // Save updated leads
    render(myLeads); // Re-render the leads
  }
}
inputBtn.addEventListener("click", () => pushLeads());
