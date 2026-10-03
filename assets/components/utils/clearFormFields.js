const clearFormFields = () => {
  if (document.querySelector('[type="text"]')) {
    Array.from(document.querySelectorAll('[type="text"]')).forEach(
      (v) => (v.value = null)
    );
  }

  if (document.querySelector('[type="email"]')) {
    Array.from(document.querySelectorAll('[type="email"]')).forEach(
      (v) => (v.value = null)
    );
  }

  if (document.querySelector('[type="number"]')) {
    Array.from(document.querySelectorAll('[type="number"]')).forEach(
      (v) => (v.value = null)
    );
  }

  if (document.querySelector('[type="date"]')) {
    Array.from(document.querySelectorAll('[type="date"]')).forEach(
      (v) => (v.value = null)
    );
  }

  if (document.querySelector('[type="hidden"]')) {
    Array.from(document.querySelectorAll('[type="hidden"]')).forEach(
      (v) => (v.value = null)
    );
  }

  if (document.querySelector('[type="checkbox"]')) {
    Array.from(document.querySelectorAll('[type="checkbox"]')).forEach(
      (v) => (v.checked = false)
    );
  }
};

export default clearFormFields;
