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

// ── Mail ──────────────────────────────────────────────────────────────────────
$to       = 'site-gen@fixwithfoxy.com';
$subject  = '=?UTF-8?B?' . base64_encode('Neue Bestellung: ' . $businessName) . '?=';
$boundary = '----=_Part_' . md5(uniqid('', true));

$headers  = "From: noreply@fixwithfoxy.com\r\n";
$headers .= "Reply-To: noreply@fixwithfoxy.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";
$headers .= "X-Mailer: SiteGen\r\n";

$body  = "--{$boundary}\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$body .= "Neue Website-Bestellung eingegangen.\r\n\r\n";
$body .= "Kunde:     {$businessName}\r\n";
$body .= "Datei:     {$filename}\r\n";
$body .= "Zeitstempel: " . date('d.m.Y H:i') . " Uhr\r\n\r\n";
$body .= "Die fertige Website ist als Anhang beigefügt.\r\n";
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
