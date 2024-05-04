const { ipcRenderer } = require('electron');

let activitiesList;
let btnCreateActivity;
let locationsBox;
let officesBox;
let divisionsBox;
let departmentsBox;
let dataList;
let userData;
let submitNewActivity;
let submitUpdateActivity
let formNewActivity;
let formUpdateActivity;
let modalToCreateActivity;
let modalToUpdateActivity;

let zeroRegisters;

let activitiesArray;

let activityId;
let activityCode;
let titleActivityUpdate;
let locationsBoxUpdate;
let officesBoxUpdate; 
let divisionsBoxUpdate; 
let departmentsBoxUpdate; 
let startDateActivityUpdate; 
let endDateActivityUpdate; 
let statusUpdate; 
let progressUpdate; 
let observationUpdate;

let boxReplicate;
let boxUpdate;
let submitReplicateActivity;


window.onload = function() 
{  
   modalToCreateActivity = document.getElementById('modalToCreateActivity');
   modalToUpdateActivity = document.getElementById('modalToUpdateActivity');

   activitiesList = document.getElementById("activities-table-body")
   btnCreateActivity = document.getElementById("btnCreateActivity")
   submitNewActivity = document.getElementById("submitNewActivity")
   submitUpdateActivity = document.getElementById("submitUpdateActivity")
   locationsBox = document.getElementById("locationsBox")
   officesBox = document.getElementById("officesBox")
   divisionsBox = document.getElementById("divisionsBox")
   departmentsBox = document.getElementById("departmentsBox")
   formNewActivity = document.getElementById("formNewActivity")
   zeroRegisters = document.querySelector(".zero-registers")


   activityId = document.getElementById("activityId");
   activityCode = document.getElementById("activityCode");
   titleActivityUpdate = document.getElementById("titleActivityUpdate");
   locationsBoxUpdate = document.getElementById("locationsBoxUpdate");
   officesBoxUpdate = document.getElementById("officesBoxUpdate"); 
   divisionsBoxUpdate = document.getElementById("divisionsBoxUpdate"); 
   departmentsBoxUpdate = document.getElementById("departmentsBoxUpdate"); 
   startDateActivityUpdate = document.getElementById("startDateActivityUpdate"); 
   endDateActivityUpdate = document.getElementById("endDateActivityUpdate"); 
   statusUpdate = document.getElementById("statusUpdate"); 
   progressUpdate = document.getElementById("progressUpdate"); 
   observationUpdate = document.getElementById("observationUpdate");
   formUpdateActivity = document.getElementById("formUpdateActivity") 
   
   boxUpdate = document.getElementById('boxUpdate');
   boxReplicate =  document.getElementById('boxReplicate');
   submitReplicateActivity = document.getElementById('submitReplicateActivity');




   officesBox.onchange = officeChanged
   divisionsBox.onchange = divisionChanged

   officesBoxUpdate.onchange = officeChangedUpdate
   divisionsBoxUpdate.onchange = divisionChangedUpdate

   submitNewActivity.onclick = createActivity
   submitReplicateActivity.onclick = replicateActivity;
   submitUpdateActivity.onclick = updateActivity  

   renderActivities();
   renderBoxListForActivities()


   document.addEventListener("click",e =>{

      if(e.target.matches('.deleteActivityBtn') || e.target.matches('.deleteActivityBtn>*'))
      {  
         let deleteBtn;

         if(e.target.matches('.deleteActivityBtn>*'))
             deleteBtn = e.target.parentNode;
          else
             deleteBtn = e.target;

         let activityId = parseInt(deleteBtn.getAttribute('activity-id'));
         deleteActivity(activityId);
      }

      if(e.target.matches('.updateActivityBtn') || e.target.matches('.updateActivityBtn>*') )
      {  
         let updateBtn;

         if(e.target.matches('.updateActivityBtn>*'))
             updateBtn = e.target.parentNode;
          else
             updateBtn = e.target;

         let activityId = parseInt(updateBtn.getAttribute('activity-id'));
         
         modalToUpdateActivity.classList.toggle('d-none')
         
         const activity = activitiesArray.find(activity => activity.id === activityId);

         fillFormUpdate(activity)
      }

      if(e.target.matches('.replicateActivityBtn') || e.target.matches('.replicateActivityBtn>*') )
      {  
         let replicateBtn;

         if(e.target.matches('.replicateActivityBtn>*'))
             replicateBtn = e.target.parentNode;
          else
             replicateBtn = e.target;

         let activityId = parseInt(replicateBtn.getAttribute('activity-id'));
         
         modalToUpdateActivity.classList.toggle('d-none')
         
         const activity = activitiesArray.find(activity => activity.id === activityId);

         boxUpdate.classList.add('d-none');
         boxReplicate.classList.remove('d-none');

         fillFormUpdate(activity)
      }


   },true)

};

function fillFormUpdate(activity)
{  
   activityCode.value = activity.code
   activityId.value = activity.id
   titleActivityUpdate.value = activity.title
   locationsBoxUpdate.value = activity.location_id
   officesBoxUpdate.value = activity.office_id
   divisionsBoxUpdate.value = activity.division_id
   departmentsBoxUpdate.value = activity.department_id
   startDateActivityUpdate.value = activity.start_date
   endDateActivityUpdate.value = activity.end_date
   statusUpdate.value = activity.status
   progressUpdate.value = activity.progress
   observationUpdate.value = activity.observation
   
}



function officeChanged()
{
   let currentOfficeId = officesBox.value;
   
   let divisionsIdsToShow = [1];

  divisionsIdsToShow = divisionsIdsToShow.concat
  (
     dataList.divisions.data
     .filter( division => division.office_id == currentOfficeId )
     .map( division => division.id)
  );

  divisionsBox.disabled = false
  divisionsBox.selectedIndex = 0;
  departmentsBox.selectedIndex = 0;
  departmentsBox.disabled = true;



  Array.from(divisionsBox.options).forEach(option => 
  {   
    option.classList.add('d-none')
  });

  Array.from(divisionsBox.options).forEach(option => 
  {   
  
    if (divisionsIdsToShow.includes(parseInt(option.value)) ) 
     {
       option.classList.remove("d-none");
     }
  
  });


}


function divisionChanged()
{
   let currentDivisionId = divisionsBox.value;
   
   let departmentsIdsToShow = [1];

  departmentsIdsToShow = departmentsIdsToShow.concat
  (
     dataList.departments.data
     .filter( department => department.division_id == currentDivisionId )
     .map( department => department.id)
  );

  departmentsBox.disabled = false
  departmentsBox.selectedIndex = 0;


  Array.from(departmentsBox.options).forEach(option => 
  {   
    option.classList.add('d-none')
  });

  Array.from(departmentsBox.options).forEach(option => 
  {   
  
    if (departmentsIdsToShow.includes(parseInt(option.value)) ) 
     {
       option.classList.remove("d-none");
     }
  
  });


}


function officeChangedUpdate()
{
   let currentOfficeId = officesBoxUpdate.value;
   
   let divisionsIdsToShow = [1];

  divisionsIdsToShow = divisionsIdsToShow.concat
  (
     dataList.divisions.data
     .filter( division => division.office_id == currentOfficeId )
     .map( division => division.id)
  );

  divisionsBoxUpdate.disabled = false
  divisionsBoxUpdate.selectedIndex = 0;
  departmentsBoxUpdate.selectedIndex = 0;
  departmentsBoxUpdate.disabled = true;



  Array.from(divisionsBoxUpdate.options).forEach(option => 
  {   
    option.classList.add('d-none')
  });

  Array.from(divisionsBoxUpdate.options).forEach(option => 
  {   
  
    if (divisionsIdsToShow.includes(parseInt(option.value)) ) 
     {
       option.classList.remove("d-none");
     }
  
  });


}


function divisionChangedUpdate()
{
   let currentDivisionId = divisionsBoxUpdate.value;
   
   let departmentsIdsToShow = [1];

  departmentsIdsToShow = departmentsIdsToShow.concat
  (
     dataList.departments.data
     .filter( department => department.division_id == currentDivisionId )
     .map( department => department.id)
  );

  departmentsBoxUpdate.disabled = false
  departmentsBoxUpdate.selectedIndex = 0;


  Array.from(departmentsBoxUpdate.options).forEach(option => 
  {   
    option.classList.add('d-none')
  });

  Array.from(departmentsBoxUpdate.options).forEach(option => 
  {   
  
    if (departmentsIdsToShow.includes(parseInt(option.value)) ) 
     {
       option.classList.remove("d-none");
     }
  
  });


}



function fillSelects(data,select)
{  
   let template = "";
   data.forEach(data => {

      template+=`<option value="${data.id}">${data.name}</option>`;

   });

   select.innerHTML = template 


}

function getTodayDate()
{
   const today = new Date();
   const year = today.getFullYear();
   const month = String(today.getMonth() + 1).padStart(2, "0");
   const day = String(today.getDate()).padStart(2, "0");

   const formattedDate = `${year}-${month}-${day}`;
   return formattedDate;
}

function formattedDate(date)
{

  let parts = date.split("-");
  let month = parts[0].padStart(2, "0");
  let day = parts[1].padStart(2, "0");
  let year = parts[2];
  let newDate = `${year}-${month}-${day}`;
   
  return newDate;         
   
}

//  ------------------------------------------------------- Invokes

async function renderActivities() 
{
	userData = localStorage.getItem('userData');
	userData = JSON.parse(userData);
   await ipcRenderer.invoke('getActivities',userData);   
}

async function renderBoxListForActivities() 
{
   await ipcRenderer.invoke('getBoxListForActivities');   
}

async function deleteActivity(id) 
{
   await ipcRenderer.invoke('deleteActivity',id);   
}

async function createActivity() 
{  
   const formData = new FormData(formNewActivity);
   let todayDate = getTodayDate()
   const newActivity = {

   status:"En desarrollo",
   titleActivityInput:null,
   userId: userData.id,
   todayDate:todayDate,
   startDateActivity:null,
   endDate:null,
   locationsBox:1,
   officesBox:1,
   divisionsBox:1,
   departmentsBox:1,
   progress:0,
   observation:null,
   replicate:false,

   };

   for (let register of formData.entries()) 
   {
     const [key, value] = register;
     newActivity[key] = value;
   }

   await ipcRenderer.invoke('createActivity',newActivity);   
}

async function replicateActivity() 
{  
   const formData = new FormData(formUpdateActivity);
   let todayDate = getTodayDate()
   const newActivity = {

   activityId:null,
   activityCode:null,   
   statusUpdate:"En desarrollo",
   titleActivityUpdate:null,
   userId: userData.id,
   todayDate:todayDate,
   startDateActivityUpdate:null,
   endDateActivityUpdate:null,
   locationsBoxUpdate:1,
   officesBoxUpdate:1,
   divisionsBoxUpdate:1,
   departmentsBoxUpdate:1,
   progressUpdate:0,
   observationUpdate:null,
   replicate:true,

   };

   for (let register of formData.entries()) 
   {
     const [key, value] = register;
     newActivity[key] = value;
   }

   await ipcRenderer.invoke('createActivity',newActivity);   
}

async function updateActivity() 
{  
   const formData = new FormData(formUpdateActivity);
   let todayDate = getTodayDate()
   const updateActivity = {

   activityId:null,   
   statusUpdate:"En desarrollo",
   titleActivityUpdate:null,
   userId: userData.id,
   todayDate:todayDate,
   startDateActivityUpdate:null,
   endDateActivityUpdate:null,
   locationsBoxUpdate:1,
   officesBoxUpdate:1,
   divisionsBoxUpdate:1,
   departmentsBoxUpdate:1,
   progressUpdate:0,
   observationUpdate:null,

   };

   for (let register of formData.entries()) 
   {
     const [key, value] = register;
     updateActivity[key] = value;
   }


   await ipcRenderer.invoke('updateActivity',updateActivity);   
}


//  ------------------------------------------------------- ON

ipcRenderer.on('userData', (event, data) => 
{   
   let userDataJSON = JSON.stringify(data);
   localStorage.setItem('userData', userDataJSON);
});




ipcRenderer.on('activities', (event, data) => {  
   let template = ""
   const list = data
   list.forEach(element => {
      template+=`
         <tr>
            <td>${element.code}</td>
            <td>${element.title}</td>
            <td>${element.status}</td>
            <td>${element.location_name}</td>
            <td>${element.office_name}</td>
            <td>${element.progress}</td>
            <td>${element.today_date}</td>
            <td>${element.start_date}</td>
            <td>${element.end_date === null ? 'Sin Finalizar' : element.end_date}</td>
             <td>
            	<div class="d-flex flex-row align-items-center justify-content-around">
            		<a href="#" activity-id="${element.id}" class="action-link-activity replicateActivityBtn"><img src="../assets/icons/details.svg" alt=""></a>
            		<a href="#" activity-id="${element.id}" class="action-link-activity updateActivityBtn"><img src="../assets/icons/update.svg" alt=""></a>
            		<a href="#" activity-id="${element.id}" class="action-link-activity deleteActivityBtn"><img src="../assets/icons/delete.svg" alt=""></a>
            	</div>
        	</td>
         </tr>
      ` 
   });
     
   if(!zeroRegisters.classList.contains('d-none'))
         zeroRegisters.classList.add('d-none')

   activitiesList.innerHTML = template 


   let dataJSON = JSON.stringify(data)
   localStorage.setItem('activities',dataJSON)

   activitiesArray = data;

});

ipcRenderer.on('boxListForActivities', (event, data) => {  
  
   dataList = data;
   let dataJSON = JSON.stringify(data)
   localStorage.setItem('listBox',dataJSON)

   fillSelects(data.locations.data,locationsBox)
   fillSelects(data.offices.data,officesBox)
   fillSelects(data.divisions.data,divisionsBox)
   fillSelects(data.departments.data,departmentsBox)

   fillSelects(data.locations.data,locationsBoxUpdate)
   fillSelects(data.offices.data,officesBoxUpdate)
   fillSelects(data.divisions.data,divisionsBoxUpdate)
   fillSelects(data.departments.data,departmentsBoxUpdate)


});

ipcRenderer.on('activityCreated', (event, data) => 
{   
   modalToCreateActivity.classList.add('d-none')
   modalToUpdateActivity.classList.add('d-none')

   if(boxUpdate.classList.contains('d-none'))
   {
      boxReplicate.classList.add('d-none')
      boxUpdate.classList.remove('d-none')

   }

   renderActivities();
});

ipcRenderer.on('activityUpdated', (event, data) => 
{   
   modalToUpdateActivity.classList.toggle('d-none')
   renderActivities();
});



ipcRenderer.on('activitydeleted', (event, data) => 
{  

   if(parseInt(activitiesList.childElementCount) <= 1)
   {
      zeroRegisters.classList.remove('d-none')
      activitiesList.innerHTML = '';
   }

   renderActivities();
});


