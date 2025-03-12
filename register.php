<?php
// Include the database connection file
include 'db.php';

// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Decode the JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate input data
if (!isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Name, email, and password are required"]);
    exit();
}

$name = $data['name'];
$email = $data['email'];
$password = $data['password'];

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Invalid email format"]);
    exit();
}

// Hash the password
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

// Use prepared statements to prevent SQL injection
$sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["message" => "Database error: " . $conn->error]);
    exit();
}

$stmt->bind_param("sss", $name, $email, $passwordHash);

if ($stmt->execute()) {
    // Registration successful
    echo json_encode(["message" => "Registration successful"]);
} else {
    // Registration failed
    http_response_code(500); // Internal Server Error
    echo json_encode(["message" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>