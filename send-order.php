<?php
// ── CORS ──────────────────────────────────────────────────────────────────────
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method not allowed']));
}

// ── Input ─────────────────────────────────────────────────────────────────────
$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data['html'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Fehlender HTML-Inhalt']);
    exit;
}

$html         = $data['html'];
$businessName = $data['businessName'] ?? 'Unbekannt';
$rawName      = $data['filename']     ?? $businessName;
$filename     = preg_replace('/[^a-z0-9_-]/i', '-', $rawName) . '.html';

// ── Lead-Daten auslesen ───────────────────────────────────────────────────────
// Alle Felder werden von SiteGen (index.html → doOrder()) befüllt.
// Pflichtfelder: businessName, niche, template
// Optionale Felder: salesContact, salesCallback, salesNotes
$lead = $data['lead'] ?? [];

$l_name      = trim($lead['businessName']  ?? $businessName);
$l_niche     = trim($lead['niche']         ?? '—');
$l_phone     = trim($lead['phone']         ?? '—');
$l_email     = trim($lead['email']         ?? '—');
$l_address   = trim($lead['address']       ?? '—');
$l_sourceUrl = trim($lead['sourceUrl']     ?? '—');
$l_template  = trim($lead['template']      ?? '—');
$l_primary   = trim($lead['primaryColor']  ?? '—');
$l_accent    = trim($lead['accentColor']   ?? '—');
$l_contact   = trim($lead['salesContact']  ?? '');
$l_interest  = trim($lead['salesInterest'] ?? 'mittel');
$l_callback  = trim($lead['salesCallback'] ?? '');
$l_notes     = trim($lead['salesNotes']    ?? '');
$l_sentAt    = trim($lead['sentAt']        ?? date('d.m.Y H:i'));

// Interesse-Emoji
$interestMap  = ['niedrig' => '🔴 NIEDRIG', 'mittel' => '🟡 MITTEL', 'hoch' => '🟢 HOCH'];
$l_interestFmt = $interestMap[$l_interest] ?? strtoupper($l_interest);

// Rückruf formatieren (ISO → DE)
$l_callbackFmt = $l_callback
    ? date('d.m.Y', strtotime($l_callback))
    : '—';

// ── Mail ──────────────────────────────────────────────────────────────────────
$to       = 'site-gen@fixwithfoxy.com';
$subject  = '=?UTF-8?B?' . base64_encode("Neue Bestellung: {$l_name} [{$l_interestFmt}]") . '?=';
$boundary = '----=_Part_' . md5(uniqid('', true));

$headers  = "From: noreply@fixwithfoxy.com\r\n";
$headers .= "Reply-To: noreply@fixwithfoxy.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";
$headers .= "X-Mailer: SiteGen\r\n";

// ── E-Mail-Body (Plain Text) ──────────────────────────────────────────────────
$sep  = str_repeat('─', 50);

$bodyText  = "═══════════════════════════════════════════════════\r\n";
$bodyText .= "  NEUE WEBSITE-BESTELLUNG — SiteGen\r\n";
$bodyText .= "═══════════════════════════════════════════════════\r\n\r\n";

$bodyText .= "KUNDE\r\n{$sep}\r\n";
$bodyText .= "Unternehmensname : {$l_name}\r\n";
$bodyText .= "Branche          : {$l_niche}\r\n";
if ($l_contact) {
$bodyText .= "Kontaktperson    : {$l_contact}\r\n";
}
$bodyText .= "Telefon          : {$l_phone}\r\n";
$bodyText .= "E-Mail           : {$l_email}\r\n";
$bodyText .= "Adresse          : {$l_address}\r\n";
$bodyText .= "Website/Instagram: {$l_sourceUrl}\r\n\r\n";

$bodyText .= "WEBSITE\r\n{$sep}\r\n";
$bodyText .= "Template         : {$l_template}\r\n";
$bodyText .= "Primärfarbe      : {$l_primary}\r\n";
$bodyText .= "Akzentfarbe      : {$l_accent}\r\n";
$bodyText .= "Datei            : {$filename}\r\n\r\n";

$bodyText .= "VERTRIEB\r\n{$sep}\r\n";
$bodyText .= "Interesse        : {$l_interestFmt}\r\n";
$bodyText .= "Rückruf          : {$l_callbackFmt}\r\n";
$bodyText .= "Notizen          :\r\n";
$bodyText .= $l_notes
    ? "  " . str_replace("\n", "\n  ", $l_notes) . "\r\n"
    : "  —\r\n";
$bodyText .= "\r\nÜbermittelt      : {$l_sentAt} Uhr\r\n";
$bodyText .= "═══════════════════════════════════════════════════\r\n\r\n";
$bodyText .= "Die fertige Website ist als HTML-Anhang beigefügt.\r\n";

// ── Multipart-Body zusammenbauen ─────────────────────────────────────────────
$body  = "--{$boundary}\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$body .= $bodyText;

$body .= "--{$boundary}\r\n";
$body .= "Content-Type: text/html; name=\"{$filename}\"\r\n";
$body .= "Content-Disposition: attachment; filename=\"{$filename}\"\r\n";
$body .= "Content-Transfer-Encoding: base64\r\n\r\n";
$body .= chunk_split(base64_encode($html)) . "\r\n";
$body .= "--{$boundary}--";

// ── Send ──────────────────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=UTF-8');

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'E-Mail konnte nicht gesendet werden. Serverlog prüfen.']);
}

/*
 * ── SERVER-SEITIGE ANPASSUNGEN (Dokumentation) ────────────────────────────────
 *
 * Diese Datei empfängt jetzt ein erweitertes JSON-Payload von SiteGen:
 *
 *   {
 *     "html":         "<vollständiges HTML-Dokument>",
 *     "businessName": "Name des Unternehmens",
 *     "filename":     "dateiname-ohne-extension",
 *     "lead": {
 *       "businessName":  "Name des Unternehmens",
 *       "niche":         "Branche (z.B. Frisör, Barber)",
 *       "phone":         "+49 ...",
 *       "email":         "...",
 *       "address":       "...",
 *       "sourceUrl":     "https://...",
 *       "template":      "A" | "B" | "C" | "D",
 *       "primaryColor":  "#rrggbb",
 *       "accentColor":   "#rrggbb",
 *       "salesContact":  "Kontaktperson (optional)",
 *       "salesInterest": "niedrig" | "mittel" | "hoch",
 *       "salesCallback": "YYYY-MM-DD" (optional),
 *       "salesNotes":    "Freitext-Notizen (optional)",
 *       "sentAt":        "DD.MM.YYYY HH:MM"
 *     }
 *   }
 *
 * Mögliche Erweiterungen:
 *
 * 1. CRM-Integration (z.B. HubSpot, Pipedrive):
 *    → $lead-Daten per cURL-Request an CRM-API senden, bevor/nachdem Mail verschickt wird.
 *    → Eintrag direkt als Deal mit Interesse-Level anlegen.
 *
 * 2. Google Sheets / Airtable Logging:
 *    → Per cURL POST an Google Apps Script Webhook oder Airtable REST-API.
 *    → Alle Leads automatisch in einer Tabelle sammeln.
 *
 * 3. Benachrichtigungs-Slack/Teams-Webhook:
 *    → cURL POST an Webhook-URL mit kompaktem Lead-Summary.
 *
 * 4. Lead-Priorisierung nach Interesse:
 *    → Falls $l_interest === 'hoch': separate To-Adresse oder höhere Priorität im E-Mail-Header setzen.
 *    → X-Priority: 1 (Highest) im $headers-String ergänzen.
 *
 * ──────────────────────────────────────────────────────────────────────────────
 */
