let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
//let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
//let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');

let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');




let timer;
let autoplay = 0;

let index_no = 0;
let Playing_fm = false;

//create a audio Element
let track = document.createElement('audio');


//All sfm list
let All_fm = [
   {
     name: "Kalika fm",
     path: "http://kalika-stream.softnep.com:7740/;stream.nsv&type=mp3",
   
   },
   {
     name: "kantipur fm",
     path: "http://kantipur-stream.softnep.com:7248/;stream.nsv&type=mp3",
   },
   {
     name: "radio lumbini",
     path: "http://streaming.softnep.com:8085/;stream.nsv&type=mp3",

   },
   {
     name: "Annapurna fm",
     path: "http://streaming.softnep.net:8091/;stream.nsv&type=mp3",
    
   },

   
];   


// All functions


// function load the track
function load_track(index_no){
	clearInterval(timer);
	reset_slider();

	track.src = All_fm[index_no].path;
	title.innerHTML = All_fm[index_no].name;	
	// track_image.src = All_fm[index_no].img;
    // artist.innerHTML = All_fm[index_no].singer;
    track.load();

	timer = setInterval(range_slider ,1000);
	total.innerHTML = All_fm.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);


//mute sound function
function mute_sound(){
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
 function justplay(){
 	if(Playing_fm==false){
 		playfm();

 	}else{
 		pausefm();
 	}
 }


// reset song slider
 function reset_slider(){
 	slider.value = 0;
 }

// play fm
function playfm(){
  track.play();
  Playing_fm = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause fm
function pausefm(){
	track.pause();
	Playing_fm = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// next song
function next_fm(){
	if(index_no < All_fm.length - 1){
		index_no += 1;
		load_track(index_no);
		playfm();
	}else{
		index_no = 0;
		load_track(index_no);
		playfm();

	}
}


// previous song
function previous_fm(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playfm();

	}else{
		index_no = All_fm.length;
		load_track(index_no);
		playfm();
	}
}


// change volume
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	}else{
       autoplay = 1;
       auto_play.style.background = "#FF8A65";
	}
}


function range_slider(){
	let position = 0;
        
        // update slider position
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;
	      }

       
       // function will run when the song is over
       if(track.ended){
       	 play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
           if(autoplay==1){
		       index_no += 1;
		       load_track(index_no);
		       playfm();
           }
	    }
     }