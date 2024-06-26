class Calculator{
    constructor(previousScreen,currentScreen){
    this.previousScreen = previousScreen;
    this.currentScreen = currentScreen;
    this.clear()
    } 

    clear(){
this.currentOperand = ""
this.previousOperand =""
this.operation = undefined
    }

    delete(){
 this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === "")return
         if(this.previousOperand !== ""){
             this.compute()
        }
        this.operation = operation 
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }
    compute(){
        let computation;
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand);
        if(isNaN(previous) || isNaN(current)) return;
        switch(this.operation){
            case "+":
             computation = previous + current
             break
              case "-":
              computation = previous - current
              break
              case "*":
              computation = previous * current
              break
              case "÷":
              computation = previous / current
              break
              default:
              return  
        }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand =""
    }
    
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = ""
        }else {
            integerDisplay = integerDigits.toLocaleString("en",{
                maximumFractionDigits: 0 })
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else{
            return integerDisplay
        }

        
    }

    updateDisplay(){
       this.currentScreen.innerText =
       this.getDisplayNumber( this.currentOperand)
   if (this.operation != null){
       this.previousScreen.innerText =
     `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
   }
   else{
    this.previousScreen.innerText = ""
   }
}
}




var clearAllButton = document.getElementById("clear-all");
var deleteButton =document.querySelector("[data-delete]");
var numberButtons = document.querySelectorAll("[data-number]");
var operatorButton = document.querySelectorAll("[data-operation]");
var equalsButton = document.querySelector("[data-equals]");
var  decimal = document.getElementsByClassName("decimal");
var currentScreen = document.getElementsByClassName("current-operand")[0];
var previousScreen= document.getElementsByClassName("previous-operand")[0];
var currentOperand;
var previousOperand;
 const calculator = new Calculator(previousScreen,currentScreen);

 

// activating buttons
        
numberButtons.forEach(button => {
    button.addEventListener("click", () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})   

operatorButton.forEach(button => {
    button.addEventListener("click", () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
        
    })
})   
equalsButton.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
})
clearAllButton.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
})




