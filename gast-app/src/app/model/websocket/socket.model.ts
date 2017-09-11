export interface Socket {
    close()
    send(string)
    onopen?: Function
    onclose?: Function
    onmessage?: Function
    onerror?: Function
}
