let k = 0
let dk = 5
forever(() => {
    modules.dualMotors1.run(k, -k)
    k += dk
    if (Math.abs(k) > 100) dk = -dk
    pause(100)
})
