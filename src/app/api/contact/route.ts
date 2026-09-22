import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY as string;
const contactEmail = process.env.CONTACT_EMAIL as string;
const resendFromEmail = process.env.RESEND_FROM_EMAIL as string;

if (!resendApiKey) {
  throw new Error("RESEND_API_KEY is not configured.");
}

if (!contactEmail) {
  throw new Error("CONTACT_EMAIL is not configured.");
}

if (!resendFromEmail) {
  throw new Error("RESEND_FROM_EMAIL is not configured.");
}

const resend = new Resend(resendApiKey);

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!body || typeof body !== "object") {
      return Response.json(
        {
          success: false,
          message: "Invalid request.",
        },
        { status: 400 },
      );
    }

    const data = body as Partial<ContactFormData>;

    const name = normalizeText(data.name);
    const email = normalizeText(data.email);
    const phone = normalizeText(data.phone);
    const subject = normalizeText(data.subject);
    const message = normalizeText(data.message);

    if (!name || !email || !phone || !subject || !message) {
      return Response.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    const { error } = await resend.emails.send({
      from: resendFromEmail,
      to: [contactEmail],
      replyTo: email,
      subject: `Contact Enquiry — ${subject}`,
      html: createContactEmail({
        name,
        email,
        phone,
        subject,
        message,
      }),
    });

    if (error) {
      console.error("Resend contact enquiry error:", error);

      return Response.json(
        {
          success: false,
          message: "Unable to send your enquiry right now.",
        },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      message: "Your enquiry has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong while sending your enquiry.",
      },
      { status: 500 },
    );
  }
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createContactEmail(data: ContactFormData) {
  return `
    <!DOCTYPE html>
    <html>
      <body
        style="
          margin:0;
          padding:0;
          background:#f8fafc;
          font-family:Arial,Helvetica,sans-serif;
          color:#0f172a;
        "
      >
        <div style="max-width:700px;margin:0 auto;padding:32px 16px;">
          <div
            style="
              background:#ffffff;
              border:1px solid #dbe3ee;
              border-radius:14px;
              overflow:hidden;
            "
          >
            <div
              style="
                background:#061a3a;
                padding:28px 32px;
              "
            >
              <h1
                style="
                  margin:0;
                  color:#ffffff;
                  font-size:22px;
                "
              >
                New Contact Enquiry
              </h1>

              <p
                style="
                  margin:8px 0 0;
                  color:#b8c5d8;
                  font-size:14px;
                "
              >
                FOSTIIMA Business School
              </p>
            </div>

            <div style="padding:32px;">
              <div
                style="
                  margin-bottom:24px;
                  padding:16px;
                  background:#f8fafc;
                  border-left:4px solid #c31e3b;
                "
              >
                <p
                  style="
                    margin:0;
                    color:#64748b;
                    font-size:11px;
                    font-weight:bold;
                    text-transform:uppercase;
                    letter-spacing:1px;
                  "
                >
                  Subject
                </p>

                <p
                  style="
                    margin:6px 0 0;
                    color:#061a3a;
                    font-size:17px;
                    font-weight:700;
                  "
                >
                  ${escapeHtml(data.subject)}
                </p>
              </div>

              <table
                style="
                  width:100%;
                  border-collapse:collapse;
                "
              >
                ${createEmailRow("Full Name", data.name)}
                ${createEmailRow("Email Address", data.email)}
                ${createEmailRow("Phone Number", data.phone)}
              </table>

              <div style="margin-top:28px;">
                <p
                  style="
                    margin:0 0 10px;
                    color:#061a3a;
                    font-size:14px;
                    font-weight:700;
                  "
                >
                  Message
                </p>

                <div
                  style="
                    padding:16px;
                    background:#f8fafc;
                    border:1px solid #e2e8f0;
                    border-radius:10px;
                    color:#475569;
                    font-size:14px;
                    line-height:1.7;
                  "
                >
                  ${escapeHtml(data.message).replace(/\n/g, "<br />")}
                </div>
              </div>

              <div
                style="
                  margin-top:28px;
                  padding-top:18px;
                  border-top:1px solid #e2e8f0;
                "
              >
                <p
                  style="
                    margin:0;
                    color:#94a3b8;
                    font-size:12px;
                  "
                >
                  This enquiry was submitted through the FOSTIIMA website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

function createEmailRow(label: string, value: string) {
  return `
    <tr>
      <td
        style="
          padding:12px 0;
          border-bottom:1px solid #e2e8f0;
          color:#64748b;
          font-size:13px;
          width:35%;
        "
      >
        ${label}
      </td>

      <td
        style="
          padding:12px 0;
          border-bottom:1px solid #e2e8f0;
          color:#061a3a;
          font-size:14px;
          font-weight:600;
        "
      >
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}