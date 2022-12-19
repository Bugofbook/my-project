export function setFileName(fileName: string) {
  return (link: HTMLAnchorElement) => {
    link.setAttribute('download', fileName);
    return link;
  };
}
