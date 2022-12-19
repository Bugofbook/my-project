export function afterDownload(link: HTMLAnchorElement) {
  const windowFocus = () => {
    window.removeEventListener('focus', windowFocus, false);
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  };
  window.addEventListener('focus', windowFocus, false);
}
