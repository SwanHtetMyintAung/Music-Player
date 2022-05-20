const playListContainerTag = document.querySelector('.playListContainer');
const audioTag = document.querySelector('.audioTag');
const currentAndTotalTimeTag = document.querySelector('.currentAndTotalTime');
const currentProgressTag = document.querySelector('.currentProgress');
const playButtonTag = document.getElementById('play')
const pauseButtonTag= document.getElementById('pause')
const prevButtonTag = document.getElementById('prev')
const nextButtonTag = document.getElementById('next')
const slider = document.querySelector('#durationSlider');
const currentPlayingMusicTag = document.querySelector('.currentPlayingMusic');



const tracks = [
    {trackId : "tracks/Afterglow.mp3" , Title : 'Afterglow'},
    {trackId : "tracks/Collide.mp3" , Title : 'Collide'},
    {trackId : "tracks/First_Times.mp3" , Title : 'First Times'},
    {trackId : "tracks/Galway_Girl.mp3" , Title : 'Girlway Girl'},
    {trackId : "tracks/I_Don't_Care.mp3" , Title : "I Don't Care"},
    {trackId : "tracks/I_See_Fire.mp3" , Title : 'I See Fire'},
    {trackId : "tracks/South_of_the_Border.mp3" , Title : 'South Of The Border'},
    {trackId : "tracks/Stop_The_Rain.mp3" , Title : 'Stope The Rain'},
    {trackId : "tracks/Visiting_Hours.mp3" , Title : 'Visiting Hours'}
];
var isPlaying = false ; 
var currentPlayingIndex = -1;

for(let i=0; i < tracks.length ;i++ ){
    const div = document.createElement('div');
    div.addEventListener('click' , ()=> {
        const trackId = tracks[i].trackId;
        audioTag.src = trackId;
        audioTag.play();
        isPlaying = true;
        currentPlayingIndex = i
        updatePlayAndPauseButton()
        playingSong(tracks[currentPlayingIndex].Title)
    })
    div.classList.add('trackItem')
    const title = tracks[i].Title;
    div.textContent = `${i+1}. ${title}`
    playListContainerTag.append(div)
}

function auto(){
    if(audioTag.currentTime === audioTag.duration ){
        currentPlayingIndex += 1 ;
        audioTag.src = tracks[currentPlayingIndex].trackId;
        audioTag.play();
        currentPlayingMusicTag.textContent = tracks[currentPlayingIndex].Title;
    }
}

function playBtn(){
    isPlaying = true ;
    audioTag.play();
    updatePlayAndPauseButton()
}
function pauseBtn(){
    isPlaying = false;
    audioTag.pause();
    updatePlayAndPauseButton()
}
function nextBtn(){
    currentPlayingIndex += 1
    audioTag.src = tracks[currentPlayingIndex].trackId;
    audioTag.play()
    playingSong(tracks[currentPlayingIndex].Title)
}
function prevBtn(){
    if(currentPlayingIndex === -1){
        currentPlayingIndex = tracks.length -1 
        audioTag.src = tracks[currentPlayingIndex].trackId
        audioTag.play()
        playingSong(tracks[currentPlayingIndex].Title)
    }else{
        currentPlayingIndex -= 1
        audioTag.src = tracks[currentPlayingIndex].trackId
        audioTag.play()
        playingSong(tracks[currentPlayingIndex].Title)
    }
}
function updatePlayAndPauseButton(){
    if(isPlaying){
        playButtonTag.classList.add('d-none')
        pauseButtonTag.classList.remove('d-none')
    }else{
        playButtonTag.classList.remove('d-none')
        pauseButtonTag.classList.add('d-none')
    }
}
function playingSong(name){
    currentPlayingMusicTag.textContent = name
}
function createMinAndSec(total){
    let min = Math.floor(total/60)
    let sec = Math.floor(total % 60)
    
    min < 10 ? min = 0 + min.toString() : ''
    sec < 10 ? sec = 0 + sec.toString() : ''

    return `${min}:${sec}`
}
const seek = () => {
    sliderPosition = slider.value
    audioTag.currentTime = sliderPosition
    audioTag.play()
    if(audioTag.src != tracks[currentPlayingIndex].trackId){
        slider.value  = 0
    }
    slider.value = audioTag.currentTime
    auto()
}

let durationText = '00:00';
audioTag.addEventListener('loadeddata' , ()=>{
    const duration = Math.floor(audioTag.duration)
    durationText = createMinAndSec(duration)
    slider.max = duration
})
audioTag.addEventListener('timeupdate' ,  ()=>{
    const currentTimeText = createMinAndSec(Math.floor(audioTag.currentTime))
    currentAndTotalTimeTag.textContent = `${currentTimeText} / ${durationText}`
    //updateCurrentProgress(Math.floor(audioTag.currentTime))
    slider.value = Math.floor(audioTag.currentTime)
    auto()
})
let cancled = false;
const updateCurrentProgress = (currentTime) => {
    
    if(!cancled){
        slider.value = currentTime
        
    }
    return;
}
slider.addEventListener('change',seek)
slider.addEventListener('click' , ()=>{
    slider.addEventListener('mouseover' , ()=>{
        cancled =  true;
    })
})