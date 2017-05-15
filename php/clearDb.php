<?php
include "connection.php";

$sql = "DELETE from Task where id>0";
$result = $connection->query($sql);

?>