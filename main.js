let selectAll = document.querySelectorAll("select"),
    textFrom = document.querySelector('.text-from'),
    textTo = document.querySelector('.text-to'),
    btn = document.querySelector('.btn'),
    exchangeBtn = document.querySelector('.exchange'),
    iconBtn = document.querySelectorAll('.icons i');


selectAll.forEach((tag, id) => {

    for (const coun in countries) {
        let selected;
        if (id == 0 && coun == "en-GB") {
            selected = "selected";
        } else if (id == 1 && coun == "hi-IN") {
            selected = "selected";
        }

        let option = `<option value="${coun}" ${selected}>${countries[coun]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
})

btn.addEventListener("click", () => {
    if (textFrom.value != "") {
        let textlanFrom = selectAll[0].value,
            textlanTo = selectAll[1].value;
        let APIurl = `https://api.mymemory.translated.net/get?q=${textFrom.value}!&langpair=${textlanFrom}|${textlanTo}`;

        fetch(APIurl).then(res => res.json()).then(result => {
            textTo.value = result.responseData.translatedText;
        });
    }else{
        alert("Enter some text");
    }
})

// Exchanging the input value and selected option
exchangeBtn.addEventListener('click', () => {
    let tempTxt = textFrom.value;
    let tempSel = selectAll[0].value;
    textFrom.value = textTo.value;
    selectAll[0].value = selectAll[1].value
    textTo.value = tempTxt;
    selectAll[1].value = tempSel;
})

iconBtn.forEach(icon => {
    icon.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-volume-high')) {
            let utterThis;
            if (e.target.id == 'from') {
                utterThis = new SpeechSynthesisUtterance(textFrom.value);
                utterThis.lang = selectAll[0].value;

            } else {
                utterThis = new SpeechSynthesisUtterance(textTo.value);
                utterThis.lang = selectAll[1].value;
            }
            speechSynthesis.speak(utterThis);
        } else if (e.target.classList.contains('fa-copy')) {
            if (e.target.id == 'from') {
                if (navigator.clipboard.writeText(textFrom.value)) {
                    alert('text copied');
                }
            } else {
                if (navigator.clipboard.writeText(textTo.value)) {
                    alert('text copied');
                }
            }
        }
    })
})

