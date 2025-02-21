<?php
require 'vendor/autoload.php'; // Asegúrate de incluir PhpSpreadsheet

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

// Datos del formulario
$nombre = isset($_POST["nombre"]) ? trim($_POST["nombre"]) : "";
$email = isset($_POST["email"]) ? trim($_POST["email"]) : "";

if (empty($nombre) || empty($email)) {
    echo json_encode(["status" => "error", "message" => "Todos los campos son obligatorios."]);
    exit;
}

// Crear archivo Excel
$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();
$sheet->setCellValue('A1', 'Nombre');
$sheet->setCellValue('B1', 'Email');
$sheet->setCellValue('A2', $nombre);
$sheet->setCellValue('B2', $email);

// Guardar Excel en el servidor
$archivoExcel = "datos.xlsx";
$writer = new Xlsx($spreadsheet);
$writer->save($archivoExcel);

// Enviar email con el Excel adjunto
$para = "destinatario@correo.com"; // Cambia esto por tu correo
$asunto = "Nuevo formulario recibido";
$mensaje = "Adjunto el archivo con los datos del formulario.";

$boundary = md5(time()); // Para manejar adjuntos en el email
$headers = "From: remitente@correo.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// Cuerpo del email
$cuerpo = "--$boundary\r\n";
$cuerpo .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
$cuerpo .= $mensaje . "\r\n\r\n";

// Adjuntar el archivo
$contenido = file_get_contents($archivoExcel);
$contenido = chunk_split(base64_encode($contenido));

$cuerpo .= "--$boundary\r\n";
$cuerpo .= "Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; name=\"$archivoExcel\"\r\n";
$cuerpo .= "Content-Transfer-Encoding: base64\r\n";
$cuerpo .= "Content-Disposition: attachment; filename=\"$archivoExcel\"\r\n\r\n";
$cuerpo .= $contenido . "\r\n\r\n";
$cuerpo .= "--$boundary--";

// Enviar email
if (mail($para, $asunto, $cuerpo, $headers)) {
    echo json_encode(["status" => "success", "message" => "Formulario enviado con éxito."]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al enviar el correo."]);
}
?>
