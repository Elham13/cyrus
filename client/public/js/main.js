const toggleNavigation = () => {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}

const accordianOpen = () => {
  const acc = document.getElementsByClassName("accordion");

  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");

      let panel = this.nextElementSibling;
      let icon = this.lastElementChild.children[0];
      
      if (panel.style.display === "block" ) {
        panel.style.display = "none";
        icon.classList.remove('fa-angle-up')
        icon.classList.add('fa-angle-down')      
      } else {
        panel.style.display = "block";
        icon.classList.remove('fa-angle-down')
        icon.classList.add('fa-angle-up')
      }
    });
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

  for(let btn of showModalBtns){
    btn.addEventListener('click', () => {
      btn.nextElementSibling.style.opacity = '1';
      btn.nextElementSibling.style.zIndex = '1';
    });
  }

  const hideModalBtns = document.querySelectorAll('.close');

  for(let btn of hideModalBtns){
    const modal = btn.parentElement.parentElement;
    btn.addEventListener('click', () => {
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


const emiCalculation = () => {
  const mainBal = document.getElementById('mainBal').innerText;
  const advPaid = document.getElementById('advPaid').innerText;
  let amtPaid = document.getElementById('amtPaid');
  let amtPaid1 = document.getElementById('amtPaid1');
  let amtPaid2 = document.getElementById('amtPaid2');
  let remainingBal = document.getElementById('remainingBal');
  let remainingBal1 = document.getElementById('remainingBal1');
  let remainingBal2 = document.getElementById('remainingBal2');
  let nextDate = document.getElementById('nextDate');
  let nextDate1 = document.getElementById('nextDate1'); 
  let nextDate2 = document.getElementById('nextDate2'); 
  const duration = document.getElementById('duration');

  console.log(typeof(duration.value))

  if(duration.value === '3 Months'){
    amtPaid.innerHTML = (parseInt(mainBal) - parseInt(advPaid)) / 3;
    const firstRemaining = parseInt(mainBal) - parseInt(advPaid) - parseInt(amtPaid.innerText); 
    remainingBal.innerHTML = firstRemaining;

    amtPaid1.innerHTML = firstRemaining / 2;
    const secondRemaining = parseInt(mainBal) - parseInt(advPaid) - parseInt(amtPaid.innerText) - parseInt(amtPaid1.innerText);
    remainingBal1.innerHTML = secondRemaining;

    amtPaid2.innerHTML = secondRemaining;
    const thirdRemaining = parseInt(mainBal) - parseInt(advPaid) - parseInt(amtPaid.innerText) - parseInt(amtPaid1.innerText) - parseInt(amtPaid2.innerText);
    remainingBal2.innerHTML = thirdRemaining

    let d = new Date(nextDate.innerText);
    d.setMonth(d.getMonth() + 1)
    nextDate.innerHTML = d.toDateString();
    d.setMonth(d.getMonth() + 1);
    nextDate1.innerHTML = d.toDateString();
    d.setMonth(d.getMonth() + 1);
    nextDate2.innerHTML = d.toDateString();
  }else{
    amtPaid.innerHTML = (parseInt(mainBal) - parseInt(advPaid)) / 2;
    const firstRemaining = parseInt(mainBal) - parseInt(advPaid) - parseInt(amtPaid.innerText);  
    remainingBal.innerHTML = firstRemaining;
    amtPaid1.innerHTML = firstRemaining;
  
    const secondRemaining = parseInt(mainBal) - parseInt(advPaid) - parseInt(amtPaid.innerText) - parseInt(amtPaid1.innerText);
    remainingBal1.innerHTML = secondRemaining;
  
    let d = new Date(nextDate.innerText);
    d.setMonth(d.getMonth() + 1)
    nextDate.innerHTML = d.toDateString();
    d.setMonth(d.getMonth() + 1);
    nextDate1.innerHTML = d.toDateString();
  }
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

const init = () => {
  const path = window.location.pathname;
  if(path == '/checkEMI' || path == '/solarCheckEmi'){
    emiCalculation();
  }

  if(path == '/wpTotalSales' || path == '/solarTotalSales'){
    hideAndShowModals();
    toggleEmi();
  }

  if(path == '/wpTelecaling' || path == '/solarTelecaling'){
    hideAndShowModals();
    controlRadioBtns();
  }

  if(path=='/rsPropertiesInHand'){
    hideAndShowModals();
    verntureNameInput();
  }

  if(path=='/wpServicesPending' || path=='/wpExpenses' || path=='/wpStockReport' || path=='/solarExpenses' || path=='/solarStockReports' || path=='/rsPropertiesSales'){
    hideAndShowModals();
  }

  // if(path == '/admin'){
  //   addminSidebarToggle();
  // }

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