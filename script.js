
const slider =document.querySelector("[data-lengthSlider]");
const lengthDisplay= document.querySelector("[data-length]");
const passwordDisplay=document.querySelector("[data-password]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-msg]");
const upperCase=document.querySelector("#uppercase");
const lowerCase=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols='~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let password="";
let passwordLength=10;
let checkCount=0;
// see stength
//
// set password length 
handleSlider();
function handleSlider(){
    slider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}
function setIndicator(color){
    indicator.computedStyleMap.backgroundColor=color;

}
function shufflePassword(array){
    // using fisher yates method
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random() *(i-1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;


}
function getRndInteger(min,max){
    return Math.floor(Math.random()* (max-min))+min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol(){
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}
function calStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(upperCase.checked) hasUpper=true;
    if(lowerCase.checked) hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolCheck.checked) hasSym=true;
    
    if(hasUpper && hasLower &&(hasNum || hasSym && passwordLength >=8)) {
        setIndicator("#0f0");
    }else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength>=6
    ){
        setIndicator("#ff0");
    }else{
        setIndicator("#f00");
    }
}
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="failed";
    }
    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");

    },2000);
    
}
function handleCheckbox(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckbox);
})


slider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
});
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
});
generateBtn.addEventListener('click',()=>{
    if(checkCount<=0) return;
    if(passwordLength< checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
    password="";
    
    let funarr=[];
    if(upperCase.checked){
        funarr.push(generateUpperCase);
    }
    if(lowerCase.checked){
        funarr.push(generateLowerCase);
    }
    if(numbersCheck.checked){
        funarr.push(generateRandomNumber);
    }
    if(symbolCheck.checked){
        funarr.push(generateSymbol);
    }
    for(let i=0;i<funarr.length;i++){
        password+=funarr[i]();
    }
    for(let i=0;i<passwordLength-funarr.length;i++){
        let randindex = getRndInteger(0,funarr.length);
        password+=funarr[randindex]();
    }
    password=shufflePassword(Array.from(password));
    passwordDisplay.value=password;
    calStrength();
});
 