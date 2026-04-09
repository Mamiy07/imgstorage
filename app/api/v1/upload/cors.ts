// Add these headers to all /api/v1/ responses
export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'x-api-key, Content-Type',
  }
}

export function handleOptions() {
  return new Response(null, { status: 204, headers: corsHeaders() })
}