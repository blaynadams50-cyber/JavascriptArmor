export function generateJunk() {

  const junk = [];

  for (let i = 0; i < 20; i++) {

    junk.push(`
var _junk${i} = Math.random() * ${i};
if(_junk${i} > 9999){
 console.log(_junk${i});
}
`);

  }

  return junk.join("\n");

}