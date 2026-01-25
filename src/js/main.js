import { handlerModePress } from '/js/keyHandler.js';

const { invoke } = window.__TAURI__.core;

//'my code' section

//testing invoke command function from Rust backend

const CodeArea = document.getElementById('editable-text');
const NumberLine = document.getElementById('numLine');

const filePath = 'C:/test.txt';


// line-counting function
function updateLine(){
  const lineCount = CodeArea.value.split('\n').length || 1;
  
  let numHTML = '';
  for (let i = 1 ; i <= lineCount; i++) {
    numHTML += i + '<br>';
  }
  
  NumberLine.innerHTML = numHTML;
}

CodeArea.addEventListener('input', updateLine);


//handling keymap
document.addEventListener('keydown', (e) =>{
  handlerModePress(e);
});


// screen | mode render
const AppState = {
  screen: 'welcome', mode:'normal'
};

export function setScreen(screen){
  AppState.screen = screen;

  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screen).classList.add('active');
}


 
//write file func (save)
async function writefile(){
  const contents = CodeArea.value; // recieving the value of 'textarea' element
  console.log(contents)
  const func = await invoke("test", {filePath, contents});
  console.log(func);
}

// document.getElementById("test_button").addEventListener("click", async() => {
//   try{
//     const res = await writefile();
//     console.log(res);
//   }catch (error){
//     console.error("error: ", error);
//   }
//   })

//open file
// use Map (frontend) for track what file are open right now
const openFiles = new Map();

openFiles.set("src/main.c", {
  content: "int main() {}\n",
  dirty: false
});

console.log(openFiles);

// async function openFile(filePath){
//   if(openFiles.has(filePath)){

//     return;
//   }

//   const contents = 
// }


// open file
  // if file exist: just open read that file
  // else: create file 

// write(save) file
// create file
// edit file