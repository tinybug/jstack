export const SAY_YOUR_NAME = 'SAY_YOUR_NAME';

export function sayYourName(name) {
  return {
    type: SAY_YOUR_NAME,
    payload: name,
  };
}

export const SWITCH_LOCALE = 'SWITCH_LOCALE';

export function switchLocale(locale) {
  return {
    type: SWITCH_LOCALE,
    payload: locale,
  };
}
