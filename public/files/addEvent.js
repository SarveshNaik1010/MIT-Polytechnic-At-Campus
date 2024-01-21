'use strict';

// const password = prompt("Enter Admin Password");
const addEventPage = document.querySelector('.addEventPage');

addEventPage.style.display = 'block';

// if (password === "SOMEPASSWORD") {
// } else {
//   alert("Incorrect Password");
// }

// Agenda
const divAgenda = document.querySelector('.div--add-agenda');
const addAgebdaBtn = document.querySelector('.addAgenda');

// Report
const reportTable = document.querySelector('.event-table');
const addRowBtn = document.querySelector('.addRow');

let i = 2;
addAgebdaBtn.addEventListener('click', function () {
  const markup = `<input type="text" name="eventAgenda${i++}">`;
  divAgenda.insertAdjacentHTML('afterbegin', markup);
});

let j = 2;
addRowBtn.addEventListener('click', function () {
  const markup = `
    <tr>
        <td>
            <input type="date" name="eventReportDate${j}">
        </td>                
        <td>
            <input type="text" name="eventReportDesc${j}">
        </td>                
    </tr>`;
  j++;
  reportTable.insertAdjacentHTML('beforeend', markup);
});

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

const uploadForm = document.querySelector('.add-event');
const btnSubmit = document.querySelector('.submit');
const inputs = document.getElementsByTagName('input');
const textArea = document.querySelector('.eventDesc');

btnSubmit.addEventListener('click', async function (e) {
  e.preventDefault();
  const formData = new FormData(uploadForm);
  // for (let i = 0; i < inputs.length; i++) {
  //   console.log(formData.get(inputs[i].name));
  // }
  console.log('clicked');
  const upload = await axios({
    method: 'POST',
    url: '/api/v1/events',
    data: formData,
  });
});
