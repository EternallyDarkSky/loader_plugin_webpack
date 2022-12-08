import "./assets/css/index.css"

import moment from 'moment';


const PI = 3.14
console.log(PI);
console.log(moment().year())

const sum = (...args)=>{
    return args.reduce((p,a)=>p+a,0)
}