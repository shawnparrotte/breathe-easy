//set timer to global scope
var timer;

//main object
var breathObject = {
  in_out: "in",
  ugh_math: 0,
  currentPercent: 0,
  //init function sets the dimentions of all the objects
  init: function(){
    //create variables for containmentBar dimentions
    var c_left = ($(window).width() * .25) / 2,
        c_width = ($(window).width() * .75),
        c_height = ($(window).height() * .9);
    //apply dimentions to containmentBar
    $("#containmentBar").css({
      "width": c_width,
      "left": c_left,
      "top": c_height
    })
    //apply dimentions to timeNote
    $("#timeNote").css("left", c_left);
    //create variables for breatheBubble dimentions
    var b_left = (($(window).width() / 2) - 50),
        b_height = ($(window).height() * .25);
    //apply dimentions to breatheBubble
    $("#breatheBubble").css({
      "left": b_left,
      "top": b_height
    })
  },
  //breatheStart function changes the various parameters of the breath bubble
  breatheStart: function(time){
    //start set interval
    timer = setInterval(function(){
      //this is how far the bubble will expand
      var b_expand = ($(window).height() * .9 / 1.15) + "px";
      //breathe in
      if(breathObject.in_out === "in"){
        $("#breatheBubble").css("background-color", "#FCD933");
        $("#breatheBubble").height(b_expand);
        $("#breatheBubble").width(b_expand);
        breathObject.in_out = "out";
      //breathe out
      } else if(breathObject.in_out === "out"){
        $("#breatheBubble").css("background-color", "#FCA941");
        $("#breatheBubble").height("40px");
        $("#breatheBubble").width("40px");
        breathObject.in_out = "in";
      }
    //done set interval
    },time)
  }
}

//scrollButton drag/stop function
$("#scrollButton").draggable({
  axis: "x",
  containment: "parent",
  drag: function(event, ui){
    //ugh_math equals the scale of the containmentBar to go from approx 3000 to 8000
    breathObject.ugh_math = (((ui.offset.left - (($(window).width() * .25) / 2)) / $("#containmentBar").width()) * 5000) + 3000;
    //ugh_sec equals ugh_math in seconds, time creates the transition times for webkit
    var ugh_sec = breathObject.ugh_math / 1000,
        time = "height "+ ugh_sec +"s, width "+ ugh_sec +"s, background-color " + ugh_sec + "s";
    //change transition times
    $("#breatheBubble").css({
      "-webkit-transition": time,
      "transition": time
    });
    //change timeNote h3
    $("#timeNote").html("<h3>"+ugh_sec.toFixed(3)+"s</h3>")
  },
  stop: function(event, ui){
    //grab currentPercent of the button on the bar -> this is for window resizing
    breathObject.currentPercent = parseInt($("#scrollButton").css("left"), 10) / $("#containmentBar").width();
    //clearinterval
    clearInterval(timer);
    //restart with new values
    breathObject.breatheStart(breathObject.ugh_math);
  }
});

//window resize
$(window).resize(function(){
  //re-init dimentions
  breathObject.init();
  //keep scrollButton within the same position as the window is resized
  var move = $("#containmentBar").width() * breathObject.currentPercent;
  //move it!
  $("#scrollButton").css("left", move);
});

$(document).ready(function(){
  breathObject.init();
  breathObject.breatheStart(3006);
});
