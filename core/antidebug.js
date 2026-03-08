export function injectAntiDebug(){

return `

(function(){
setInterval(function(){
try{
(function(){debugger})()
}catch(e){}
},2000)
})();

`;

}
