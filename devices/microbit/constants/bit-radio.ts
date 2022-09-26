namespace jacdac {
    // Service bit:radio constants
    export const SRV_BIT_RADIO = 0x1ac986cf
    export const enum BitRadioReg {
        /**
         * Read-write bool (uint8_t). Turns on/off the radio antenna.
         *
         * ```
         * const [enabled] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Enabled = 0x1,

        /**
         * Read-write uint8_t. Group used to filter packets
         *
         * ```
         * const [group] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Group = 0x80,

        /**
         * Read-write uint8_t. Antenna power to increase or decrease range.
         *
         * ```
         * const [transmissionPower] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        TransmissionPower = 0x81,

        /**
         * Read-write uint8_t. Change the transmission and reception band of the radio to the given channel.
         *
         * ```
         * const [frequencyBand] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        FrequencyBand = 0x82,
    }

    export namespace BitRadioRegPack {
        /**
         * Pack format for 'enabled' register data.
         */
        export const Enabled = "u8"

        /**
         * Pack format for 'group' register data.
         */
        export const Group = "u8"

        /**
         * Pack format for 'transmission_power' register data.
         */
        export const TransmissionPower = "u8"

        /**
         * Pack format for 'frequency_band' register data.
         */
        export const FrequencyBand = "u8"
    }

    export const enum BitRadioCmd {
        /**
         * Argument: message string (bytes). Sends a string payload as a radio message, maximum 18 characters.
         *
         * ```
         * const [message] = jdunpack<[string]>(buf, "s")
         * ```
         */
        SendString = 0x80,

        /**
         * Argument: value f64 (uint64_t). Sends a double precision number payload as a radio message
         *
         * ```
         * const [value] = jdunpack<[number]>(buf, "f64")
         * ```
         */
        SendNumber = 0x81,

        /**
         * Sends a double precision number and a name payload as a radio message
         *
         * ```
         * const [value, name] = jdunpack<[number, string]>(buf, "f64 s")
         * ```
         */
        SendValue = 0x82,

        /**
         * Argument: data bytes. Sends a payload of bytes as a radio message
         *
         * ```
         * const [data] = jdunpack<[Buffer]>(buf, "b")
         * ```
         */
        SendBuffer = 0x83,

        /**
         * Raised when a string packet is received
         *
         * ```
         * const [time, deviceSerialNumber, rssi, message] = jdunpack<[number, number, number, string]>(buf, "u32 u32 i8 x[1] s")
         * ```
         */
        StringReceived = 0x90,

        /**
         * Raised when a number packet is received
         *
         * ```
         * const [time, deviceSerialNumber, rssi, value, name] = jdunpack<[number, number, number, number, string]>(buf, "u32 u32 i8 x[3] f64 s")
         * ```
         */
        NumberReceived = 0x91,

        /**
         * Raised when a buffer packet is received
         *
         * ```
         * const [time, deviceSerialNumber, rssi, data] = jdunpack<[number, number, number, Buffer]>(buf, "u32 u32 i8 x[1] b")
         * ```
         */
        BufferReceived = 0x92,
    }

    export namespace BitRadioCmdPack {
        /**
         * Pack format for 'send_string' register data.
         */
        export const SendString = "s"

        /**
         * Pack format for 'send_number' register data.
         */
        export const SendNumber = "f64"

        /**
         * Pack format for 'send_value' register data.
         */
        export const SendValue = "f64 s"

        /**
         * Pack format for 'send_buffer' register data.
         */
        export const SendBuffer = "b"

        /**
         * Pack format for 'string_received' register data.
         */
        export const StringReceived = "u32 u32 i8 b[1] s"

        /**
         * Pack format for 'number_received' register data.
         */
        export const NumberReceived = "u32 u32 i8 b[3] f64 s"

        /**
         * Pack format for 'buffer_received' register data.
         */
        export const BufferReceived = "u32 u32 i8 b[1] b"
    }
}
