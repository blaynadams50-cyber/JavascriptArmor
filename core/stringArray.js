import traverseModule from "@babel/traverse";
import * as t from "@babel/types";

const traverse = traverseModule.default;

export function encodeStrings(ast){

const pool = [];
const map = new Map();

function getIndex(value){

if(map.has(value)){
  return map.get(value);
}

const index = pool.length;

pool.push(value);
map.set(value,index);

return index;

}

traverse(ast,{
StringLiteral(path){

  const value = path.node.value;

  /* skip unsafe places */

  if(path.parent.type === "Directive") return;

  if(
    path.parent.type === "CallExpression" &&
    path.parent.callee.name === "require"
  ){
    return;
  }

  if(path.parent.type === "ImportDeclaration"){
    return;
  }

  if(
    path.parent.type === "ObjectProperty" &&
    path.parent.key === path.node
  ){
    return;
  }

  if(
    path.parent.type === "MemberExpression" &&
    path.parent.property === path.node
  ){
    return;
  }

  if(path.parent.type === "TemplateLiteral"){
    return;
  }

  const index = getIndex(value);

  path.replaceWith(
    t.memberExpression(
      t.identifier("_STRINGS"),
      t.numericLiteral(index),
      true
    )
  );

}

});

return pool;

}
