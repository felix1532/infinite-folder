import type { ObjectDirective } from 'vue';

const VClickOutside: ObjectDirective = {
  mounted: (element, binding) => {
    element.clickOutsideEvent = function (event: MouseEvent) {
      const excludeComponent = document.getElementById(<string>binding.arg);

      if (
        !(element == event.target || element.contains(event.target)) &&
        !(
          excludeComponent &&
          (event.target == excludeComponent ||
            excludeComponent.contains(event.target as Node))
        )
      ) {
        binding.value(event, element);
      }
    };
    document.addEventListener('click', element.clickOutsideEvent);
    document.addEventListener('contextmenu', element.clickOutsideEvent);
  },
  unmounted: element => {
    document.removeEventListener('click', element.clickOutsideEvent);
    document.removeEventListener('contextmenu', element.clickOutsideEvent);
  },
};

export default { directive: VClickOutside, name: 'clickOutside' };
