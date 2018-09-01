class SpiralMenu{

    selected = {
        primary: 0,
        sub: -1
    };

    hoveredElement = "";

    plugins = [];

    spiralMenu;

    container;

    constructor(container, closeImg, plugins = []){

        if(container instanceof Element){

            this.container = container;

            this.plugins = plugins;

            this.__create(closeImg);

        }else{
            throw new Error('Container doesn`t exist');
        }

    }

    addPlugin(name, image, onActiveCB, onDeActiveCB, subPlugins = []){

        this.plugins.push({
            name,
            image,
            onActiveCB,
            onDeActiveCB,
            subPlugins
        });

    }

    addSubPlugin(primaryName, name, image, onActiveCB, onDeActiveCB ){

        for(let plugin of this.plugins){
            if(plugin.name == primaryName){
                plugin.subPlugins.push({
                    name,
                    image,
                    onActiveCB,
                    onDeActiveCB
                });
            }
        }

    }

    afterClosed(){

    }

    __reloadMenu(){

        this.spiralMenu.innerHTML = '';

        this.__appendPlugins();

    }

    // Private methods

    __create(closeImgAddress){

        this.spiralMenu = document.createElement("div");
        this.spiralMenu.classList.add('spiralMenu');

        let spiralClose = document.createElement("div");
        spiralClose.classList.add('spiralMenu__close');
        let closeImg = document.createElement("img");
        closeImg.src = closeImgAddress;
        spiralClose.appendChild(closeImg)

        spiralClose.onmouseover = ()=>{
            this.__changeHoveredElement("__close");
        }

        this.spiralMenu.appendChild(spiralClose)

        this.__appendPlugins();

        this.container.appendChild(this.spiralMenu)

    }

    __appendPlugins(){

        let that = this;       

        let degree = 360;

        if(this.plugins.length != 0){
            degree = 360 / this.plugins.length;
        }

        let i =0;

        for(let plugin of this.plugins){

            let pluginElement = document.createElement("div")
            pluginElement.classList.add("spiralMenu__plugin");
            pluginElement.setAttribute("data-name", plugin.name);
            
            pluginElement.onmouseover = function(){
                that.__changeHoveredElement(this.getAttribute("data-name"));
            }

            let pluginImage = document.createElement("img");
            pluginImage.src = plugin.image;

            pluginElement.style.position = "absolute";
            // console.log(Math.cos(degree*i), degree*i)
            pluginElement.style.top = 134 - 48*Math.sin(this.__toRadians(degree*i)) + 'px';
            pluginElement.style.right = 134 - (48*Math.cos(this.__toRadians(degree*i))) + 'px';

            pluginElement.appendChild(pluginImage)

            this.spiralMenu.appendChild(pluginElement);

            i++;

        }

    }

    __appendSubPlugins(name){

        let targetedPlugin;

        for(let plugin of this.plugins){
            if(plugin.name === name){
                targetedPlugin = plugin;
                break;
            }
        }

        let degree = 360;

        if(targetedPlugin.subPlugins.length != 0){
            degree = 360 / targetedPlugin.subPlugins.length;
        }

        let i =0;

        for(let plugin of targetedPlugin.subPlugins){

            let pluginElement = document.createElement("div")
            pluginElement.classList.add("spiralMenu__plugin");
            pluginElement.setAttribute("data-name", plugin.name);
            
            pluginElement.onmouseover = function(){
                that.__changeHoveredElement(this.getAttribute("data-name"));
            }

            let pluginImage = document.createElement("img");
            pluginImage.src = plugin.image;

            pluginElement.style.position = "absolute";
            // console.log(Math.cos(degree*i), degree*i)
            pluginElement.style.top = 134 - 96*Math.sin(this.__toRadians(degree*i)) + 'px';
            pluginElement.style.right = 134 - (96*Math.cos(this.__toRadians(degree*i))) + 'px';

            pluginElement.appendChild(pluginImage)

            this.spiralMenu.appendChild(pluginElement);

            i++;

        }
    }

    __changeHoveredElement(name){
        
        this.hoveredElement = name;

    }

    __toRadians (angle) {
        return angle * (Math.PI / 180);
      }

}

module.exports = SpiralMenu;