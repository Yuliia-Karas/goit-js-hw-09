function t(){return`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}const e=document.querySelector("button[data-start]"),o=document.querySelector("button[data-stop]"),r=document.querySelector("body");console.log(r);let n=null;e.addEventListener("click",(()=>{n=setInterval((()=>{r.style.backgroundColor=t()}),1e3)})),o.addEventListener("click",(()=>{clearInterval(n),r.style.backgroundColor=t()}));
//# sourceMappingURL=01-color-switcher.0352c764.js.map
