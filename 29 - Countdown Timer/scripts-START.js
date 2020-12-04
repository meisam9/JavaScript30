let countdown
const timerDisplay=document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time');
const buttons=document.querySelectorAll('[data-time]')

function timer(second){
    // clear other timers
    clearInterval(countdown)

    const now=Date.now()
    const then=now + second * 1000
    displayTimeLeft(second)
    displayEndTime(then)

    countdown =setInterval(()=>{
        const secondLeft= Math.round((then - Date.now()) / 1000)

        if(secondLeft < 0){
            clearInterval(countdown)
            return
        }

        displayTimeLeft(secondLeft)

    },1000)
}

function displayTimeLeft(second){
    const minutes=Math.floor(second / 60)
    const remainderSeconds=second % 60
    const display= `${minutes}:${remainderSeconds<10?'0':''}${remainderSeconds}`
    document.title=display
    timerDisplay.textContent=display
}

function displayEndTime(seconds){
    const end= new Date(seconds)
    const hour = end.getHours()
    const minutes=end.getMinutes()
    endTime.textContent= `Be back at ${hour}:${minutes<10?"0":""} ${minutes}`
}

function startTimer(){
    const second= parseInt(this.dataset.time)
    timer(second)
}

buttons.forEach(btn=>btn.addEventListener('click',startTimer))

document.customForm.addEventListener('submit',function(e){
    e.preventDefault()
    const mins=this.minutes.value
    timer(mins * 60)
    this.reset()
})