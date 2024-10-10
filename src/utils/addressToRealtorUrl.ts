export function addressToRealtorUrl(address: string): string {
  // Remove any special characters except commas, spaces, and periods
  const cleanAddress = address.replace(/[^\w\s,.-]/g, '').trim();
  
  // Split the address into parts
  const parts = cleanAddress.split(',').map(part => part.trim());
  
  // Extract street, city, state, and zip
  const street = parts[0];
  const city = parts[1] || '';
  const stateZip = parts[2] || '';
  const [state, zip] = stateZip.split(' ');
  
  // Format each part
  const formattedStreet = street.replace(/\s+/g, '-').replace(/\./g, '');
  const formattedCity = city.replace(/\s+/g, '-');
  
  // Construct the URL part
  const urlPart = `${formattedStreet}_${formattedCity}_${state}_${zip}`;
  
  // Construct the realtor.com URL
  return `https://www.realtor.com/realestateandhomes-detail/${urlPart}`;
}