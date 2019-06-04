
var startBtn = document.getElementById('btn');
var box = document.getElementById('box');
var flagNum=document.getElementById('flagNum');
var flagImg=document.getElementById('flagImg');
var close=document.getElementById('close');
var score=document.getElementById('score');
var block;
var minesNum;
var minesOver;
var minesMap=[];
var startKey=true;
var hongQi;
bindEvent();
function bindEvent(){
	startBtn.onclick = function() {
		flagNum.style.display = 'block';
		box.style.display = 'block';
		init();
		startKey=false;
	}
	box.oncontextmenu=function(){
		return false;
	}
	
	box.onmousedown=function(e){
		var event=e.target;
		if(e.which==1){
			leftClick(event);
		}else if(e.which==3){
			rightClick(event);
		}
	}
	
	close.onclick=function(){
		box.style.display="none";
		flagImg.style.display="none";
		flagNum.style.display="none";
		box.innerHTML="";
		startKey=true;
	}
}

function init() {
	if(startKey){
		minesNum=10;
		minesOver=10;
		score.innerHTML=minesOver;
		hongQi=minesOver;
		for(var i = 0; i < 10; i++) {
			for(var j = 0; j < 10; j++) {
				var con = document.createElement('div');
				con.classList.add('block');
				con.setAttribute('id', i + "-" + j);
				box.appendChild(con);
				minesMap.push({mine:0});
			}
		}
		block=document.getElementsByClassName('block');
		while(minesNum>0){
			var mineIndex=Math.floor(Math.random()*100);
			if(minesMap[mineIndex].mine === 0){
				block[mineIndex].classList.add('isMine');
				minesMap[mineIndex].mine=1;
				minesNum--;
			}
		}
	}
}

function leftClick(dom){
	var isMine =document.getElementsByClassName('isMine');
	if(dom&&dom.classList.contains('isMine')){
		console.log('game over');
		for(var i=0;i<isMine.length;i++){
			isMine[i].classList.add('show');
		}
		setTimeout(function(){
			flagImg.style.display="block";
			flagImg.style.backgroundImage="url(img/over.jpg)";
		},500)
	}else{
		var n=0;
		var posArr=dom&&dom.getAttribute('id').split('-');
		var posX=posArr&&+posArr[0];
		var posY=posArr&&+posArr[1];
		dom&&dom.classList.add('num');
		for(var i=posX-1;i<=posX+1;i++){
			for(var j=posY-1;j<=posY+1;j++){
				var aroundBox=document.getElementById(i+"-"+j);
				if(aroundBox&&aroundBox.classList.contains('isMine')){
					n++;
				}
			}
		}
		dom&&(dom.innerHTML=n);
		if(n==0){
			for(var i=posX-1;i<=posX+1;i++){
				for(var j=posY-1;j<=posY+1;j++){
					var nearBox=document.getElementById(i+"-"+j);
					if(nearBox&&nearBox.length!=0){
						if(!(nearBox.classList.contains('check'))){
							nearBox.classList.add('check');
							leftClick(nearBox);
						}
					}
				}
			}
		}
	}
}
function rightClick(dom){
	if(dom&&dom.classList.contains('num')){
		return;
	}
	if(hongQi==0)
	{
		if(dom.classList.contains('flag')){
			dom.classList.toggle('flag');
			hongQi++;
		}
		return;
	}else if(hongQi>0){
		dom.classList.toggle('flag');
		if(dom.classList.contains('isMine')&&dom.classList.contains('flag')){
			minesOver--;
		}
		if(dom.classList.contains('isMine')&&!dom.classList.contains('flag')){
			minesOver++;
		}
		hongQi--;
		score.innerHTML=minesOver;
		if(minesOver==0){
			flagImg.style.display="block";
			flagImg.style.backgroundImage="url(img/success.png)";
		}
	}
}
