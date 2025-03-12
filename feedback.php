<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cake_shop";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data["name"], $data["email"], $data["message"])) {
    $name = $conn->real_escape_string($data["name"]);
    $email = $conn->real_escape_string($data["email"]);
    $message = $conn->real_escape_string($data["message"]);

    $sql = "INSERT INTO feedback (name, email, message) 
            VALUES ('$name', '$email', '$message')";

    if ($conn->query($sql)) {
        echo json_encode(["success" => "Feedback submitted successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Invalid input data"]);
}

$conn->close();
?>