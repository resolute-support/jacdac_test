namespace jacdac {
    // Service Braille display constants
    export const SRV_BRAILLE_DISPLAY = 0x13bfb7cc
    export const enum BrailleDisplayReg {
        /**
         * Read-write bool (uint8_t). Determines if the braille display is active.
         *
         * ```
         * const [enabled] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Enabled = 0x1,

        /**
         * Read-write string (bytes). Braille patterns to show. Must be unicode characters between `0x2800` and `0x28ff`.
         *
         * ```
         * const [patterns] = jdunpack<[string]>(buf, "s")
         * ```
         */
        Patterns = 0x2,

        /**
         * Constant # uint8_t. Gets the number of patterns that can be displayed.
         *
         * ```
         * const [length] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Length = 0x181,
    }

    export namespace BrailleDisplayRegPack {
        /**
         * Pack format for 'enabled' register data.
         */
        export const Enabled = "u8"

        /**
         * Pack format for 'patterns' register data.
         */
        export const Patterns = "s"

        /**
         * Pack format for 'length' register data.
         */
        export const Length = "u8"
    }
}
