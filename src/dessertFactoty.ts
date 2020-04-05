import dessert from "./dessert";

export default class dessertFactory {
    static produce(type: string) {
        switch (type) {
            case 'Red bean burning':
                return new dessert('Red bean burning'); // 红豆烧
            case 'Tiramisu':
                return new dessert('Tiramisu'); // 提拉米苏
            default:
                throw new Error("please choose a dessert type");
        }
    }
}