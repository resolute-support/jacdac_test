namespace servers {
    export class WiFiServer extends jacdac.SensorServer {
        enabled = true
        loginServerStarted = false

        constructor() {
            super(jacdac.SRV_WIFI, { streamingInterval: 1000 })
        }

        start(): void {
            if (this.running) return
            super.start()
            const controller = net.instance().controller
            controller.onConnectSSIDFailed = (ssid: string) =>
                this.sendEvent(
                    jacdac.WifiEvent.ConnectionFailed,
                    jacdac.jdpack("s", [ssid])
                )
            controller.onEvent(net.ControllerEvent.GotIP, () =>
                this.sendEvent(jacdac.WifiEvent.GotIp)
            )
            controller.onEvent(net.ControllerEvent.LostIP, () =>
                this.sendEvent(jacdac.WifiEvent.LostIp)
            )
            controller.onEvent(net.ControllerEvent.NewScan, () => {
                const wifis = net.knownAccessPoints()
                const total = controller.lastScanResults.length
                const known = controller.lastScanResults.filter(
                    ap => wifis[ap.ssid] !== undefined
                ).length
                this.sendEvent(
                    jacdac.WifiEvent.ScanComplete,
                    jacdac.jdpack("u16 u16", [total, known])
                )
            })
            controller.onEvent(net.ControllerEvent.LoginServerStarted, () => {
                this.setStatusCode(jacdac.SystemStatusCodes.WaitingForInput)
            })
            controller.autoconnect()
            if (net.instance().controller.isLoginServerEnabled())
                this.setStatusCode(jacdac.SystemStatusCodes.WaitingForInput)
        }

        public serializeState(): Buffer {
            const controller = net.instance().controller
            const rssi = this.enabled ? controller.rssi || -128 : -128
            return jacdac.jdpack("i8", [rssi])
        }

        handleCustomCommand(pkt: jacdac.JDPacket) {
            const controller = net.instance().controller

            const newEn = this.handleRegBool(
                pkt,
                jacdac.WifiReg.Enabled,
                this.enabled
            )
            if (newEn != this.enabled) {
                this.enabled = newEn
                if (this.enabled) controller.autoconnect()
                else controller.disconnect()
            }

            switch (pkt.serviceCommand) {
                case jacdac.WifiReg.IpAddress | jacdac.CMD_GET_REG:
                    pkt.respond(
                        controller.isConnected
                            ? controller.IPaddress
                            : Buffer.create(0)
                    )
                    break
                case jacdac.WifiReg.Eui48 | jacdac.CMD_GET_REG:
                    pkt.respond(controller.MACaddress)
                    break
                case jacdac.WifiReg.Ssid | jacdac.CMD_GET_REG:
                    pkt.respond(Buffer.fromUTF8(controller.ssid || ""))
                    break
                case jacdac.WifiReg.Rssi | jacdac.CMD_GET_REG:
                    pkt.respond(jacdac.jdpack("i8", [controller.rssi || -128]))
                    break
                case jacdac.WifiCmd.LastScanResults:
                    jacdac.OutPipe.respondForEach(
                        pkt,
                        controller.lastScanResults || [],
                        ap => ap.toBuffer()
                    )
                    break
                case jacdac.WifiCmd.Reconnect:
                    controller.disconnectAP()
                    break
                case jacdac.WifiCmd.Scan:
                    control.runInBackground(() => controller.scanNetworks())
                    break
                case jacdac.WifiCmd.AddNetwork: {
                    const [ssid, pwd] = pkt.jdunpack("z z")
                    net.updateAccessPoint(ssid, pwd)
                    this.sendEvent(jacdac.WifiEvent.NetworksChanged)
                    break
                }
                case jacdac.WifiCmd.SetNetworkPriority: {
                    const [pri, ssid] = pkt.jdunpack("i16 s")
                    net.setAccessPointPriority(ssid, pri)
                    this.sendEvent(jacdac.WifiEvent.NetworksChanged)
                    break
                }
                case jacdac.WifiCmd.ForgetNetwork: {
                    const ssid = pkt.stringData
                    net.clearAccessPoint(ssid)
                    // force reconnect
                    controller.disconnectAP()
                    this.sendEvent(jacdac.WifiEvent.NetworksChanged)
                    break
                }
                case jacdac.WifiCmd.ForgetAllNetworks:
                    net.clearAccessPoints()
                    // force reconnect
                    controller.disconnectAP()
                    this.sendEvent(jacdac.WifiEvent.NetworksChanged)
                    break
                case jacdac.WifiCmd.ListKnownNetworks: {
                    const pri = net.accessPointPriorities()
                    jacdac.OutPipe.respondForEach(
                        pkt,
                        Object.keys(net.knownAccessPoints()),
                        ap => jacdac.jdpack("i16 i16 s", [pri[ap] || 0, 0, ap])
                    )
                    break
                }
                default:
                    pkt.possiblyNotImplemented()
                    break
            }
        }
    }

    //% fixedInstance whenUsed weight=1 block="wifi"
    export const wifi = new WiFiServer()
}
