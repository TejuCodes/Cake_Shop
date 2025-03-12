<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "cake_shop");

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Database connection failed"]));
}

$sql = "SELECT id, name, email, profile_pic FROM users"; // Add profile_pic column
$result = $conn->query($sql);

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode(["success" => true, "users" => $users]);
?>
