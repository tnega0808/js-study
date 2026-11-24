"strict mode"
//1
const cart = [
  { title: 'Book', price: 500, qty: 2 },
  { title: 'Pen', price: 50, qty: 5 },
  { title: 'Notebook', price: 200, qty: 1 },
];
const amount=cart.reduce((sum,item)=>{return sum+item.price*item.qty},0);
console.log(amount);

//2
const users = [
  { id: 101, name: 'Anna', role: 'admin' },
  { id: 102, name: 'Boris', role: 'user' },
  { id: 103, name: 'Elena', role: 'editor' },
];
const dict=users.reduce((accum,user)=>{
  accum[user.id]=user;
  return accum;
},{});
console.table(dict);

//3
const nums = [1, -4, 7, 12, -3, 0, 8];
const result=nums.reduce((arr,num)=>{
  if (num>0&&num%2===0){
    arr.push(num**2);
  }
  return arr;
},[]);
console.log(result);

//4
const tasks = [
  { title: 'Write tests', status: 'todo' },
  { title: 'Fix bug', status: 'done' },
  { title: 'Refactor auth', status: 'todo' },
  { title: 'Deploy', status: 'in-progress' },
];
const statusTasks=tasks.reduce((res,task)=>{
  if (!res[task.status]){
    res[task.status]=[];
  }
  res[task.status].push(task);
  return res;
},{});
console.table(statusTasks);

//train recursion
//1
function countDown(n){
  if (n<=0){
    console.log("Старт!");
    return;
  }
  console.log(n);
  countDown(n-1);
}
countDown(5);

//2
function sumTo(n){
  if (n<=0){
    return n;
  }
  // console.log(n);
  return n+sumTo(n-1);
}
console.log(sumTo(4));

//3
function sumNested(arr){
  let sum=0;
  for (let item of arr){
    // if (typeof item==="number"){ 
    // //оказывается, так писать плохо потому что может выйти Nan,
    //  который тоже считается числом но порушит мне весь результат
    if (Number.isFinite(item)){ //или !Number.isNaN(item)
      sum+=item;
    }else {
      sum+=sumNested(item);
    }
  }
  return sum;
}
const nested = [1, [2, 3], [4, [5, 6]], 7];
console.log(sumNested(nested));

//4 
function buildPrefixes(words,current='',acc=[]){
  for (let word of words){
      if (current===''){
            current+=word;
            
      }else current+='/'+word;
        acc.push(current);
  }
  return acc;
}
let words=['a', 'b', 'c'];
console.log(buildPrefixes(words));


//4 with recursion
function buildPrefixesRec(words,index=0,current='',acc=[]){
  // console.log(acc);
  if (index>=words.length) return acc;
  if (current===''){
            current+=words[index];
            
      }else current+='/'+words[index];
  // console.log(current);
  acc.push(current);
  buildPrefixesRec(words,++index,current,acc);
  return acc;
}
console.log(buildPrefixesRec(words));


//5
const tree = [
  {
    name: 'Electronics',
    children: [
      { name: 'Phones', children: [] },
      {
        name: 'Laptops',
        children: [
          { name: 'Gaming', children: [] },
          { name: 'Ultrabooks', children: [] },
        ],
      },
    ],
  },
  {
    name: 'Books',
    children: [],
  },
];

function findChildren(nodes,prefix='',result=[]){
  result=nodes.reduce((acc,item)=>{
    let currName=prefix;
    // console.log(item);
    currName===''?currName+=item.name:currName=prefix+'/'+item.name;
    // console.log(currName);
    // console.log(acc);
    acc.push(currName);
    if (item.children&&item.children.length>0){
      findChildren(item.children,currName,acc);
    }
    return acc;
  },result);
  return result;
}
console.log(findChildren(tree));

//6
const addTwo=(a)=>a+2;
const mulTwo=(a)=>a*2;
const powTwo=(a)=>a**2;
function pipe(fns,x){
  return fns.reduce((accum,fn)=>{ return fn(accum)},x);
}
let fns=[addTwo, mulTwo, powTwo];
console.log(pipe(fns,3))

//задачи как 5, тк я долго с ней мучилась и хочу закрепить еще раз рекурсию+редьюс
//7.1
function countNodes(nodes,counter=0){
  return nodes.reduce((counter,node)=>{
    counter++;
    console.log(node.name,counter);
    if (node.children&&node.children.length>0){
      counter=countNodes(node.children,counter);
    }
    return counter;
  },counter);

}
console.log("amount of nodes: ",countNodes(tree,0));

//7.2
const menu = [
  {
    id: 1,
    title: 'Каталог',
    active: true,
    children: [
      { id: 2, title: 'Скидки', active: false, children: [] },
      {
        id: 3,
        title: 'Новинки',
        active: true,
        children: [
          { id: 4, title: 'Осень', active: true, children: [] },
        ],
      },
    ],
  },
  { id: 5, title: 'Контакты', active: false, children: [] },
];

//вариант 1
function getActiveTitles(nodes,array=[]){
  return nodes.reduce((acc,node)=>{
    if(node.active){
      acc.push(node.title);
    }
    if (node.children && node.children.length>0){
      getActiveTitles(node.children,acc);
    }
    return acc;
  },array);
}

//вариант 2
function getActiveTitles2(nodes){
  return nodes.reduce((acc,node)=>{
    if(node.active){
      acc.push(node.title);
    }
    if (node.children && node.children.length>0){
      // getActiveTitles(node.children);
      acc=acc.concat(getActiveTitles(node.children));
    }
    return acc;
  },[]);
}
console.log(getActiveTitles(menu));
console.log(getActiveTitles2(menu));