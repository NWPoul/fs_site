//debugger

function markFirstTimersBookings() {
    const tdList = document.querySelectorAll('td.MuiTableCell-sizeMedium:nth-child(4)')

    if (!tdList?.length > 0) return
    formatFirstTimerTd(tdList)
}

function formatFirstTimerTd(tdList) {
    tdList.forEach(td => {
        if ( (td.innerHTML.includes("Общий") || td.innerHTML.includes("Спорт")) === false) {
            td.innerHTML = 'ПР'
            // td.style.color = 'red'
            td.setAttribute("data-pr", "1")
        } else {
            td.innerHTML = 'Спорт'
        }
    })
}

function checkSlotFreetime() {
    const tdList = document.querySelectorAll('td.booking__timeslot-row-time')
    const trList = document.querySelector('tbody.MuiTableBody-root')?.rows

    if (!tdList?.length > 0 || !trList?.length > 0) return

    tdList.forEach(td => {
        const curRowspan = Number(td.attributes.rowspan.value)
        const curTr = td.parentNode
        const reqTr = trList[curTr.sectionRowIndex + curRowspan - 1]
        if (reqTr.classList.contains('booking__timeslot-row-btn_add')) {
            td.classList.toggle('hasFreeTime', true)
        }
    })
}



function addMagicBtn() {
    const target = document.querySelector('div.booking-header__left')
    if (!target) return
    if (document.getElementById('magicBtn')) return

    // console.log(target)
    const magicBtn = document.createElement('button')
    magicBtn.id = 'magicBtn'
    magicBtn.innerHTML = 'ПР'
    magicBtn.onclick = () => {
        markFirstTimersBookings()
        checkSlotFreetime()
    }
    target.append(magicBtn)
}


 window.onload = () => {
    setTimeout(
        addMagicBtn,
        500
    )
    // setTimeout(
    //     serMutationObserver,
    //     500
    // )
    // setTimeout(
    //     markFirstTimersBookings,
    //     3000
    // )
    // setInterval(
    //     markFirstTimersBookings,
    //     60000
    // )
}

setTimeout(
    addMagicBtn,
    500
)