(()=>{"use strict";class e{constructor(e,t){this.size=e,this.tiles=[],this.movesCounter=0,this.tileSize=t}getMoves(){return this.movesCounter}countMoves(){return this.movesCounter++,this.movesCounter}generateTiles(){for(let e=0;e<this.size*this.size;e++)this.tiles.push({value:e,left:e%this.size,top:(e-e%this.size)/this.size})}randomizeTiles(){let e=[];for(let t=0;t<this.size*this.size;t++)e.push(t);if(e.sort((()=>Math.random()-.5)),this.size%2!=0){let t=0;for(let n=0;n<e.length;n++)for(let s=n;s<e.length;s++)e[n]>e[s]&&0!==e[n]&&0!==e[s]&&t++;if(t%2!=0)return this.randomizeTiles();for(let t=0;t<this.tiles.length;t++)this.tiles[t].value=e[t]}if(this.size%2==0){let t=0;for(let n=0;n<e.length;n++)for(let s=n;s<e.length;s++)e[n]>e[s]&&0!==e[n]&&0!==e[s]&&t++;if(t+=Math.floor(e.indexOf(0)/this.size),t%2==0)return this.randomizeTiles();for(let t=0;t<this.tiles.length;t++)this.tiles[t].value=e[t]}}renderField(e){e.innerHTML="";for(let t of this.tiles){const n=document.createElement("div");0===t.value?n.className="tile empty-tile":(n.className="tile",n.innerHTML=t.value),n.style.width=`${this.tileSize}px`,n.style.height=`${this.tileSize}px`,n.style.top=t.top*this.tileSize+"px",n.style.left=t.left*this.tileSize+"px",e.append(n)}}}function t(e){const t=document.createElement("button");return t.innerHTML=e,t}function n(e){const t=document.createElement("button");return t.innerHTML=e,t.className="btn size-btn",t}function s(e,t){let n=Number(e.style.width.slice(0,-2)),s=Number(e.style.top.slice(0,-2)),i=Number(e.style.left.slice(0,-2)),l=Number(t.style.top.slice(0,-2)),o=Number(t.style.left.slice(0,-2));return 0===Math.abs(s-l)&&Math.abs(i-o)===n||Math.abs(s-l)===n&&0===Math.abs(i-o)}function i(e){const t=document.querySelector(".empty-tile"),n=e.target;if(s(t,n)){let e=t.style.top,s=t.style.left;t.style.top=n.style.top,t.style.left=n.style.left,n.style.top=e,n.style.left=s}}let l,o=0,r=0;const c=document.createElement("main"),a=function(){const e=document.createElement("div");e.className="controls";const n=t("new game");n.className="btn start-btn";const s=t("save");s.className="btn save-btn";const i=t("best results");return i.className="btn results-btn",e.append(n),e.append(s),e.append(i),e}(),d=document.createElement("div");d.className="field-container";const u=function(){const e=document.createElement("div");e.className="size-controls";for(let t=3;t<=8;t++){let s=n(`${t}&times;${t}`);e.append(s),4===t&&s.classList.add("size-btn_checked")}return e}(),m=function(){const e=document.createElement("div");e.className="status-panel";const t=document.createElement("div");t.insertAdjacentHTML("afterbegin",'<span>Moves: </span> <span class="moves-counter">0</span>');const n=document.createElement("div");return n.insertAdjacentHTML("afterbegin",'<span>Time: </span> <span class="min-counter">00</span>:<span class="sec-counter">00</span>'),e.append(t),e.append(n),e}();function p(t,n){let c=t.clientWidth/n;const a=document.querySelector(".sec-counter"),d=document.querySelector(".min-counter"),u=document.querySelector(".moves-counter"),m=new e(n,c);var p;u.innerHTML=m.getMoves(),m.generateTiles(),m.randomizeTiles(),m.renderField(t),t.addEventListener("pointerdown",i),t.addEventListener("pointerdown",(e=>{!function(e,t,n){const i=e.target,l=document.querySelector(".empty-tile");if(""!==i.innerHTML&&s(l,i)){let e=t.countMoves();n.innerHTML=e}}(e,m,u)})),p=a,d.innerHTML="00",p.innerHTML="00",o=0,r=0,function(e,t){clearInterval(l),l=setInterval((()=>function(e,t){r++,t.innerHTML=r<=9?`0${r}`:r,r>59&&(o++,r=0,e.innerHTML=o)}(e,t)),1e3)}(d,a),window.addEventListener("resize",(()=>{let e=t.clientWidth/n;m.tileSize=e,m.renderField(t)}))}window.onload=()=>{!function(){const e=document.createElement("header");e.className="header-container";const t=document.createElement("h1");t.innerHTML="15 Gem Puzzle";const n=document.createElement("div");n.innerHTML="sound",e.append(t),e.append(n),document.body.prepend(e)}(),document.body.append(c),c.append(a),c.append(m),c.append(d),c.append(u);const e=document.querySelector(".start-btn"),t=(document.querySelector(".save-btn"),document.querySelector(".save-btn"),document.querySelectorAll(".size-btn"));let n=document.querySelector(".size-btn_checked"),s=document.querySelector(".size-btn_checked").innerHTML.charAt(0);e.addEventListener("click",(()=>p(d,s)));for(let e of t)e.addEventListener("click",(()=>{n.classList.remove("size-btn_checked"),n=e,e.classList.add("size-btn_checked"),s=e.innerHTML.charAt(0),p(d,s)}))},d.insertAdjacentHTML("afterbegin",'<div class="welcome-text"><h2>Welcome to the gem puzzle!</h2><p>The goal of the game is to place numbered tiles in order</p><h3>Game controls:</h3><ol><li>To start a new game press NEW GAME</li><li>To save current game press SAVE</li><li>To see your top 10 results press BEST RESULTS</li><li>To move a tile simply click on it or drag it</li></ol><h3>All combinations in this game are solvable</h3></div>')})();