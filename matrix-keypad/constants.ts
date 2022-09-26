namespace jacdac {
    // Service Matrix Keypad constants
    export const SRV_MATRIX_KEYPAD = 0x13062dc8

    export const enum MatrixKeypadVariant { // uint8_t
        //% block="membrane"
        Membrane = 0x1,
        //% block="keyboard"
        Keyboard = 0x2,
        //% block="elastomer"
        Elastomer = 0x3,
        //% block="elastomer ledpixel"
        ElastomerLEDPixel = 0x4,
    }

    export const enum MatrixKeypadReg {
        /**
         * Read-only. The coordinate of the button currently pressed. Keys are zero-indexed from left to right, top to bottom:
         * ``row = index / columns``, ``column = index % columns``.
         *
         * ```
         * const [index] = jdunpack<[number[]]>(buf, "u8[]")
         * ```
         */
        Pressed = 0x101,

        /**
         * Constant # uint8_t. Number of rows in the matrix
         *
         * ```
         * const [rows] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Rows = 0x180,

        /**
         * Constant # uint8_t. Number of columns in the matrix
         *
         * ```
         * const [columns] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Columns = 0x181,

        /**
         * Constant. The characters printed on the keys if any, in indexing sequence.
         *
         * ```
         * const [label] = jdunpack<[string[]]>(buf, "z[]")
         * ```
         */
        Labels = 0x182,

        /**
         * Constant Variant (uint8_t). The type of physical keypad. If the variant is ``ElastomerLEDPixel``
         * and the next service on the device is a ``LEDPixel`` service, it is considered
         * as the service controlling the LED pixel on the keypad.
         *
         * ```
         * const [variant] = jdunpack<[jacdac.MatrixKeypadVariant]>(buf, "u8")
         * ```
         */
        Variant = 0x107,
    }

    export namespace MatrixKeypadRegPack {
        /**
         * Pack format for 'pressed' register data.
         */
        export const Pressed = "r: u8"

        /**
         * Pack format for 'rows' register data.
         */
        export const Rows = "u8"

        /**
         * Pack format for 'columns' register data.
         */
        export const Columns = "u8"

        /**
         * Pack format for 'labels' register data.
         */
        export const Labels = "r: z"

        /**
         * Pack format for 'variant' register data.
         */
        export const Variant = "u8"
    }

    export const enum MatrixKeypadEvent {
        /**
         * Argument: uint8_t. Emitted when a key, at the given index, goes from inactive (`pressed == 0`) to active.
         *
         * ```
         * const [down] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        //% block="down"
        Down = 0x1,

        /**
         * Argument: uint8_t. Emitted when a key, at the given index, goes from active (`pressed == 1`) to inactive.
         *
         * ```
         * const [up] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        //% block="up"
        Up = 0x2,

        /**
         * Argument: uint8_t. Emitted together with `up` when the press time was not longer than 500ms.
         *
         * ```
         * const [click] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        //% block="click"
        Click = 0x80,

        /**
         * Argument: uint8_t. Emitted together with `up` when the press time was more than 500ms.
         *
         * ```
         * const [longClick] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        //% block="long click"
        LongClick = 0x81,
    }

    export namespace MatrixKeypadEventPack {
        /**
         * Pack format for 'down' register data.
         */
        export const Down = "u8"

        /**
         * Pack format for 'up' register data.
         */
        export const Up = "u8"

        /**
         * Pack format for 'click' register data.
         */
        export const Click = "u8"

        /**
         * Pack format for 'long_click' register data.
         */
        export const LongClick = "u8"
    }
}
