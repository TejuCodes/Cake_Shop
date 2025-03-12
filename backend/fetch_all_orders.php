<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cake_shop";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Fetch all orders
$sql = "SELECT * FROM orders";
$result = $conn->query($sql);

if ($result === false) {
    echo json_encode(["success" => false, "error" => $conn->error]);
    exit();
}

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

if (count($orders) > 0) {
    echo json_encode(["success" => true, "orders" => $orders]);
} else {
    echo json_encode(["success" => false, "message" => "No orders found"]);
}

$conn->close();
?>
