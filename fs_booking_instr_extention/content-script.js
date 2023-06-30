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

function checkSlotFreetime() {
    const tdList = document.querySelectorAll('td.booking__timeslot-row-time')
    const trList = document.querySelector('tbody.MuiTableBody-root')?.rows

    tdList.forEach(td => {
        const curRowspan = Number(td.attributes.rowspan.value)
        const curTr = td.parentNode
        const reqTr = trList[curTr.sectionRowIndex + curRowspan - 1]
        if (reqTr.classList.contains('booking__timeslot-row-btn_add')) {
            td.classList.toggle('hasFreeTime', true)
        }
    })
}



function serMutationObserver() {
    const mutationObserver = new MutationObserver(function (mutations) {
        // mutations.forEach(function (mutation) {
        //     console.log(mutation);
        // });
        console.log(mutations);
    });

    mutationObserver.observe(
        document.querySelector('tbody.MuiTableBody-root'),
        {
            characterData: true,
            childList: true,
            subtree: true,
        },
    );
}

function addMagicBtn() {
    const target = document.querySelector('div.booking-header__left')
    if (!target) return

    console.log(target)
    const magicBtn = document.createElement('button')
    magicBtn.id = 'magicBtn'
    magicBtn.innerHTML = 'ПР'
    magicBtn.onclick = () => {
        markFirstTimersBookings()
        checkSlotFreetime()
    }
    target.append(magicBtn)
}


 console.log(window.onload)
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