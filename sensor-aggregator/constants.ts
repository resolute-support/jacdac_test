namespace jacdac {
    // Service Sensor Aggregator constants
    export const SRV_SENSOR_AGGREGATOR = 0x1d90e1c5

    export const enum SensorAggregatorSampleType { // uint8_t
        //% block="u8"
        U8 = 0x8,
        //% block="i8"
        I8 = 0x88,
        //% block="u16"
        U16 = 0x10,
        //% block="i16"
        I16 = 0x90,
        //% block="u32"
        U32 = 0x20,
        //% block="i32"
        I32 = 0xa0,
    }

    export const enum SensorAggregatorReg {
        /**
         * Set automatic input collection.
         * These settings are stored in flash.
         *
         * ```
         * const [samplingInterval, samplesInWindow, rest] = jdunpack<[number, number, ([Buffer, number, number, number, jacdac.SensorAggregatorSampleType, number])[]]>(buf, "u16 u16 x[4] r: b[8] u32 u8 u8 u8 i8")
         * const [deviceId, serviceClass, serviceNum, sampleSize, sampleType, sampleShift] = rest[0]
         * ```
         */
        Inputs = 0x80,

        /**
         * Read-only uint32_t. Number of input samples collected so far.
         *
         * ```
         * const [numSamples] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        NumSamples = 0x180,

        /**
         * Read-only B uint8_t. Size of a single sample.
         *
         * ```
         * const [sampleSize] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        SampleSize = 0x181,

        /**
         * Read-write # uint32_t. When set to `N`, will stream `N` samples as `current_sample` reading.
         *
         * ```
         * const [streamingSamples] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        StreamingSamples = 0x81,

        /**
         * Read-only bytes. Last collected sample.
         *
         * ```
         * const [currentSample] = jdunpack<[Buffer]>(buf, "b")
         * ```
         */
        CurrentSample = 0x101,
    }

    export namespace SensorAggregatorRegPack {
        /**
         * Pack format for 'inputs' register data.
         */
        export const Inputs = "u16 u16 u32 r: b[8] u32 u8 u8 u8 i8"

        /**
         * Pack format for 'num_samples' register data.
         */
        export const NumSamples = "u32"

        /**
         * Pack format for 'sample_size' register data.
         */
        export const SampleSize = "u8"

        /**
         * Pack format for 'streaming_samples' register data.
         */
        export const StreamingSamples = "u32"

        /**
         * Pack format for 'current_sample' register data.
         */
        export const CurrentSample = "b"
    }
}
