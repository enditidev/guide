    var flag = false;
        window.addEventListener('scroll', function() {
        var slogan = document.querySelector('.slogan');
        var header = document.querySelector('.header');
        var image = document.querySelector('.image-background');
        var headerTop = header.getBoundingClientRect().top;
        var headerBot = header.getBoundingClientRect().bottom;
        var sloganBot = slogan.getBoundingClientRect().bottom;
        var imageTop = image.getBoundingClientRect().top;
        if (headerTop <= 0 && flag == false) {
            header.classList.add('fixed-section');
            image.style.marginTop = header.offsetHeight + 'px';
            flag = true;
        }
        if (0 <= sloganBot && flag) {
            header.classList.remove('fixed-section');
            image.style.marginTop = 0;
            flag = false;
        }
        });
