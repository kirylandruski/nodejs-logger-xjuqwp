import * as fs from "fs";
import * as path from "path";

export async function validateFileExists(filePath) {
  try {
    const stats = await fs.promises.stat(filePath);
    if (!stats.isFile()) {
      throw new Error(`${filePath} is not a file`);
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(`${filePath} does not exist`);
    } else {
      throw err;
    }
  }
}

export async function validateFileDoesntExists(filePath) {
  try {
    await fs.promises.stat(filePath);
    throw new Error(`${filePath} already exists`);
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
}

export async function validateDirExists(filePath) {
  const dirPath = path.dirname(filePath);
  try {
    const stats = await fs.promises.stat(dirPath);
    if (stats.isFile()) {
      throw new Error(`${dirPath} is not a directory`);
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(`${dirPath} directory does not exist`);
    } else {
      throw err;
    }
  }
}
