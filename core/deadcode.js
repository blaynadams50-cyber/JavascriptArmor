import traverse from "@babel/traverse";
import * as t from "@babel/types";
import { randomInt } from "../utils/random.js";

const patterns = [

"var _a=Math.random();if(_a>2){console.log(_a)}",
"var _b=0;for(var i=0;i<10;i++){_b+=i}",
"try{JSON.parse('x')}catch(e){}",
"var _c=[1,2,3];_c.reverse().join(',')",
"var _d=Date.now();_d+=Math.random()",
"var _e='abc'.split('').reverse().join('')",
"Boolean(Math.random())",
"Math.floor(Math.random()*999)",
"var _f={a:1,b:2};Object.keys(_f)",
"var _g=0;while(_g<1){_g++}"

];

for(let i=0;i<90;i++){

patterns.push(`
var _junk${i}=Math.random()*${randomInt(1,999)};
if(_junk${i}>99999){
console.log(_junk${i})
}
`);

}

function randomPattern(){

return patterns[Math.floor(Math.random()*patterns.length)];

}

export function injectDeadCode(ast){

traverse.default(ast,{

BlockStatement(path){

if(Math.random()>0.4) return;

const fake = t.ifStatement(

t.binaryExpression(
">",
t.numericLiteral(randomInt(0,100)),
t.numericLiteral(1000)
),

t.blockStatement([

t.expressionStatement(
t.callExpression(
t.memberExpression(
t.identifier("console"),
t.identifier("log")
),
[
t.stringLiteral("dead_"+randomInt(1000,9999))
]
)
)

])

);

path.node.body.unshift(fake);

}

});

}

export function generateDeadRuntime(){

let out="";

for(let i=0;i<30;i++){

out+=randomPattern()+"\n";

}

return out;

}