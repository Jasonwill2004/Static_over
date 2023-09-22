var strikebutton = document.querySelector("#strike")
var resetbutton = document.querySelector("#reset")

var team1score_tag = document.getElementById("score-team1")
var team2score_tag = document.getElementById("score-team2")

var team1wicket_tag = document.getElementById("wicket-team1")
var team2wicket_tag = document.getElementById("wicket-team2")

var strikeAudio = new Audio("http://bit.ly/so-ball-hit")
var gameoverAudio = new Audio("http://bit.ly/so-crowd-cheer")

var team1Score = 0
var team2Score = 0
var team1Wickets = 0
var team2Wickets = 0
var team1BallsFaced = 0
var team2BallsFaced = 0
var turn = 1

var possibleOutcomes = [0,1,2,3,4,6,"w"];


strikebutton.addEventListener("click",strikebuttonclicked)

function strikebuttonclicked(){
    strikeAudio.pause()
    strikeAudio.currentTime = 0
    strikeAudio.play()

    var randomness = Math.random()
    var random1 = randomness*possibleOutcomes.length
    var randomIndex = Math.floor(random1)
    console.log("randomindex:",randomIndex)
    var randomValue = possibleOutcomes[randomIndex]
    console.log("randomvalue:", randomValue)

    if(turn==2){
        team2BallsFaced++
        var ball2 = document.querySelector(`#team-2-super-over div:nth-child(${team2BallsFaced})`)
        ball2.innerHTML = randomValue

        if(randomValue=="w"){
            team2Wickets++
        } else{
            team2Score+=randomValue
        }

        if(team2Score>team1Score || team2Wickets==2 || team2BallsFaced==6){
            turn=3
            setTimeout(()=>{
             gameover()
            },1000)
            
        }
        updateScore()

    }

    if(turn==1){
        team1BallsFaced++
        var ball = document.querySelector(`#team-1-superover div:nth-child(${team1BallsFaced})`)
        ball.innerHTML = randomValue

        if(randomValue=="w"){
            team1Wickets++
        } else{
            team1Score+=randomValue
        }

        if(team1BallsFaced==6 || team1Wickets==2){
            turn=2
        }
        
        updateScore()
    }
    
}

function updateScore(){
    team1score_tag.innerHTML = team1Score
    team1wicket_tag.innerHTML = team1Wickets
    team2score_tag.innerHTML = team2Score
    team2wicket_tag.innerHTML = team2Wickets

}
function gameover(){
    gameoverAudio.pause()
    gameoverAudio.currentTime=0
    gameoverAudio.play()
    if(team1Score>team2Score){
        alert("INDIA WINS")
    } else if (team1Score<team2Score){
        alert("PAK WINS")
    } else{
        alert("It's a tie")
    }
    document.querySelectorAll(".ball").forEach(kalvium=>{
        if(kalvium.innerHTML==""){
            kalvium.innerHTML="X"
            kalvium.style.backgroundColor = "Red"
            kalvium.style.color="white"
        }
    })
}

resetbutton.addEventListener("click", resetfunction)
function resetfunction(){
    window.location.reload()
}



