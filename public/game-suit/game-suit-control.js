const playerChoice=document.getElementsByClassName("img-hand");
playerChoice[0].addEventListener('click',function(){
    const game =new Game(playerChoice[0]);
    game.addHighlight().disableChoose().getResult("0");
});

playerChoice[1].addEventListener('click',function(){
    const game =new Game(playerChoice[1]);
    game.addHighlight().disableChoose().getResult("1");
});

playerChoice[2].addEventListener('click',function(){
    const game =new Game(playerChoice[2]);
    game.addHighlight().disableChoose().getResult("2");
});

//{}""

/*refresh page
remove all highlight
remove display result
*/
document.querySelector("#refresh")
.addEventListener('click', function(){
   document.querySelectorAll(".img-hand")
   .forEach(el=>el.classList.remove("highlight","disable-click"));
   document.getElementsByClassName('vs-text')[0].style.display='inline';
   document.getElementsByClassName('box-result')[0].remove();
   
})
class Game {
    constructor(playerChoice){
        this.playerChoice=playerChoice;
    }

    addHighlight(){
        this.playerChoice.classList.add("highlight")
        return this;
    }

    comChoose(){
        let random =Math.floor(Math.random()*3)
    
        switch(random){
            case 0:
                document.getElementById("c-batu").classList.add("highlight");
                break;
            case 1:
                document.getElementById("c-kertas").classList.add("highlight");
                break;
            case 2:
                document.getElementById("c-gunting").classList.add("highlight");
                break;
        }
        return random;
    }

    getResult(player){
        let result="";
        const com=this.comChoose();
        if(player==com){
            result="DRAW";
        }else if((player==0 &&com==1)||(player==1 &&com==2)||(player==2 &&com==0)){
            result="COM WIN";
        }else{result="PLAYER 1 WIN"}
        //remove VS text, create display element result & append it
        const boxResult=document.createElement("div");
        boxResult.className='box-result';
        const textResult=document.createTextNode(result);
        boxResult.appendChild(textResult);
        document.getElementsByClassName("vs-box")[0].append(boxResult);
        document.getElementsByClassName('vs-text')[0].style.display='none';
    }

    disableChoose(){
        document.querySelectorAll(".img-hand").forEach(el=>el.classList.add("disable-click"));
        return this;
    }

}