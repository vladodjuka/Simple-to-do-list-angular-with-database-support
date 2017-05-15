<?php
include "connection.php";
$postdata = file_get_contents("php://input");
$jsonData= json_decode($postdata, true);

 for ($i=0; $i <count($jsonData); $i++){
 	echo "2";

 	$completed = $jsonData[$i]["completed"];

 	if($completed == 1){
 		$completed = 1;
 	}
 	else{
 		$completed = 0;
 	}

 	$stmt = $connection->prepare("INSERT INTO Task (name, completed, description) values(?, ?, ?)");

 	$stmt->bind_param("sis", $jsonData[$i]["name"], $completed, $jsonData[$i]["description"]);

 	$stmt->execute();

 }

mysqli_close($connection);
?>