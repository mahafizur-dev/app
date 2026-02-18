import { createClient } from "@supabase/supabase-js";

// Use Service Role Key for Backend Logic (Bypasses RLS)
// Ensure SUPABASE_SERVICE_ROLE_KEY is in .env.local
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    // 1. Generate a random 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    // 2. Set expiration (2 minutes from now)
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000).toISOString();

    // 3. Upsert into database
    const { error } = await supabaseAdmin.from("verification_codes").upsert(
      {
        phone,
        code,
        expires_at: expiresAt,
        attempts: 0,
      },
      { onConflict: "phone" },
    );

    if (error) throw error;

    // 4. Send SMS (Simulated)
    // Production: Call Twilio/SSLWireless API here
    console.log(`[BACKEND-LOG] OTP for ${phone}: ${code}`);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("OTP Send Error:", error);
    return res.status(500).json({ error: "Failed to process request" });
  }
}
