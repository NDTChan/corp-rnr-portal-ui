import _ from 'lodash';
import dayjs from 'dayjs';

export const checkDigit = (charPart, numPart, checkDigit) => {
  console.log(charPart, numPart, checkDigit);
  const strValidChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // calculate the checksum for character part
  let checkSum = 0;
  if (charPart.length == 2) {
    checkSum += 9 * (10 + strValidChars.indexOf(charPart.charAt(0)));
    checkSum += 8 * (10 + strValidChars.indexOf(charPart.charAt(1)));
  } else {
    checkSum += 9 * 36;
    checkSum += 8 * (10 + strValidChars.indexOf(charPart));
  }

  // calculate the checksum for numeric part
  for (let i = 0, j = 7; i < numPart.length; i++, j--) checkSum += j * numPart.charAt(i);

  // verify the check digit
  const remaining = checkSum % 11;
  const verify = remaining == 0 ? 0 : 11 - remaining;

  return !(verify != checkDigit && (verify != 10 || checkDigit != 'A'));
};

export const checkValidDate = (dobY, dobM, dobD) => {
  if (!_.isEmpty(dobD) && !_.isEmpty(dobM) && !_.isEmpty(dobY)) {
    return dayjs(dobY + '/' + dobM + '/' + dobD, 'YYYY/M/D', true).isValid();
  }
  return true;
};

export const checkAge = (dobY, dobM, dobD) => {
  const dob = dayjs(dobY + '/' + dobM + '/' + dobD, 'YYYY/M/D');
  const age = dayjs().diff(dob, 'years');
  return age >= 18;
};
