const indexNowKey = process.env.INDEXNOW_KEY?.trim() || "";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ indexnowKey: string }> }) {
  const { indexnowKey: requestedKeyFile } = await params;
  const expectedKeyFile = indexNowKey ? `${indexNowKey}.txt` : "";

  if (!expectedKeyFile || requestedKeyFile !== expectedKeyFile) {
    return new Response("Not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=0, must-revalidate"
      }
    });
  }

  return new Response(indexNowKey, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  });
}
