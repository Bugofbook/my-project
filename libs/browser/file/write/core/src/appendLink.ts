export function appendLink(obj: Blob | MediaSource): HTMLAnchorElement {
  const url = window.URL.createObjectURL(obj);
  const link = document.createElement('a');
  link.href = url;
  return link;
}
