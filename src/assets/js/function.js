
    function showSidebar() {
        const sidebar = document.querySelector('.header__sidebar');
        sidebar.style.display = 'flex';
    }

    function hideSidebar() {
        const sidebar = document.querySelector('.header__sidebar');
        sidebar.style.display = 'none';
    }

    function blogNext() {
        const widthItem = document.querySelector('.blog__item').offsetWidth;
        document.getElementById('formBlog').scrollLeft += widthItem;
    }

    function blogPrev() {
        const widthItem = document.querySelector('.blog__item').offsetWidth;
        document.getElementById('formBlog').scrollLeft -= widthItem;
    }

    