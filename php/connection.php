<?php
$host="autoelektronikame.ipagemysql.com";
$username="todo";
$password="todolist1";
$database_name="todolist";

$connection = new mysqli($host, $username, $password, $database_name);

if($connection->connect_error){
echo "Error";
	die("Something Is Wrong");
}
?>