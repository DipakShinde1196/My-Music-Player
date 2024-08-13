let songName=document.querySelector("#song-name")
let songSinger=document.querySelector("#song-singer")
let songImage=document.querySelector(".song-img")
let playPauseImg=document.querySelector("#play-pause")
let volumeRange=document.querySelector("#volume-range")
let volSvg=document.querySelector("#vol-svg")
let songRange=document.querySelector("#song-durations")
let playlistImg=document.querySelector("#playlist-img")
let playlist=document.querySelector(".playlist")
let playlistSong=document.querySelectorAll(".playlist-song")


let index=4
let playingsong=false;  
let track=document.createElement("audio")
let songs=[
    {
        name:"Ve Kamleya",
        path:"song1.mp3",
        image:"img1.jpg",
        singer:"Arjit Singh"
    },
    {
        name:"Ve Haniya",
        path:"song2.mp3",
        image:"img2.jpg",
        singer:"Jubin Nautiyal"
    },
    {
        name:"O Sajani Re",
        path:"song3.mp3",
        image:"img3.jpg",
        singer:"Arjit Singh"
    },
    {
        name:"O Mahi O Mahi",
        path:"song4.mp3",
        image:"img4.jpg",
        singer:"Arjit Singh"
    },
    {
        name:"Remix",
        path:"song5.mp3",
        image:"img5.jpg",
        singer:"All Singers Remix"
    },
    {
        name:"Mere Mehboob Mere Sanam",
        path:"song6.mp3",
        image:"img6.jpg",
        singer:"Udit Narayan"
    },
    {
        name:"Ram Siya Ram",
        path:"song7.mp3",
        image:"img7.jpg",
        singer:"Sachet Tandon"
    },
    {
        name:"Gulabi Sadi",
        path:"song8.mp3",
        image:"img8.jpg",
        singer:"Sanju Rathod"
    },{
        name:"Angaroon",
        path:"song9.mp3",
        image:"img9.jpg",
        singer:"Shreya Ghoshal"
    },{
        name:"Tujhe jeet jeet Haaru",
        path:"song10.mp3",
        image:"img10.jpg",
        singer:"Kailash Kher"
    },{
        name:"Mere Naam Tu",
        path:"song11.mp3",
        image:"img11.jpg",
        singer:"Abhay Jodhpurkar"
    },{
        name:"Shiv Tandav",
        path:"song12.mp3",
        image:"img12.jpg",
        singer:"Sachet Tondon"
    },{
        name:"Suniya Suniya Rata",
        path:"song13.mp3",
        image:"img13.jpg",
        singer:"Russ"
    },{
        name:"Jeena Sikha De",
        path:"song14.mp3",
        image:"img14.jpg",
        singer:"Arjit Singh"
    },{
        name:"Baby",
        path:"song15.mp3",
        image:"img15.jpg",
        singer:"Justin Biber"
    },{
        name:"Tum ho",
        path:"song16.mp3",
        image:"img16.jpg",
        singer:"Mohit Chauhan"
    }
]
function loadTrack(index)
{
    track.src=songs[index].path;
    songName.innerHTML=songs[index].name;
    songSinger.innerHTML=songs[index].singer;
    songImage.style.backgroundImage = `url("${songs[index].image}")`;
    volume();
    duration();
    setInterval(()=>{
        songRange.max=track.duration;
        songRange.value=track.currentTime ;
        updateTiming();
    },1000);
    track.loop=true ;
    track.load();

} 
loadTrack(index);

function playPause(){
    if(playingsong==false){
        playSong()
    }
    else{
        pauseSong()
    }
}
function playSong(){
    track.play();
    playingsong=true;
    playPauseImg.src="pause.svg"
}
function pauseSong(){
    track.pause();  
    playingsong=false;
    playPauseImg.src="play.svg"
}
function nextSong(){
    if(index<songs.length-1){
        index++;
        loadTrack(index)
        playSong()
    }else{
        index=0;
        loadTrack(index)
        playSong()
    }
}
function previousSong(){
    if(index>0){
        index--;
        loadTrack(index)
        playSong()
    }else{
        index=songs.length-1;
        loadTrack(index)
        playSong()
    }
}
function volume(){
    track.volume=volumeRange.value/100;
    document.getElementById("volume-percentage").innerText = `${volumeRange.value}%`;
    if(volumeRange.value==0){
        volSvg.src="mute.svg"
    }else{
        volSvg.src="volume.svg"
    }
}
function duration(){
    track.currentTime=songRange.value
    if(track.currentTime==songRange.max){
        index++;
        loadTrack(index)
        playSong()
    }

}
playlistImg.addEventListener("click",()=>{
playlist.classList.toggle("playlist-active")
if(playlist.classList.contains("playlist-active")){
    playlistImg.src="cross.svg"
}else{
    playlistImg.src="playlist.svg"
}

})
playlistSong.forEach((song,index)=>{
    song.addEventListener('click',()=>{
        loadTrack(index);
        playSong()
        playlist.classList.remove("playlist-active")
    })
})
function mutesound(){
    volSvg.src="mute.svg"
    track.volume=0
}
function updateTiming() {
    let currentMinutes = Math.floor(track.currentTime / 60);
    let currentSeconds = Math.floor(track.currentTime % 60);
    let durationMinutes = Math.floor(track.duration / 60);
    let durationSeconds = Math.floor(track.duration % 60);

    if (currentSeconds < 10) currentSeconds = '0' + currentSeconds;
    if (durationSeconds < 10) durationSeconds = '0' + durationSeconds;

    document.getElementById("song-timing").innerText = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
}

