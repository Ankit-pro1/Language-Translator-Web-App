let selectAll = document.querySelectorAll("select"),
textFrom = document.querySelector('.text-from'),
textTo = document.querySelector('.text-to'),
btn = document.querySelector('.btn'),
exchangeBtn = document.querySelector('.exchange');

selectAll.forEach((tag, id)=>{

    for(const coun in countries){
        let selected;
        if(id == 0 && coun == "en-GB"){
            selected = "selected";
        }else if(id == 1 && coun == "hi-IN"){
            selected = "selected";
        }

      let option = `<option value="${coun}" ${selected}>${countries[coun]}</option>`;
      tag.insertAdjacentHTML("beforeend",option);
    }
})

btn.addEventListener("click",()=>{
    text = textFrom.value;
    let textlanFrom = selectAll[0].value,
        textlanTo = selectAll[1].value;
    let APIurl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${textlanFrom}|${textlanTo}`;

     fetch(APIurl).then(res=>res.json()).then(result=>{
        textTo.value = result.responseData.translatedText;
     });
})

// Exhanging the input value and selected option
exchangeBtn.addEventListener('click', ()=>{
    let tempTxt = textFrom.value;
    let tempSel =  selectAll[0].value;
    textFrom.value = textTo.value;
    selectAll[0].value = selectAll[1].value
    textTo.value = tempTxt;
    selectAll[1].value = tempSel;
})