namespace modules {
    /**
     * A sensor approximating the heart rate.
     *
     *
     * **Jacdac is NOT suitable for medical devices and should NOT be used in any kind of device to diagnose or treat any medical conditions.**
     **/
    //% fixedInstances blockGap=8
    export class HeartRateClient extends jacdac.SimpleSensorClient {
        private readonly _heartRateError: jacdac.RegisterClient<[number]>
        private readonly _variant: jacdac.RegisterClient<
            [jacdac.HeartRateVariant]
        >

        constructor(role: string) {
            super(
                jacdac.SRV_HEART_RATE,
                role,
                jacdac.HeartRateRegPack.HeartRate
            )

            this._heartRateError = this.addRegister<[number]>(
                jacdac.HeartRateReg.HeartRateError,
                jacdac.HeartRateRegPack.HeartRateError,
                jacdac.RegisterClientFlags.Optional
            )
            this._variant = this.addRegister<[jacdac.HeartRateVariant]>(
                jacdac.HeartRateReg.Variant,
                jacdac.HeartRateRegPack.Variant,
                jacdac.RegisterClientFlags.Optional |
                    jacdac.RegisterClientFlags.Const
            )
        }

        /**
         * The estimated heart rate.
         */
        //% callInDebugger
        //% group="Biometric"
        //% block="%heartrate heart rate (bpm)"
        //% blockId=jacdac_heartrate_heart_rate___get
        //% weight=100
        heartRate(): number {
            return this.reading()
        }

        /**
         * The estimated error on the reported sensor data.
         */
        //% callInDebugger
        //% group="Biometric"
        //% weight=99
        heartRateError(): number {
            this.start()
            const values = this._heartRateError.pauseUntilValues() as any[]
            return values[0]
        }

        /**
         * The type of physical sensor
         */
        //% callInDebugger
        //% group="Biometric"
        //% weight=98
        variant(): jacdac.HeartRateVariant {
            this.start()
            const values = this._variant.pauseUntilValues() as any[]
            return values[0]
        }

        /**
         * Run code when the heart rate changes by the given threshold value.
         */
        //% group="Biometric"
        //% blockId=jacdac_heartrate_on_heart_rate_change
        //% block="on %heartrate heart rate changed by %threshold (bpm)"
        //% weight=97
        //% threshold.min=0
        //% threshold.max=200
        //% threshold.defl=1
        onHeartRateChangedBy(threshold: number, handler: () => void): void {
            this.onReadingChangedBy(threshold, handler)
        }
    }

    //% fixedInstance whenUsed weight=1 block="heart rate1"
    export const heartRate1 = new HeartRateClient("heart Rate1")
}
