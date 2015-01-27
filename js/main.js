// CLICKS
$('#parse_btn').click( function() {
	parseUrl(document.getElementById("http_https").innerHTML+document.getElementById("parse_url").value);
});

$(".dropdown-menu li a").click(function(){
	$(this).parents(".btn-group").find('.selection').text($(this).text());
	$(this).parents(".btn-group").find('.selection').val($(this).text());
});

// /CLICKS

function parseUrl(url){
	doRequest(url,'GET','','');
}

function doRequest(url, method, header, body){
	$.ajax({
		url: "http://localhost:8080",
		context: document.body,
		type: "POST",
		data: '{"Method":"'+method+'","URL":"'+url+'","Header":{'+header+'},"body":"'+body+'"}'
	}).done(function(response) {
		console.log("Sending response to be printed...");
		printResultsParse(response);
	});
}

function printResultsParse(json){
	var objJson = JSON.parse(json);

	var table = document.getElementById("parse_results");
	var header = table.createTHead();
	var headerRow = header.insertRow(0);
	/*	
		for (i = 0; i < Object.keys(objJson).length; i++){
		var headerCell = headerRow.insertCell(i);
		headerCell.innerHTML = Object.keys(objJson)[i];
		}
		*/

	elements = parseHTML(objJson.Body, "a");

	for (i = 0; i < elements.length; i++){
		var row = table.insertRow(i);
		var cell = row.insertCell(0);
		cell.innerHTML = elements[i].innerHTML;
		var cell = row.insertCell(0);
		cell.innerHTML = elements[i].href;
	}
}

function parseHTML(html, tag){
	elements = $(html).find(tag);
	console.log(elements);
	// If tag a, fix the hrefs to get full references
	if (tag == "a"){
		for (i = 0; i < elements.length; i++){
			if (elements[i].host == ""){
				console.log(elements[i]);
				// TODO Fix the uncompleted href !!!
				elements[i].href = document.getElementById("parse_url").value+"/"+elements[i].attributes.href.value;
				console.log(elements[i].href);
			}
		}
	}
	return elements;
}
