export default function numberWithComma(number: number = 0) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
