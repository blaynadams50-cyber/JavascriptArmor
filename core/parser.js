import { parse } from "@babel/parser";

export function parseCode(code){

return parse(code,{
sourceType:"unambiguous",
allowReturnOutsideFunction:true,
plugins:[
"jsx",
"classProperties",
"classPrivateProperties",
"classPrivateMethods",
"dynamicImport",
"optionalChaining",
"nullishCoalescingOperator",
"objectRestSpread",
"topLevelAwait"
]
});

}
