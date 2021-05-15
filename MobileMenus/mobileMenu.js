'use strict'
let t = false,
    current;

function SetupMenu() {
    if (!document.getElementsByTagName) return;
    let items = document.getElementsByTagName("li");
    for (let i = 0; i < items.length; i++) {
        if (items[i].className != "menu") continue;
        let thelink = findChild(items[i], "A");
        thelink.onmouseover = ShowMenu;
        thelink.onmouseout = StartTimer;
        let ul;
        if (ul = findChild(items[i], "UL")) {
            ul.style.display = "none";
            for (let j = 0; j < ul.childNodes.length; j++) {
                ul.childNodes[j].onmouseover = ResetTimer;
                ul.childNodes[j].onmouseout = StartTimer;
            }
        }
    }
}

function findChild(obj, tag) {
    let cn = obj.childNodes;
    for (let k = 0; k < cn.length; k++) {
        if (cn[k].nodeName == tag) return cn[k];
    }
    return false;
}

function ShowMenu(e) {
    if (!e) var e = window.event;
    let thislink = (e.target) ? e.target : e.srcElement;
    ResetTimer();
    if (current) HideMenu(current);
    thislink = thislink.parentNode;
    current = thislink;
    let ul = findChild(thislink, "UL");
    if (!ul) return;
    ul.style.display = "block";
}

function HideMenu(thelink) {
    let ul = findChild(thelink, "UL");
    if (!ul) return;
    ul.style.display = "none";
}

function ResetTimer() {
    if (t) window.clearTimeout(t);
}

function StartTimer() {
    t = window.setTimeout("HideMenu(current)", 200);
}

window.onload = SetupMenu;