import path from "path";
import fs from 'fs';
import { randomUUID } from "crypto";


export async function saveImg(imageFile: File, existingImageUrl?: string): Promise<string> {

    const uploadDir = path.join(process.cwd(), 'public', 'images');

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    let imageFileName: string;

    if (existingImageUrl) {
        const existingImagePath = path.join(process.cwd(), 'public', existingImageUrl);

        if (fs.existsSync(existingImagePath)) {
            fs.unlinkSync(existingImagePath);
        }

        imageFileName = path.basename(existingImageUrl);

    } else {
        imageFileName = `${randomUUID()}-${imageFile.name}`;
    }
    const imagePath = path.join(uploadDir, imageFileName);

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    fs.writeFileSync(imagePath, buffer);

    return `/images/${imageFileName}`;
}