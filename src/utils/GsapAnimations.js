import gsap from "gsap";

const modalEaseInAndOut = (modalRef, isOpen) => {
    if (isOpen) {
        gsap.fromTo(modalRef.current, {
            x: '-100%',
            opacity: 0,
        }, {
            duration: 0.5,
            x: 0,
            opacity: 1,
            ease: 'slow(0.5, 0.5, false)',
        });
    } else {
        gsap.to(modalRef.current, {
            duration: 0.5,
            x: '-100%',
            opacity: 0,
            ease: 'slow(0.5, 0.5, false)',
        });
    }
}

const easeIn = (ref) => {
    gsap.fromTo(ref.current, {
        x: '-100%',
        opacity: 0,
    }, {
        duration: 0.8,
        x: 0,
        opacity: 1,
        ease: 'slow(0.7, 0.7, false)',
    });
}

const slideDown = (ref) => {
    gsap.fromTo(ref.current, {
        y: '-100%',
        opacity: 0,
    }, {
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: 'slow(0.7, 0.7, false)',
    });
}
const zoomOut = (ref) => {
    gsap.fromTo(ref.current, 
        {  duration: 0.3, scale: 0.2, opacity: 0 },
        {  duration: 0.3, scale: 1, opacity: 1 }
    );
}

export {
    modalEaseInAndOut,
    easeIn,
    slideDown,
    zoomOut
}