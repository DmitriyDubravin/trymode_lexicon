<?php

include('connect.php');


// PARSE 'FETCH' DATA
$post = json_decode(file_get_contents('php://input'), true);


// GET ALL CATEGORIES
if($post["lexicon"] === "get_categories") {
	$query = mysqli_query($db, "SELECT DISTINCT category FROM lexicon");
	$row = mysqli_fetch_array($query, MYSQLI_ASSOC);
	if($row) {
		$categories = array();
		do {
			$categories[] = $row['category'];
		}
		while($row = mysqli_fetch_array($query, MYSQLI_ASSOC));
	}
	echo json_encode($categories);
}



// GET DATA
if($post["lexicon"] === "get_data") {
	if($post["category"] === "all") {
		$query = mysqli_query($db, "SELECT * FROM lexicon");
	} else {
		$category = $post["category"];
		$query = mysqli_query($db, "SELECT * FROM lexicon WHERE category = '$category'");
	}
	$row = mysqli_fetch_array($query, MYSQLI_ASSOC);
	if($row) {
		$data = array();
		do {
			$data[] = array(
				"id" => $row['id'],
				"category" => $row['category'],
				"term" => $row['term'],
				"definition" => $row['definition']
			);
		}
		while($row = mysqli_fetch_array($query, MYSQLI_ASSOC));
	} else {
		$data = array("error" => true);
	}
	echo json_encode($data);
}


// GET ITEM
if($post["lexicon"] === "get_item") {
	$id = $post["id"];
	$query = mysqli_query($db, "SELECT * FROM lexicon WHERE id = '$id'");
	$row = mysqli_fetch_array($query, MYSQLI_ASSOC);
	if($row) {
		$data = array();
		do {
			$data[] = array(
				"category" => $row['category'],
				"term" => $row['term'],
				"definition" => $row['definition']
			);
		}
		while($row = mysqli_fetch_array($query, MYSQLI_ASSOC));
	}
	echo json_encode($data);
}


// ADD TERM
if($post['lexicon'] === 'add_term') {
	$category = $post['category'];
	$term = $post['term'];
	$definition = $post['definition'];
	mysqli_query($db, "INSERT INTO lexicon VALUES ('', '$category', '$term', '$definition')");
	echo 'A new term has been added';
}

// EDIT TERM
if($post['lexicon'] === 'edit_term') {
	$id = $post['id'];
	$category = $post['category'];
	$term = $post['term'];
	$definition = $post['definition'];
	mysqli_query($db, "UPDATE lexicon SET category='$category', term='$term', definition='$definition'WHERE id='$id'");
	echo 'A new term has been edited';
}

// DELETE TERM
if($post['lexicon'] === 'delete_term') {
	$id = $post['id'];
	mysqli_query($db, "DELETE FROM lexicon WHERE id = '$id'");
	echo 'The term has been deleted';
}


?>