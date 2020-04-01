
var diceArr=["dice1.JPG","dice2.JPG","dice3.JPG","dice4.JPG","dice5.JPG","dice6.JPG"];
playerCount=1;

var WinnersObj={
    1:0,
    2:0,
    3:0,
    4:0
}
var PlayerColorChar={
    'g':1,
    'r':2,
    'b':3,
    'y':4
}
var playerPath={
    1:['g2','g3','g4','g5','g6','g7','g8','g9','g10','g11','g12','g13','r1','r2','r3','r4','r5','r6','r7','r8','r9','r10','r11','r12','r13','b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11','b12','b13','y1','y2','y3','y4','y5','y6','y7','y8','y9','y10','y11','y12','y13','g14','g15','g16','g17','g18','w1'],
    2:['r2','r3','r4','r5','r6','r7','r8','r9','r10','r11','r12','r13','b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11','b12','b13','y1','y2','y3','y4','y5','y6','y7','y8','y9','y10','y11','y12','y13','g1','g2','g3','g4','g5','g6','g7','g8','g9','g10','g11','g12','g13','r14','r15','r16','r17','r18','w2'],
    3:['b2','b3','b4','b5','b6','b7','b8','b9','b10','b11','b12','b13','y1','y2','y3','y4','y5','y6','y7','y8','y9','y10','y11','y12','y13','g1','g2','g3','g4','g5','g6','g7','g8','g9','g10','g11','g12','g13','r1','r2','r3','r4','r5','r6','r7','r8','r9','r10','r11','r12','r13','b14','b15','b16','b17','b18','w3'],
    4:['y2','y3','y4','y5','y6','y7','y8','y9','y10','y11','y12','y13','g1','g2','g3','g4','g5','g6','g7','g8','g9','g10','g11','g12','g13','r1','r2','r3','r4','r5','r6','r7','r8','r9','r10','r11','r12','r13','b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11','b12','b13','y14','y15','y16','y17','y18','w4']    
};
var safeZone=['g2','g10','r2','r10','b2','b10','y2','y10'];

var PlayerInfoObj={
1:{
    'pg1':{status:'Active',location:'hg1'},
    'pg2':{status:'Active',location:'hg2'},
    'pg3':{status:'Active',location:'hg3'},
    'pg4':{status:'Active',location:'hg4'}
},
2:{
    'pr1':{status:'Active',location:'hr1'} ,
    'pr2': {status:'Active',location:'hr2'},
    'pr3': {status:'Active',location:'hr3'},
    'pr4': {status:'Active',location:'hr4'}
},
3:{
    'pb1': {status:'Active',location:'hb1'},
    'pb2': {status:'Active',location:'hb2'},
    'pb3': {status:'Active',location:'hb3'},
    'pb4': {status:'Active',location:'hb4'}
},
4:{
    'py1': {status:'Active',location:'hy1'},
    'py2': {status:'Active',location:'hy2'},
    'py3': {status:'Active',location:'hy3'},
    'py4': {status:'Active',location:'hy4'}
}

}
var PawnsObj={
    1:{
        idArr:['pg1','pg2','pg3','pg4'],
        class:'green',
        PawnClass:'player1Pawn'
    },
    2:{
        idArr:['pr1','pr2','pr3','pr4'],
        class:'red',
        PawnClass:'player2Pawn'
    },
    3:{
        idArr:['pb1','pb2','pb3','pb4'],
        class:'blue',
        PawnClass:'player3Pawn'
    },
    4:{
        idArr:['py1','py2','py3','py4'],
        class:'yellow',
        PawnClass:'player4Pawn'
    }
}
function startGame(){                    
    if (document.getElementById('2pl').checked) {
       
        DeActivePlayersAtStartOfGame([2,4]);
      }
      else if (document.getElementById('3pl').checked) {

      
        DeActivePlayersAtStartOfGame([4]);
      }
      else if (document.getElementById('4pl').checked) {
        document.getElementById("ChoosePlayerDiv").style.display= 'none';
        document.getElementById("GameDiv").style.display= 'block';
        SpawnPlayers();
      }
}

function DeActivePlayersAtStartOfGame(deactivatePlayersArr){   

    for(var i=0;i<deactivatePlayersArr.length;i++){
        WinnersObj[deactivatePlayersArr[i]]=4;
    }
    document.getElementById("ChoosePlayerDiv").style.display= 'none';
    document.getElementById("GameDiv").style.display= 'block';
    SpawnPlayers();

}

function SpawnPlayers(){     //spawns pawns at the start of match
  //  debugger;
for(var p=1;p<=4;p++){
        if(WinnersObj[p]!=4){
            var tempArr=PawnsObj[p].idArr;
            for(var i=0;i<tempArr.length;i++){
                var PlayerPawn = document.createElement("DIV");
                PlayerPawn.id=tempArr[i];
                console.log(PawnsObj[p].class);
                PlayerPawn.className='circleBase type2 '+PawnsObj[p].class;
                document.getElementById(PlayerInfoObj[p][tempArr[i]].location).appendChild(PlayerPawn);
             // document.getElementById('h'+tempArr[i].slice(1,)).appendChild(PlayerPawn);
            }
        }
    }
}
function RollDice(){                          //function call oon roll
    document.getElementById("startGame").style.display="none";
    console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP="+playerCount);
    var diceNum=Math.floor(Math.random() * 6) ;
    console.log(diceNum+1);
    document.getElementById("dice").src=diceArr[diceNum];
    
        selectPawn(diceNum+1);
}

function selectPawn(diceNum){          //for selecting pawn to play
  
    var tempArr=PawnsObj[playerCount].idArr;
    var ActivePlayerCount=0;
    for(var i=0;i<tempArr.length;i++){
 if(PlayerInfoObj[playerCount][tempArr[i]].status=='Active'||PlayerInfoObj[playerCount][tempArr[i]].status=='SafeZone') {
    // console.log(tempArr[i]);
    var lastPlaceId=PlayerInfoObj[playerCount][tempArr[i]].location;
var pawnMoveIndex=(playerPath[playerCount]).indexOf(PlayerInfoObj[playerCount][tempArr[i]].location)+diceNum;
var PlaceToMoveIndex=(playerPath[playerCount])[pawnMoveIndex];
    var elem=document.getElementById(tempArr[i]);
    
       
        if(((PlayerInfoObj[playerCount][tempArr[i]].location)[0]=='h' && diceNum!=6)||(pawnMoveIndex>(playerPath[playerCount].length-1))){
           
                elem.style.pointerEvents = 'none';
            }
            else{
                elem.setAttribute("onclick","PawnAction('"+tempArr[i]+"',"+diceNum+")");
                elem.className+=' '+PawnsObj[playerCount].PawnClass;
                elem.style.pointerEvents = 'auto';
                ActivePlayerCount++;
            }
        }
    }
    if(ActivePlayerCount==0){
        PlayerSwitcher();
    }
    else{
        document.getElementById("Dicebutton").style.pointerEvents="none";
    }
}

function PawnAction(Pawnid,diceNum){                    //for moving selected pawn
//debugger;
    console.log(Pawnid);
var lastPlaceId=PlayerInfoObj[playerCount][Pawnid].location;
var pawnMoveIndex=(playerPath[playerCount]).indexOf(PlayerInfoObj[playerCount][Pawnid].location)+diceNum;
var PlaceToMoveIndex=(playerPath[playerCount])[pawnMoveIndex];
var killCounter=0;                                                      
    if(PlayerInfoObj[playerCount][Pawnid].status=='SafeZone'){
       // debugger;
        var currentPosition=parseInt( (PlayerInfoObj[playerCount][Pawnid].location).slice(1,));
        if(currentPosition+diceNum==19){
            RemovePawn(Pawnid);
        MovePawn(Pawnid,'w'+playerCount);
        PlayerInfoObj[playerCount][Pawnid].location='w'+playerCount;
        PlayerInfoObj[playerCount][Pawnid].status="Winner";
      resizeInWinnerTriangle(PlayerInfoObj[playerCount][Pawnid].location);
      WinnersObj[playerCount]=WinnersObj[playerCount]+1;
       //ResizePawns(PlayerInfoObj[playerCount][Pawnid].location);
        }
        else if(currentPosition+diceNum<19){
        
            RemovePawn(Pawnid);
            MovePawn(Pawnid,PlaceToMoveIndex);
            PlayerInfoObj[playerCount][Pawnid].location=PlaceToMoveIndex;
            ResizePawns(PlayerInfoObj[playerCount][Pawnid].location);
        }
    }
    else if((PlayerInfoObj[playerCount][Pawnid].location)[0]=='h'){ 
        RemovePawn(Pawnid);
        MovePawn(Pawnid,(playerPath[playerCount])[0]);
      //  console.log((playerPath[playerCount])[0]);
        PlayerInfoObj[playerCount][Pawnid].location=(playerPath[playerCount])[0];
        ResizePawns(PlayerInfoObj[playerCount][Pawnid].location);
    }
    else if(safeZone.includes(PlaceToMoveIndex)){
        RemovePawn(Pawnid);
        MovePawn(Pawnid,PlaceToMoveIndex);
        PlayerInfoObj[playerCount][Pawnid].location=PlaceToMoveIndex;
        if((playerPath[playerCount]).indexOf(PlayerInfoObj[playerCount][Pawnid].location)>=51){
            PlayerInfoObj[playerCount][Pawnid].status="SafeZone";   
            
        }
        ResizePawns(PlayerInfoObj[playerCount][Pawnid].location);
    }
    else {
        RemovePawn(Pawnid);
     //   var pawnMoveIndex=(playerPath[playerCount]).indexOf(PlayerInfoObj[playerCount][tempArr[i]].location)+diceNum;
        if(pawnMoveIndex==(playerPath[playerCount].length-1)){
            MovePawn(Pawnid,PlaceToMoveIndex);
            PlayerInfoObj[playerCount][Pawnid].location=PlaceToMoveIndex;
            PlayerInfoObj[playerCount][Pawnid].status="Winner"; 
        }
        else{
            //debugger;
            killCounter=KillPawns(PlaceToMoveIndex);   
        MovePawn(Pawnid,PlaceToMoveIndex);
        PlayerInfoObj[playerCount][Pawnid].location=PlaceToMoveIndex;
        if((playerPath[playerCount]).indexOf(PlayerInfoObj[playerCount][Pawnid].location)>=51){
            PlayerInfoObj[playerCount][Pawnid].status="SafeZone";   
         
        }
        
        ResizePawns(PlayerInfoObj[playerCount][Pawnid].location);
    }
    }
    DisableEvents();
    ResizePawns(lastPlaceId);
 // debugger;
  //var flag=0;
    
    if(killCounter==0&&diceNum != 6) {
        PlayerSwitcher();
       
    }
    document.getElementById("Dicebutton").style.pointerEvents="auto";
    // if (flag==0 && diceNum != 6) {
    //     PlayerSwitcher();
    // }
   
}

function pawnCount(parent){                     //returns count of pawns inside a div
    var relevantChildren = 0;
    var children = parent.childNodes.length;
    for(var i=0;i < children;i++){
        if(parent.childNodes[i].nodeType != 3){
            
            relevantChildren++;
        }
    }
    return relevantChildren;
}
function pawnCount2(parent){                   //returns array of pawnIds inside a div
    var div=document.getElementById(parent);
    var elements = [];
    for (var i=0; i<div.childNodes.length; i++) {
      var child = div.childNodes[i];
      
      if (child.nodeType == 1) {
      
        elements.push(child.id)      
      }
    }
    return elements;
}

function RemovePawn(pawnid){                   //deletes pawn
    var element = document.getElementById(pawnid);
        element.parentNode.removeChild(element);
}

function MovePawn(pawnid,PlaceToMoveID){      //creates pawn
    var PlayerPawn = document.createElement("DIV");
    PlayerPawn.id=pawnid;
    //console.log(PawnsObj[p].class);
    PlayerPawn.className='circleBase type2 '+PawnsObj[playerCount].class;
    document.getElementById(PlaceToMoveID).appendChild(PlayerPawn); 
}

function ResizePawns(DivId){                   //resizes all pawns inside a div
    
    var PawnIdArray=pawnCount2(DivId);
    
    if(PawnIdArray.length>1){
            for(var i=0;i<PawnIdArray.length;i++){
        document.getElementById(PawnIdArray[i]).style.width = (100/PawnIdArray.length)+"%";
        document.getElementById(PawnIdArray[i]).style.height = (100/PawnIdArray.length)+"%";
        }
    }
    else if(PawnIdArray.length==1){
        document.getElementById(PawnIdArray[0]).style.width = "30px";
        document.getElementById(PawnIdArray[0]).style.height = "30px";
    }

}

function  KillPawns(PlaceToMoveIndex){        //kill pawns in div
    //debugger;
    var PawnsToIgnore=PawnsObj[playerCount].idArr;
    var PawnsToKill=pawnCount2(PlaceToMoveIndex);
    var killCount=0;
    if(PawnsToKill.length>=1){
    for(var i=0;i<PawnsToKill.length;i++){
        if(!PawnsToIgnore.includes(PawnsToKill[i])){
            var KillPlayerCount=playerCount;
            RemovePawn(PawnsToKill[i]);
            playerCount=PlayerColorChar[(PawnsToKill[i])[1]];
            MovePawn(PawnsToKill[i],('h'+PawnsToKill[i].slice(1,)));
            PlayerInfoObj[playerCount][PawnsToKill[i]].location='h'+PawnsToKill[i].slice(1,);
            playerCount=KillPlayerCount;
            killCount++;
        }
    }
    
}
return killCount;   
}
function DisableEvents(){           //disable events pawns
    
    var tempArr=PawnsObj[playerCount].idArr;
    for(var i=0;i<tempArr.length;i++){
        var element = document.getElementById(tempArr[i]);
        element.classList.remove(PawnsObj[playerCount].PawnClass);
        element.style.pointerEvents="none";
        }
}

function  resizeInWinnerTriangle(DivId){        //reesize's pawns in winner triangle divs
    var PawnIdArray=pawnCount2(DivId);
    
    if(PawnIdArray.length>1){
    for(var i=0;i<PawnIdArray.length;i++){
        document.getElementById(PawnIdArray[i]).style.width = (50/PawnIdArray.length)+"%";
        document.getElementById(PawnIdArray[i]).style.height = (50/PawnIdArray.length)+"%";
    }
}
}

function PlayerSwitcher(){  // switches players 
   // debugger;
   console.log("Inplayer Swicther------------P="+playerCount);
   
    for(;;){
            if(WinnersObj[playerCount+1]==4 && (playerCount+1)<5){
             playerCount++;
            }
            else{
                playerCount++;
                if(playerCount==5){
                        playerCount=0;
                        PlayerSwitcher();
  
                }
        
                break;
                }   
        }
    document.getElementById("palyerTurnDiv").className=PawnsObj[playerCount].class;
    document.getElementById("palyerTurnDiv").innerHTML="<h1 style=\"text-align: center;\">"+playerCount+"</h1>";

console.log("Inplayer Swicther------------P="+playerCount);
   }
   