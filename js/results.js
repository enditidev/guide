 document.addEventListener("DOMContentLoaded", function() {
       const searchInput = document.getElementById('search-input');
       const searchResults = document.getElementById('search-results');
       
      //  searchResults.style.borderBottom = 'none';
      //  searchResults.style.borderLeft = 'none';
      //  searchResults.style.borderRight = 'none';
      searchResults.style.border = 'none';

       searchInput.addEventListener('input', function() {
         if (searchInput.value.trim() !== '') {
           searchResults.style.display = 'block';
           searchInput.style.borderRadius = '20px 20px 0 0';
           searchInput.style.background = 'white';
           searchInput.style.borderBottom = 'none';
           searchResults.style.border = '';
           searchInput.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.2)';
           searchResults.style.boxShadow = 'inset 0 -2px 4px rgba(0, 0, 0, 0.2)';
          } 
         else {
           searchResults.style.display = 'none';
           searchInput.style.borderRadius = '';
           searchInput.style.borderBottom = '1px solid grey';
           searchInput.style.boxShadow = 'none';
           searchResults.style.border = 'none';
           searchResults.style.boxShadow = 'none';
         }
       });

       // Chữ tự động mất khi chuẩn bị nhâp tìm kiếm 
       searchInput.addEventListener('focus', function() {
        searchInput.placeholder = '';
      });
    
      searchInput.addEventListener('blur', function() {
        searchInput.placeholder = 'Ctrl + F, please';
      });
       // End Chữ tự động mất khi chuẩn bị nhâp tìm kiếm 
    });

    // hàm nhấn màn hình ẩn khung tìm kiếm
document.addEventListener("click", function(event) {
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  if (!event.target.classList.contains("show-more-text")) {
    if (event.target !== searchInput && event.target !== searchResults) {
        searchResults.style.display = 'none';
        searchInput.style.borderRadius = '';
        searchInput.style.borderBottom = '';
        searchResults.style.border = 'none';
    }
    else{
        if (searchInput.value.trim() !== ''){
            searchResults.style.display = 'block';
            searchInput.style.borderRadius = '20px 20px 0 0';
            searchInput.style.borderBottom = 'none';
            searchResults.style.border = '';
        }  
    }
  }
});