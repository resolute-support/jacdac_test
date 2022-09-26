namespace jacdac {
    // Service Temperature constants
    export const SRV_TEMPERATURE = 0x1421bac7

    export const enum TemperatureVariant { // uint8_t
        //% block="outdoor"
        Outdoor = 0x1,
        //% block="indoor"
        Indoor = 0x2,
        //% block="body"
        Body = 0x3,
    }

    export const enum TemperatureReg {
        /**
         * Read-only °C i22.10 (int32_t). The temperature.
         *
         * ```
         * const [temperature] = jdunpack<[number]>(buf, "i22.10")
         * ```
         */
        Temperature = 0x101,

        /**
         * Constant °C i22.10 (int32_t). Lowest temperature that can be reported.
         *
         * ```
         * const [minTemperature] = jdunpack<[number]>(buf, "i22.10")
         * ```
         */
        MinTemperature = 0x104,

        /**
         * Constant °C i22.10 (int32_t). Highest temperature that can be reported.
         *
         * ```
         * const [maxTemperature] = jdunpack<[number]>(buf, "i22.10")
         * ```
         */
        MaxTemperature = 0x105,

        /**
         * Read-only °C u22.10 (uint32_t). The real temperature is between `temperature - temperature_error` and `temperature + temperature_error`.
         *
         * ```
         * const [temperatureError] = jdunpack<[number]>(buf, "u22.10")
         * ```
         */
        TemperatureError = 0x106,

        /**
         * Constant Variant (uint8_t). Specifies the type of thermometer.
         *
         * ```
         * const [variant] = jdunpack<[jacdac.TemperatureVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

    export namespace TemperatureRegPack {
        /**
         * Pack format for 'temperature' register data.
         */
        export const Temperature = "i22.10"

        /**
         * Pack format for 'min_temperature' register data.
         */
        export const MinTemperature = "i22.10"

        /**
         * Pack format for 'max_temperature' register data.
         */
        export const MaxTemperature = "i22.10"

        /**
         * Pack format for 'temperature_error' register data.
         */
        export const TemperatureError = "u22.10"

        /**
         * Pack format for 'variant' register data.
         */
        export const Variant = "u8"
    }
}
