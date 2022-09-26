namespace jacdac {
    // Service DMX constants
    export const SRV_DMX = 0x11cf8c05
    export const enum DmxReg {
        /**
         * Read-write bool (uint8_t). Determines if the DMX bridge is active.
         *
         * ```
         * const [enabled] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Enabled = 0x1,
    }

    export namespace DmxRegPack {
        /**
         * Pack format for 'enabled' register data.
         */
        export const Enabled = "u8"
    }

    export const enum DmxCmd {
        /**
         * Argument: channels bytes. Send a DMX packet, up to 236bytes long, including the start code.
         *
         * ```
         * const [channels] = jdunpack<[Buffer]>(buf, "b")
         * ```
         */
        Send = 0x80,
    }

    export namespace DmxCmdPack {
        /**
         * Pack format for 'send' register data.
         */
        export const Send = "b"
    }
}
