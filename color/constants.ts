namespace jacdac {
    // Service Color constants
    export const SRV_COLOR = 0x1630d567
    export const enum ColorReg {
        /**
         * Detected color in the RGB color space.
         *
         * ```
         * const [red, green, blue] = jdunpack<[number, number, number]>(buf, "u0.16 u0.16 u0.16")
         * ```
         */
        Color = 0x101,
    }

    export namespace ColorRegPack {
        /**
         * Pack format for 'color' register data.
         */
        export const Color = "u0.16 u0.16 u0.16"
    }
}
