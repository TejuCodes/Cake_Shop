<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cake_shop"; // Change to your database name

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get user email from query parameters
$useremail = isset($_GET["useremail"]) ? $conn->real_escape_string($_GET["useremail"]) : null;

if (!$useremail) {
    echo json_encode(["error" => "User email is required"]);
    exit();
}

// Fetch orders for the user
$sql = "SELECT * FROM orders WHERE useremail = '$useremail'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
    echo json_encode(["success" => true, "orders" => $orders]);
} else {
    echo json_encode(["success" => false, "message" => "No orders found"]);
}

$conn->close();
?>