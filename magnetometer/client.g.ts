namespace modules {
    /**
     * A 3-axis magnetometer.
     **/
    //% fixedInstances blockGap=8
    export class MagnetometerClient extends jacdac.SensorClient {
        private readonly _forcesError: jacdac.RegisterClient<[number]>

        constructor(role: string) {
            super(
                jacdac.SRV_MAGNETOMETER,
                role,
                jacdac.MagnetometerRegPack.Forces
            )

            this._forcesError = this.addRegister<[number]>(
                jacdac.MagnetometerReg.ForcesError,
                jacdac.MagnetometerRegPack.ForcesError,
                jacdac.RegisterClientFlags.Optional
            )
        }

        /**
         * Indicates the current magnetic field on magnetometer.
         * For reference: `1 mgauss` is `100 nT` (and `1 gauss` is `100 000 nT`).
         */
        //% callInDebugger
        //% group="Magnetometer"
        //% block="%magnetomer x (nT)"
        //% blockId=jacdac_magnetomer_forces_x_get
        //% weight=100
        x(): number {
            this.setStreaming(true)
            const values = this._reading.pauseUntilValues() as any[]
            return values[0]
        }

        /**
         * Indicates the current magnetic field on magnetometer.
         * For reference: `1 mgauss` is `100 nT` (and `1 gauss` is `100 000 nT`).
         */
        //% callInDebugger
        //% group="Magnetometer"
        //% block="%magnetomer y (nT)"
        //% blockId=jacdac_magnetomer_forces_y_get
        //% weight=99
        y(): number {
            this.setStreaming(true)
            const values = this._reading.pauseUntilValues() as any[]
            return values[1]
        }

        /**
         * Indicates the current magnetic field on magnetometer.
         * For reference: `1 mgauss` is `100 nT` (and `1 gauss` is `100 000 nT`).
         */
        //% callInDebugger
        //% group="Magnetometer"
        //% block="%magnetomer z (nT)"
        //% blockId=jacdac_magnetomer_forces_z_get
        //% weight=98
        z(): number {
            this.setStreaming(true)
            const values = this._reading.pauseUntilValues() as any[]
            return values[2]
        }

        /**
         * Absolute estimated error on the readings.
         */
        //% callInDebugger
        //% group="Magnetometer"
        //% weight=97
        forcesError(): number {
            this.start()
            const values = this._forcesError.pauseUntilValues() as any[]
            return values[0]
        }

        /**
         * Forces a calibration sequence where the user/device
         * might have to rotate to be calibrated.
         */
        //% group="Magnetometer"
        //% blockId=jacdac_magnetomer_calibrate_cmd
        //% block="%magnetomer calibrate"
        //% weight=96
        calibrate(): void {
            this.start()
            this.sendCommand(
                jacdac.JDPacket.onlyHeader(jacdac.MagnetometerCmd.Calibrate)
            )
        }
    }

    //% fixedInstance whenUsed weight=1 block="magnetometer1"
    export const magnetometer1 = new MagnetometerClient("magnetometer1")
}
