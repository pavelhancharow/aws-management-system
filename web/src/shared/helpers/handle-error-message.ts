// eslint-disable-next-line import/no-anonymous-default-export
export default (message: string, additionalInfo?: string) => {
  switch (message) {
    case 'The conditional request failed':
      return `An account with Email ${additionalInfo} already exists`;
    default:
      return message;
  }
}