// @ts-check

(() => {
  const w = window;
  const de = document.documentElement;
  const ls = window.localStorage;

  const classNames =
    (ls && ls.getItem && JSON.parse(ls.getItem("<%= options.storageKey %>"))) ||
    "<%= options.fallback %>";
  classNames.forEach((className) => addClassName(className));

  w["<%= options.globalName %>"] = {
    getClassList,
    addClassName,
    removeClassName,
  };

  /**  */
  function getClassList() {
    return [...classNames];
  }

  /** @param {string} className */
  function addClassName(className) {
    if (de.classList) {
      de.classList.add(className);
    } else {
      de.className += " " + className;
    }
  }

  /** @param {string} className */
  function removeClassName(className) {
    if (de.classList) {
      de.classList.remove(className);
    } else {
      de.className = de.className.replace(new RegExp(className, "g"), "");
    }
  }
})();
