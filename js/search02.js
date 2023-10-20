document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector("#search-input");
  searchInput.addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const searchResults = [];
    const hElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

    hElements.forEach(function(hElement) {
      const isRelated = isHeadingRelated(hElement, searchValue);

      if (isRelated) {
        searchResults.push(hElement);
      }
    });

    displaySearchResults(searchResults, 10);
  });

  function isHeadingRelated(headingElement, searchValue) {
    const headingText = headingElement.textContent.toLowerCase();

    if (headingText.includes(searchValue)) {
      return true;
    }

    let sibling = headingElement.nextElementSibling;

    while (sibling && !sibling.tagName.startsWith("H")) {
      const siblingText = sibling.textContent.toLowerCase();

      if (siblingText.includes(searchValue)) {
        return true;
      }

      sibling = sibling.nextElementSibling;
    }

    return false;
  }

  function displaySearchResults(results, maxResults) {
    const searchResultsDiv = document.querySelector("#search-results");
    searchResultsDiv.innerHTML = "";

    if (results.length > 0) {
      const displayedResults = results.slice(0, maxResults);

      displayedResults.forEach(function(result) {
        var resultContainer = createResultContainer(result);
        searchResultsDiv.appendChild(resultContainer);
      });

      if (results.length > maxResults) {
        var showMoreText = document.createElement("div");
        showMoreText.textContent = "Hiển thị thêm";
        showMoreText.classList.add("show-more-text");
        searchResultsDiv.appendChild(showMoreText);

        showMoreText.addEventListener("click", function() {
          displayAllResults(results);
        });
      }
    } else {
      let noResultsMessage = document.createElement("p");
      noResultsMessage.textContent = "Không tìm thấy kết quả";
      noResultsMessage.classList.add("can-not-find");
      searchResultsDiv.appendChild(noResultsMessage);
    }
  }

  function displayAllResults(results) {
    const searchResultsDiv = document.querySelector("#search-results");
    searchResultsDiv.innerHTML = "";

    results.forEach(function(result) {
      var resultContainer = createResultContainer(result);
      searchResultsDiv.appendChild(resultContainer);
    });
  }

  function createResultContainer(element) {
    var resultContainer = document.createElement("div");
    resultContainer.classList.add("result-container");
    resultContainer.innerHTML = "<br>" + element.innerHTML;
    resultContainer.addEventListener("click", function() {
      scrollToHeading(element);
    });
    return resultContainer;
  }
  function scrollToHeading(headingElement) {
    const marginPercentage = 15; // Set the desired margin percentage
    scrollElement(headingElement, marginPercentage);
  }
  
  function scrollElement(element, marginPercentage) {
    var offset = element.offsetTop + (element.offsetHeight * marginPercentage / 100);
    var scrollOffset = offset - (window.innerHeight * marginPercentage / 100);
    window.scrollTo({ top: scrollOffset, behavior: "smooth" });
  }
  });