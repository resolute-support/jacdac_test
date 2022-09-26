namespace modules {
    /**
     * Senses RGB colors
     **/
    //% fixedInstances blockGap=8
    export class ColorClient extends jacdac.SensorClient {
        constructor(role: string) {
            super(jacdac.SRV_COLOR, role, jacdac.ColorRegPack.Color)
        }

        /**
         * Detected color in the RGB color space.
         */
        //% callInDebugger
        //% group="Environment"
        //% block="%color red (\\%)"
        //% blockId=jacdac_color_color_red_get
        //% weight=100
        red(): number {
            this.setStreaming(true)
            const values = this._reading.pauseUntilValues() as any[]
            return values[0] * 100
        }

        /**
         * Detected color in the RGB color space.
         */
        //% callInDebugger
        //% group="Environment"
        //% block="%color green (\\%)"
        //% blockId=jacdac_color_color_green_get
        //% weight=99
        green(): number {
            this.setStreaming(true)
            const values = this._reading.pauseUntilValues() as any[]
            return values[1] * 100
        }

        /**
         * Detected color in the RGB color space.
         */
        //% callInDebugger
        //% group="Environment"
        //% block="%color blue (\\%)"
        //% blockId=jacdac_color_color_blue_get
        //% weight=98
        blue(): number {
            this.setStreaming(true)
            const values = this._reading.pauseUntilValues() as any[]
            return values[2] * 100
        }
    }

    //% fixedInstance whenUsed weight=1 block="color1"
    export const color1 = new ColorClient("color1")
}
