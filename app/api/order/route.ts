import orderData from '@/data/order.json'

export async function GET() {
  return Response.json(orderData, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
