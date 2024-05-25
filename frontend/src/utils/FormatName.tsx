export function FormatName(name: string) {
  const words = name.split(" ");
  const initials = words.slice(0,2).map((word) => word.charAt(0).toUpperCase()).join("");

  return <div>{initials}</div>;
}
