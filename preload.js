// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  document.getElementById('dlltest').addEventListener('click', dlltest);
})
const path = require("path");
const ffi = require("ffi-napi");  // 引入ffi
// `ffi.Library`用于注册函数，第一个入参为DLL路径，最好为文件绝对路径
let dllpath = path.resolve(__dirname, './dll/add.dll')
const libm = ffi.Library(dllpath, {
      //ExecuteTaskInFile是dll中定义的函数，两者名称需要一致
      //[a, [b，c....]] a是函数出参类型，[b，c]是dll函数的入参类型
      funAdd: ['int', ['int','int']],
   });  // 找到dll文件引入

function dlltest() {
  alert(libm.funAdd(1, 2));
}
