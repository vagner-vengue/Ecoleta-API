import { Request, Response } from "express";

export function ValidateRequestPublicAccess(request: Request, response: Response) {
    const API_KEY = process.env.SERVER_API_KEY_PUBLIC + "";
    const Request_KEY = request.headers['content-length-xpto'] + "";
    let result = true;

    if ((API_KEY != Request_KEY) || Request_KEY == "") {
        response.status(401).json({
            error: 'Unauthorized access.'
        });
        
        console.log("Error: attempt to unauthorized access. Hostname: " + request.hostname);
        result = false;
    }

    return result;
}
