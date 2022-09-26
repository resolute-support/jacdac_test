namespace jacdac {
    // Service Sound player constants
    export const SRV_SOUND_PLAYER = 0x1403d338
    export const enum SoundPlayerReg {
        /**
         * Read-write ratio u0.16 (uint16_t). Global volume of the output. ``0`` means completely off. This volume is mixed with each play volumes.
         *
         * ```
         * const [volume] = jdunpack<[number]>(buf, "u0.16")
         * ```
         */
        Volume = 0x1,
    }

    export namespace SoundPlayerRegPack {
        /**
         * Pack format for 'volume' register data.
         */
        export const Volume = "u0.16"
    }

    export const enum SoundPlayerCmd {
        /**
         * Argument: name string (bytes). Starts playing a sound.
         *
         * ```
         * const [name] = jdunpack<[string]>(buf, "s")
         * ```
         */
        Play = 0x80,

        /**
         * No args. Cancel any sound playing.
         */
        Cancel = 0x81,

        /**
         * Argument: sounds_port pipe (bytes). Returns the list of sounds available to play.
         *
         * ```
         * const [soundsPort] = jdunpack<[Buffer]>(buf, "b[12]")
         * ```
         */
        ListSounds = 0x82,
    }

    export namespace SoundPlayerCmdPack {
        /**
         * Pack format for 'play' register data.
         */
        export const Play = "s"

        /**
         * Pack format for 'list_sounds' register data.
         */
        export const ListSounds = "b[12]"
    }

    /**
     * pipe_report ListSoundsPipe
     * ```
     * const [duration, name] = jdunpack<[number, string]>(buf, "u32 s")
     * ```
     */

    export namespace SoundPlayerinfoPack {
        /**
         * Pack format for 'list_sounds_pipe' register data.
         */
        export const ListSoundsPipe = "u32 s"
    }
}
