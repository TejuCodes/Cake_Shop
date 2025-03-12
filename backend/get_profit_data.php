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

// Fetch monthly profit data
$sql = "SELECT 
            DATE_FORMAT(created_at, '%b') AS month, 
            SUM(cake_price * cake_quan) AS profit 
        FROM orders 
        GROUP BY DATE_FORMAT(created_at, '%Y-%m') 
        ORDER BY created_at ASC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $profitData = [];
    while ($row = $result->fetch_assoc()) {
        $profitData[] = $row;
    }
    echo json_encode($profitData);
} else {
    echo json_encode([]);
}

$conn->close();
?>