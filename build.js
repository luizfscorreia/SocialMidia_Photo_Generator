
    //Menus
    var menuMainMenu = document.getElementById("ctrlMainMenu")
    var menuEditPhoto = document.getElementById("ctrlImageMenu")
    var menuEditData = document.getElementById("ctrlDataMenu")
    var menuEditMode = document.getElementById("ctrlEditMenu")
    var menuEditFilters = document.getElementById("ctrlFilterMenu")

    //Menu Buttons
    var btImageMode = document.getElementById("changePhoto")
    var btDataMode = document.getElementById("dataMode")
    var btEditMode = document.getElementById("editMode")
    var btFilterMode = document.getElementById("filterMode")
    var btImagemBuild = document.getElementById("imageBuild")
    
    //Action Buttons
    var up = document.getElementById("up")
    var left = document.getElementById("left")
    var rotate = document.getElementById("rotate")
    var zoom = document.getElementById("zoom")
    
    // Content
    var image = document.getElementById("userPhoto")
    var cover = document.getElementById("cover")
    const crop = document.getElementById("crop")

    function getCurrentSize() {
        cover.style.width = crop.offsetWidth + 'px'
        cover.style.height = crop.offsetHeight + 'px' 
    }

    new ResizeObserver(getCurrentSize).observe(container)


    var nameFile = document.getElementById("name")
    var descriptionField = document.getElementById("role")
    
    var userName = document.getElementById("userName")
    var userDescription = document.getElementById("userDescription")


    const imageLoader = document.getElementById('file');
    
    var fr = new FileReader();
    const userImage = new Image()

    const uploadImagem = async (e) => {
        fr.onload = () => {
            userImage.onload = () => {
                document.getElementById("userPhoto").src = fr.result
                document.getElementById("userPhoto").style.width = "100%"
                document.getElementById("overlay").style.visibility = "hidden";
                document.getElementById("controlls").style.visibility = "visible";
            }
            userImage.src = fr.result
            renderText(nameFile.value, descriptionField.value)
        }
        fr.readAsDataURL(e.target.files[0])
        returnMenu()
    };

    imageLoader.addEventListener('change', uploadImagem)


    function renderText(name, descriptionField){
        if(name == null || name == ''){
            name = 'Alterar Nome'
            userName.innerHTML = name
        }
        
        if(descriptionField == null || descriptionField == ''){
            descriptionField = 'Alterar Cargo'
            userDescription.innerHTML = descriptionField
        }

        userName.innerHTML = name
        userDescription.innerHTML = descriptionField

    }

    btImageMode.addEventListener("click", () => {
        menuMainMenu.style.display = "none"
        menuEditPhoto.style.display = "flex"
    })

    btDataMode.addEventListener("click", () => {
        menuMainMenu.style.display = "none"
        menuEditData.style.display = "flex"
    })

    btEditMode.addEventListener("click", () => {
        menuMainMenu.style.display = "none"
        menuEditMode.style.display = "flex"
        cover.style.opacity = "0.8"

    })

    btFilterMode.addEventListener("click", () => {
        menuMainMenu.style.display = "none"
        menuEditFilters.style.display = "flex"
    })

    function returnMenu(){
        menuMainMenu.style.display = "flex"
        menuEditPhoto.style.display = "none"
        menuEditMode.style.display = "none"
        menuEditFilters.style.display = "none"
        menuEditData.style.display = "none"

        cover.style.opacity = "1"

    }

    function applyFilter(filter){
        switch (filter) {
            case 'grayscale':
                image.classList.remove('sepia')
                image.classList.add('grayscale')
                break;

            case 'sepia':
                image.classList.remove('grayscale')
                image.classList.add('sepia')
            break;
            
            case 'none':
                image.classList.remove('grayscale')
                image.classList.remove('sepia')
            break;
            
            default:
                break;
        }
    }

    async function build() {
        let actualSize = document.getElementById("container").offsetWidth

        let textContainer = document.getElementById("textContainer")
        let textContainerActual = textContainer.offsetWidth

        let userNameText = document.getElementById("userName")
        let userNameActualSize = window.getComputedStyle(userNameText).fontSize;


        let userDescriptionText = document.getElementById("userDescription")
        let userDescriptionActualSize = window.getComputedStyle(userDescriptionText).fontSize;

        document.getElementById("loadingContainer").style.display = 'flex'

        container.style.width = '1000px'
        cover.style.width = '1000px'
        cover.style.height = '1000px'
        textContainer.style.width = '400px'
        textContainer.style.maxWidth = '400px'
        userNameText.style.fontSize = '70px'
        userDescriptionText.style.fontSize = '40px'

        imageBuild.disabled = true
        imageBuild.innerText = "Gerando Imagem"
        
        await domtoimage.toPng(crop, {width: '1000', height: '1000'}).then(function (dataUrl) {})

        await domtoimage.toPng(crop, {width: '1000', height: '1000'}).then(function (dataUrl) {
            var img = new Image()
            img.src = dataUrl
            img.id = 'final'
            img.style.display = 'none'
            img.onload = () => {
                document.body.appendChild(img)
            }
        })


        // Reset view sizes

        container.style.width = actualSize + 'px'
        cover.style.width = actualSize + 'px'
        cover.style.height = actualSize + 'px'

        textContainer.style.width = textContainerActual + 'px'
        userNameText.style.fontSize = userNameActualSize
        userDescriptionText.style.fontSize = userDescriptionActualSize

        await setTimeout(() => {
            document.getElementById("loadingContainer").style.display = 'none'

            imageBuild.disabled = false
            imageBuild.innerText = "Gerar Imagem"
            share()
            document.getElementById('final').remove()
        }, 100);
    }

    function share(){
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.href = document.getElementById('final').src
            a.download = "euVou.png";
            a.click();
            document.body.removeChild(a);
            
    }


    up.addEventListener("input", () => {
        image.style.top = up.value + "%"
    })

    left.addEventListener("input", () => {
        image.style.left = left.value + "%"
    })

    rotate.addEventListener("input", () => {
        //image.style.rotate = rotate.value + "deg"
        ScaleAndZoomSync()
    })

    zoom.addEventListener("input", () => {
        //image.style.scale = zoom.value
        ScaleAndZoomSync()
        
    })

    function ScaleAndZoomSync(){
        image.style.transform  = "scale(" + zoom.value + ") rotateZ(" + rotate.value + "deg)" 
    }