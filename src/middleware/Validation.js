export function ValidationFields(
  email,
  password,
  username = 'hina',
  phone_number = '123456789012',
) {
  let fieldsValidation = [
    'Username must be greater than 3 characters',
    'Invalid Email Address',
    'Password must be greater than 7.',
    'Phone number must have 11 digits',
  ];
  console.log(email, password, username, phone_number);

  if (username.length >= 3) {
    fieldsValidation[0] = true;
  }
  if (/^[a-zA-Z0-9\.]+@+[a-z]+\.[a-z]{3}$/.test(email)) {
    fieldsValidation[1] = true;
  }
  if (password.length >= 7) {
    fieldsValidation[2] = true;
  }
  if (/[0-9]{11,12}/.test(phone_number)) {
    fieldsValidation[3] = true;
  }

  return fieldsValidation;
}
