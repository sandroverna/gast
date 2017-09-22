export class AppSettings {
    public static API_ENDPOINT = 'http://localhost:9000';
    public static WS_CHAT = 'ws://localhost:8088/gast-ws-chat';

    static getHeaders(): Headers {
        return new Headers({ 'Content-Type': 'application/json' });
    }

}
