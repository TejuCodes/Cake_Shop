<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cake_shop";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Calculate total profit
$sql = "SELECT SUM(cake_price * cake_quan) AS total_profit FROM orders";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(["total_profit" => $row["total_profit"]]);
} else {
    echo json_encode(["total_profit" => 0]);
}

$conn->close();
?>