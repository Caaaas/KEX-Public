<?php
$root = $_SERVER['DOCUMENT_ROOT'];

$kth_api_key = '?api_key=[ACTUAL API KEY HERE WITHOUT BRACKETS]';
$google_api_key = '[ACTUAL API KEY HERE WITHOUT BRACKETS]';

function get_course_info($course)
{
	$url = 'https://www.kth.se/api/schema/v2/course/';
    // Hardcoded dates. Remove all occurances of $startTime, $endTime and $time to make it search from todays date, and 1 week forward.
	$startTime = "startTime=" . "2018-06-04";
	$endTime = "endTime=" . "2018-08-31";

	$time = "?" . $startTime . "&" . $endTime;

	$course_url = $url . $course . $time;

	return curl_get_json($course_url);
}

function get_room_exists($room)
{
	$url = 'https://www.kth.se/api/places/v3/room/name/';
	global $kth_api_key;

	$room_url = $url . $room . $kth_api_key;

	return curl_get_json($room_url);
}

function input_to_info($input)
{
	$course_info = get_course_info($input);

	if ($course_info === NULL)
	{
		$room_info = get_room_exists($input);

		if (count($room_info) == 0)
		{
			return NULL;
		}
		else
		{
			$return_array = array();
			$return_array[0] = "room";
			$return_array[1] = array();
			$return_array[1]["locations"] = [$input];

			return $return_array;
		}
	}
	else
	{
		$return_array = [2];
		$return_array[0] = "course";

		$return_array[1] = $course_info;

		return $return_array;
	}
}

function curl_get_json($url)
{
	$url = str_replace(' ', '%20', $url);
	$ch = curl_init();

	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL, $url);

	$result = curl_exec($ch);

	if (curl_errno($ch)) {
		print curl_error($ch);
	}

	curl_close($ch);

	return json_decode($result, true);
}