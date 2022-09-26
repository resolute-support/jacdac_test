namespace modules {
    /**
     * A sensor measuring air pressure of outside environment.
     **/
    //% fixedInstances blockGap=8
    export class AirPressureClient extends jacdac.SimpleSensorClient {
        private readonly _pressureError: jacdac.RegisterClient<[number]>

        constructor(role: string) {
            super(
                jacdac.SRV_AIR_PRESSURE,
                role,
                jacdac.AirPressureRegPack.Pressure
            )

            this._pressureError = this.addRegister<[number]>(
                jacdac.AirPressureReg.PressureError,
                jacdac.AirPressureRegPack.PressureError,
                jacdac.RegisterClientFlags.Optional
            )
        }

        /**
         * The air pressure.
         */
        //% callInDebugger
        //% group="Environment"
        //% block="%airpressure pressure (hPa)"
        //% blockId=jacdac_airpressure_pressure___get
        //% weight=100
        pressure(): number {
            return this.reading()
        }

        /**
         * The real pressure is between `pressure - pressure_error` and `pressure + pressure_error`.
         */
        //% callInDebugger
        //% group="Environment"
        //% weight=99
        pressureError(): number {
            this.start()
            const values = this._pressureError.pauseUntilValues() as any[]
            return values[0]
        }

        /**
         * Run code when the pressure changes by the given threshold value.
         */
        //% group="Environment"
        //% blockId=jacdac_airpressure_on_pressure_change
        //% block="on %airpressure pressure changed by %threshold (hPa)"
        //% weight=98
        //% threshold.min=0
        //% threshold.max=1040
        //% threshold.defl=1
        onPressureChangedBy(threshold: number, handler: () => void): void {
            this.onReadingChangedBy(threshold, handler)
        }
    }

    //% fixedInstance whenUsed weight=1 block="air pressure1"
    export const airPressure1 = new AirPressureClient("air Pressure1")
}
