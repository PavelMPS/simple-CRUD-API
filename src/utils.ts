import * as fs from 'fs';
import * as http from 'http';
import { User } from './types';
import { validate as uuidValidate } from "uuid";
import { version as uuidVersion } from "uuid";

export const uuidValidateV4 = (uuid: string): boolean => {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
  };

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

export function getId(req: http.IncomingMessage): string {
    return req.url!.split("/")[3];
}
