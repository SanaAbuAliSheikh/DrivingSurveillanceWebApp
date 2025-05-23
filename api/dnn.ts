// API
export async function getDnnModels(limit:number, offset:number, search:string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:"+process.env.PORT;
  const res = await fetch(`${baseUrl}/api/v1/dnn?limit=${limit}&offset=${offset}&search=${search}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  cache: 'no-store',
});

  if (!res.ok) {
    throw new Error('Failed to fetch DNN Models');
  }

  return res.json();
}