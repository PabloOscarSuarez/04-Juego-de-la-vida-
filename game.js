var gameOfLife = {

  width: 12,
  height: 12, 
  stepInterval: null,
  createAndShowBoard: function () {

    var goltable = document.createElement("tbody");

    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' class='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;

    var board = document.getElementById('board');
    board.appendChild(goltable);
    this.setupBoardEvents();
  },
  forEachCell: function (iteratorFunc) {
    var count=0
    for(var fila=0;fila<this.height;fila++){
      for(var columna=0;columna<this.width;columna++){
       var celda = document.getElementById(fila+'-'+columna);
        iteratorFunc(celda,fila,columna)
      } 
    }

  },

  setupBoardEvents: function() {
    var onCellClick = function (e) {

      if (this.dataset.status == 'dead') {
        this.className = 'alive';
        this.dataset.status = 'alive';
      } else {
        this.className = 'dead';
        this.dataset.status = 'dead';
      }
    
    };
    var botonclear=document.querySelector('#clear_btn')
      botonclear.addEventListener('click',this.onclickClear.bind(this))

    var botonrandom=document.querySelector('#reset_btn')
    botonrandom.addEventListener('click', this.random.bind(this))

    var botonStep=document.querySelector('#step_btn')
      botonStep.addEventListener('click',this.step.bind(this))

    var botonPlay=document.querySelector('#play_btn')
      botonPlay.addEventListener('click',this.enableAutoPlay.bind(this))

    this.forEachCell(function(e,fila,columna){
      e.addEventListener('click',onCellClick)})


  },

  step: function () {
    this.forEachCell(function(e,fila,columna){
      var count=0
      for(var f=fila-1;f<fila+2;f++){

        for(var c=columna-1;c<columna+2;c++){
         var vecino=document.getElementById(f+'-'+c)
          
         if(vecino != null){
          if(vecino !== e && vecino.className == "alive"){
            count++
          }
        }
      } 
    }
    //si count == 2 && className == "alive" || count == 3 && className == "alive" se mantiene igual
    //si count == 3 && className == "dead" cambia status a alive // viveee  
    //si count < 2 && class "alive" || count > 3 && class "alive" cambia status a dead

      if(count == 2 && e.className == 'alive'||count == 3 && e.className=='alive')count;
      if(count==3 && e.className== 'dead')e.dataset.status='alive';
      if(count<2 && e.className=='alive'|| count>3 && e.className=='alive')e.dataset.status='dead'
    })
    this.forEachCell(function(e,fila,columna){
      if(e.dataset.status=='alive'){
        e.className='alive'
      }
      else{
        e.className='dead'
      }
    })
    
  },

  enableAutoPlay: function () {
    var tiempo= setInterval(this.step.bind(this), 3000)    
    return tiempo
  },

  onclickClear:function(){
    this.forEachCell(function(e){
      e.className = 'dead';
      e.dataset.status = 'dead';
    }
    )
   
  
  },
  random:function(){
    this.forEachCell(function(e,fila,columna){
      if((fila+columna)*Math.random()<Math.random()*2){
        e.className='alive';
        e.dataset.status = 'alive'
      }
      else{
        e.className='dead';
        e.dataset.status = 'dead'
      }
    })
  }

};

gameOfLife.createAndShowBoard();		