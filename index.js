import{a as L,S as v,i as n}from"./assets/vendor-BjRz3xa9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const S="https://pixabay.com/api/",q="49327734-00ffb8023b77f666b7f6e293e";async function y(t,r=1){const s={key:q,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15};try{return(await L.get(S,{params:s})).data}catch(a){throw a}}let E=new v(".gallery a");function C(){const t=document.querySelector(".gallery");t.innerHTML=""}function g(){document.querySelector(".loader").classList.add("visually-hidden")}function p(){document.querySelector(".loader").classList.remove("visually-hidden")}function f(t){const r=document.querySelector(".gallery"),s=t.map(({webformatURL:a,largeImageURL:e,tags:o,likes:i,views:m,comments:b,downloads:w})=>`
          <li class="gallery-item">
            <a class="gallery-link" href="${e}">
              <img class="gallery-image" src="${a}" alt="${o}" width="360" height="200" />
            </a>
            <div class="gallery-actions">
              <p><span>Likes</span>${i}</p>
              <p><span>Views</span> ${m}</p>
              <p><span>Comments</span> ${b}</p>
              <p><span>Downloads</span> ${w}</p>
            </div>
          </li>`).join("");r.innerHTML+=s,E.refresh()}const h=document.querySelector("form"),P=document.querySelector("input[name='search-text']"),R=document.querySelector(".gallery");document.querySelector(".loader");const l=document.querySelector(".load-more");let c=1,u="",d=0;h.addEventListener("submit",async t=>{if(t.preventDefault(),u=P.value.trim(),u===""){n.show({title:"Error",message:"Please enter a search query!",position:"topRight",backgroundColor:"#ef7975"});return}c=1,C(),p();try{const{hits:r,totalHits:s}=await y(u,c);d=s,r.length===0?(l.classList.add("visually-hidden"),n.show({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#ef7975"})):(f(r),r.length<15||r.length>=d?(l.classList.add("visually-hidden"),n.show({title:"End",message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"#ff7b7b"})):l.classList.remove("visually-hidden"))}catch{n.show({title:"Error",message:"Something went wrong! Please try again later.",position:"topRight",backgroundColor:"#ef7975"})}finally{h.reset(),g()}});l.addEventListener("click",async()=>{c+=1,p();try{const{hits:t}=await y(u,c);f(t),(t.length<15||c*15>=d)&&(l.style.display="none",n.show({title:"Error",message:"We are sorry, but you have reached the end of search results.",position:"topRight",backgroundColor:"#ef7975"})),$()}catch{n.show({title:"Error",message:"Sorry, there are no images matching your search query.",position:"topRight",backgroundColor:"#ef7975"})}finally{g()}});function $(){const t=R.firstElementChild;if(t){const{height:r}=t.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
