// Collect parent elements, add/remove class list to child elements
const parentElements = document.querySelectorAll('.parent-1, .parent-2, .parent-3');

parentElements.forEach(parent => {
  parent.addEventListener('click', () => {

    const parentClass = parent.classList[0];
    const childClass = parentClass.replace('parent', 'child');

    const childElements = document.querySelectorAll('.child-1, .child-2, .child-3');

    childElements.forEach(child => {
      child.classList.remove('border-warning');
    });


    const clickedChildElement = document.querySelector(`.${childClass}`);

    clickedChildElement.classList.add('border-warning');
  });
});