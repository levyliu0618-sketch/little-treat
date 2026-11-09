const products=[
{id:'wash',name:'Almond body wash',brand:'SUNDAY CLUB',type:'wash',category:'Body & hair',color:'#b58a53',price:24,old:32,volume:500,miniVolume:100,room:'bath',note:'Almond, vanilla, and a very convincing reason to take a long shower.',sprite:0},
{id:'serum',name:'Everyday hair oil',brand:'SOFT HOURS',type:'dropper',category:'Body & hair',color:'#a27c49',price:28,old:36,volume:50,miniVolume:15,room:'bath',note:'Good hair days. Questionable excuses to buy a backup.',sprite:1},
{id:'cream',name:'Cloud body cream',brand:'CLOUD NINE',type:'jar',category:'Skincare',color:'#e7ddc6',price:22,old:28,volume:250,miniVolume:50,room:'vanity',note:'Soft skin, big tub. Let’s check the shelf situation first.',sprite:2},
{id:'tee',name:'The oatmeal knit',brand:'OFF DUTY',type:'sweater',category:'Wardrobe',color:'#cbbda2',price:48,old:65,room:'closet',note:'A very good sweater. Your other very good sweater has questions.',sprite:3},
{id:'mist',name:'After-rain perfume',brand:'STILL LIFE',type:'perfume',category:'Fragrance',color:'#afb79a',price:38,old:46,volume:50,miniVolume:10,room:'vanity',note:'Cedar, green leaves, main-character-in-a-bookstore energy.',sprite:4},
{id:'bag',name:'The everyday shoulder bag',brand:'EVERYDAY',type:'bag',category:'Wardrobe',color:'#73513f',price:59,old:75,room:'closet',note:'Fits your keys, your lip balm, and absolutely no buyer’s remorse. Ideally.',sprite:5}
];
const stores=[{name:'Brand website',mark:'S',discount:.1,shipping:5,memberDiscount:.05},{name:'Sephora',mark:'S',discount:.05,shipping:6,memberDiscount:.15},{name:'Ulta Beauty',mark:'u',discount:.15,shipping:5.95,memberDiscount:.05},{name:'Amazon',mark:'a',discount:.08,shipping:6.99,memberDiscount:0},{name:'Walmart',mark:'W',discount:.12,shipping:6.99,memberDiscount:0}];

function offers(id, size='full', member=false) {
 const p=products.find(p=>p.id===id); if(!p)return [];
 const base=size==='mini'&&p.miniVolume?+(p.price*.44).toFixed(2):p.price;
 return stores.map((s,i)=>{
  const price=+(base*(1-(s.discount+(member?s.memberDiscount:0)))).toFixed(2);
  const shipping=member&&(i===1||i===3)?0:s.shipping;
  return {store:p.category==='Wardrobe'?(i===1?'Nordstrom':i===2?'Target':s.name):s.name,price,shipping,total:+(price+shipping).toFixed(2)};
 }).sort((a,b)=>a.total-b.total);
}
module.exports={products,offers};
