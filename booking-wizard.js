function next(n){
  if(n === 2 && !booking.service){
    toastMsg("Select a service first");
    return;
  }

  if(n === 3){
    booking.zip = zip.value;
    booking.time = time.value;

    if(!booking.zip || !booking.time){
      toastMsg("Enter location and time");
      return;
    }

    loadProviders();
  }

  show(n);
}