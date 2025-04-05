import fs from "node:fs"
import {Dirent} from "fs";

export async function getDirectoriesAsync(folder: string): Promise<Dirent[]> {
    return (await fs.promises.readdir(folder, { withFileTypes: true }))
        .filter((f) => f.isDirectory());
}