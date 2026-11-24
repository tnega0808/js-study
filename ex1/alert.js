'use strict';
let array1 = ["a","c","b","a","a","c","c","b","c","c","c","a","b"];
let array2 = ["a","a","","b","b","","a","c","","c","a","","b"];
function checkExam(array1, array2) {
  let result=0;
  for (let i=0; i<array1.length;i++){
    if (array1[i]==array2[i]){
      result+=4;
    }else if(array2[i]==""){
    }else{
      result--;
    }
  }
    result=(result<0)?0:result;
    return result;
}

alert(checkExam(array1,array2));



