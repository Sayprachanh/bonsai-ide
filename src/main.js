const { invoke } = window.__TAURI__.core;

let greetInputEl;
let greetMsgEl;

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


// my code section
//
//

const cmdLine = document.getElementById('cmdSearch');
const cmdInput = document.getElementById('search_command');
const isHidden = cmdLine.style.display === 'none' || cmdInput.style.display === '';

// normal mode (for waiting for keybind)
document.addEventListener('keydown', (e) =>{
  if(e.key === ':'){
    EnterCommandMode();
    e.preventDefault();
  }
  if(e.key === 'i'){
    EnterInsertMode();
    e.preventDefault();
  }
});

// grobal exit using (ESC)
document.addEventListener('keydown', (a)=>{
      if(a.key === 'Escape'){
        exitMode();
        a.preventDefault(); // prevent the letter being write in the text
      }
    })

function exitMode(){
  if(cmdInput && cmdLine){
    cmdLine.style.display = 'none';
    cmdInput.blur();
    cmdInput.value = '';
  }
  console.log("Normal mode");
};


// command mode
function EnterCommandMode(){
  console.log("command mode");

  if (isHidden){
    cmdLine.style.display = 'block';
    cmdInput.focus();
    cmdInput.value = '';
  }
};

// insert mode
function EnterInsertMode(){
  console.log("insert mode");
}
