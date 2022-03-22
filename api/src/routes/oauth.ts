import { Request, Response, NextFunction } from "express";
import { squareClient } from "../client";
import { SquarePromiseHandler } from "../services/PromiseHandler";
import { getFirestore } from "firebase-admin/firestore";
import { randomBytes } from "crypto";
import fs from "fs";
import path from "path";
import admin from "../admin";
import { ObtainTokenResponse } from 'square';

export default async (req: Request, res: Response) => {
    // Get data from query string
    const { code, state } = req.query as { code: string; state: string };

    // Check if error
    if (!req.query.error) {
        // Check if the data is valid
        if (!code) return res.status(400).send("No code provided");
        if (!state) return res.status(400).send("No state provided");
    }

    // Read html from file using fs
    const html = fs.readFileSync(path.join(__dirname, "../assets/windowClose.html"), "utf8");

    // Set variables for square request
    const oauthInstance = squareClient.oAuthApi;
    const clientId = String(process.env.SQUARE_CLIENT_ID);
    const clientSecret = String(process.env.SQUARE_CLIENT_SECRET);
    const grantType = "authorization_code";

    const request = { code, clientId, clientSecret, grantType };

    let [error, result] = [null, null] as [Error | null, ObtainTokenResponse | null];

    // Make request to square
    if (!req.query.error) {
        [error, result] = await SquarePromiseHandler(
            oauthInstance.obtainToken(request)
        );
    }

    // Set data to firestore session
    const db = getFirestore(admin);

    // Get reference to oauth document in collection
    const ref = db.collection("oauth").doc(state);

    // Get data from firestore document
    const doc = await ref.get();

    // Check if document exists
    if (!doc.exists) return res.status(400).send("Invalid state");

    if (req.query.error) {
        await ref.set({ errors: [{ detail: req.query.error_description }] });

        return res
            .set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
            .send(html);
    }

    // Check if there is an error
    if (error) {

        await ref.set({
            errors: (error as any).errors,
        });

        return res
            .set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
            .send(html);
    }

    // Set data to firestore document
    await ref.set({ result: result }, { merge: true });

    return res
        .set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
        .send(html);
};
