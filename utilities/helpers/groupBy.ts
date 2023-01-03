/**
 * Groups an array of objects into subarrays based on the value of a property of the objects.
 *
 * @param array The array of objects to group.
 * @param property The property to use for grouping.
 * @returns An array of subarrays of objects.
 */
const groupBy = <T, K extends keyof T>(array: T[], property: K): T[][] => {
  const result: { [key: string]: T[] } = {};
  array.forEach((item) => {
    const key = item[property] as string;
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  });
  return Object.values(result);
};
export default groupBy;
