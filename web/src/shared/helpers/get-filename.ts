// eslint-disable-next-line import/no-anonymous-default-export
export default (metadataValue: string) => {
  const matchedValues = metadataValue.match(/filename="([^"]+)"/);

  return matchedValues ? matchedValues[1] : 'unknown';
};