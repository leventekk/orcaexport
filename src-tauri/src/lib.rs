mod compress;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|_app| {
            #[cfg(not(debug_assertions))]
            {
                _app.handle().plugin(tauri_plugin_prevent_default::init())?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![compress::export_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
