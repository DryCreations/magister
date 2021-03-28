<script>
    function onClose() {
        window.api.send("close");
    }

    function onMinimize() {
        window.api.send("minimize");
    }

    function onMaximize() {
        window.api.send("maximize");
    }
    
    function onUnmaximize() {
        window.api.send("unmaximize");
    }

    window.api.receive("maximize", (data) => {
        isMax = true;
    });

    window.api.receive("unmaximize", (data) => {
        isMax = false;
    });

    export let isMax = false;

</script>

<header>
    
    <div id="drag-region">
      <div id="window-title">
        <span>Magister</span>
      </div>
        <div id="window-controls">
            <div class="button" id="min-button" on:click={onMinimize}>
              min
            </div>
            
            {#if !isMax}
            <div class="button" id="max-button" on:click={onMaximize}>
              max
            </div>
            {:else}
            <div class="button" id="unmax-button" on:click={onUnmaximize}>
              unmax
            </div>
            {/if}
            

            
      
            <div class="button" id="close-button" on:click={onClose}>
              close
            </div>
      
          </div>
    </div>
</header>

<style>

header {
display: block;
  position: fixed;
  height: 32px;
  width: 100%;
  top: 0;
  left: 0;
  background: #254053;
  color:white;
}

#drag-region {
  width: 100%;
  height: 100%;
  -webkit-app-region: drag;
}

#window-controls {
  display: grid;
  grid-template-columns: repeat(3, 50px);
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}

#window-controls .button {
  grid-row: 1 / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
#min-button {
  grid-column: 1;
}
#max-button {
  grid-column: 2;
}
#unmax-button {
  grid-column: 2;
}
#close-button {
  grid-column: 3;
}

#window-controls {
  -webkit-app-region: no-drag;
}

#window-controls .button {
  user-select: none;
}
#window-controls .button:hover {
  background: rgba(255,255,255,0.1);
}
#window-controls .button:active {
  background: rgba(255,255,255,0.2);
}

#close-button:hover {
  background: #E81123 !important;
}
#close-button:active {
  background: #F1707A !important;
}

#drag-region {
  display: grid;
  grid-template-columns: auto 138px;
}

#window-title {
  grid-column: 1;
  display: flex;
  align-items: center;
  margin-left: 8px;
  overflow: hidden;
  font-family: "Segoe UI", sans-serif;
  font-size: 12px;
}

#window-title span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.5;
}

</style>