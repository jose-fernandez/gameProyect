class controller{
	constructor(){
		this.g=new game(600,600);
		this.mG=new modelGame(600,600);
		this.createElements(200,200,100,100,-0.3,-0.3);
		this.changeMovement();
		this.run();

	}
	createElements(x,y,w,h,vx,vy){
		this.g.createElements(x,y,w,h);
		this.mG.createElements(x,y,w,h,vx,vy);
	}

	run(){
		var that=this;
		var interval=setInterval(function(){
			that.list=that.mG.move(interval);
			if(that.list[0]===true){
				let timer=(that.mG.end-that.mG.start);
				that.g.end(that.mG.click,timer);
			}else{
				that.g.move(that.list[0],that.list[1]);
			}
		},10);
	}

	changeMovement(){
		var that = this;
		document.getElementsByTagName("image")[0].addEventListener("click", function(){
			that.mG.changeMovement();
		});
	}
}

class game{
	constructor(x,y){
		this.x=x;
		this.y=y;
		this.list=[];
		this.timer=document.getElementsByClassName("timer");
		this.build();
	}

	build(){
		var bg= document.createElementNS ("http://www.w3.org/2000/svg", "svg");
		bg.setAttribute("height",`${this.y}`);
		bg.setAttribute("width",`${this.x}`);
		bg.setAttribute("id",`container`);
		bg.style.background="url(image/nemo.jpg)";
		document.getElementById("cBubble").appendChild(bg);

	}
	createElements(x,y,w,h){
		this.list.push(new bubble(x,y,w,h));
	}
	move(x,y){
		this.list[0].move(x,y);
	}
	end(click,timer){
		let d=new Date();
		d.setTime(timer);
		let result= [click, d.getMinutes(), d.getSeconds()];
		this.setCookie(result);
		window.location="gameOver.html";
	}
	setCookie(result){
		document.cookie=`click=${result[0]}; expires=Mon, 4 Dec 2017 12:00:00 UTC`;
		document.cookie=`time=${result[1]}:${result[2]}; expires=Mon, 4 Dec 2017 12:00:00 UTC`;
		console.log(document.cookie);
	}
}

class bubble{
	constructor(x,y,w,h){
		this.x=x;
		this.y=y;
		this.h=h;
		this.w=w;

		this.build();
	}
	build(){
		this.bubble= document.createElementNS ("http://www.w3.org/2000/svg", "image");
		this.bubble.setAttribute("x",`${this.x}`);
		this.bubble.setAttribute("y",`${this.y}`);
		this.bubble.setAttribute("height",`${this.h}`);
		this.bubble.setAttribute("width",`${this.w}`);
		this.bubble.setAttribute("id",`imagen`);
		this.bubble.setAttribute("href",`image/bubble1.png`);

		document.getElementById("container").appendChild(this.bubble);
	}
	move(x,y){
		this.x=x;
		this.y=y;

		this.bubble.setAttribute("x",`${this.x}`);
		this.bubble.setAttribute("y",`${this.y}`);		
	}

}

class modelBubble{
	constructor(x,y,w,h,vx,vy){
		this.x=x+(w/2);
		this.y=y+(h/2);
		this.vx=vx;
		this.vy=vy;

		this.vxc=0;
		this.vyc=0;


		this.h=h;
		this.w=w;	
	}
}

class modelGame{
	constructor(x,y){
		this.x=x;
		this.y=y;
		this.list=[];
		//this.limit=[x/3,x/1.5,y/3,y/1.5];//Split limit 3x3
		this.counter=2;
		this.click=0;
		this.start=this.time();

	}
	createElements(x,y,w,h,vx,vy){
		this.list.push(new modelBubble(x,y,w,h,vx,vy));
	}
	move(interval){
		if(this.collision(interval)){
			this.list[0]=true;
			this.end=this.time();
			return this.list;
		}

		this.list[0].vx=this.list[0].vx+this.list[0].vxc;
		this.list[0].vy=this.list[0].vy+this.list[0].vyc;

		this.list[0].x+=this.list[0].vx;
		this.list[0].y+=this.list[0].vy;
		return [(this.list[0].x - (this.list[0].w/2)),(this.list[0].y - (this.list[0].h/2))];
	}

	time(){
		let date=new Date();
		let sec=date.getTime();
		console.log(sec);
		return sec;
	}

	changeMovement(){
		this.click++;
		if(this.list[0].vx<0){
			this.list[0].vx=(this.list[0].vx+parseFloat(`0.${Math.floor((Math.random()*2)+1)}`)*(-1))*(-1);
		}else{
			this.list[0].vx=(this.list[0].vx+parseFloat(`0.${Math.floor((Math.random()*2)+1)}`))*(-1);			
		}

		if(this.list[0].vy<0){
			this.list[0].vy=(this.list[0].vy+parseFloat(`0.${Math.floor((Math.random()*2)+1)}`)*(-1))*(-1);
		}else{
			this.list[0].vy=(this.list[0].vy+parseFloat(`0.${Math.floor((Math.random()*2)+1)}`))*(-1);			
		}
		this.getCurve();

	}
	getCurve(){
		let check=Math.round(Math.random());
		let check2=Math.round(Math.random());
		if (check==1){
			if(check2==1){
				this.list[0].vxc=0.01;
			}else{
				this.list[0].vxc=-0.01;
			}
		}else{
			if(check2==1){
				this.list[0].vyc=0.01;
			}else{
				this.list[0].vyc=-0.01;
			}

		}
	}
	collision(interval){
		var limitX=this.x+(this.list[0].w*4);
		var limitY=this.y+(this.list[0].h*4);

		if(this.list[0].x>=(limitX-this.list[0].w/2) || this.list[0].x<=((this.x-limitX)+this.list[0].w/2)){
			clearInterval(interval);
			return true;

		}else if(this.list[0].y>=(limitY-this.list[0].h/2) || this.list[0].y<=((this.y-limitY)+this.list[0].h/2)){
			clearInterval(interval);
			return true;
		}
	}
	/* Splitted by area 3x3
	changeMovement(){
		if(this.list[0].x<this.limit[0] && this.list[0].y<this.limit[2]){
			//change vx,vy and call this.move()
			this.counter++;
			console.log("arribaizq");
			this.random(Math.floor((Math.random()*2)+1),this.counter);
			this.move();
		}else if(this.list[0].x<this.limit[0] && this.list[0].y>this.limit[3]){
			this.counter++;
			console.log("abajoizq");
			this.random(3,this.counter);
			this.move();
		}else if(this.list[0].x>this.limit[1] && this.list[0].y>this.limit[3]){
			this.counter++;
			console.log("abajoder");
			this.random(Math.floor((Math.random()*5)+4),this.counter);
			this.move();
		}else if(this.list[0].x>this.limit[1] && this.list[0].y<this.limit[2]){
			this.counter++;
			console.log("arribder");
			this.random(6,this.counter);
			this.move();
		}else if((this.list[0].x>this.limit[0] && this.list[0].x<this.limit[3])&& this.list[0].y<this.limit[2]){
			this.counter++;
			console.log("arriba");
			this.random(3,this.counter);
			this.move();			
		}else if(this.list[0].x<this.limit[0] && (this.list[0].y>this.limit[2]&&this.list[0].y<this.limit[3])){
			console.log("izquierda", this.list[0].x,this.list[0].y);
		}else if((this.list[0].x>this.limit[0] && this.list[0].x<this.limit[1]) && this.list[0].y>this.limit[3]){
			console.log("abajo", this.list[0].x,this.list[0].y);
		}else if(this.list[0].x>this.limit[1] && (this.list[0].y>this.limit[2]&& this.list[0].y<this.limit[3])){
			console.log("derecha", this.list[0].x,this.list[0].y);
		}else{
			console.log("centro", this.list[0].x,this.list[0].y);
		}
	}
	random(v,c){
		switch(v){
			case 1:
				this.list[0].vx=this.list[0].vx+parseFloat(`0.${Math.floor((Math.random()*c)+(c-1))}`)*(-1);
				this.list[0].vy=this.list[0].vy*(-1);
				break;
			case 2:
				this.list[0].vx=this.list[0].vx*(-1);
				this.list[0].vy=this.list[0].vy+parseFloat(`0.${Math.floor((Math.random()*c)+(c-1))}`)*(-1);
				break;
			case 3:
				this.list[0].vy=this.list[0].vy*(-1);
				this.list[0].vx=this.list[0].vx+parseFloat(`0.${Math.floor((Math.random()*c)+(c-1))}`)*(-1);
				break;
			case 4:
				this.list[0].vx=this.list[0].vx*(-1);
				this.list[0].vy=this.list[0].vy+parseFloat(`0.${Math.floor((Math.random()*c)+(c-1))}`)*(-1);
				break;
			case 5:
				this.list[0].vy=this.list[0].vy*(-1);
				this.list[0].vx=this.list[0].vx+parseFloat(`0.${Math.floor((Math.random()*c)+(c-1))}`)*(-1);
				break;
			case 6:
				this.list[0].vx=this.list[0].vx*(-1);
				this.list[0].vy=this.list[0].vy+parseFloat(`0.${Math.floor((Math.random()*c)+(c-1))}`)*(-1);
				break;
			case 9:
				this.list[0].vy=this.list[0].vy*(-1);
				this.list[0].vx=this.list[0].vx+parseFloat(`0.${Math.floor((Math.random()*c)+(c-1))}`)*(-1);
				break;
		}
	}*/
}

window.onload=function(){
	new controller();
};