
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

use std::fs;
//test custom command

#[tauri::command]
fn test(file_path: String, contents: String) -> Result<String, String> {
    let _ = fs::write(&file_path, &contents).map_err(|err| err.to_string())?;
    Ok(format!("File created at: {}", file_path))
}




#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![test])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

