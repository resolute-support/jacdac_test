namespace jacdac {
    // Service Cloud Adapter constants
    export const SRV_CLOUD_ADAPTER = 0x14606e9c

    export const enum CloudAdapterCommandStatus { // uint32_t
        //% block="ok"
        OK = 0xc8,
        //% block="not found"
        NotFound = 0x194,
        //% block="busy"
        Busy = 0x1ad,
    }

    export const enum CloudAdapterCmd {
        /**
         * Upload a labelled tuple of values to the cloud.
         * The tuple will be automatically tagged with timestamp and originating device.
         *
         * ```
         * const [label, value] = jdunpack<[string, number[]]>(buf, "z f64[]")
         * ```
         */
        Upload = 0x80,

        /**
         * Argument: payload bytes. Upload a binary message to the cloud.
         *
         * ```
         * const [payload] = jdunpack<[Buffer]>(buf, "b")
         * ```
         */
        UploadBin = 0x81,

        /**
         * Should be called when it finishes handling a `cloud_command`.
         *
         * ```
         * const [seqNo, status, result] = jdunpack<[number, jacdac.CloudAdapterCommandStatus, number[]]>(buf, "u32 u32 f64[]")
         * ```
         */
        AckCloudCommand = 0x83,
    }

    export namespace CloudAdapterCmdPack {
        /**
         * Pack format for 'upload' register data.
         */
        export const Upload = "z r: f64"

        /**
         * Pack format for 'upload_bin' register data.
         */
        export const UploadBin = "b"

        /**
         * Pack format for 'ack_cloud_command' register data.
         */
        export const AckCloudCommand = "u32 u32 r: f64"
    }

    export const enum CloudAdapterReg {
        /**
         * Read-only bool (uint8_t). Indicate whether we're currently connected to the cloud server.
         * When offline, `upload` commands are queued, and `get_twin` respond with cached values.
         *
         * ```
         * const [connected] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Connected = 0x180,

        /**
         * Read-only string (bytes). User-friendly name of the connection, typically includes name of the server
         * and/or type of cloud service (`"something.cloud.net (Provider IoT)"`).
         *
         * ```
         * const [connectionName] = jdunpack<[string]>(buf, "s")
         * ```
         */
        ConnectionName = 0x181,
    }

    export namespace CloudAdapterRegPack {
        /**
         * Pack format for 'connected' register data.
         */
        export const Connected = "u8"

        /**
         * Pack format for 'connection_name' register data.
         */
        export const ConnectionName = "s"
    }

    export const enum CloudAdapterEvent {
        /**
         * Emitted when cloud requests to run some action.
         *
         * ```
         * const [seqNo, command, argument] = jdunpack<[number, string, number[]]>(buf, "u32 z f64[]")
         * ```
         */
        //% block="cloud command"
        CloudCommand = 0x81,

        /**
         * Emitted when we connect or disconnect from the cloud.
         */
        //% block="change"
        Change = 0x3,
    }

    export namespace CloudAdapterEventPack {
        /**
         * Pack format for 'cloud_command' register data.
         */
        export const CloudCommand = "u32 z r: f64"
    }
}
