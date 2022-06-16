import * as fs from 'fs';
import * as http from 'http';
import { User } from './types';

export async function writeDataToFile(filename: string, content: User[]) {
    fs.writeFile(filename, JSON.stringify(content), () => {
        console.log('write')
    });
}

export function getPostDate(req: http.IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            let body: string = '';
            req.on('data', (chunk: Buffer) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                resolve(body);
            })
        } catch (error) {
            reject(error);
        }
    })
}
