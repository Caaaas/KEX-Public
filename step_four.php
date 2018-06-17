<?php
$root = $_SERVER['DOCUMENT_ROOT'];
require_once $root . '/general/functions.php';
$return_array = array(2);
$return_array[0] = false;
$return_array[1] = false;

if (isset($_POST["one"]) && isset($_POST["two"]))
{
	$new_array = array();
	if ($_POST["one"] !== null)
	{
		$return_array[0] = get_room_exists($_POST["one"]);

		$new_array["start"]["name"] = $return_array[0]["name"];
		$new_array["start"]["streetAddress"] = $return_array[0]["streetAddress"];
		$new_array["start"]["streetNumber"] = $return_array[0]["streetNumber"];
		$new_array["start"]["city"] = $return_array[0]["city"];
		$new_array["start"]["floor"] = $return_array[0]["floor"];
	}
	if ($_POST["two"] !== null && $_POST["two"] !== "" )
	{
		$return_array[1] = get_room_exists($_POST["two"]);

		$new_array["end"]["name"] = $return_array[1]["name"];
		$new_array["end"]["streetAddress"] = $return_array[1]["streetAddress"];
		$new_array["end"]["streetNumber"] = $return_array[1]["streetNumber"];
		$new_array["end"]["city"] = $return_array[1]["city"];
		$new_array["end"]["floor"] = $return_array[1]["floor"];
	}

	global $google_api_key;
	$new_array["api_key"] = $google_api_key;

	echo json_encode($new_array);
}