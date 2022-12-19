export function handleDownload(link: HTMLAnchorElement) {
  if (link.href) {
    link.click();
  }
  return link;
}
