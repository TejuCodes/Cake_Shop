<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cake_shop";  

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);


if (isset($data["order_id"])) {
    $order_id = (int) $data["order_id"];

    $sql = "DELETE FROM orders WHERE id = $order_id";
    if ($conn->query($sql)) {
        echo json_encode(["success" => true, "message" => "Order deleted successfully"]);
    } else {
        echo json_encode(["error" => "Error deleting order: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Order ID is required"]);
}

$conn->close();
?>