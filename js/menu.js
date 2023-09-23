function myFunction(x) {
    x.classList.toggle("change");
  }
  function toggleGuide(detailsId, summaryId){
  var guideDetails = document.getElementById(detailsId);
  var guideSummary = document.getElementById(summaryId);
  if (guideDetails.style.display === "none" ){
      guideDetails.style.display = "block";
      guideSummary.textContent = "hide";
  }
  else{
      guideDetails.style.display = "none";
      guideSummary.textContent = "Unhide"
  }
 } 
