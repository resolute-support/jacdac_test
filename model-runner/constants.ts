namespace jacdac {
    // Service Model Runner constants
    export const SRV_MODEL_RUNNER = 0x140f9a78

    export const enum ModelRunnerModelFormat { // uint32_t
        //% block="tflite"
        TFLite = 0x334c4654,
        //% block="ml4f"
        ML4F = 0x30470f62,
        //% block="edge impulse compiled"
        EdgeImpulseCompiled = 0x30564945,
    }

    export const enum ModelRunnerCmd {
        /**
         * Argument: model_size B uint32_t. Open pipe for streaming in the model. The size of the model has to be declared upfront.
         * The model is streamed over regular pipe data packets.
         * The format supported by this instance of the service is specified in `format` register.
         * When the pipe is closed, the model is written all into flash, and the device running the service may reset.
         *
         * ```
         * const [modelSize] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        SetModel = 0x80,

        /**
         * report SetModel
         * ```
         * const [modelPort] = jdunpack<[number]>(buf, "u16")
         * ```
         */

        /**
         * Argument: outputs pipe (bytes). Open channel that can be used to manually invoke the model. When enough data is sent over the `inputs` pipe, the model is invoked,
         * and results are send over the `outputs` pipe.
         *
         * ```
         * const [outputs] = jdunpack<[Buffer]>(buf, "b[12]")
         * ```
         */
        Predict = 0x81,

        /**
         * report Predict
         * ```
         * const [inputs] = jdunpack<[number]>(buf, "u16")
         * ```
         */
    }

    export namespace ModelRunnerCmdPack {
        /**
         * Pack format for 'set_model' register data.
         */
        export const SetModel = "u32"

        /**
         * Pack format for 'set_model' register data.
         */
        export const SetModelReport = "u16"

        /**
         * Pack format for 'predict' register data.
         */
        export const Predict = "b[12]"

        /**
         * Pack format for 'predict' register data.
         */
        export const PredictReport = "u16"
    }

    export const enum ModelRunnerReg {
        /**
         * Read-write uint16_t. When register contains `N > 0`, run the model automatically every time new `N` samples are collected.
         * Model may be run less often if it takes longer to run than `N * sampling_interval`.
         * The `outputs` register will stream its value after each run.
         * This register is not stored in flash.
         *
         * ```
         * const [autoInvokeEvery] = jdunpack<[number]>(buf, "u16")
         * ```
         */
        AutoInvokeEvery = 0x80,

        /**
         * Read-only. Results of last model invocation as `float32` array.
         *
         * ```
         * const [output] = jdunpack<[number[]]>(buf, "f32[]")
         * ```
         */
        Outputs = 0x101,

        /**
         * Read-only. The shape of the input tensor.
         *
         * ```
         * const [dimension] = jdunpack<[number[]]>(buf, "u16[]")
         * ```
         */
        InputShape = 0x180,

        /**
         * Read-only. The shape of the output tensor.
         *
         * ```
         * const [dimension] = jdunpack<[number[]]>(buf, "u16[]")
         * ```
         */
        OutputShape = 0x181,

        /**
         * Read-only μs uint32_t. The time consumed in last model execution.
         *
         * ```
         * const [lastRunTime] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        LastRunTime = 0x182,

        /**
         * Read-only B uint32_t. Number of RAM bytes allocated for model execution.
         *
         * ```
         * const [allocatedArenaSize] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        AllocatedArenaSize = 0x183,

        /**
         * Read-only B uint32_t. The size of the model in bytes.
         *
         * ```
         * const [modelSize] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        ModelSize = 0x184,

        /**
         * Read-only string (bytes). Textual description of last error when running or loading model (if any).
         *
         * ```
         * const [lastError] = jdunpack<[string]>(buf, "s")
         * ```
         */
        LastError = 0x185,

        /**
         * Constant ModelFormat (uint32_t). The type of ML models supported by this service.
         * `TFLite` is flatbuffer `.tflite` file.
         * `ML4F` is compiled machine code model for Cortex-M4F.
         * The format is typically present as first or second little endian word of model file.
         *
         * ```
         * const [format] = jdunpack<[jacdac.ModelRunnerModelFormat]>(buf, "u32")
         * ```
         */
        Format = 0x186,

        /**
         * Constant uint32_t. A version number for the format.
         *
         * ```
         * const [formatVersion] = jdunpack<[number]>(buf, "u32")
         * ```
         */
        FormatVersion = 0x187,

        /**
         * Constant bool (uint8_t). If present and true this service can run models independently of other
         * instances of this service on the device.
         *
         * ```
         * const [parallel] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Parallel = 0x188,
    }

    export namespace ModelRunnerRegPack {
        /**
         * Pack format for 'auto_invoke_every' register data.
         */
        export const AutoInvokeEvery = "u16"

        /**
         * Pack format for 'outputs' register data.
         */
        export const Outputs = "r: f32"

        /**
         * Pack format for 'input_shape' register data.
         */
        export const InputShape = "r: u16"

        /**
         * Pack format for 'output_shape' register data.
         */
        export const OutputShape = "r: u16"

        /**
         * Pack format for 'last_run_time' register data.
         */
        export const LastRunTime = "u32"

        /**
         * Pack format for 'allocated_arena_size' register data.
         */
        export const AllocatedArenaSize = "u32"

        /**
         * Pack format for 'model_size' register data.
         */
        export const ModelSize = "u32"

        /**
         * Pack format for 'last_error' register data.
         */
        export const LastError = "s"

        /**
         * Pack format for 'format' register data.
         */
        export const Format = "u32"

        /**
         * Pack format for 'format_version' register data.
         */
        export const FormatVersion = "u32"

        /**
         * Pack format for 'parallel' register data.
         */
        export const Parallel = "u8"
    }
}
