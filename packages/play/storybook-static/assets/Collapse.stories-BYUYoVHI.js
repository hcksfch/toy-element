import{o as _,c as C,B as I,t as k}from"./index-ZPEph0qi.js";import{d as E,h as $,m as N,q as S,k as y,r as d,i as D,s as r,a as p,f as u,w as j,v as z,x as H,y as L,z as O,e as T,T as q,j as A,A as F,B as G,o as V,p as J}from"./iframe-a4BYh3Hr.js";import"./preload-helper-PPVm8Dsz.js";const w=Symbol("collapseContext"),P={class:"er-collapse"},K="ErCollapse",M=C(E({name:K,__name:"Collapse",props:{modelValue:{},accordion:{type:Boolean}},emits:["update:modelValue","change"],setup(e,{emit:i}){const l=e,n=i,s=$(l.modelValue);function o(a){s.value=a,n("update:modelValue",a),n("change",a)}return N(()=>{l.accordion&&s.value.length>1&&k()}),S(()=>l.modelValue,a=>{o(a)}),J(w,{activeNames:s,handleItemClick:function(a){let t=[...s.value];if(l.accordion)return t=t[0]===a?[]:[a],void o(t);const m=t.indexOf(a);m>-1?t.splice(m,1):t.push(a),o(t)}}),(a,t)=>(V(),y("div",P,[d(a.$slots,"default",{},void 0,!0)]))}}),[["__scopeId","data-v-03559e81"]]),v=e=>e.style.height="0px",h=e=>e.style.height=`${e.scrollHeight}px`,f=e=>e.style.height="",b=e=>e.style.overflow="hidden",g=e=>e.style.overflow="",Q={beforeEnter(e){v(e),b(e)},enter:e=>h(e),afterEnter(e){f(e),g(e)},beforeLeave(e){h(e),b(e)},leave:e=>v(e),afterLeave(e){f(e),g(e)}},R=["id"],U={class:"er-collapse-item__title"},W={class:"er-collapse-item__wrapper"},X=["id"],Y=C(E({name:"ErCollapseItem",__name:"CollapseItem",props:{name:{},title:{},disabled:{type:Boolean}},setup(e){const i=e,l=D(w),n=A(()=>l?.activeNames.value.includes(i.name));function s(){i.disabled||l?.handleItemClick(i.name)}return(o,a)=>(V(),y("div",{class:u(["er-collapse-item",{"is-disabled":e.disabled}])},[r("div",{class:u(["er-collapse-item__header",{"is-disabled":e.disabled,"is-active":n.value}]),onClick:s,id:`item-header-${e.name}`},[r("span",U,[d(o.$slots,"title",{},()=>[F(G(e.title),1)],!0)]),p(I,{icon:"angle-right",class:"header-angle"})],10,R),p(q,L({name:"slide"},O(T(Q))),{default:j(()=>[z(r("div",W,[r("div",{class:"er-collapse-item__content",id:`item-content-${e.name}`},[d(o.$slots,"default",{},void 0,!0)],8,X)],512),[[H,n.value]])]),_:3},16)],2))}}),[["__scopeId","data-v-2d7a57a7"]]),x=_(M),B=_(Y),te={title:"Components/Collapse",component:x,subcomponents:{ErCollapseItem:B},tags:["autodocs"]},c={render:e=>({components:{ErCollapse:x,ErCollapseItem:B},setup(){return{args:e}},template:`
      <er-collapse v-bind="args">
      <er-collapse-item title="title a" name="a">
        <div>this is content a</div>
      </er-collapse-item>
      <er-collapse-item title="title b" name="b">
        <div>this is content b</div>
      </er-collapse-item>
      <er-collapse-item title="title c disable" name="c" disabled>
        <div>this is content c</div>
      </er-collapse-item>
      </er-collapse>
      `}),args:{accordion:!0,modelValue:["a"]}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      ErCollapse,
      ErCollapseItem
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <er-collapse v-bind="args">
      <er-collapse-item title="title a" name="a">
        <div>this is content a</div>
      </er-collapse-item>
      <er-collapse-item title="title b" name="b">
        <div>this is content b</div>
      </er-collapse-item>
      <er-collapse-item title="title c disable" name="c" disabled>
        <div>this is content c</div>
      </er-collapse-item>
      </er-collapse>
      \`
  }),
  args: {
    accordion: true,
    modelValue: ["a"]
  }
}`,...c.parameters?.docs?.source}}};const le=["Default"];export{c as Default,le as __namedExportsOrder,te as default};
