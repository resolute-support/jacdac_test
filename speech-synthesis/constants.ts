namespace jacdac {
    // Service Speech synthesis constants
    export const SRV_SPEECH_SYNTHESIS = 0x1204d995
    export const enum SpeechSynthesisReg {
        /**
         * Read-write bool (uint8_t). Determines if the speech engine is in a non-paused state.
         *
         * ```
         * const [enabled] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Enabled = 0x1,

        /**
         * Read-write string (bytes). Language used for utterances as defined in https://www.ietf.org/rfc/bcp/bcp47.txt.
         *
         * ```
         * const [lang] = jdunpack<[string]>(buf, "s")
         * ```
         */
        Lang = 0x80,

        /**
         * Read-write ratio u0.8 (uint8_t). Volume for utterances.
         *
         * ```
         * const [volume] = jdunpack<[number]>(buf, "u0.8")
         * ```
         */
        Volume = 0x81,

        /**
         * Read-write u16.16 (uint32_t). Pitch for utterances
         *
         * ```
         * const [pitch] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        Pitch = 0x82,

        /**
         * Read-write u16.16 (uint32_t). Rate for utterances
         *
         * ```
         * const [rate] = jdunpack<[number]>(buf, "u16.16")
         * ```
         */
        Rate = 0x83,
    }

    export namespace SpeechSynthesisRegPack {
        /**
         * Pack format for 'enabled' register data.
         */
        export const Enabled = "u8"

        /**
         * Pack format for 'lang' register data.
         */
        export const Lang = "s"

        /**
         * Pack format for 'volume' register data.
         */
        export const Volume = "u0.8"

        /**
         * Pack format for 'pitch' register data.
         */
        export const Pitch = "u16.16"

        /**
         * Pack format for 'rate' register data.
         */
        export const Rate = "u16.16"
    }

    export const enum SpeechSynthesisCmd {
        /**
         * Argument: text string (bytes). Adds an utterance to the utterance queue; it will be spoken when any other utterances queued before it have been spoken.
         *
         * ```
         * const [text] = jdunpack<[string]>(buf, "s")
         * ```
         */
        Speak = 0x80,

        /**
         * No args. Cancels current utterance and all utterances from the utterance queue.
         */
        Cancel = 0x81,
    }

    export namespace SpeechSynthesisCmdPack {
        /**
         * Pack format for 'speak' register data.
         */
        export const Speak = "s"
    }
}
