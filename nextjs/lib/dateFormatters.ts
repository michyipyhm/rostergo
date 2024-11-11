export function formatYYYYMMDD(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

export function formatYYYYMMDDHHMM(dateString: string): string {
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  
  return `${yyyy}-${mm}-${dd}, ${hh}:${min}`;
}