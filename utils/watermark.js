export function watermark(user=""){

const date = new Date().toISOString();

return `

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

__OWN__ = "_kingktn - Trương Nhật Bảo Nam"
__OBF__ = "JSarmor"
__USR__ = "${user}"
__VER__ = "1.7.0"
__DATE__ = "${date}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

`;

}
