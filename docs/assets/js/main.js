var menu = null;

document.addEventListener('DOMContentLoaded', function() {
  menu = document.getElementById('main-nav');

  document.getElementById('headerMenuToggle').addEventListener('click', () => {
    toggleMenu();
  });

  document.getElementById('mainNavToggle').addEventListener('click', () => {
    toggleMenu();
  });

  menu.addEventListener('click', (e) => {
    if (!closest(e.target, '.panel')) {
      toggleMenu();
    }
  });

  // minitabs
  minitabs();
});

function toggleMenu() {
  document.body.classList.toggle('no-scroll');
  menu.classList.toggle('active');
}

function closest(element, selector) {
  while (element) {
    if (element.matches(selector)) {
      return element;
    }
    element = element.parentElement;
  }
}

function minitabs() {
  // Loop minitabs
  document.body.querySelectorAll('.minitabs').forEach((container) => {
    // Loop tabs
    container.querySelectorAll('.tabnames li').forEach((tab, tabIndex) => {
      // Attach click listeners
      tab.addEventListener('click', () => {
        // Set active tab
        [].forEach.call(tab.parentNode.children, function(sibling) {
          if (tab.isEqualNode(sibling) === true) {
            tab.classList.add('activetab');
          } else {
            sibling.classList.remove('activetab');
          }
        });
        // Set active content
        tab.parentElement.parentElement.querySelectorAll('.tabcontent').forEach((content, contentIndex) => {
          if (tabIndex === contentIndex) {
            content.classList.add('activetab');
          } else {
            content.classList.remove('activetab');
          }
        });
      });
      // Click first tab
      if (tabIndex === 0) {
        tab.click();
      }
    });
  });
}
