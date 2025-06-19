const showTime = document.querySelector('.timer')

let time = 60;


const timer = setInterval(() => {
    // console.log(time);
    const countDownMin = Math.floor(time / 60);
    const countDownSec = time % 60;
   
    showTime.textContent = `${Math.round(countDownMin)}:${countDownSec < 10 ? '0' : ''}${countDownSec}`
    // console.log(`Time remaining: ${Math.round(countDownMin)}:${countDownSec < 10 ? '0' : ''}${countDownSec}`);
    if (time === 0) clearInterval(timer)
    time--;
}, 1000)

