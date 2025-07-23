export function reductionParse(total: number, item: any) {
  return !isNaN(parseFloat(item.value)) && item.active
    ? total + parseFloat(item.value)
    : total + 0;
}
