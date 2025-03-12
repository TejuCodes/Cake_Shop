<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cake_shop";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500); // Internal Server Error
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["order_id"], $data["status"])) {
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Invalid input data"]);
    exit;
}

$orderId = (int) $data["order_id"];
$status = $conn->real_escape_string($data["status"]);

// Check if status already exists
$checkSql = "SELECT * FROM delivery_status WHERE order_id = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("i", $orderId);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
    // Update existing status
    $sql = "UPDATE delivery_status SET status = ? WHERE order_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $status, $orderId);
} else {
    // Insert new status
    $sql = "INSERT INTO delivery_status (order_id, status) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $orderId, $status);
}

if ($stmt->execute()) {
    echo json_encode(["success" => "Status updated successfully"]);
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Error: " . $stmt->error]);
}

$stmt->close();
$checkStmt->close();
$conn->close();
?>