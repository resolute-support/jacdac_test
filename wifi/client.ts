namespace jacdac {
    const CMD_SCAN = 0x80
    const CMD_CONNECT = 0x81
    const CMD_DISCONNECT = 0x82

    const EV_GOT_IP = 0x01
    const EV_LOST_IP = 0x02

    export class WifiClient extends jacdac.SimpleSensorClient {
        constructor(role: string) {
            super(jacdac.SRV_WIFI, role, "i8")
        }

        get hasIP() {
            return this.systemActive
        }

        /**
         * Current signal strength. Returns -128 when not connected.
         */
        rssi(): number {
            return this.reading()
        }

        scan() {
            if (!this.device) return []
            const s = new InPipe()
            this.sendCommandWithAck(s.openCommand(CMD_SCAN))
            const elts = s.readList(b => net.AccessPoint.fromBuffer(b))
            elts.sort((x, y) => y.rssi - x.rssi)
            return elts
        }

        connect(ssid: string, password?: string) {
            const data = ssid + "\u0000" + (password ? password + "\u0000" : "")
            this.sendCommandWithAck(
                JDPacket.from(CMD_CONNECT, Buffer.fromUTF8(data))
            )
            pauseUntil(() => this.hasIP, 15000)
            if (!this.hasIP) throw "Can't connect"
            return true
        }
    }
    export class WifiController extends net.Controller {
        wifiClient: WifiClient
        tcpClient: TcpClient
        private sockets: Socket[]
        private _ssid: string

        constructor() {
            super()
            this.sockets = []
        }

        start() {
            if (this.wifiClient) return

            this.wifiClient = new WifiClient("wifi")
            this.wifiClient.start()
            this.tcpClient = new TcpClient("tcp")
            this.tcpClient.start()
        }

        public scanNetworks(): net.AccessPoint[] {
            this.start()
            pauseUntil(() => this.wifiClient.isConnected())
            return this.wifiClient.scan()
        }

        public socket(): number {
            const s = this.tcpClient.mkSocket()
            for (let i = 0; i < this.sockets.length; ++i) {
                if (!this.sockets[i]) {
                    this.sockets[i] = s
                    return i
                }
            }
            this.sockets.push(s)
            return this.sockets.length - 1
        }

        public socketConnect(
            socketNum: number,
            dest: string | Buffer,
            port: number,
            connMode = net.TCP_MODE
        ): boolean {
            if (connMode != net.TLS_MODE) throw "only SSL supported now"
            if (typeof dest != "string") throw "only string hostnames supported"

            const s = this.sockets[socketNum]
            if (!s) throw "no such socket"

            try {
                s.connectSSL(dest, port)
                return true
            } catch {
                return false
            }
        }

        public socketWrite(socketNum: number, buffer: Buffer): void {
            const s = this.sockets[socketNum]
            if (!s) return
            s.write(buffer)
        }

        public socketAvailable(socketNum: number): number {
            const s = this.sockets[socketNum]
            if (!s) return 0
            return s.bytesAvailable()
        }

        public socketRead(socketNum: number, size: number): Buffer {
            const s = this.sockets[socketNum]
            if (!s) return undefined
            return s.read()
        }

        public socketClose(socketNum: number): void {
            const s = this.sockets[socketNum]
            if (!s) return
            s.close()
        }

        public hostbyName(hostname: string): Buffer {
            return undefined
        }

        get isIdle(): boolean {
            return this.wifiClient && this.wifiClient.isConnected()
        }

        get isConnected(): boolean {
            return this.wifiClient && this.wifiClient.hasIP
        }

        /**
         * Uses RSSID and password in settings to connect to a compatible AP
         */
        public connectAP(ssid: string, pwd: string): boolean {
            return this.wifiClient.connect(ssid, pwd)
        }

        get ssid(): string {
            return this._ssid
        }
        get MACaddress(): Buffer {
            if (this.wifiClient && this.wifiClient.device)
                return Buffer.fromHex(
                    this.wifiClient.device.deviceId.slice(2, 14)
                )
            return undefined
        }

        public ping(dest: string, ttl: number = 250): number {
            return -1
        }
    }

    // initialize default controller and net.Net instance
    // new net.Net(() => new WifiController())
}
