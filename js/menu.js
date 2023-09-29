function myFunction(x) {
    x.classList.toggle("change");
  }
  function toggleGuide(detailsId, summaryId) {
    var guideDetails = document.getElementById(detailsId);
    var guideSummary = document.getElementById(summaryId);
  
    if (guideDetails.style.display === "none") {
      guideDetails.style.display = "block";
      guideSummary.textContent = "Ẩn";
    } else {
      guideDetails.style.display = "none";
      guideSummary.textContent = "Hiện";
    }
  }
  
  document.addEventListener("click", function (event) {
    var menuContainer = document.querySelector(".menu-container");
  
    if (!menuContainer.contains(event.target)) {
      var guideDetails = document.getElementById("menu-details");
  
      if (guideDetails.style.display === "block") {
        var menuContainerElement = document.querySelector(".menu-container");
        myFunction(menuContainerElement);
        guideDetails.style.display = "none";
      }
    }
  });
