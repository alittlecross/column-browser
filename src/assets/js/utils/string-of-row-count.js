export default (str, int) => `${int.toLocaleString('en-GB')} ${str}${int === 1 ? '' : 's'}`;
