// Lưu trữ các phần tử đã được highlight
let highlightedElements = [];

// Lắng nghe sự kiện khi người dùng nhập vào phần tử input
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  
  // Xóa highlight của các phần tử đã được highlight trước đó
  clearHighlight();
  if (searchTerm.trim() !== '') {
    // Lấy tất cả các phần tử mà bạn muốn tìm kiếm
    const elementsToSearch = document.querySelectorAll('p, div, span, ul, li');

    // Lặp qua từng phần tử và nội dung của chúng
    elementsToSearch.forEach(function(element) {
      const originalText = element.innerHTML;
      const regex = new RegExp(searchTerm, 'gi');

      // Kiểm tra xem từ khóa có xuất hiện trong nội dung hay không
      if (originalText.match(regex)) {
        // Tạo một vùng chứa mới để chứa các phần tử đã được highlight
        const container = document.createElement('div');

        // Thay thế từ khóa bằng phiên bản có highlight
        const highlightedText = originalText.replace(regex, '<span class="highlight">$&</span>');
        container.innerHTML = highlightedText;

        // Thêm các phần tử đã được highlight vào mảng và thay thế phần tử gốc bằng container
        highlightedElements.push({
          element: element,
          container: container
        });
        element.replaceWith(container);
      }
    });
  }
});

// Xóa highlight của các phần tử đã được highlight trước đó
function clearHighlight() {
  highlightedElements.forEach(function(item) {
    const { element, container } = item;
    container.replaceWith(element);
  });

  // Xóa các phần tử đã được lưu trữ trong mảng
  highlightedElements = [];
}