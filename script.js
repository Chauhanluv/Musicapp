let folder = "songs/";

let currentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

const playMusic = (track, pause = false) => {
   
    
    currentSong.src = `${folder}` + track
    if (!pause) {
        currentSong.play()
        play.src = "img/pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = track.split('/').slice(-1);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}


async function getSongs() {
    currFolder = folder;
    let a = await fetch(`${folder}`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
   
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }

    Array.from(document.querySelectorAll('.cards')).forEach(e => {
        e.addEventListener('click', async () => {


            let parag = e.querySelector('.para').textContent;
            let link = parag.replace(/\s+/g, '')
            let currFolder = folder + link;
            // console.log(currFolder)
            
            let a = await fetch(currFolder)
            let response = await a.text();
            

            let div = document.createElement("div")
            div.innerHTML = response;
            let as = div.getElementsByTagName("a")
            songs = []

            for (let index = 0; index < as.length; index++) {
                const element = as[index];
                if (element.href.endsWith(".mp3")) {
                    let link1= element.href.split("/").slice(-1);
                    
                    console.log(link1)
                    songs.push(link1)
                }

                
            }
            console.log(songs)
             let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
            songUL.innerHTML = ""
            for (const song of songs) {
                songUL.innerHTML = songUL.innerHTML + `<li>
           <div class="playn">
        
            <div class="info">
            
            ${song}
           
            
            </div>
            <div class="playnow">
             <img src="./img/play.svg" alt="">
           </div>
        
           </div>
         </li>`;
         
        }
        Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
            e.addEventListener("click", element => {
                playMusic(`${link}`+"/"+e.querySelector(".info").textContent.trim())
        
            })
        })
    })
})
            
         
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", element => {
        playMusic(e.querySelector(".info").textContent.trim())

    })
})
        
        return songs
    }
    getSongs()

    




async function main() {
    // Attach an event listener to play, next and previous
     play.addEventListener("click", () => {
        if (currentSong.paused) {
            play.src = "./img/pause.svg"
            currentSong.play()
        }
        else {
            currentSong.pause()
            play.src = "./img/play.svg"
        }
    })

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    // Add an event listener to previous
    previous.addEventListener("click", () => {
        currentSong.pause()
        console.log("Previous clicked")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    // Add an event listener to next
    next.addEventListener("click", () => {
        currentSong.pause()
        console.log("Next clicked")

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

    document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, "/ 100")
        currentSong.volume = parseInt(e.target.value) / 100
        if (currentSong.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
        }
    })
    document.querySelector(".nav").getElementsByTagName("img")[0].addEventListener("click", (e) => {
        document.querySelector(".leftbox").style = "display:block";

    })
    document.querySelector(".above").getElementsByTagName("img")[0].addEventListener("click", (e) => {
        document.querySelector(".leftbox").style = "display:none";

    })

}


main()
