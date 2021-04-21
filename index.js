let can = document.getElementById('mycan')
let ctx = can.getContext('2d')


const loadImage = (src,callback)=>{
    let img = document.createElement('img')
    img.src=src
    img.onload = () =>{
        callback(img)
    }
    
}

let imagePath = (frameno,animation='idle')=> "./images/"+ animation +"/"+frameno+".png";

let frames = {
    kick:[1,2,3,4,5,6,7],
    punch:[1,2,3,4,5,6,7],
    idle:[1,2,3,4,5,6,7,8],
    backward:[1,2,3,4,5,6],
    forward:[1,2,3,4,5,6],
    block:[1,2,3,4,5,6,7,8,9]
}

let loadImages = (callback) =>{
    let images = {
        kick:[],
        punch:[],
        idle:[],
        backward:[],
        forward:[],
        block:[],

    };
    let imagesLeftToLoad = 0;

    ['kick','punch','idle','backward','forward','block'].forEach(animation=>{
        let animationFrame = frames[animation]
        imagesLeftToLoad = imagesLeftToLoad+animationFrame.length;
        animationFrame.forEach((frameNumber)=>{
            loadImage(imagePath(frameNumber,animation),(image)=>{
                images[animation][frameNumber-1]  = image;
                imagesLeftToLoad-=1
                if(imagesLeftToLoad===0) {
                    callback(images)
                }
            })
        })
    })

    
}

// loadImage(imagePath(2),(img)=>{
//     ctx.drawImage(img,10,10,600,600)
// })

let animate = (ctx,images,animation,callback) =>{
    images[animation].forEach((image,index)=>{
        setTimeout(()=>{
            ctx.clearRect(0,0,1000,500);
            ctx.drawImage(image,10,10,500,500);
        },index*100)
    })
    setTimeout(callback,images[animation].length*100)
}


loadImages(images=>{
    // images.map(img=>{
    //     ctx.drawImage(img,10,10,600,600);
    // })

    let quedanimation = [];
    let aux = () =>{

        let selectedAnimation;
        if (quedanimation.length===0) {
            selectedAnimation='idle'
        }else{
            selectedAnimation=quedanimation.shift()
        }
        animate(ctx,images,selectedAnimation,aux)
    }
    
    // animate(ctx,images,'punch',()=>{
    //     console.log('done!');
        
    // })
    aux();

    document.getElementById('kick').addEventListener('click',()=>{
        quedanimation.push('kick')
    })
    document.getElementById('punch').addEventListener('click',()=>{
        quedanimation.push('punch')
    })
    document.getElementById('forward').addEventListener('click',()=>{
        quedanimation.push('forward')
    })
    document.getElementById('backward').addEventListener('click',()=>{
        quedanimation.push('backward')
    })


    document.addEventListener('keyup',function(event){
        let key = event.key;
        if(key==='ArrowLeft'){
            quedanimation.push('backward')
        }else if (key==='ArrowRight'){
            quedanimation.push('forward')
        }else if (key==='ArrowUp'){
            quedanimation.push('kick')
        }else if (key==='ArrowDown'){
            quedanimation.push('punch')
        }
    })
    
})


// let play = (animationName='idle')=>{
//     loadImages(images=>{
//         // images.map(img=>{
//         //     ctx.drawImage(img,10,10,600,600);
//         // })
//         animate(ctx,images,animationName,()=>{
//             console.log('done!');
            
//         })
//     })
// }

// play('idle')
// document.getElementById('kick').addEventListener('click',()=>play('kick'))
// document.getElementById('punch').addEventListener('click',()=>play('punch'))



