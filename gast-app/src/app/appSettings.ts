export class AppSettings {
    public static API_ENDPOINT = 'http://localhost:9000';
    public static WS_CHAT = 'ws://localhost:8080/gastwebsocket';

    static getHeaders(): Headers {
        return new Headers({ 'Content-Type': 'application/json' });
    }

}
