// @ts-nocheck
import {initMotion} from './wedding-motion';

const root=document.documentElement;
const copy=document.body.dataset;
const access=document.querySelector('#access-dialog');
const lightbox=document.querySelector('#photo-dialog');
const mapDialog=document.querySelector('#map-dialog');
const preferenceKey='sd-wedding-demo-access';
initMotion();

const clock=document.querySelector('[data-countdown]');
const numbers=new Intl.NumberFormat(copy.locale==='es'?'es-CO':'en-GB',{minimumIntegerDigits:2,useGrouping:false});
function updateClock(){
 const remaining=Math.max(0,Math.floor((Date.parse(clock.dataset.target)-Date.now())/1000));
 if(!Number.isFinite(remaining))return;
 if(remaining===0){clock.classList.add('countdown-ended');clock.textContent=copy.countEnded;return;}
 const values={days:Math.floor(remaining/86400),hours:Math.floor(remaining/3600)%24,minutes:Math.floor(remaining/60)%60,seconds:remaining%60};
 clock.querySelectorAll('[data-unit]').forEach(node=>node.textContent=numbers.format(values[node.dataset.unit]));
}
updateClock();let timer=setInterval(updateClock,1000);
addEventListener('pagehide',()=>clearInterval(timer));
addEventListener('pageshow',event=>{if(event.persisted){updateClock();clearInterval(timer);timer=setInterval(updateClock,1000);}});

document.querySelectorAll('dialog').forEach(dialog=>{
 dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
});
function syncPreferences(){
 access.querySelectorAll('[name="text-size"]').forEach(input=>input.checked=input.value===(root.dataset.textSize||'0'));
 document.querySelector('#contrast').checked=root.dataset.contrast==='high';
 document.querySelector('#motion').checked=root.dataset.motion==='reduce';
}
document.querySelectorAll('[data-access]').forEach(button=>button.addEventListener('click',()=>{syncPreferences();access.showModal();}));
access.addEventListener('change',()=>{
 const size=access.querySelector('[name="text-size"]:checked').value;
 const contrast=document.querySelector('#contrast').checked,motion=document.querySelector('#motion').checked;
 root.dataset.textSize=size;
 if(contrast)root.dataset.contrast='high';else delete root.dataset.contrast;
 if(motion)root.dataset.motion='reduce';else delete root.dataset.motion;
 try{localStorage.setItem(preferenceKey,JSON.stringify({size,contrast,motion}));}catch{}
 document.querySelector('#preference-status').textContent=copy.updated;
});
document.querySelector('#reset-preferences').addEventListener('click',()=>{
 root.dataset.textSize='0';delete root.dataset.contrast;delete root.dataset.motion;
 try{localStorage.removeItem(preferenceKey);}catch{}
 syncPreferences();document.querySelector('#preference-status').textContent=copy.restored;
});

const photographs=[...document.querySelectorAll('[data-photo]')];let current=0;
function showPhoto(index){
 current=(index+photographs.length)%photographs.length;
 const source=photographs[current];const image=document.querySelector('#lightbox-image');
 image.src=source.dataset.full;image.alt=source.querySelector('img').alt;
 document.querySelector('#photo-counter').textContent=`${numbers.format(current+1)} ${copy.of} ${numbers.format(photographs.length)}`;
}
photographs.forEach((button,index)=>button.addEventListener('click',()=>{showPhoto(index);lightbox.showModal();}));
document.querySelector('#previous-photo').addEventListener('click',()=>showPhoto(current-1));
document.querySelector('#next-photo').addEventListener('click',()=>showPhoto(current+1));
lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(current-1);}if(e.key==='ArrowRight'){e.preventDefault();showPhoto(current+1);}});
lightbox.addEventListener('close',()=>document.querySelector('#lightbox-image').removeAttribute('src'));

let mapScale=1;
function updateMap(){
 document.querySelector('#demo-map-art').style.transform=`scale(${mapScale})`;
 document.querySelector('#map-out').disabled=mapScale<=1;
 document.querySelector('#map-in').disabled=mapScale>=2.5;
}
document.querySelectorAll('[data-map]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelector('#map-venue').textContent=button.dataset.map;mapScale=1;updateMap();mapDialog.showModal();
}));
document.querySelector('#map-in').addEventListener('click',()=>{mapScale=Math.min(2.5,mapScale+.25);updateMap();});
document.querySelector('#map-out').addEventListener('click',()=>{mapScale=Math.max(1,mapScale-.25);updateMap();});

const escapeCalendar=value=>value.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
document.querySelectorAll('[data-calendar]').forEach(button=>button.addEventListener('click',()=>{
 const d=button.dataset;
 const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//SD Tech Systems//Fictional wedding showcase//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:demo-${d.event}@example.invalid`,'DTSTAMP:20300101T000000Z',`DTSTART:${d.start}`,`DTEND:${d.end}`,`SUMMARY:${escapeCalendar(d.title)}`,`LOCATION:${escapeCalendar(d.location)}`,`DESCRIPTION:${escapeCalendar(copy.success)}`,'END:VEVENT','END:VCALENDAR'];
 const fold=line=>{const parts=[];let part='',bytes=0;for(const char of line){const length=new TextEncoder().encode(char).length;if(bytes+length>75){parts.push(part);part=' ';bytes=1;}part+=char;bytes+=length;}parts.push(part);return parts.join('\r\n');};
 const url=URL.createObjectURL(new Blob([lines.map(fold).join('\r\n')+'\r\n'],{type:'text/calendar;charset=utf-8'}));
 const link=document.createElement('a');link.href=url;link.download=`example-${d.event}.ics`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
}));

// Response values exist only in the form's current DOM. No endpoint or response storage.
const form=document.querySelector('#rsvp-form');
const group=document.querySelector('#group-fields'),decline=document.querySelector('#decline-fields');
const count=document.querySelector('#party-count'),attendees=document.querySelector('#attendees');
const success=document.querySelector('#form-success');
function renderPeople(){
 const amount=Number(count.value);if(!Number.isInteger(amount)||amount<1||amount>8)return;
 while(attendees.children.length>amount){const last=attendees.lastElementChild;last.querySelectorAll('input,textarea,select').forEach(input=>input.value='');last.remove();}
 while(attendees.children.length<amount){
  const index=attendees.children.length;
  const row=document.querySelector('#person-template').content.cloneNode(true);
  row.querySelector('[data-person-title]').textContent=`${copy.person} ${index+1}`;
  ['name','meal','allergies'].forEach(field=>{const input=row.querySelector(`[data-field="${field}"]`);input.id=`sample-person-${index+1}-${field}`;row.querySelector(`[data-label="${field}"]`).htmlFor=input.id;});
  attendees.append(row);
 }
}
function syncAttendance(){
 const selected=form.querySelector('[name="attendance"]:checked')?.value;
 group.hidden=selected!=='yes';group.disabled=selected!=='yes';
 decline.hidden=selected!=='no';decline.disabled=selected!=='no';
}
renderPeople();count.addEventListener('change',renderPeople);
form.querySelectorAll('[name="attendance"]').forEach(input=>input.addEventListener('change',syncAttendance));
form.addEventListener('reset',()=>queueMicrotask(()=>{syncAttendance();renderPeople();}));
form.addEventListener('submit',event=>{
 event.preventDefault();if(!form.reportValidity())return;
 form.reset();form.hidden=true;success.hidden=false;success.focus();
});
document.querySelector('#try-again').addEventListener('click',()=>{
 form.reset();success.hidden=true;form.hidden=false;form.querySelector('[name="attendance"]').focus();
});
form.querySelector('[type="submit"]').disabled=false;
