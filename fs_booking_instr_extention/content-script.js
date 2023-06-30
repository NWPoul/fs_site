//debugger

function markFirstTimersBookings() {
    const tdList = document.querySelectorAll('td.MuiTableCell-sizeMedium:nth-child(4)')
    console.log(tdList.length)
    formatFirstTimerTd(tdList)
}

function formatFirstTimerTd(tdList) {
    tdList.forEach(td => {
        if (!td.innerHTML.includes("Общий")) {
            td.innerHTML = 'ПР'
            // td.style.color = 'red'
            td.setAttribute("data-pr", "1")
        } else {
            td.innerHTML = 'Спорт'
        }
    })
}

function addMagicBtn() {
    const target = document.querySelector('div.booking-header__left')
    if (!target) return
    
    console.log(target)
    const magicBtn = document.createElement('button')
    magicBtn.id = 'magicBtn'
    magicBtn.innerHTML = 'ПР'
    magicBtn.onclick = markFirstTimersBookings
    target.append(magicBtn)
}


 console.log(window.onload)
 window.onload = () => {
    setTimeout(
        addMagicBtn,
        500
    )
    // setTimeout(
    //     markFirstTimersBookings,
    //     3000
    // )
    // setInterval(
    //     markFirstTimersBookings,
    //     60000
    // )
}