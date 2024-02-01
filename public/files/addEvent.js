'use strict';

const password = prompt('Enter Admin Password');
const addEventPage = document.querySelector('.addEventPage');

addEventPage.style.display = 'block';

if (password != "SOMEPASSWORD") {
  alert("Incorrect Password");
  window.location = window.location;
}

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

  btnSubmit.textContent = `Submitting...`;

  const formData = new FormData(uploadForm);
  // Getting agendas into an array
  const agendaArr = [];
  let i = 1;
  while (true) {
    if (!formData.get(`eventAgenda${i}`)) break;
    agendaArr.push(formData.get(`eventAgenda${i}`));
    i++;
  }

  // Getting report into an array
  const reportArr = [];
  let j = 1;
  while (true) {
    if (!formData.get(`eventReportDate${j}`)) {
      break;
    }
    reportArr.push([
      formData.get(`eventReportDate${j}`),
      formData.get(`eventReportDesc${j}`),
    ]);
    j++;
  }

  // Setting the array to agenda and report by converting them into string
  formData.set('eventAgenda', JSON.stringify(agendaArr));
  formData.set('eventReport', JSON.stringify(reportArr));

  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/events`,
      data: formData,
    });
    console.log(res);

    if (res.status === 200) {
      btnSubmit.textContent = 'Event Posted Successfully...';
    }
  } catch (error) {
    console.log(error);
    btnSubmit.textContent = `${error.response.data.error.message}`;
  }
});
