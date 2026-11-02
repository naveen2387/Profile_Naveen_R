import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact";

/**
 * Contact form endpoint.
 *
 * Messages are forwarded to the webhook in CONTACT_WEBHOOK_URL (for example a form service or
 * automation tool that emails you). Until that variable is set, the endpoint answers 503 and the
 * form says so, rather than pretending a message was delivered.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "The request could not be read. Please try again." }, { status: 400 });
  }

  const input = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};
  const result = validateContact(input);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", errors: result.errors },
      { status: 422 },
    );
  }

  // Honeypot filled: a bot. Accept silently so it learns nothing.
  if (result.data.website) {
    return NextResponse.json({ ok: true, message: "Thanks, your message has been sent." });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, message: "The contact form is not connected to an inbox yet. Please try again later." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "naveen-r-contact-form",
        submittedAt: new Date().toISOString(),
        name: result.data.name,
        email: result.data.email,
        organisation: result.data.organisation,
        topic: result.data.topic,
        message: result.data.message,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with ${response.status}`);
    }

    return NextResponse.json({ ok: true, message: "Thanks, your message has been sent. I'll get back to you soon." });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Your message could not be delivered right now. Please try again in a few minutes." },
      { status: 502 },
    );
  }
}
