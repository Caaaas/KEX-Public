<?php
$root = $_SERVER['DOCUMENT_ROOT'];
require_once $root . '/general/functions.php';
$return_array = array(3);
$return_array[0] = false;
$return_array[1] = false;
$return_array[2] = false;

if (isset($_POST["one"]) && empty($_POST["one"]))
{
	$return_array[1] = "Du måste ange en kurskod eller en sal.";
	$return_array[0] = true;
}

else if (isset($_POST["one"]))
{
	$one = input_to_info($_POST["one"]);
	if ($one === NULL)
	{
		$return_array[1] = "Det där är varken en giltig kurskod eller sal.";
		$return_array[0] = true;
	}
}
if (!empty($_POST["two"]))
{
	$two = input_to_info($_POST["two"]);
	if ($two === NULL)
	{
		$return_array[2] = "Det där är varken en giltig kurskod eller sal.";
		$return_array[0] = true;
	}
}
else
	$two = null;

if ($return_array[0] === false)
{
	if ($one[0] == "course")
	{
		if (count($one[1]["entries"]) == 0)
		{
			$return_array[0] = true;
			$return_array[1] = "Inga schemahändelser hittades för kurskoden idag.";
		}
		else if (count($one[1]["entries"]) > 1)
		{
			$one[0] = "events";
			$one[1] = addEventsToArray($one[1]["entries"]);
		}
		else if (count($one[1]["entries"]) == 1)
		{
			$one[0] = "rooms";
			$one[1] = addEvent($one[1]["entries"][0]);
		}
	}
	elseif ($one[0] == "room")
	{
		$return_array[1] = $one;
	}

	if ($two[0] == "course")
	{
		if (count($two[1]["entries"]) == 0)
		{
			$return_array[0] = true;
			$two = "Inga schemahändelser hittades för kurskoden idag.";
		}
		else if (count($two[1]["entries"]) > 1)
		{
			$two[0] = "events";
			$two[1] = addEventsToArray($two[1]["entries"]);
		}
		else if (count($two[1]["entries"]) == 1)
		{
			$two[0] = "rooms";
			$two[1] = addEvent($two[1]["entries"][0]);
		}
	}
	elseif ($two[0] == "room")
	{
		$return_array[2] = $two;
	}

	if (($one[0] == "events" || $two[0] == "events") && $return_array[0] === false)
	{
		$return_array[0] = 2;
	}
	else if (($one[0] == "rooms" || $two[0] == "rooms") && $return_array[0] === false)
	{
		$return_array[0] = 3;
	}
	else
	{
		$return_array[0] = 4;
	}

	$return_array[1] = $one;
	$return_array[2] = $two;
}

echo json_encode($return_array);

function addEventsToArray($events)
{
	$returnArr = array();
	foreach ($events as $event)
	{
		$returnArr[] = addEvent($event);
	}
	return $returnArr;
}

function addEvent($event)
{
	$arr = array();
	$arr["title"] = $event["title"];
	$arr["start"] = $event["start"];
	$arr["end"] = $event["end"];

	$split = explode("/course/", $event["url"]);

	$arr["url"] = $split[1];
	$arr["locations"] = array();

	foreach ($event["locations"] as $location)
	{
		if (!in_array($location["name"], $arr["locations"]))
		{
			$arr["locations"][] = $location["name"];
		}
	}
	return $arr;
}