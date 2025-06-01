let btn = document.querySelector('.btn');
let display = document.querySelector('.wrapper h4');
let textareaElement = document.querySelector('.speed-input')
let result = document.querySelector('.result-area h2')
let endTime , startTime;
const quotes = [
  "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
  "The only limit to our realization of tomorrow is our doubts of today. Keep typing and break your limits one word at a time.",
  "Don’t watch the clock; do what it does. Keep going. Typing fast is about rhythm, not rush.",
  "Your fingers are the brushes and the keyboard is your canvas. Make each word a masterpiece.",
  "It does not matter how slowly you go as long as you do not stop. Even slow typing gets you closer to your goal.",
  "Discipline is choosing between what you want now and what you want most. Train your fingers with focus.",
  "Typing is not about speed alone — it is about flow, precision, and endurance under pressure.",
  "You don’t have to be great to start, but you have to start to be great. Begin typing, and greatness will follow."
];

function startTest(string){
    display.innerText = ""
    string.split('').forEach(element => {
        let span = document.createElement('span');
        span.innerText = element;
        display.appendChild(span)
        
    });
    
   
    
}

function endTest(){
    textareaElement.disabled = true;
    
    
}


function typing(){
    btn.addEventListener('click',()=>{
   if(btn.innerText == "Start"){
     btn.innerText = 'Done';
     let randomNum = Math.floor(Math.random() * quotes.length)
     textareaElement.disabled = false;  
     textareaElement.focus();
     textareaElement.value = '';
     startTest(quotes[randomNum])
      startTime = Date.now();
     
   }
   else if(btn.innerText == "Done"){
        btn.innerText = 'Start';
        textareaElement.disabled = true;
        endTime = Date.now() 

        // endTest()
         endTime = Date.now();

        let totalTime = (endTime - startTime) / 1000;
        let wordsTyped = textareaElement.value.trim('').split(/\s+/).length; 
        let wps = Math.round((wordsTyped/totalTime)*60)
    
         result.innerText = `⏱ Time: ${totalTime} sec | 📝 Words Typed: ${wordsTyped} | 🚀 Speed: ${wps} WPM`;
   }

   
})



textareaElement.addEventListener('input',()=>{
    let quoteSpan = display.querySelectorAll('span');
    let textType = textareaElement.value;

    
  quoteSpan.forEach((span, index) => {
    const char = textType[index];
    if (char == null) {
      span.style.color = 'blue'; // Default color
    } else if (char === span.innerText) {
      span.style.color = 'green';
    } else {
      span.style.color = 'red';
    }
  });
    
})




}

typing()