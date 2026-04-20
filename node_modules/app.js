let booking = {};

function openModal(){
  modal.style.display='flex';
  show(1);
}

function closeModal(){
  modal.style.display='none';
}

function show(n){
  document.querySelectorAll('.booking-step').forEach(s=>s.style.display='none');

  if(n<=3){
    document.getElementById('step'+n).style.display='block';
    progress.style.width=(n*33)+'%';
  }
}

function selectChip(el){
  el.parentElement.querySelectorAll('.svc-chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
}

function selectService(el){
  selectChip(el);
  booking.service = el.innerText;
}

function next(n){
  if(n===2 && !booking.service){
    toastMsg("Select service");
    return;
  }

  if(n===3){
    booking.zip = zip.value;
    booking.time = time.value;

    if(!booking.zip || !booking.time){
      toastMsg("Enter details");
      return;
    }

    providers.innerHTML="Finding pros...";
    setTimeout(loadProviders,800);
  }

  show(n);
}

function loadProviders(){
  providers.innerHTML=`
    <div class="provider" onclick="pick(this)">
      <strong>Maria T.</strong><br>
      ⭐ 4.98 • 45 min
    </div>
    <div class="provider" onclick="pick(this)">
      <strong>James R.</strong><br>
      ⭐ 4.95 • 1 hr
    </div>
  `;

  let first = document.querySelector('.provider');
  if(first) pick(first);
}

function pick(el){
  document.querySelectorAll('.provider').forEach(p=>p.classList.remove('active'));
  el.classList.add('active');
  booking.provider = el.innerText;
}

function confirm(){
  if(!booking.provider){
    toastMsg("Select provider");
    return;
  }

  details.innerHTML=`
    <strong>${booking.service}</strong><br>
    📍 ${booking.zip}<br>
    ⏰ ${booking.time}<br><br>
    ${booking.provider}
  `;

  document.querySelectorAll('.booking-step').forEach(s=>s.style.display='none');
  success.style.display='block';

  toastMsg("Booking confirmed");
}

function toastMsg(msg){
  toast.innerText = msg;
  toast.style.display='block';
  setTimeout(()=>toast.style.display='none',3000);
}

modal.addEventListener('click', e=>{
  if(e.target === modal) closeModal();
});
