import { setScreen } from '/js/main.js';

const cmdLine = document.getElementById('cmdSearch');
const cmdInput = document.getElementById('search_command');
const isHidden = cmdLine.style.display === 'none' || cmdInput.style.display === '';


//text (part for writing)
const EditorSection = document.querySelector('.editor-container');
const CodeArea = document.getElementById('editable-text'); // get the id of the code's area


const DefaultMode = 'Normal mode';
const cmdMode = 'command mode';
const instMode = 'insert mode';
let CurrentMode = DefaultMode;

// normal mode (for waiting for keybind)
console.log({CurrentMode});

export function handlerModePress(e){
  
  if(CurrentMode === DefaultMode){
    if(e.key === ':'){ // command mode
    e.preventDefault();
    EnterCommandMode();
    

    }
    if(e.key === 'i'){ //insert mode
    e.preventDefault();
    setScreen('editor');
    EnterInsertMode();
  
    }
  }

  //grobal exit
  if(e.key === 'Escape'){
    e.preventDefault(); // prevent the letter being write in the text
    exitMode();
  }

};


function exitMode(){
  if(cmdInput && cmdLine){
    cmdLine.style.display = 'none';
    cmdInput.blur();
    cmdInput.value = '';
  }
  if(EditorSection){
    CodeArea.readOnly = true; //if exit, set element 'textarea' to read only
    CodeArea.blur();
  }
  
  CurrentMode = DefaultMode;
  console.log({CurrentMode});
};


// command mode
function EnterCommandMode(){

  if (isHidden){
    cmdLine.style.display = 'block';
    cmdInput.focus();
    cmdInput.value = ':';
    
    //(test code!!) might update late / handling + storing command
    cmdInput.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter'){
        const cmd = cmdInput.value.trim();
        if(cmd === ':home'){
          if(EditorSection){
            EditorSection.style.display = 'none';
          }
          setScreen('welcome');
          exitMode();
        }
        cmdInput.value = '';
      }

    });


  }
  CurrentMode = cmdMode;
  console.log({CurrentMode});

};

// insert mode
function EnterInsertMode(){

  EditorSection.style.display = 'flex';
  CodeArea.readOnly = false;
  CodeArea.focus(); // focus on the code when enter insert mode


  CurrentMode = instMode;
  console.log({CurrentMode});
}


