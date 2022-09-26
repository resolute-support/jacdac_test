namespace jacdac {
    // Service UV index constants
    export const SRV_UV_INDEX = 0x1f6e0d90

    export const enum UvIndexVariant { // uint8_t
        //% block="uva uvb"
        UVA_UVB = 0x1,
        //% block="visible ir"
        Visible_IR = 0x2,
    }

    export const enum UvIndexReg {
        /**
         * Read-only uv u16.16 (uint32_t). Ultraviolet index, typically refreshed every second.
         *
         * ```
         * const [uvIndex] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        UvIndex = 0x101,

        /**
         * Read-only uv u16.16 (uint32_t). Error on the UV measure.
         *
         * ```
         * const [uvIndexError] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        UvIndexError = 0x106,

        /**
         * Constant Variant (uint8_t). The type of physical sensor and capabilities.
         *
         * ```
         * const [variant] = jdunpack<[jacdac.UvIndexVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

    export namespace UvIndexRegPack {
        /**
         * Pack format for 'uv_index' register data.
         */
        export const UvIndex = "u16.16"

        /**
         * Pack format for 'uv_index_error' register data.
         */
        export const UvIndexError = "u16.16"

        /**
         * Pack format for 'variant' register data.
         */
        export const Variant = "u8"
    }
}
