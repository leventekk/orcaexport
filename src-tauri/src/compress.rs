use std::fs::File;
use std::io::{self, Read, Write};
use std::path::{Path, PathBuf};
use zip::{write::SimpleFileOptions, ZipWriter};

// TODO: better error handling

#[tauri::command]
pub fn export_files(path_to_export: String, files_to_export: Vec<String>) -> Result<(), String> {
    let zip_file_path = Path::new(&path_to_export);
    let zip_file = File::create(zip_file_path).map_err(|err| err.to_string())?;

    let mut zip = ZipWriter::new(zip_file);

    let options = SimpleFileOptions::default()
        .compression_method(zip::CompressionMethod::Deflated)
        .unix_permissions(0o755);

    for name in files_to_export {
        let file_path = PathBuf::from(name);
        let file = File::open(&file_path).map_err(|err| err.to_string())?;

        let file_name = file_path.file_name().unwrap().to_str().unwrap();

        // Adding the file to the ZIP archive.
        zip.start_file(file_name, options)
            .map_err(|err| err.to_string())?;

        let mut buffer = Vec::new();
        io::copy(&mut file.take(u64::MAX), &mut buffer).map_err(|err| err.to_string())?;

        zip.write_all(&buffer).map_err(|err| err.to_string())?;
    }

    zip.finish().map_err(|err| err.to_string())?;

    Ok(())
}
