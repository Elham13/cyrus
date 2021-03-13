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
  const duration = document.getElementById('duration');
  const firstPaymentModal = document.getElementById('firstPaymentModal');
  const secondPaymentModal = document.getElementById('secondPaymentModal');
  const thirdPaymentModal = document.getElementById('thirdPaymentModal');

  const openFirstPaymentModal = document.getElementById('openFirstPaymentModal');
  const openSecondPaymentModal = document.getElementById('openSecondPaymentModal');
  const openThirdPaymentModal = document.getElementById('openThirdPaymentModal');

  const hideModalBtns = document.querySelectorAll('.close');

  openFirstPaymentModal.onclick = () => {
    firstPaymentModal.style.top = '50%';
    firstPaymentModal.style.opacity = '1';
    firstPaymentModal.style.zIndex = '1';
  }
  openSecondPaymentModal.onclick = () => {
    secondPaymentModal.style.top = '50%';
    secondPaymentModal.style.opacity = '1';
    secondPaymentModal.style.zIndex = '1';
  }

  if(duration.value == '3 Months'){
    openThirdPaymentModal.onclick = () => {
      thirdPaymentModal.style.top = '50%';
      thirdPaymentModal.style.opacity = '1';
      thirdPaymentModal.style.zIndex = '1';
    }
  }

  for(let btn of hideModalBtns){
    const modal = btn.parentElement.parentElement;
    btn.addEventListener('click', () => {
      modal.style.top = '-150%';
      modal.style.opacity = '0';
      modal.style.zIndex = '-10';
    })
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

const controlServicePendingDropDown = () => {
  const statusDropDown = document.getElementById('serviceStatusDropDown');
  const followUpDate1 = document.getElementById('nextPaymentDate');

  statusDropDown.addEventListener('change', () => {
    if(statusDropDown.value == 'Completed'){
      followUpDate1.style.display = 'flex';
    }else{
      followUpDate1.style.display = 'none';
    }
  })
}

const init = () => {
  const path = window.location.pathname;

  if(path=='/checkEMI'){
    emiThings();
  }
  if(path=='/showSingleCust'){
    // toggleModal();
    downloadPageAsPdf();
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
    controlServicePendingDropDown();
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