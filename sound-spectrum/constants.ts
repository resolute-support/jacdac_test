namespace jacdac {
    // Service Sound Spectrum constants
    export const SRV_SOUND_SPECTRUM = 0x157abc1e
    export const enum SoundSpectrumReg {
        /**
         * Read-only bytes. The computed frequency data.
         *
         * ```
         * const [frequencyBins] = jdunpack<[Buffer]>(buf, "b")
         * ```
         */
        FrequencyBins = 0x101,

        /**
         * Read-write bool (uint8_t). Turns on/off the micropohone.
         *
         * ```
         * const [enabled] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Enabled = 0x1,

        /**
         * Read-write uint8_t. The power of 2 used as the size of the FFT to be used to determine the frequency domain.
         *
         * ```
         * const [fftPow2Size] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        FftPow2Size = 0x80,

        /**
         * Read-write dB int16_t. The minimum power value in the scaling range for the FFT analysis data
         *
         * ```
         * const [minDecibels] = jdunpack<[number]>(buf, "i16")
         * ```
         */
        MinDecibels = 0x81,

        /**
         * Read-write dB int16_t. The maximum power value in the scaling range for the FFT analysis data
         *
         * ```
         * const [maxDecibels] = jdunpack<[number]>(buf, "i16")
         * ```
         */
        MaxDecibels = 0x82,

        /**
         * Read-write ratio u0.8 (uint8_t). The averaging constant with the last analysis frame.
         * If `0` is set, there is no averaging done, whereas a value of `1` means "overlap the previous and current buffer quite a lot while computing the value".
         *
         * ```
         * const [smoothingTimeConstant] = jdunpack<[number]>(buf, "u0.8")
         * ```
         */
        SmoothingTimeConstant = 0x83,
    }

    export namespace SoundSpectrumRegPack {
        /**
         * Pack format for 'frequency_bins' register data.
         */
        export const FrequencyBins = "b"

        /**
         * Pack format for 'enabled' register data.
         */
        export const Enabled = "u8"

        /**
         * Pack format for 'fft_pow2_size' register data.
         */
        export const FftPow2Size = "u8"

        /**
         * Pack format for 'min_decibels' register data.
         */
        export const MinDecibels = "i16"

        /**
         * Pack format for 'max_decibels' register data.
         */
        export const MaxDecibels = "i16"

        /**
         * Pack format for 'smoothing_time_constant' register data.
         */
        export const SmoothingTimeConstant = "u0.8"
    }
}
