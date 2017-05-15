<?php
include "connection.php";

$sql = "SELECT id, name, description, completed from Task";
$result = $connection->query($sql);

$emparray=[];
while ($row = mysqli_fetch_assoc($result)){   
$emparray[] = $row;
}

$json = json_encode ( $emparray );
echo $json;
mysqli_close($connection);
?>