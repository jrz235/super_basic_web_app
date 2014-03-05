console.log("hello, world!");

function makeStage(w, h) {
	var stage = d3.select(".stimulus") // select id = #something; select class = .something
				  .insert("center")
				  .insert("svg") // appends to the end
				  .attr("width", w)
				  .attr("height", h);
	return stage;
}

function drawStimulus(stage, x, y, radius, fillColor) {
	var circle = stage.insert("circle")
		  			  .attr("cx", x/2)
		 			  .attr("cy", y/2)
					  .attr("r", radius)
		 			  .style("fill", fillColor)
					  .style("stroke", "lightgreen")
					  .style("stroke-width", "10");
}

function clearStimulus(stage) {
	stage.selectAll("circle")
		 .remove();
}

function makeButton(text, callBack) {
	var button = d3.select(".buttonbar")
	  			  .insert("center")
	 			  .insert("button")
	 			  .attr("type", "button")
	 			  .attr("class", "btn btn-primary btn-lg")
	 			  .text(text) // .html(<h1>hello</h1>)
	 			  .on("click", function(d) {
	 			  	console.log("clicked"); callBack();
	 			  });
}

function clearButton() {
	d3.select(".container")
	  .selectAll("button")
	  .remove();
}

function doTrial(stage, stimArray) {
	if (stimArray.length > 0) {
		var stim = stimArray.shift();
		clearStimulus(stage);
		clearButton();
		drawStimulus(stage, 600, 400, stim["radius"], stim["color"]);
		makeButton("Next Trial", function() {
			doTrial(stage, stimArray);
		});
	}
	else {
		alert("You nasty!");
	}
}

var trials = [ {"color": "blue", "radius": 40},
			   {"color": "red", "radius": 60},
			   {"color": "green", "radius": 30},
			   {"color": "purple", "radius": 70},
			   {"color": "yellow", "radius": 20},
			   {"color": "pink", "radius": 50},
			 ];

var myStage = makeStage(600, 400);
doTrial(myStage, trials);

/*
function makeStage(w, h, callBack) {
	var stage = d3.select(".stimulus") // select id = #something; select class = .something
				  .insert("center")
				  .insert("svg") // appends to the end
				  .attr("width", w)
				  .attr("height", h);
	callBack(stage);
}

function drawStimulus(stage, x, y, radius) {
	  var circle = stage.insert("circle")
		  			    .attr("cx", x/2)
		 			    .attr("cy", y/2)
					    .attr("r", radius)
		 			    .style("fill", "orange")
					    .style("stroke", "lightgreen")
					    .style("stroke-width", "10");
}

function makeButton(text) {
	d3.select(".buttonbar")
	  .insert("center")
	  .insert("button")
	  .attr("type", "button")
	  .attr("class", "btn btn-primary btn-lg")
	  .text(text); // .html(<h1>hello</h1>)
}

var myStage = makeStage(600, 400,
	function(myStage) {
		drawStimulus(myStage, 600, 400, 80);
	}
);

var myButton = makeButton("Next Trial");

d3.select(".buttonbar")
  .selectAll("button") // added All - still works?
  .on("click", function() {
  	d3.select("svg")
  	  .remove();
  	
  	makeStage(600, 400,
	function(myStage) {
		drawStimulus(myStage, 600, 400, Math.floor((Math.random()*60)+11))});

  	//d3.select(".stimulus")
  	  //.select("svg")
  	  //.insert("circle")
  	  //.attr("fill", "blue")
  });
*/
