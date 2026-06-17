import { sendRfqEmail } from "@/lib/rfq-email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const result = await sendRfqEmail(await request.text());

  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: result.status });
  }

  return Response.json({ ok: true });
}

export function GET() {
  return Response.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
}
