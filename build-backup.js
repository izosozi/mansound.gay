import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import config from './vite.config.js';

const webrootDir = path.resolve(config.build.outDir);
// const backupBaseDir = path.resolve(config.build.outDir + "_backup");

let backupDirName = path.basename(config.build.outDir);

backupDirName += "_backup";

const parentDir = path.dirname(path.resolve(config.build.outDir));

const backupBaseDir = path.join(parentDir, 'backups', backupDirName);

const createBackup = (src, destBase) => {
    let i = 1;
    let dest;

    do {
        dest = `${destBase}-${i}`;
        i++;
    } while (fs.existsSync(dest));

    fs.mkdirSync(dest, { recursive: true });

    copyDirectory(src, dest);
    console.log(`Backup of webroot directory created at ${dest}`);
};

const copyDirectory = (src, dest) => {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
};

// Backup the webroot directory
if (fs.existsSync(webrootDir)) {
    createBackup(webrootDir, backupBaseDir);
} else {
    console.error(`Webroot directory not found: ${webrootDir}`);
    process.exit(1);
}

// Run the Vite build process
exec('vite build', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error during Vite build: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Vite build output: ${stdout}`);
});

