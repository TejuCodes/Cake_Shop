<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"));

if (isset($data->email)) {
    $name = $data->name;
    $password = !empty($data->password) ? password_hash($data->password, PASSWORD_BCRYPT) : null;
    $profile_img = $data->profile_img;
    $email = $data->email;

    if ($password) {
        $query = "UPDATE users SET name='$name', password='$password', profile_img='$profile_img' WHERE email='$email'";
    } else {
        $query = "UPDATE users SET name='$name', profile_img='$profile_img' WHERE email='$email'";
    }

    if ($conn->query($query)) {
        echo json_encode(["status" => "success", "message" => "Profile updated!", "profile_img" => $profile_img]);
    } else {
        echo json_encode(["status" => "error", "message" => "Update failed."]);
    }
}
?>
