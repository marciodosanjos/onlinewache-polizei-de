import fs from 'fs';
import path from 'path';

export function getAllStateNames(): string[] {
    const stateFile = fs.readFileSync(
        path.join(process.cwd(), 'public', 'state.config.json'),
        'utf-8',
    );
    const stateNames = JSON.parse(stateFile);
    return Object.keys(stateNames);
}

export function getAllArticlesPerState(state: string): string[] {
    const stateFile = fs.readFileSync(
        path.join(process.cwd(), 'public', 'state.config.json'),
        'utf-8',
    );
    const stateNames = JSON.parse(stateFile);
    const currentState = stateNames[state];
    if (!currentState.anzeige) {
        return [];
    }

    const articles = Object.keys(currentState.anzeige);
    if (currentState.extra?.lob) {
        articles.push('lob');
    }
    return articles;
}
