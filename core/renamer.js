import traverseModule from "@babel/traverse";

const traverse = traverseModule.default;

const reserved = new Set([
"require",
"module",
"exports",
"__dirname",
"__filename",
"console",
"process",
"Buffer",
"setTimeout",
"setInterval"
]);

function randomName(){
const chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let name="_";
for(let i=0;i<6;i++){
name+=chars[Math.floor(Math.random()*chars.length)];
}
return name;
}

export function renameVariables(ast){

traverse(ast,{
Program(path){

  const bindings = path.scope.bindings;

  for(const key in bindings){

    const binding = bindings[key];

    if(reserved.has(key)) continue;

    // skip imports
    if(binding.path.isImportSpecifier?.()) continue;
    if(binding.path.isImportDefaultSpecifier?.()) continue;
    if(binding.path.isImportNamespaceSpecifier?.()) continue;

    // skip function parameters
    if(binding.kind === "param") continue;

    // skip destructuring
    if(binding.path.isObjectPattern?.()) continue;
    if(binding.path.isArrayPattern?.()) continue;

    // skip globals
    if(!binding.scope.parent) continue;

    const newName=randomName();

    path.scope.rename(key,newName);

  }

}
});

}
