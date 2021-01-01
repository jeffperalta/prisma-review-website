import messageHere, { name, getGreeting } from './myModule';
import addition, {sub as subtraction} from './math';

console.log('Hello world', messageHere, name);
console.log(getGreeting('Teddy'));
console.log('Add', addition(4,3))
console.log('Sub', subtraction(4, 3));