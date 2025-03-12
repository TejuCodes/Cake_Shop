<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
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

if (isset($data["useremail"], $data["cake_name"], $data["cake_url"], $data["cake_price"], $data["cake_quan"], $data["address"])) {
    $useremail = $conn->real_escape_string($data["useremail"]);
    $cake_name = $conn->real_escape_string($data["cake_name"]);
    $cake_url = $conn->real_escape_string($data["cake_url"]);
    $cake_price = (float) $data["cake_price"];
    $cake_quan = (int) $data["cake_quan"];
    $address = $conn->real_escape_string($data["address"]);

    $sql = "INSERT INTO orders (useremail, cake_name, cake_url, cake_price, cake_quan, address) 
            VALUES ('$useremail', '$cake_name', '$cake_url', '$cake_price', '$cake_quan', '$address')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => "Order placed successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Invalid input data"]);
}

$conn->close();
?>
