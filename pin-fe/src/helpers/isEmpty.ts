export default function isEmpty(obj = {}) {
  return (
    [Object, Array].includes(obj.constructor as any) &&
    !Object.entries(obj).length
  );
}
