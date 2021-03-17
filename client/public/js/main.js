const toggleNavigation = () => {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}

const controlRadioBtns = () => {
  const followUpRadios = document.querySelectorAll('.radio-btn-wrapper1 input[type=radio]');
  const followUpDate = document.getElementById('followUpDate');

  if(followUpRadios[0].addEventListener ){
    followUpRadios[0].addEventListener('change', (e) => {
      if(e.target.checked){
        followUpDate.style.display = 'none';
      }
    })
  }
  if(followUpRadios[1].addEventListener){
    followUpRadios[1].addEventListener('change', (e) => {
      if(e.target.checked){
        followUpDate.style.display = 'flex';
      }
    })
  }
}


const addminSidebarToggle = () => {
  const openAdminSidebar = document.querySelector('.admin-wrapper .open');
  const closeAdminSidebar = document.querySelector('.admin-header .close');
  const adminSidebar = document.querySelector('.admin-wrapper .sidebar');
  const adminBody = document.querySelector('.addmin-body');
  
  closeAdminSidebar.addEventListener('click', () => {
      adminSidebar.style.marginLeft = '-20vw';
      adminBody.style.width = '100vw';
  })

  openAdminSidebar.addEventListener('click', () => {
      adminSidebar.style.marginLeft = '0vw';
      adminBody.style.width = '80vw';
  })  

}



const hideAndShowModals = () => {
  const showModalBtns = document.querySelectorAll('.add');
console.log(showModalBtns)
  for(let btn of showModalBtns){
    
    btn.addEventListener('click', () => {
      btn.nextElementSibling.style.top = '50%';
      btn.nextElementSibling.style.opacity = '1';
      btn.nextElementSibling.style.zIndex = '1';
    });
  }

  const hideModalBtns = document.querySelectorAll('.close');

  for(let btn of hideModalBtns){
    const modal = btn.parentElement.parentElement;
    btn.addEventListener('click', () => {
      modal.style.top = '-150%';
      modal.style.opacity = '0';
      modal.style.zIndex = '-10';
    })
  }
}

const toggleEmi = () => {
  const emi = document.querySelector('.emi-checkbox input[type=checkbox]');
  const advanceAmount = document.getElementById('advanceAmount');
  const duration = document.getElementById('duration');

  emi.addEventListener('change', (e) => {
    if(e.target.checked){
      advanceAmount.style.display = 'flex';
      duration.style.display = 'flex';
    }
    if(e.target.checked == false){
      advanceAmount.style.display = 'none';
      duration.style.display = 'none';
    }
  })
}

const closeErrorButtons = () => {
  const closeBtns = document.getElementsByClassName('closeError');
  for(btn of closeBtns){
    btn.addEventListener("click", ()=> {
        btn.parentElement.style.display = 'none';
    })

    if(btn.parentElement.style.display == 'block'){
      const timer = setInterval(() => {
        btn.parentElement.style.display = 'none';
      }, 3000);
    }
  }
}

const verntureNameInput = () => {
  const propType = document.getElementById('propType');
  const ventureName = document.getElementById('ventureName');

  propType.addEventListener('change', () => {
    if(propType.value == 'Venture') {
      ventureName.style.display = 'flex';
    }else{
      ventureName.style.display = 'none';
    }
  });
}

const hideAndShowBankDetais = () => {
  const paymentMode = document.getElementById('paymentMode');
  const bankInfo = document.getElementById('bankInfo');

  paymentMode.onchange = () => {
    if(paymentMode.value == 'Cheque'){
      bankInfo.style.display = 'flex';
    }else{
      bankInfo.style.display = 'none';
    }
  }
}

const emiThings = () => {
  const modalBtn1 = document.querySelector('.edit1');
  const modalBtn2 = document.querySelector('.edit2');
  const modalBtn3 = document.querySelector('.edit3');
  const paymentStatusModal1 = document.getElementById('paymentStatusModal1');
  const paymentStatusModal2 = document.getElementById('paymentStatusModal2');
  const paymentStatusModal3 = document.getElementById('paymentStatusModal3');
  const firstPymentStatus = document.getElementById('firstPymentStatus');
  const secondPymentStatus = document.getElementById('secondPymentStatus');
  const thirdPymentStatus = document.getElementById('thirdPymentStatus');
  const closeBtn = document.querySelectorAll('.close');
  const paymentCells = document.querySelectorAll('.editable_cell1');
  const mainBal = document.getElementById('mainBal');
  const advPaid = document.getElementById('advPaid');
  const emiDuration = document.getElementById('duration');
  const mainMinusAdv = parseInt(mainBal.innerText) - parseInt(advPaid.innerText);

  if(modalBtn1){
    if(firstPymentStatus.value == "Pending"){
      modalBtn1.addEventListener('click', () => {
        paymentStatusModal1.style.top = '50%';
        paymentStatusModal1.style.opacity = '1';
        paymentStatusModal1.style.zIndex = '1';
      });
    }
  }
  
  if(modalBtn2){
    if(secondPymentStatus.value == "Pending"){
      modalBtn2.addEventListener('click', () => {
        paymentStatusModal2.style.top = '50%';
        paymentStatusModal2.style.opacity = '1';
        paymentStatusModal2.style.zIndex = '1';
      });
    }
  }
    

    for(let close of closeBtn){
      close.addEventListener('click', () => {
          close.parentElement.parentElement.style.top = '-150%';
          close.parentElement.parentElement.opacity = '0';
          close.parentElement.parentElement.zIndex = '0';
      })
    }

    if(emiDuration.value == "3 Months"){
      if(modalBtn3){
        if(thirdPymentStatus.value == "Pending"){
          modalBtn3.addEventListener('click', () => {
            paymentStatusModal3.style.top = '50%';
            paymentStatusModal3.style.opacity = '1';
            paymentStatusModal3.style.zIndex = '1';
          });
        }
      }
    }

  if(emiDuration.value == "3 Months"){
    paymentCells[0].innerText = (mainMinusAdv / 3).toFixed(2);
    paymentCells[1].innerText = (mainMinusAdv / 3).toFixed(2);
    paymentCells[2].innerText = (mainMinusAdv / 3).toFixed(2);
  }else{
    paymentCells[0].innerText = (mainMinusAdv / 2).toFixed(2);
    paymentCells[1].innerText = (mainMinusAdv / 2).toFixed(2);
  }
}

const toggleModal = () => {
  const add = document.querySelector('.add');
  const modal = document.getElementById('modal');
  const hideModal = document.getElementById('hideModal');

  add.onclick = () => {
    modal.style.top = '50%';
    modal.style.opacity = '1';
    modal.style.zIndex = '1';
  }
  hideModal.onclick = () => {
    modal.style.top = '-150%';
    modal.style.opacity = '0';
    modal.style.zIndex = '0';
  }
}

const filterTextTable = (inputName, tableName, columnNumber) => {
  let input, filter, table, tr, td, i, txtValue;
  input = inputName;
  filter = input.value.toUpperCase();
  table = document.getElementById(tableName);
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[columnNumber];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

const filterNumberTable = (inputName, tableName, columnNumber) => {
  let input, filter, table, tr, td, i, txtValue;
  input = inputName;
  filter = input.value;
  table = document.getElementById(tableName);
  tr = table.getElementsByTagName("tr");

  for(i=0; i<tr.length; i++){
    td=tr[i].getElementsByTagName("td")[columnNumber];
    if(td){
      txtValue = td.textContent || td.innerText;
      if(txtValue.indexOf(filter) > -1){
        tr[i].style.display = "";
      }else{
        tr[i].style.display = "none";
      }
    }
  }
}

const toggleUpdateModal = () => {
  const adds = document.querySelectorAll('.eidtBtn');
  const modal = document.getElementById('updateModal');
  const hideUpdateModal = document.getElementById('hideUpdateModal');
  const userId1 = document.getElementById('formUserId');

  for(let add of adds){
    add.onclick = () => {
      userId1.value = add.nextElementSibling.children[0].value;
      modal.style.top = '50%';
      modal.style.opacity = '1';
      modal.style.zIndex = '1';
    }
  }
  
  hideUpdateModal.addEventListener('click', () => {
    modal.style.top = '-150%';
    modal.style.opacity = '0';
    modal.style.zIndex = '0';
  }) 
}

const downloadPageAsPdf = () => {
  const downloadBtn = document.getElementById('downloadAsPdf');
  const scInner = document.getElementById('scInner');
  downloadBtn.addEventListener('click', () => {
    html2pdf().from(scInner).save();
  });
}

const downloadPageAsExcel = (tableID, filename = '') => {
  var downloadurl;
    var dataFileType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    console.log(tableSelect)
    var tableHTMLData = tableSelect.outerHTML.replace(/ /g, '%20');
    
    filename = filename?filename+'.xls':'completDetails.xls';
    
    downloadurl = document.createElement("a");
    
    document.body.appendChild(downloadurl);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTMLData], {
            type: dataFileType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadurl.href = 'data:' + dataFileType + ', ' + tableHTMLData;
    
        // Setting the file name
        downloadurl.download = filename;
        
        //triggering the function
        downloadurl.click();
    }
}

const hideAndShowCustomModal = (opentBtns, modalToOpen) => {
  for(let btn of opentBtns){
    btn.onclick = () => {
      modalToOpen.lastElementChild.children[1].value = btn.firstElementChild.value;
      modalToOpen.style.opacity = '1';
      modalToOpen.style.top = '50%';
      modalToOpen.style.zIndex = '1';
    }
  }
}

const controlDropDown = () => {
  const statusDropDown = document.getElementById('statusDropDown');
  const followUpDate1 = document.getElementById('followUpDate1');

  statusDropDown.addEventListener('change', () => {
    if(statusDropDown.value == 'FollowUp'){
      followUpDate1.style.display = 'flex';
    }else{
      followUpDate1.style.display = 'none';
    }
  })
}



const customEditModal = (rows, modal) => {
  const editRow = document.querySelectorAll(rows);
  const editModal = document.getElementById(modal);

  if(editRow.length){
    for(let btn of editRow){
      btn.addEventListener('click', () => {
        editModal.style.top = '50%';
        editModal.style.opacity = '1';
        editModal.style.zIndex = '1';
        // Set id to form
        editModal.lastElementChild.children[0].value = btn.previousElementSibling.previousElementSibling.value;
        // Set index of the row
        editModal.lastElementChild.children[1].value = btn.previousElementSibling.value;
        // Set service next date
        editModal.lastElementChild.children[2].value = btn.previousElementSibling.previousElementSibling.previousElementSibling.value;
      });
    }
  }
}

const init = () => {
  const path = window.location.pathname;

  if(path=='/checkEMI' || path=="/solarCheckEMI"){
    emiThings();
  }
  if(path=='/showSingleCust' || path=="/showSolarSingleCust"){
    downloadPageAsPdf();
    emiThings();
    customEditModal('.editSerivceStatus', 'editRowModal');
  }
  if(path=='/admin'){
    toggleModal();
    toggleUpdateModal();
  }

  if(path == '/wpTotalSales' || path == '/solarTotalSales'){
    hideAndShowModals();
    hideAndShowBankDetais();
    toggleEmi();
  }

  if(path == '/wpTelecaling' || path == '/solarTelecaling'){
    hideAndShowModals();
    controlRadioBtns();
    controlDropDown();
    hideAndShowCustomModal(document.querySelectorAll('.editRemarksBtn'), document.getElementById('remarksModal'));
    hideAndShowCustomModal(document.querySelectorAll('.editStatusBtn'), document.getElementById('statusModal'));
  }

  if(path=='/rsPropertiesInHand'){
    hideAndShowModals();
    verntureNameInput();
  }
  if(path=='/wpServicesPending'){
    hideAndShowModals();
    hideAndShowCustomModal(document.querySelectorAll('.editServiceBtn'), document.getElementById('serviceStatusModal'));
  }

  if(path=='/wpStockReport' || path=='/solarStockReports'){
    hideAndShowModals();
    hideAndShowCustomModal(document.querySelectorAll('.editNoOfProductsBtn'), document.getElementById('noOfProductsModale'));
  }

  if(path=='/wpExpenses'  || path=='/solarExpenses' ||  path=='/rsPropertiesSales'){
    hideAndShowModals();
  }

  if(
    path == '/register' || 
    path == '/login' ||
    path == '/'
  ){
    closeErrorButtons()
  }
}

document.addEventListener('readystatechange', (e) => {
  if(e.target.readyState === 'complete'){
    init();
  }
})