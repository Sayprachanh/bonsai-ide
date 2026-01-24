import { handlerModePress } from '/js/keyHandler.js';


const { invoke } = window.__TAURI__.core;

let greetInputEl;
let greetMsgEl;

//pre-built tauri rust backend call (will delete later)
async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form").addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });
  
});


//'my code' section

//testing invoke command function from Rust backend
document.addEventListener('keydown', (e) => {
  if(e.key === 'o'){
    invoke("test");
  }
})


// line-counting function
const CodeArea = document.getElementById('editable-text');
const NumberLine = document.getElementById('numLine');


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


 

