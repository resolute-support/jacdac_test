namespace jacdac {
    // Service Acidity constants
    export const SRV_ACIDITY = 0x1e9778c5
    export const enum AcidityReg {
        /**
         * Read-only pH u4.12 (uint16_t). The acidity, pH, of water.
         *
         * ```
         * const [acidity] = jdunpack<[number]>(buf, "u4.12")
         * ```
         */
        Acidity = 0x101,

        /**
         * Read-only pH u4.12 (uint16_t). Error on the acidity reading.
         *
         * ```
         * const [acidityError] = jdunpack<[number]>(buf, "u4.12")
         * ```
         */
        AcidityError = 0x106,

        /**
         * Constant pH u4.12 (uint16_t). Lowest acidity that can be reported.
         *
         * ```
         * const [minAcidity] = jdunpack<[number]>(buf, "u4.12")
         * ```
         */
        MinAcidity = 0x104,

        /**
         * Constant pH u4.12 (uint16_t). Highest acidity that can be reported.
         *
         * ```
         * const [maxHumidity] = jdunpack<[number]>(buf, "u4.12")
         * ```
         */
        MaxHumidity = 0x105,
    }

    export namespace AcidityRegPack {
        /**
         * Pack format for 'acidity' register data.
         */
        export const Acidity = "u4.12"

        /**
         * Pack format for 'acidity_error' register data.
         */
        export const AcidityError = "u4.12"

        /**
         * Pack format for 'min_acidity' register data.
         */
        export const MinAcidity = "u4.12"

        /**
         * Pack format for 'max_humidity' register data.
         */
        export const MaxHumidity = "u4.12"
    }
}
