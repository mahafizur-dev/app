import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone, code } = req.body;

  if (!phone || !code) {
    return res.status(400).json({ error: "Phone and code are required" });
  }

  try {
    // 1. Fetch the record
    const { data, error } = await supabaseAdmin
      .from("verification_codes")
      .select("*")
      .eq("phone", phone)
      .single();

    if (error || !data) {
      return res.status(400).json({ error: "Invalid request or code expired" });
    }

    const { code: serverCode, expires_at, attempts } = data;

    // 2. Check Expiration
    if (new Date(expires_at) < new Date()) {
      return res
        .status(400)
        .json({ error: "Code expired. Please request a new one." });
    }

    // 3. Check Max Attempts
    if (attempts >= 3) {
      return res
        .status(429)
        .json({ error: "Too many attempts. Please request a new code." });
    }

    // 4. Validate Code
    if (serverCode !== code) {
      await supabaseAdmin
        .from("verification_codes")
        .update({ attempts: attempts + 1 })
        .eq("phone", phone);

      return res.status(400).json({ error: "Invalid code" });
    }

    // 5. Success: Delete the used code
    await supabaseAdmin.from("verification_codes").delete().eq("phone", phone);

    return res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error("OTP Verify Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
