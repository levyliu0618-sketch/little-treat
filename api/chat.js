const {buildRequest}=require('../lib/momo.cjs');
const requests=new Map();
// Best-effort per-instance throttle; provider quota is the final free-tier limit.
function allow(ip){const now=Date.now();for(const [k,v] of requests)if(now-v.start>60000)requests.delete(k);const entry=requests.get(ip)||{start:now,n:0};entry.n++;requests.set(ip,entry);return entry.n<=8;}
module.exports=async function handler(req,res){
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'method',message:'Please send a chat message.'});}
 if(!String(req.headers['content-type']||'').startsWith('application/json'))return res.status(415).json({error:'format',message:'Please use JSON.'});
 const origin=req.headers.origin,host=req.headers.host;
 if(origin){try{if(new URL(origin).host!==host)return res.status(403).json({error:'origin',message:'Open Momo on this website to chat.'});}catch{return res.status(403).json({error:'origin'});}}
 if(!process.env.GEMINI_API_KEY)return res.status(503).json({error:'not_configured',message:'Live chat is not connected on this host yet. You can try the clearly labeled demo.'});
 if(!allow(String(req.headers['x-forwarded-for']||'local').split(',')[0]))return res.status(429).json({error:'rate_limit',message:'A tiny breather: please wait a minute, then try again.'});
 let data;
 try{const body=typeof req.body==='string'?JSON.parse(req.body):req.body;if(!body||JSON.stringify(body).length>45000)throw Error();data=buildRequest(body,process.env.MOMO_SYSTEM_VERSION==='v1'?'v1':'v2');}catch{return res.status(400).json({error:'invalid_request',message:'That message could not be read. Please try a shorter message.'});}
 const model=process.env.GEMINI_MODEL||'gemini-3.5-flash-lite';
 if(!/^[a-z0-9.-]+$/.test(model))return res.status(503).json({error:'configuration',message:'Live chat needs a model configuration check.'});
 data.payload.generationConfig.thinkingConfig=model.startsWith('gemini-2.5')?{thinkingBudget:0}:{thinkingLevel:'minimal'};
 try{
  const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':process.env.GEMINI_API_KEY},body:JSON.stringify(data.payload),signal:AbortSignal.timeout(23000)});
  if(!response.ok){const quota=response.status===429;let reason='';try{const e=await response.json();const m=String(e.error?.message||'');reason=/API key not valid|API_KEY_INVALID/i.test(m)?'invalid_key':/leaked/i.test(m)?'blocked_key':/has not been used|disabled/i.test(m)?'api_disabled':/not found|not supported/i.test(m)?'model_unavailable':/permission|denied/i.test(m)?'permission_denied':''}catch{}return res.status(quota?429:502).json({error:quota?'provider_quota':'provider_error',providerStatus:response.status,reason,message:quota?'Gemini’s free quota is busy or used up. Try again later, or choose the labeled demo.':'Gemini could not reply just now. Try again, or choose the labeled demo.'});}
  const result=await response.json(),candidate=result.candidates?.[0];
  const text=candidate?.content?.parts?.filter(p=>!p.thought&&typeof p.text==='string').map(p=>p.text).join('\n').trim();
  if(!text||!['STOP','MAX_TOKENS'].includes(candidate.finishReason))return res.status(502).json({error:'no_reply',message:'Gemini did not return a usable reply. Try rephrasing your message.'});
  const commentarySafe=!/[0-9$€£]|Ulta|Sephora|Amazon|Walmart|Nordstrom|Target|Brand website/i.test(text);
  const calculatedOnly=data.priceQuestion&&!commentarySafe;
  const reply=data.priceQuestion?data.calculatorSummary+(commentarySafe?'\n\n'+text:''):text;
  return res.status(200).json({text:reply.slice(0,6000),mode:calculatedOnly?'calculated':'live',model,systemVersion:process.env.MOMO_SYSTEM_VERSION==='v1'?'v1':'v2',retrievedIds:data.retrievedIds});
 }catch{return res.status(504).json({error:'timeout',message:'Momo’s connection took too long. Try again, or choose the labeled demo.'});}
};
