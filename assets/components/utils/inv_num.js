export default function inv_num(tax_id) {
  const comp = JSON.parse(localStorage.getItem('sinpt'));
  if (comp) {
    const get_max_tax_id = 1000000 + Number(tax_id);
    const get_max_tax_id_tostring = String(get_max_tax_id).split('');
    const arr_splice = get_max_tax_id_tostring.splice(0, 1);
    const get_first_number = arr_splice.join('');
    const get_remaining_numbers = get_max_tax_id_tostring.join('');
    const calc = parseInt(get_first_number) - 1;
    const output = calc + '' + get_remaining_numbers;
    const result =
      String(comp?.comp_name).split('').splice(0, 3).join('') + '-' + output;
    return result;
  } else {
    return '00000000';
  }
}
