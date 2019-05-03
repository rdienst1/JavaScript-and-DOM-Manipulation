// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $stateInput = document.getElementById("datetime");
var $searchBtn = document.getElementById("search");

var $dtime = document.getElementById("dtime");
var $City=document.getElementById("City");
var $State=document.getElementById("State");
var $Country = document.getElementById("Country");
var $Shape=document.getElementById("shape");
var $sideSearch = document.getElementById("sideSearch");



// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);
$sideSearch.addEventListener("click",handlesideSearchButtonClick)
// Set filteredAddresses to addressData initially
var filteredAddresses = dataSet;
var pageList = new Array();
var currentPage = 1;
var numberPerPage = 50;
var numberOfPages = 0;

function load() {
    
    loadList();
}

function nextPage() {
    currentPage += 1;
    loadList();
}

function previousPage() {
    currentPage -= 1;
    loadList();
}

function firstPage() {
    currentPage = 1;
    loadList();
}

function lastPage() {
    currentPage = numberOfPages;
    loadList();
}

function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = filteredAddresses.slice(begin, end);
    renderTable();
    check();
}

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
}
// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < pageList.length; i++) {
    // Get get the current address object and its fields
    var address = pageList[i];
    var fields = Object.keys(address);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = address[field];
    }
  }
}

function stripLeadingZerosDate(dateStr){
    return dateStr.split('/').reduce(function(date, datePart){
        return date += parseInt(datePart) + '/'
    }, '').slice(0, -1);
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var dateSelected = $stateInput.value.split(" ")[0];
  filterState=stripLeadingZerosDate(dateSelected);
  console.log(filterState)
  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  filteredAddresses = dataSet.filter(function(dateS) {
    var dateSetNew = dateS.datetime;

    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    return dateSetNew === filterState;
  });
  loadList();
}

function handlesideSearchButtonClick(){
  var datet=$dtime.value.trim();
  console.log(datet);
  if (datet===" ")
    alert("Date cannot be null");
  var city=$City.value.trim().toLowerCase();
  if (datet==" ")
    alert("Please enter City");
  console.log(city);
  var state=$State.value.trim().toLowerCase();
  if (datet==" ")
    alert("Please enter State");
  console.log(state);
  var shape=$Shape.value.trim().toLowerCase();
  if (datet==" ")
    alert("Please enter the Shape");

  console.log(shape)
  var country=$Country.value.trim().toLowerCase();
  if (datet==" ")
    alert("Please enter Country");
  console.log(country);

  filteredAddresses = dataSet.filter(function(address) {
    // address is a variable of dataSet.js ,that contains all the data.
    var dateSetN = address.datetime.trim();

    var cityN=address.city.trim();
    var stateN=address.state.trim();
    var shapeN=address.shape.trim();
    var CountryN=address.country.trim();

    if (datet===dateSetN && city === cityN && state === stateN && shape === shapeN && country === CountryN )
    {
      return true;
    }
   
    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    return false;
  });
  loadList();

}

window.onload = load;
// Render the table for the first time on page load

