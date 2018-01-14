var app = new Vue({
    el: '#app',
    data: {
        elem: 'X',
        testSteps: 5,
        cycleSteps: 25,
        numberOfNumbers: 0,
        maxNumbers: 2,
        delay: 150,
        symbols: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        inMenu: true,
        inTest: false,
        randomArray: [],
        answer: [],
        isAnswerButtonShown: false,
        isAnswerShown: false,
        randomFactor: 4,
    },
    created() {

    },
    computed: {
      isAnswerArray: function () {
        if (this.answer.length > 0) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      startStep() {
        this.isAnswerShown = false
        this.isAnswerButtonShown = false
        this.answer = []
        this.numberOfNumbers = 0
        console.log(this.maxNumbers)
        for (var i=0; i<this.cycleSteps; i++) {
          this.randomArray.push(this.randomNumberOrSymbol(i))
        }
        var here = this
        for (var i=0; i<this.cycleSteps; i++){
          setTimeout(function(x) { return function() {
            if (here.randomArray[x] === 'number'){
              var isDuplicate = 0
              while (isDuplicate > -1){
                here.elem = here.randomNumber()
                isDuplicate = here.answer.findIndex(x => x == here.elem)
              }
              here.answer.push(here.elem)
            } else {
              here.elem = here.randomSymbol()
            }
          }; }(i), i*this.delay);
        }
        setTimeout(function() { here.isAnswerButtonShown = true }, this.cycleSteps*this.delay)
      },
      randomNumberOrSymbol(step) {
        var element = 'symbol'
        this.maxNumbers = parseInt(this.maxNumbers)
        if ((step < this.cycleSteps) && (this.numberOfNumbers < this.maxNumbers)) {
          var max = 10
          var min = 0
          var random = Math.floor(Math.random() * (max - min)) + min
          if (random < this.randomFactor) {
            element = 'number'
            this.numberOfNumbers++
          }
        }
        return element;
      },
      randomNumber() {
        var max = 10
        var min = 0
        var random = Math.floor(Math.random() * (max - min)) + min
        return random;
      },
      randomSymbol() {
        var max = this.symbols.length
        var min = 0
        var random = Math.floor(Math.random() * (max - min)) + min
        var symbol = this.symbols.substr(random, 1)
        return symbol;
      },
      toTest() {
        this.inMenu = false
        this.inTest = true
      },
      toMenu() {
        this.inMenu = true
        this.inTest = false
      },
      showAnswer() {
        this.isAnswerShown = true
      },
      decreaseRandomFactor() {
        if (this.randomFactor > 1){
          this.randomFactor--
        }
      },
      increaseRandomFactor() {
        if (this.randomFactor < 10){
          this.randomFactor++
        }
      }
    }
})