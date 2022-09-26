namespace jacdac {
    // Service Pressure Button constants
    export const SRV_PRESSURE_BUTTON = 0x281740c3
    export const enum PressureButtonReg {
        /**
         * Read-write ratio u0.16 (uint16_t). Indicates the threshold for ``up`` events.
         *
         * ```
         * const [threshold] = jdunpack<[number]>(buf, "u0.16")
         * ```
         */
        Threshold = 0x6,
    }

    export namespace PressureButtonRegPack {
        /**
         * Pack format for 'threshold' register data.
         */
        export const Threshold = "u0.16"
    }
}
