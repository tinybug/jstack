export const SAY_YOUR_NAME = 'SAY_YOUR_NAME';

export function sayYourName(name) {
  return {
    type: SAY_YOUR_NAME,
    payload: name,
  };
}
