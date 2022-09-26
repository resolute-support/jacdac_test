namespace modules {
    class ToneToPlay {
        constructor(public payload: Buffer, public timestamp: number) {}
    }

    /*
    private player: JDMelodyPlayer
    playMelody(melody: music.Melody, volume: number = 255) {
        if (this.player) this.player.stop()
        this.player = new JDMelodyPlayer(melody, this)
        // cancel effects of music.volume()
        this.player.play(Math.idiv(volume << 8, music.volume()))
    }
    */

    class JDMelodyPlayer extends music.MelodyPlayer {
        private queue: ToneToPlay[]

        constructor(m: music.Melody, private musicClient: BuzzerClient) {
            super(m)
        }

        stop() {
            this.queue = null
            super.stop()
        }

        private playLoop() {
            while (true) {
                if (this.queue == null) break
                const e = this.queue.shift()
                if (!e) {
                    this.queue = null
                    return
                }
                const now = control.millis()
                const delta = e.timestamp - now
                if (delta > 0) pause(delta)
                this.musicClient.sendCommand(
                    jacdac.JDPacket.from(jacdac.BuzzerCmd.PlayTone, e.payload)
                )
            }
        }

        protected queuePlayInstructions(timeDelta: number, buf: Buffer) {
            const isize = 12
            let timestamp = control.millis() + timeDelta
            let startPlay = false
            if (this.queue == null) {
                this.queue = []
                startPlay = true
            }
            for (let off = 0; off < buf.length - (isize - 1); off += isize) {
                const ibuf = buf.slice(off, isize)
                const [
                    soundWave,
                    flags,
                    frequency,
                    duration,
                    startVolume,
                    endVolume,
                    endFrequency,
                ] = jacdac.jdunpack<number[]>(ibuf, "u8 u8 u16 u16 u16 u16 u16")
                const freq = (frequency + endFrequency) >> 1
                const vol = (startVolume + endVolume) >> 1
                this.queue.push(
                    new ToneToPlay(tonePayload(freq, duration, vol), timestamp)
                )
                timestamp += duration
            }
            if (startPlay) control.runInParallel(() => this.playLoop())
        }
    }
}
