
import fs from 'fs';
import path from 'path';

export function getCategories() {

    const postsDir = path.join(process.cwd(), 'src', 'pages', 'posts');
    
    try {
        return fs.readdirSync(postsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    } catch (error) {
        return []; // Return empty array if directory doesn't exist
    }

}
