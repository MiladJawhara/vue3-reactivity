import { reactive, computed } from './mialdReactivity'
import { effect } from './base';


let product = reactive({ price: 5, quantity: 2 });

let salePrice = computed(() => {
    return product.price * 0.9;
});

let total = computed(() => {
    return salePrice.value * product.quantity;
});



product.quantity = 3;

product.quantity = 5;

product.price = 7;